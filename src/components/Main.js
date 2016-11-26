'use strict'

import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import ActionButton from './ActionButton'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  welcome: {
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

export default function (props) {
  const complete = props.app_startup_complete ? 'YES' : 'NO'
  return (
    <View style={[styles.container, { backgroundColor: (props.bg_color || 'white') }]}>
      <View style={styles.welcome}>
        <ActionButton onPress={() => props.changeColor()}>
          SWITCH backgroundColor
        </ActionButton>
      </View>
      <Text style={styles.instructions}>
        App startup is complete: {complete}
      </Text>

      <Text style={styles.instructions}>
        Press Cmd+R to reload,{'\n'}
        Cmd+D or shake for dev menu
      </Text>
    </View>
  )
}
