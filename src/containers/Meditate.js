'use strict'

import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import React, { Component } from 'react'

import MeditateComponent from 'src/components/Meditate'
import * as appActions from 'src/actions/app'

class Meditate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      meditationOngoing: false,
      timer: null,
      durationLeftInSec: 0,
      totalDurationInSec: 0
    }
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer)
      this.props.toggleMeditationSession(false)
    }
  }

  start(duration) {
    const durationInSec = duration * 60
    this.props.toggleMeditationSession(true)
    this.setState({
      durationLeftInSec: durationInSec,
      totalDurationInSec: durationInSec,
      timer: setInterval(() => {
        const nextVal = (this.state.durationLeftInSec - 1)
        this.setState({
          durationLeftInSec: nextVal
        })
        if (nextVal <= 0) {
          return this.finish()
        }
      }, 1000)
    })
  }

  finish () {
    clearInterval(this.state.timer)
    this.props.toggleMeditationSession(false)
    this.props.goToStats()
    this.setState({
      timer: null,
      durationLeftInSec: 0
    })
  }

  render() {
    const progress = this.props.meditationOngoing ? (this.state.durationLeftInSec / this.state.totalDurationInSec) : 0
    return (
      <MeditateComponent
        progress={progress}
        onStart={duration => this.start(duration)}
        onFinish={() => this.finish()}
        stats={this.props.stats}

        {..._.pick(this.props, [
          'scanForDevices',
          'meditationOngoing',
          'isConnectingToHR',
          'lastHrTimestamp',
          'discoveredDevices'
        ])}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    lastHrTimestamp: state.app_state.last_hr_timestamp,
    isConnectingToHR: state.app_state.is_connecting_to_hr,
    meditationOngoing: state.app_state.is_meditation_ongoing,
    discoveredDevices: state.app_state.discovered_devices
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(appActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Meditate)
