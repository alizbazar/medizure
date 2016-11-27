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

export default class Meditate extends Component {
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

          <TimeSelector />

        </View>

        { this.props.meditationOngoing ? this.renderMeditationFooter() : this.renderFooter() }
      </View>
    )
  }
}
