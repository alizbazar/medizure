import _ from 'lodash'
import styles from './styles.js'
import React, { PureComponent } from 'react'
import {
  View,
  ListView,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

export default class ResultsRow extends PureComponent {

  constructor(props) {
    super(props);

    console.log('foo', props)

    this.state = {
      initialHRV: 0,
      averageHRV: 0,
      lastHRV: 0,
    }
  }

  recalculateHRV(props) {
    if (props.data.values) {
      const sum = props.data.values.reduce( (a, b) => (a + b), 0)
      this.setState({
        initialHRV: props.data.values[0],
        averageHRV: (sum / props.data.values.length).toFixed(2),
        lastHRV: props.data.values[props.data.values.length - 1],
      })
    }
  }

  componentWillMount() {
    this.recalculateHRV(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.recalculateHRV(newProps)
  }

  render() {
    return (
      <View style={{flexDirection: 'row', flex: 1}}>
        <Text style={{flex: 1, textAlign: 'center'}}>{this.state.initialHRV}</Text>
        <Text style={{flex: 1, textAlign: 'center'}}>{this.state.averageHRV}</Text>
        <Text style={{flex: 1, textAlign: 'center'}}>{this.state.lastHRV}</Text>
      </View>
    )
  }

}