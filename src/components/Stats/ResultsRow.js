import _ from 'lodash'
import moment from 'moment'
import React, { PureComponent } from 'react'
import {
  View,
  ListView,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native'

import styles, { ROW_HEIGHT } from './styles.js'
import HRVGraph from './HRVGraph'

export default class ResultsRow extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      initialHRV: 0,
      averageHRV: 0,
      lastHRV: 0,
      index: 0,
      expanded: false,
      animation: new Animated.Value(0),
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
        index: parseInt(props.index),
      })
    }
  }

  toggle = () => {
    const initialValue = this.state.expanded ? ROW_HEIGHT : 0
    const finalValue = this.state.expanded ? 0 : ROW_HEIGHT

    this.setState({ expanded: !this.state.expanded})
    Animated.timing(this.state.animation, {
      toValue: finalValue,
      duration: 300,
    }).start()
  };

  render() {
    return (
      <TouchableOpacity onPress={this.toggle} activeOpacity={1.0}>
        <View style={[styles.resultsRowContainer, (this.state.index % 2) ? styles.resultsRowContainerOdd : null]}>
          <View style={styles.resultsRowHeader}>
            <Text style={styles.text}>Session {this.state.index + 1}</Text>
            <Text style={styles.text}>({this.state.time})</Text>
          </View>
          <Animated.View style={{ height: this.state.animation }}>
            <View style={styles.resultsRowData}>
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
            <HRVGraph />
          </Animated.View>
        </View>
      </TouchableOpacity>
    )
  }

}