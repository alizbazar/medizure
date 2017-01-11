import _ from 'lodash'
import styles from './styles.js'
import React, {
  Component
} from 'react'
import {
  View,
  ListView,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

import {
  NativeModules,
  NativeAppEventEmitter
} from 'react-native'
const {
  BluetoothManager
} = NativeModules

export default class SelectDevice extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    const discoveredDevices = _.values(this.props.discoveredDevices)
    this.state = {
      dataSource: ds.cloneWithRows(discoveredDevices)
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.discoveredDevices !== newProps.discoveredDevices) {
      const discoveredDevices = _.values(this.props.discoveredDevices)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(discoveredDevices)
      })
    }
  }

  renderHeader() {
    return (
      <View style={styles.deviceSelectorRow}>
        <Text style={styles.deviceSelectorText}>Select bluetooth device:</Text>
      </View>
    )
  }

  onPressSelection = (rdata) => {
    BluetoothManager.connectDevice(rdata.name, rdata.uuid)
    this.props.closeView()
  };

  renderRow = (rowData) => {
    return (
      <TouchableOpacity onPress={ () => this.onPressSelection(rowData) }>
        <View style={styles.deviceSelectorRow}>
          <Text style={styles.deviceSelectorText}>
            {rowData.name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  };

  render() {
    return (
      <View style={styles.deviceSelector}>
        <ListView 
        renderHeader = {this.renderHeader}
        dataSource = {this.state.dataSource}
        renderRow = {this.renderRow}
        enableEmptySections={true}
        />
      </View>
    )
  }
}