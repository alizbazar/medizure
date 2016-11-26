import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import TransitionButton from 'src/components/TransitionButton'

import mainStyles, { constants } from 'src/styles'

import styles from './styles'

export default function (props) {
  return (
    <View style={[mainStyles.centeredContainer, styles.container]}>
      <View style={styles.graphs}>
        <Text style={styles.text}>
          STATS
        </Text>
      </View>
      <TransitionButton onPress={props.meditate} direction="down">
        Go back
      </TransitionButton>
    </View>
  )
}
