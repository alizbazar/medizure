import {StyleSheet} from 'react-native'
import {
  constants,
  scaleStylesheet
} from 'src/styles'

export default StyleSheet.create(scaleStylesheet({
  text: Object.assign({}, constants.text.label, {
    color: constants.colors.highlight
  }),
  container: {
    justifyContent: 'flex-start',
    backgroundColor: constants.colors.invertedBackground,
  },
  results: {
    flex: 1,
    borderWidth: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
  },
  transitionButton: {
    height: 100,
  },
}))