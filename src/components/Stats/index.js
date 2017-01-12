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
    <View style={styles.container}>
      <View style={styles.results}>
       {props.children}
      </View>
      <View style={styles.transitionButton}>
        <TransitionButton onPress={props.meditate} direction="down">
          Go back
        </TransitionButton>
      </View>
    </View>
  )
}
