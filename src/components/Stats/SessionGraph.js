import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'


const sampleData = [[
    [0, 1],
    [1, 3],
    [3, 7],
    [4, 9],
]]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    chart: {
        width: 200,
        height: 200,
    },
});

export default class SessionGraph extends Component {

  render() {
    return (
      <View style={styles.container}>

      </View>
    )
  }
}