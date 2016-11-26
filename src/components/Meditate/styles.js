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

  meditateControls: {
    flex: 1,
  },

  text: Object.assign({}, constants.text.label, {

  }),

  actionButtons: {
    marginBottom: 40
  }
}))
