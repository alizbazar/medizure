'use strict'

import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'

const arrowUp = require('src/assets/arrow-up.png')
const arrowDown = require('src/assets/arrow-down.png')

import { constants } from 'src/styles'

const styles = StyleSheet.create({
  container: {
    width: 300,
    margin: 5,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  arrowUp: {
    width: 50,
    height: 21,
    marginBottom: 6,
  },
  arrowDown: {
    width: 50,
    height: 21,
    marginTop: 6,
  },
  label: Object.assign({}, constants.text.label, {

  }),
  labelDown: {
    color: constants.colors.highlight
  }
})

export default function (props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress} activeOpacity={constants.helpers.touchableOpacity}>

      {props.direction === 'down' ? null : (
        <Image source={arrowUp} style={styles.arrowUp} />
      )}

      <Text style={[styles.label, props.direction === 'down' ? styles.labelDown : null]}>
        {props.children.toUpperCase()}
      </Text>

      {props.direction === 'down' ? (
        <Image source={arrowDown} style={styles.arrowDown} />
      ) : null}

    </TouchableOpacity>
  )
}
