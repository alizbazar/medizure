import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'

import TransitionButton from 'src/components/TransitionButton'

import mainStyles, { constants } from 'src/styles'

import styles from './styles'

export default function (props) {
  return (
    <View style={[mainStyles.centeredContainer, styles.container]}>
      <View style={styles.graphs}>
        <Image source={require('src/assets/session-last.png')} style={styles.sessionLast} />
        <Image source={require('src/assets/stats_last.png')} style={styles.statsLast} />
      </View>
      <TransitionButton onPress={props.meditate} direction="down">
        Go back
      </TransitionButton>
    </View>
  )
}
