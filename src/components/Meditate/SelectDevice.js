import _ from 'lodash'
import styles from './styles.js'
import React, {
  PureComponent
} from 'react'
import {
  View,
  ListView,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

export default class SelectDevice extends PureComponent {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      dataSource: ds
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.discoveredDevices !== newProps.discoveredDevices) {
      const discoveredDevices = _.values(newProps.discoveredDevices)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(discoveredDevices)
      })
    }
  }

  renderHeader() {
    return (
      <View style={styles.deviceSelectorRow}>
        <Text style={styles.deviceSelectorText}>Select Bluetooth device:</Text>
      </View>
    )
  }

  onPressSelection = (rdata) => {
    this.props.onSelect(rdata)
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