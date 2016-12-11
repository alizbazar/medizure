'use strict'

import React, { Component } from 'react'
import {
  NativeModules,
  StatusBar
} from 'react-native'
import { Provider } from 'react-redux'

const { BluetoothManager } = NativeModules

import Routes from 'src/containers/Routes'

import store from 'src/store'

import {
  appStart
} from 'src/actions/app'

export default class App extends Component {
  componentWillMount() {
    StatusBar.setHidden(true, false)
  }

  componentDidMount () {
    // setTimeout(() => {
    //   try {
    //     CalendarManager.addEvent('This should work!', 'foo', 123)
    //   } catch(err) {

    //   }
    // }, 1000)
    store.dispatch(appStart())
  }

  render () {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}
