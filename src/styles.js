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

export const scaleStyles = obj => {
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

export const constants = {
  dimensions: {
    windowHeight: heightCurrent
  },
  colors: {
    primary: '#44444C',
    secondary: '#979797',
    disabled: '#C6C6C6',
    inverse: '#FDFBF7',
    background: '#FDFBF7',
    highlight: '#8CEE7E',
    highlightDarker: '#5BAF72',
    negativeHighlight: '#EB8D99',
    highlightSecondary: '#7FD6EA',
    highlightSecondaryDarker: '#2CACE3'
  },
  fonts: {
    light: 'HelveticaNeue-Light',
    regular: 'HelveticaNeue',
    medium: 'HelveticaNeue-Medium',
    bold: 'HelveticaNeue-Bold'
  }
}

Object.assign(constants, {
  text: {

    h1: {
      fontFamily: constants.fonts.regular,
      fontSize: 22,
      lineHeight: 26,
      color: constants.colors.primary
    },

    h1light: {
      fontFamily: constants.fonts.light,
      fontSize: 22,
      lineHeight: 26,
      color: constants.colors.primary
    },


    // Small headings, Privacy policies
    h2: {
      fontFamily: constants.fonts.light,
      fontSize: 17,
      color: constants.colors.primary,
      lineHeight: 20
    },

    h3bold: {
      fontFamily: constants.fonts.bold,
      fontSize: 15,
      color: constants.colors.primary
    },

    h4: {
      fontFamily: constants.fonts.bold,
      fontSize: 13,
      lineHeight: 18,
      color: constants.colors.secondary
    },

    // WEEK 2, often all caps
    label: {
      fontFamily: constants.fonts.medium,
      fontSize: 12,
      color: constants.colors.disabled
    },


    // Chat messages, details
    body: {
      fontSize: 13,
      fontFamily: constants.fonts.regular,
      fontWeight: '300',
      lineHeight: 18,
      color: constants.colors.primary
    }

  },

  helpers: {
    iOSstatusBarHeight: 21,
    touchableOpacity: 0.7
  }
})

export default StyleSheet.create({
  // Standard components

  topDownContainer: {
    // backgroundColor: constants.colors.background,
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    marginTop: constants.helpers.iOSstatusBarHeight,
  },

  scrollableView: {
    // backgroundColor: constants.colors.background,
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    marginTop: constants.helpers.iOSstatusBarHeight,
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
