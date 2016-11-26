'use strict'

import React, { Component } from 'react'
import {
  NativeModules
} from 'react-native'
import { Provider } from 'react-redux'

const { CalendarManager } = NativeModules

import Routes from 'src/containers/Routes'

import store from 'src/store'

import {
  appStart
} from 'src/actions/app'

export default class App extends Component {

  componentDidMount () {
    CalendarManager.addEvent('This should work!', 'foo', 123)
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
