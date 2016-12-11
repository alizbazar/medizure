import { StyleSheet, Dimensions } from 'react-native'
import _ from 'lodash'

const heightBaseline = 667
const widthBaseline = 375
// = 1,171875x iPhone 5 resolution
// vs. Android most popular 640x360

export const widthCurrent = Dimensions.get('window').width
export const heightCurrent = Dimensions.get('window').height

export const scale = (() => {
  const scaleFactor = widthCurrent / widthBaseline

  return {
    int: val => {
      return Math.round(scaleFactor * val)
    },

    half: val => {
      // Since half-pixels are used, rounding should be with double values
      return Math.round(2 * scaleFactor * val) / 2
    },

    real: val => {
      return scaleFactor * val
    },

    basedOnHeight: val => {
      return Math.round(2 * heightCurrent / heightBaseline * val) / 2
    },

    scaleFactor: scaleFactor
  }
})()

export const NoScaling = function (value) {
  this.value = value
}

NoScaling.prototype.getValue = function () {
  return this.value
}

export const scaleStylesheet = obj => {
  return _.mapValues(obj, (styleObj, styleName) => {
    return _.mapValues(styleObj, (stylePropVal, stylePropName) => {
      if (typeof stylePropVal != 'number' || stylePropVal === 1 || stylePropVal === 0) {
        if (stylePropVal instanceof NoScaling) {
          return stylePropVal.getValue()
        }
        return stylePropVal
      }

      switch (stylePropName) {
        case 'height':
        case 'width':

        case 'top':
        case 'right':
        case 'bottom':
        case 'left':

        case 'margin':
        case 'marginTop':
        case 'marginRight':
        case 'marginBottom':
        case 'marginLeft':

        case 'padding':
        case 'paddingTop':
        case 'paddingRight':
        case 'paddingBottom':
        case 'paddingLeft':

        case 'borderWidth':
        case 'borderTopWidth':
        case 'borderRightWidth':
        case 'borderBottomWidth':
        case 'borderLeftWidth':

        case 'borderRadius':
        case 'borderTopRadius':
        case 'borderRightRadius':
        case 'borderBottomRadius':
        case 'borderLeftRadius':
          return scale.half(stylePropVal)

        case 'fontSize':
          return scale.int(stylePropVal)

        case 'lineHeight':
          return scale.real(stylePropVal)

        default:
          return stylePropVal

      }
    })
  })
}

const constants = {
  dimensions: {
    windowHeight: heightCurrent
  },
  colors: {
    primary: '#44444C',
    secondary: '#979797',
    disabled: '#B5B5B5',
    inverse: '#FFFFFF',
    invertedBackground: '#F8F8F8',
    highlight: '#50E3C2',
    highlightDarker: '#02CA9E',
    highlightDarkest: '#04A783'
  },
  fonts: {
    regular: 'Avenir-Medium',
    bold: 'Avenir-Black',
    heavy: 'Avenir-Heavy'
  }
}

Object.assign(constants, {
  text: {
    label: {
      fontSize: 24,
      fontFamily: constants.fonts.bold,
      color: constants.colors.inverse,
    },

    buttonCopy: {
      fontFamily: constants.fonts.regular,
      fontSize: 24,
      color: constants.colors.inverse
    },

    time: {
      fontFamily: constants.fonts.heavy,
      fontSize: 72,
      letterSpacing: 1.48,
      color: constants.colors.inverse
    }
  },

  helpers: {
    iOSstatusBarHeight: 21,
    touchableOpacity: 0.7
  }
})

export { constants }

export default StyleSheet.create({
  // Standard components

  topDownContainer: {
    backgroundColor: constants.colors.background,
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    marginTop: constants.helpers.iOSstatusBarHeight
  },

  scrollableView: {
    backgroundColor: constants.colors.background,
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    marginTop: constants.helpers.iOSstatusBarHeight
  },

  centeredContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center'
  },

  line: {
    alignSelf: 'stretch',
    height: 0,
    borderTopWidth: 1,
    borderTopColor: constants.colors.secondary
  }

})
