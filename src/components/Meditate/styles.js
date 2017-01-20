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
    height: 120,
  },

  meditateControls: {
    flex: 1,
    justifyContent: 'center'
  },

  time: constants.text.time,

  timeSelectorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },

  footer: {
    marginBottom: 40,
    justifyContent: 'space-between',
    height: 150,
  },

  guidedMeditationsView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  deviceSelectorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  deviceSelectorRow: {
    padding: 12,
    alignItems: 'center',
  },

  deviceSelectorText: {
    fontSize: 25,
  },

  deviceSelector: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 30,
  },
}))
