'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import _ from 'lodash'

import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'

import * as appActions from 'src/actions/app'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
})

class Main extends Component {

  render() {
    const complete = this.props.app_startup_complete ? 'YES' : 'NO'
    return (
      <View style={[styles.container, { backgroundColor: (this.props.bg_color || 'white') }]}>
        <View style={styles.welcome}>
          <TouchableOpacity onPress={() => this.props.changeColor()}>
            <Text>SWITCH backgroundColor</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.instructions}>
          App startup is complete: {complete}
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return _.pick(state.app_state, ['app_startup_complete', 'bg_color'])
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators(appActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

