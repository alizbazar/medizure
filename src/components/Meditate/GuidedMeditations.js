import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'


export default class GuidedMeditations extends Component {
  render() {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={this.props.onPress} style={{flex: 1}}>
        <Image style={{flex: 1, width: null, height: null}} source={require('src/assets/guided-sessions.png')} />
      </TouchableOpacity>
    )
  }
}
