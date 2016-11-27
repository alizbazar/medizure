import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import TransitionButton from 'src/components/TransitionButton'
import ActionButton from 'src/components/ActionButton'

import TimeSelector from './TimeSelector'

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
      suggestedDuration: 15
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        selectorAnimationStarted: true
      })
    }, 200)
  }

  onDurationChange = (progress) => {
    const selectedDuration = Math.round(MIN_DURATION + progress * (MAX_DURATION - MIN_DURATION))
    console.log('Duration onChange:', {
      progress,
      selectedDuration
    })
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

        <ActionButton selected={true} heart={true}>
          HR: Connected
        </ActionButton>

        <ActionButton selected={false}>
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
      </View>
    )
  }
}
