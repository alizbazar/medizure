import React, { Component } from 'react'
import { View, Text, ListView } from 'react-native'
import ResultsRow from './ResultsRow'

export default class Results extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(this.props.history)
    };
    console.log('Results', this.props.history)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.history !== newProps.history) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.history)
      })
    }
  }

  renderRow = (rowData) => {
    return (
      <ResultsRow data={rowData}/>
    )
  };

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        enableEmptySections={true}
      />
    )
  }
}