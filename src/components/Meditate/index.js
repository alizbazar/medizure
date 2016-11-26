import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import TransitionButton from 'src/components/TransitionButton'
import ActionButton from 'src/components/ActionButton'

import mainStyles, { constants } from 'src/styles'
import styles from './styles'

export default function (props) {
  return (
    <View style={[mainStyles.centeredContainer, styles.container]}>
      <TransitionButton onPress={props.stats} direction="up">
        History
      </TransitionButton>
      <View style={styles.meditateControls}>


      </View>

      <View style={styles.actionButtons}>

        <ActionButton selected={true} heart={true}>
          HR: Connected
        </ActionButton>

        <ActionButton selected={false}>
          Select guided meditation
        </ActionButton>

      </View>
    </View>
  )
}
