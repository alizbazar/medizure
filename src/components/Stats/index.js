import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import ActionButton from 'src/components/ActionButton'

import mainStyles, { constants } from 'src/styles'

import styles from './styles'

export default function (props) {
  return (
    <View style={[mainStyles.centeredContainer, {backgroundColor: 'lightgreen'}]}>
      <Text style={styles.text}>
        STATS
      </Text>
      <ActionButton onPress={props.meditate}>
        Go back to MEDITATE
      </ActionButton>
    </View>
  )
}
