import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'

import mainStyles, { constants } from 'src/styles'
import styles from './styles'

export default class Meditate extends Component {

  render() {
    return (
      <View style={[styles.timeSelectorContainer]}>
        <Text style={styles.time}>10:00</Text>
      </View>
    )
  }
}