import { StyleSheet } from 'react-native'

import {
  constants,
  scaleStylesheet,
  NoScaling
} from 'src/styles'

export default StyleSheet.create(scaleStylesheet({

  playControl: {
    width: 166,
    height: 166,
    justifyContent: 'center',
    alignItems: 'center',
  },

  progressCircleBorder: {
    //position: 'absolute',
    marginBottom: -128.5,

    marginLeft: 1,
    width: 126,
    height: 126,
    borderRadius: 62,
    borderWidth: 1,
    borderColor: constants.colors.inverse,
  },
  progressCircleBorderPlaying: {
    borderColor: constants.colors.highlightDarker,
  },
  progressCircle: {
  },


  selectorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  selectorNub: {
    position: 'absolute',
    width: 41,
    height: 41,
    borderColor: 'black',
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectorNubImage: {
    width: 23,
    height: 23,
  },
}))
