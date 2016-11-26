'use strict'

import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 50,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default function (props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text>{props.children}</Text>
    </TouchableOpacity>
  )
}
