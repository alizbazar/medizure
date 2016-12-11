import _ from 'lodash'
import React, { Component } from 'react'
import {
  View,
  ListView,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'


export default class SelectDevice extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const discoveredDeviceNames = _.flatMap(this.props.discoveredDevices, 'name')
    this.state = {
      dataSource: ds.cloneWithRows(discoveredDeviceNames)
    };
  }
  componentWillReceiveProps(newProps) {
    if (this.props.discoveredDevices !== newProps.discoveredDevices) {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      const discoveredDeviceNames = _.flatMap(this.props.discoveredDevices, 'name')
      this.state = {
        dataSource: ds.cloneWithRows(discoveredDeviceNames)
      }
    }
  }
  render() {
    console.log('SelectDevice')
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={console.log('TODO: pass event to BluetoothManager')}>
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}
          />
        </View>
      </TouchableOpacity>
    )
  }
}
