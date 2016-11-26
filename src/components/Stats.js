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
