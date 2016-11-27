import React, { Component } from 'react'
import {
  View,
  Text
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
      progress: 0.4,
      selectorAnimationStarted: false,
      selectedDuration: 9
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        selectorAnimationStarted: true
      })
    }, 1000)
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
    console.log('Duration onSelect:', {
      selectedDuration: this.state.selectedDuration
    })
    // const resultingDuration = this._playback.setDuration(this.state.selectedDuration);

    // this.setState({
    //   selectedDuration: Math.round(resultingDuration),
    // })
  };

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
    return (
      <View style={[mainStyles.centeredContainer, styles.container]}>
        <View style={styles.header}>
          { this.props.meditationOngoing ? null : this.renderHeader() }
        </View>
        <View style={styles.meditateControls}>

          <TimeSelector
            isPlaying={this.props.meditationOngoing}
            progress={this.state.progress}

            selector={!this.props.meditationOngoing}
            defaultValue={0.4}
            onChange={this.onDurationChange}
            onSelect={this.onDurationSelect}
            waitForVisible={!this.state.selectorAnimationStarted}
          />

        </View>

        { this.props.meditationOngoing ? this.renderMeditationFooter() : this.renderFooter() }
      </View>
    )
  }
}
