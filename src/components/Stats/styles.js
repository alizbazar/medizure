import {StyleSheet} from 'react-native'
import {
  constants,
  scaleStylesheet
} from 'src/styles'

export default StyleSheet.create(scaleStylesheet({
  text: Object.assign({}, constants.text.label, {
    color: constants.colors.highlight,
  }),
  container: {
    justifyContent: 'flex-start',
    backgroundColor: constants.colors.invertedBackground,
  },
  results: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  resultsRow: {
    flex: 1,
    flexDirection: 'row',
  },
  resultsRowHeader: {
    flex: 1,
    padding: 10,
  },
  resultsRowItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  resultsRowImage: {
    width: 30,
    height: 30,
  },
  transitionButton: {
    height: 100,
  },
}))