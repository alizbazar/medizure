'use strict'

import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import React, { Component } from 'react'
import Video from 'react-native-video'

import { GUIDED_MEDITATIONS } from 'src/constants'

import Meditate from 'src/components/Meditate'
import * as appActions from 'src/actions/app'

class MeditateContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      meditationOngoing: false,
      timer: null,
      currentTimeInSec: 0,
      totalDurationInSec: 0
    }
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer)
      this.props.toggleMeditationSession(false)
    }
  }

  static requireAudio(selectedGuidedMeditation) {
    if (selectedGuidedMeditation.source) {
      return selectedGuidedMeditation.source
    }
    return {
      uri: selectedGuidedMeditation.url
    }
  }

  // componentWillReceiveProps(newProps) {
  //   if (newProps.selectedGuidedMeditation && newProps.selectedGuidedMeditation !== this.props.selectedGuidedMeditation) {

  //   }
  // }

  onLoad = (data, ...args) => {
    this.setState({totalDurationInSec: data.duration});
    console.log('LOAD', data, ...args)
  };

  onLoadStart = (...args) => {
    console.log('LOAD_START', args)
  };

  onProgress = (data) => {
    this.setState({
      currentTimeInSec: data.currentTime
    })
  };

  onEnd = () => this.finish();

  start(duration) {
    this.props.toggleMeditationSession(true)
    if (!this.props.selectedGuidedMeditation) {
      const durationInSec = duration * 60
      this.setState({
        currentTimeInSec: 0,
        totalDurationInSec: durationInSec,
        timer: setInterval(() => {
          const nextVal = (this.state.currentTimeInSec + 1)
          this.setState({
            currentTimeInSec: nextVal
          })
          if ((this.state.totalDurationInSec - nextVal) <= 0) {
            return this.finish()
          }
        }, 1000)
      })
    }
  }

  finish() {
    clearInterval(this.state.timer)
    this.props.toggleMeditationSession(false)
    this.props.goToStats()
    this.setState({
      timer: null,
    })
  }

  renderPlayer() {
    return (
      <Video
        ref={(ref) => {
          this.player = ref
        }}
        source={MeditateContainer.requireAudio(GUIDED_MEDITATIONS[this.props.selectedGuidedMeditation])}
        style={{width: 0, height: 0, opacity: 0}}
        rate={1.0}
        paused={!this.props.meditationOngoing}
        volume={1.0}
        muted={false}
        onLoad={this.onLoad}
        onLoadStart={this.onLoadStart}
        onProgress={this.onProgress}
        onEnd={this.onEnd}
        repeat={false}
      />
    )
  }

  render() {
    const timeLeft = this.state.totalDurationInSec ? (this.state.totalDurationInSec - this.state.currentTimeInSec) : 0.0
    const progress = this.state.totalDurationInSec ? ( timeLeft / this.state.totalDurationInSec ) : 1.0

    return (
      <Meditate
        progress={progress}
        onStart={duration => this.start(duration)}
        onFinish={() => this.finish()}
        stats={this.props.stats}
        currentTime={timeLeft || null}

        {..._.pick(this.props, [
          'scanForDevices',
          'meditationOngoing',
          'isConnectingToHR',
          'lastHrTimestamp',
          'discoveredDevices'
        ])}
      >

        { this.props.selectedGuidedMeditation ? this.renderPlayer() : null }

      </Meditate>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    lastHrTimestamp: state.app_state.last_hr_timestamp,
    isConnectingToHR: state.app_state.is_connecting_to_hr,
    meditationOngoing: state.app_state.is_meditation_ongoing,
    selectedGuidedMeditation: state.app_state.selected_guided_meditation,
    discoveredDevices: state.app_state.discovered_devices
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(appActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MeditateContainer)
