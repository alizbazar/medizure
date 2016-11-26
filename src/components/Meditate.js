import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import ActionButton from 'src/components/ActionButton'

import mainStyles, { constants } from 'src/styles'

const styles = StyleSheet.create({
  text: constants.text.h1
})

export default function (props) {
  return (
    <View style={[mainStyles.centeredContainer, {backgroundColor: 'yellow'}]}>
      <Text style={styles.text}>
        MEDITATE
      </Text>
      <ActionButton onPress={props.stats}>
        Go to STATS
      </ActionButton>
    </View>
  )
}