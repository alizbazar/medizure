import React, { Component } from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  PanResponder,
  Animated,
} from 'react-native';

const Progress = require('react-native-progress')

import commonStyles, { scale, constants } from 'src/styles'
import styles from './styles'

const SELECTOR_RADIUS = 133;
const SELECTOR_OFFSET = 5;

// Prevent winding from 0.01 to 0.99 when scrubbing on the top
const MAX_IMMEDIATE_MOVE = 0.7;

// MIN and MAX values on the circle
const MIN_VALUE = 0.07;
const MAX_VALUE = 0.95;


export default class TimeSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: props.waitForVisible ? 0 : TimeSelector._transformToGeometricPosition(props.defaultValue || 0),
    };

    this.selectorOriginX = 0;
    this.selectorOriginY = 0;

    this.minValue = MIN_VALUE;
    this.maxValue = MAX_VALUE;
    this._setMinValue(props.min);
    this._setMaxValue(props.max);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.defaultValue && this.props.defaultValue != newProps.defaultValue) {
      this.setState({
        selectedValue: newProps.waitForVisible ? 0 : TimeSelector._transformToGeometricPosition(newProps.defaultValue),
      });
    }
    this._setMinValue(newProps.min);
    this._setMaxValue(newProps.max);

    // Once view is visible, start animation
    if (this.props.waitForVisible && !newProps.waitForVisible) {
      this._startAnimation();
    }
  }

  _startAnimation() {
    const target = TimeSelector._transformToGeometricPosition(this.props.defaultValue);

    let selectedDuration = new Animated.Value(0);
    selectedDuration.addListener(val => {
      this.setState({
        selectedValue: val.value
      });

      // Communicate back values from [0, 1]
      if (this.props.onChange) {
        this.props.onChange(Math.abs(val.value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE));
      }
    });
    Animated.timing(
      selectedDuration,
      {
        toValue: target,
        duration: 600,
      }
    ).start();
  }

  _setMinValue(propsValue) {
    const value = TimeSelector._transformToGeometricPosition(propsValue);
    this.minValue = value ? Math.max(MIN_VALUE, value) : MIN_VALUE;
  }

  _setMaxValue(propsValue) {
    if (!propsValue) {
      return;
    }
    const value = TimeSelector._transformToGeometricPosition(propsValue);
    this.maxValue = value ? Math.min(MAX_VALUE, value) : MAX_VALUE;
  }

  static _transformToGeometricPosition(val) {
    return MIN_VALUE + val * (MAX_VALUE - MIN_VALUE);
  }

  _moveSelectorNub = (e, gestureState) => {
    const {moveX, moveY} = gestureState;
    const dx = moveX - this.selectorOriginX;
    const dy = this.selectorOriginY - moveY;
    const atan = Math.atan2(dx,dy);
    let progress = (atan > 0 ? atan : (2*Math.PI + atan)) / 2 / Math.PI;

    if (progress < this.state.selectedValue - MAX_IMMEDIATE_MOVE) {
      progress = this.maxValue;
    } else if (progress > this.state.selectedValue + MAX_IMMEDIATE_MOVE) {
      progress = this.minValue;
    } else if (progress > this.maxValue) {
      progress = this.maxValue;
    } else if (progress < this.minValue) {
      progress = this.minValue;
    }

    this.setState({
      selectedValue: progress
    });

    // Communicate back values from [0, 1]
    if (this.props.onChange) {
      this.props.onChange((progress - MIN_VALUE) / (MAX_VALUE - MIN_VALUE));
    }
  };

  _panResponder = PanResponder.create({    //Step 2
      onStartShouldSetPanResponder : () => true,
      onPanResponderMove           : this._moveSelectorNub,
      onPanResponderRelease        : (e, gesture) => {
        this._moveSelectorNub(e, gesture);
        if (this.props.onSelect) {
          this.props.onSelect();
        }
      }
  });

  _renderSelector = () => {
    const left = scale.real(SELECTOR_OFFSET + SELECTOR_RADIUS + SELECTOR_RADIUS * Math.sin(this.state.selectedValue * 2 * Math.PI));
    const top = scale.real(SELECTOR_OFFSET + SELECTOR_RADIUS - SELECTOR_RADIUS * Math.cos(this.state.selectedValue * 2 * Math.PI));

    return (
      <View style={[styles.selectorNub, {top, left}]} {...this._panResponder.panHandlers}>
        <Image source={require('src/assets/nub.png')} style={styles.selectorNubImage} />
      </View>
    )
  };

  render() {
    const props = this.props;

    const selector = props.selector ? this._renderSelector() : null;

    return (
      <View style={styles.playControl}>
        <View style={[styles.progressCircleBorder, !props.selector ? styles.progressCircleBorderPlaying : null]} />
        <View>
          <Progress.Circle
            progress={props.selector ? this.state.selectedValue : props.progress}
            animated={!props.selector}
            size={scale.half(280)}
            thickness={scale.half(10)}
            color={constants.colors.inverse}
            borderColor="transparent"
            borderWidth={0}
            style={styles.progressCircle} />
        </View>
        <View style={styles.selectorContainer} ref={el => {
          this.selectorContainer = el
        }} onLayout={(event) => {

          const {width, height} = event.nativeEvent.layout;
          this.selectorContainer.measure((fx, fy, width, height, px, py) => {
            if (px && py) {
              this.selectorOriginX = px + width / 2;
              this.selectorOriginY = py + height / 2;
            }
          });
        }}>
          {selector}
        </View>
      </View>

    );

  }
}



