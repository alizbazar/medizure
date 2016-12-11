import React, { Component } from 'react'
import {
  Animated,
  StatusBar
} from 'react-native'
import _ from 'lodash'

const ANIMATION_DELAY = 250

export default class FadeableView extends Component {
  constructor (props) {
    super(props)

    this.initialValue = (props.opacity || props.opacity === 0) ? props.opacity : 1
    if (props.fadeIn) {
      this.state = {
        opacity: new Animated.Value(0)
      }
    } else {
      this.state = {
        opacity: new Animated.Value(this.initialValue)
      }
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.fadeOut) {
      let doAfter
      if (typeof newProps.afterFadeOut === 'function') {
        doAfter = this.props.afterFadeOut
      }
      this.animateToNewValue(0, doAfter)
    } else if (newProps.opacity !== this.props.opacity) {
      this.animateToNewValue(newProps.opacity)
    }
  }

  componentDidMount () {
    if (this.props.fadeIn) {
      this.animateToNewValue(this.initialValue)
    }
  }

  animateToNewValue (value, afterFade) {
    Animated.timing(
      this.state.opacity,
      {
        duration: ANIMATION_DELAY,
        toValue: value
      }
    ).start(afterFade)
  }

  getStatusBar (hideStatusBar, fadingOut, currentlyHidden) {
    if (hideStatusBar) {
      if (fadingOut || currentlyHidden) {
        return <StatusBar hidden={false} animated showHideTransition='slide' />
      } else {
        return <StatusBar hidden animated showHideTransition='slide' />
      }
    }
    return null
  }

  render () {
    let styleProp = [{flex: 1}]
    if (this.props.style) {
      styleProp = this.props.style instanceof Array ? [...styleProp, ...this.props.style] : [...styleProp, this.props.style]
    }
    styleProp.push({opacity: this.state.opacity})

    const props = _.omit(this.props, 'opacity')
    return (
      <Animated.View {...props} style={styleProp}>
        {this.getStatusBar(props.hideStatusBar, props.fadeOut, props.opacity === 0)}
        {this.props.children}
      </Animated.View>
    )
  }

}
