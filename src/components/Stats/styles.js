import {StyleSheet} from 'react-native'
import {
  constants,
  scaleStylesheet
} from 'src/styles'

export const ROW_HEIGHT = 50

export default StyleSheet.create(scaleStylesheet({
  text: Object.assign({}, constants.text.label, {
    color: constants.colors.highlight,
  }),
  container: {
    flex: 1,
    backgroundColor: constants.colors.invertedBackground,
  },
  results: {
    flex: 1,
    flexDirection: 'column',
  },
  resultsRowContainer: {
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  resultsRowContainerOdd: {
    backgroundColor: '#f2f2f2',
  },
  resultsRowData: {
    height: ROW_HEIGHT,
    flexDirection: 'row',
  },
  resultsRowHeader: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  resultsRowItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
  resultsRowImage: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  transitionButton: {
    height: 100,
  },
}))