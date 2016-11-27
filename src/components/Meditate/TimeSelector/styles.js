import { StyleSheet } from 'react-native'

import {
  constants,
  scaleStylesheet,
  NoScaling
} from 'src/styles'

export default StyleSheet.create(scaleStylesheet({

  playControl: {
    width: 340,
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
  },

  progressCircleBorder: {
    //position: 'absolute',
    marginBottom: -279,

    marginLeft: 0,
    width: 278,
    height: 278,
    borderRadius: 140,
    borderWidth: 9,
    borderColor: constants.colors.highlightDarker,
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
    width: 60,
    height: 60,
    borderColor: 'black',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectorNubImage: {
    width: 40,
    height: 40,
  },
}))
