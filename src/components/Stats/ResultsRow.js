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
      index: 0,
    }
  }

  recalculateHRV(props) {
    if (props.data.values) {
      const sum = props.data.values.reduce( (a, b) => (a + b), 0)
      this.setState({
        initialHRV: props.data.values[0].toFixed(2),
        averageHRV: (sum / props.data.values.length).toFixed(2),
        lastHRV: props.data.values[props.data.values.length - 1].toFixed(2),
        index: props.index,
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
      <View style={{backgroundColor: (this.state.index % 2 == 0) ? '#ffffff' : '#f2f2f2'}}>
        <View style={styles.resultsRowItem}>
          <Text style={styles.text}>Session {this.state.index}</Text>
        </View>
        <View style={styles.resultsRow}>
          <View style={styles.resultsRowItem}>
            <Image style={styles.resultsRowImage} resizeMode='contain' source={require('src/assets/heart.png')} />
            <Text style={styles.text}>{this.state.initialHRV}</Text>
          </View>
          <View style={styles.resultsRowItem}>
            <Image style={styles.resultsRowImage} resizeMode='contain' source={require('src/assets/heart.png')} />
            <Text style={styles.text}>{this.state.averageHRV}</Text>
          </View>
          <View style={styles.resultsRowItem}>
            <Image style={styles.resultsRowImage} resizeMode='contain' source={require('src/assets/heart.png')} />
            <Text style={styles.text}>{this.state.lastHRV}</Text>
          </View>
        </View>
      </View>
    )
  }

}