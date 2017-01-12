import styles, { ROW_HEIGHT } from './styles.js'
import React, { PureComponent } from 'react'
import {
  View,
  Image,
} from 'react-native'

export default class HRVGraph extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image style={{width: 320, height: 238}} resizeMode='contain' source={require('src/assets/session-last.png')} />
    )
  }
}