import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Animated
} from 'react-native'

import TransitionButton from 'src/components/TransitionButton'
import ActionButton from 'src/components/ActionButton'

import TimeSelector from './TimeSelector'
import GuidedMeditations from './GuidedMeditations'
import FadeableView from 'src/components/FadeableView'

import mainStyles, { constants } from 'src/styles'
import styles from './styles'

const MAX_DURATION = 60
const MIN_DURATION = 3

export default class Meditate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectorAnimationStarted: false,
      selectedDuration: 0,
      suggestedDuration: 15,
      isConnected: false,
      hrTimeout: null,
      heartBounce: new Animated.Value(1.0),
      guidedMeditationSelectorDisplayed: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        selectorAnimationStarted: true
      })
    }, 200)

    // setTimeout(() => {
    //   this.setState({
    //     isConnected: true
    //   })
    // }, 3000)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.lastHrTimestamp && newProps.lastHrTimestamp !== this.props.lastHrTimestamp) {
      if (this.state.hrTimeout) {
        clearTimeout(this.state.hrTimeout)
      }

      this.setState({
        isConnected: true,
        hrTimeout: setTimeout(() => {
          this.setState({
            isConnected: false
          })

          // HR: Connected timeout
          clearTimeout(this.state.hrTimeout)
        }, 5000)
      })

      this.bounceHeart()

    }
  }

  bounceHeart() {
    // console.log('BOUNCE')
      this.state.heartBounce.setValue(0.7),
    Animated.spring(
      this.state.heartBounce,
      {
        friction: 7,
        tension: 20,
        toValue: 1.0
      }
    ).start()
  }

  onDurationChange = (progress) => {
    const selectedDuration = Math.round(MIN_DURATION + progress * (MAX_DURATION - MIN_DURATION))

    this.setState({
      selectedDuration
    })
  };

  onDurationSelect = () => {
    // const resultingDuration = this._playback.setDuration(this.state.selectedDuration);

    // this.setState({
    //   selectedDuration: Math.round(resultingDuration),
    // })
  };

  static durationToProgress(val) {
    return (val - MIN_DURATION) / (MAX_DURATION - MIN_DURATION);
  }

  toggle () {
    if (this.props.meditationOngoing) {
      this.props.onFinish()
    } else {
      this.props.onStart(this.state.selectedDuration)
    }
  }

  getTime() {
    if (this.props.meditationOngoing) {
      const timeLeft = this.props.progress * this.state.selectedDuration
      const min = Math.floor(timeLeft)
      let sec = Math.round((timeLeft - min) * 60)
      if (sec < 10) {
        sec = `0${sec}`
      }
      return `${min}:${sec}`
    } else {
      return this.state.selectedDuration + ':00'
    }
  }

  renderGuidanceSelector() {
    return (
      <FadeableView style={styles.guidedMeditationsView} fadeIn fadeOut={this.state.guidedMeditationSelectorDisplayed === 'fadeOut'}>
        <GuidedMeditations onPress={() => {
          this.setState({guidedMeditationSelectorDisplayed: 'fadeOut'})

          setTimeout(() => {
            this.setState({guidedMeditationSelectorDisplayed: false})
          }, 300)
        }} />
      </FadeableView>
    )
  }

  renderHeader() {
    return (
      <TransitionButton onPress={this.props.stats} direction="up">
        History
      </TransitionButton>
    )
  }

  renderFooter() {
    return (
      <View style={styles.footer}>

        <ActionButton bounce={this.state.heartBounce} selected={this.state.isConnected} heart={true} onPress={() => this.props.scanForDevices()}>
          {this.state.isConnected ? "HR: Connected" :
            this.props.isConnectingToHR ? "HR: Connecting..." : 'HR: Connect'
          }
        </ActionButton>

        <ActionButton selected={false} onPress={() => {this.setState({guidedMeditationSelectorDisplayed: true})}}>
          Select guided meditation
        </ActionButton>

      </View>
    )
  }

  renderMeditationFooter() {
    return (
      <View style={styles.footer}>

      </View>
    )
  }

  render() {

    const suggestedRelativeDuration = Meditate.durationToProgress(this.state.suggestedDuration);
    const minDuration = Meditate.durationToProgress(MIN_DURATION);
    const maxDuration = this.state.maxDuration ? Meditate_durationToProgress(MAX_DURATION) : null;

    return (
      <View style={[mainStyles.centeredContainer, styles.container]}>
        <View style={styles.header}>
          { this.props.meditationOngoing ? null : this.renderHeader() }
        </View>
        <TouchableOpacity style={styles.meditateControls} onPress={() => this.toggle()} activeOpacity={constants.helpers.touchableOpacity}>

          <View style={[styles.timeSelectorContainer]}>
            <Text style={styles.time}>{this.getTime()}</Text>
          </View>

          <TimeSelector
            isPlaying={!!this.props.meditationOngoing}
            progress={this.props.progress || 0}

            selector={!this.props.meditationOngoing}
            defaultValue={suggestedRelativeDuration}
            min={minDuration}
            max={maxDuration}
            onChange={this.onDurationChange}
            onSelect={this.onDurationSelect}
            waitForVisible={!this.state.selectorAnimationStarted}
          />

        </TouchableOpacity>

        { this.props.meditationOngoing ? this.renderMeditationFooter() : this.renderFooter() }

        { this.state.guidedMeditationSelectorDisplayed ? this.renderGuidanceSelector() : null}
      </View>
    )
  }
}
