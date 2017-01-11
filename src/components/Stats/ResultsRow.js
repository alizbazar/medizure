import _ from 'lodash'
import styles from './styles.js'
import React, { PureComponent } from 'react'
import moment from 'moment'
import {
  View,
  ListView,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native'

export default class ResultsRow extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      initialHRV: 0,
      averageHRV: 0,
      lastHRV: 0,
      index: 0,
      expanded: true,
      animation: new Animated.Value(),
      time: moment().format("D.M.YYYY HH:mm"),
    }
  }

  componentWillMount() {
    this.recalculateHRV(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.recalculateHRV(newProps)
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

  toggle = () => {
    const initialValue = this.state.expanded ? 100 : 50
    const finalValue = this.state.expanded ? 50: 100

    this.setState({ expanded: !this.state.expanded})
    this.state.animation.setValue(initialValue)
    Animated.spring(this.state.animation, {
      toValue: finalValue
    }).start()
  };

  render() {
    return (
      <Animated.View style={{height: this.state.animation, backgroundColor: (this.state.index % 2 == 0) ? '#ffffff' : '#f2f2f2'}}>
        <TouchableOpacity onPress={this.toggle}>
          <View style={styles.resultsRowHeader}>
            <Text style={styles.text}>Session {this.state.index} ({this.state.time})</Text>
          </View>
        </TouchableOpacity>
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
      </Animated.View>
    )
  }

}