import _ from 'lodash'
import styles from 'src/styles.js'
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

  renderRow(rowData) {
    return <TouchableOpacity onPress={() => { BluetoothManager.connectDevice(rowData.name, rowData.uuid) }}>
      <Text>
        {rowData.name}
      </Text>
    </TouchableOpacity>
  }

  render() {
    console.log('SelectDevice')
    return (
      <View>
        <ListView 
        dataSource = {this.state.dataSource}
        renderRow = {this.renderRow}
        />
      </View>
    )
  }
}