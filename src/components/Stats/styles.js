import {StyleSheet} from 'react-native'
import {
  constants
} from 'src/styles'

export default StyleSheet.create({
  text: Object.assign({}, constants.text.label, {
    color: constants.colors.highlight
  }),

  container: {
    justifyContent: 'flex-start',
    backgroundColor: constants.colors.invertedBackground,
  },

  graphs: {
    flex: 1,
    justifyContent: 'center',
  }
})