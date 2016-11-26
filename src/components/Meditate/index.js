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
    <View style={[mainStyles.centeredContainer, styles.container]}>
      <Text>
        MEDITATE
      </Text>
      <ActionButton onPress={props.stats}>
        Go to STATS
      </ActionButton>
    </View>
  )
}
