import { StyleSheet } from 'react-native'

import {
  constants,
  scaleStylesheet,
  NoScaling
} from 'src/styles'

export default StyleSheet.create(scaleStylesheet({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: constants.colors.highlight,
  },

  header: {
    height: 130,
  },

  meditateControls: {
    flex: 1,
    justifyContent: 'center'
  },

  time: Object.assign({}, constants.text.time, {

  }),

  footer: {
    marginBottom: 40,
    justifyContent: 'flex-end',
    height: 230
  }
}))
