'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'

const heartActive = require('src/assets/heart.png')
const heartInactive = require('src/assets/heart-inactive.png')

import { constants } from 'src/styles'

const styles = StyleSheet.create({
  touchableArea: {
    padding: 10,
    // margin: 5,
  },
  button: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: constants.colors.inverse,
    borderRadius: 24,
    padding: 10,
  },
  buttonSelected: {
    backgroundColor: constants.colors.inverse,
  },
  arrowUp: {
    width: 50,
    height: 21,
    marginBottom: 6,
  },
  arrowDown: {
    width: 50,
    height: 21,
    marginTop: 6,
  },
  label: Object.assign({}, constants.text.buttonCopy, {
    textAlign: 'center',
    fontSize: 22,
  }),
  labelSelected: {
    color: constants.colors.highlight,
    fontFamily: constants.fonts.bold,
  },

  heartActive: {
    width: 30,
    height: 26,
    marginRight: 13,
  },

  heartInactive: {
    width: 34,
    height: 30,
    marginRight: 10
  }
})

export default class ActionButton extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  renderHeart() {
    if (this.props.selected) {
      return <Image source={heartActive} style={styles.heartActive} />
    } else {
      return <Image source={heartInactive} style={styles.heartInactive} />
    }
  }

  render() {
    return (
      <TouchableOpacity style={styles.touchableArea} onPress={this.props.onPress} activeOpacity={constants.helpers.touchableOpacity}>
        <View style={[styles.button, this.props.selected ? styles.buttonSelected : null]}>
          {this.props.heart ? this.renderHeart() : null}
          <Text style={[styles.label, this.props.selected ? styles.labelSelected : null]}>
            {this.props.children}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
