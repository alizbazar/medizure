import React, { Component } from 'react'
import {
  StyleSheet
} from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as appActions from 'src/actions/app'

import VerticalSliderCardStack from 'src/components/VerticalNav/VerticalSliderCardStack'

import Meditate from 'src/containers/Meditate'
import Stats from 'src/components/Stats'

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  navigator: {
    flex: 1,
  },

  cardStyle: {
    backgroundColor: 'white',
    elevation: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 0,
  }
})


class Routes extends Component {

  renderScene = sceneProps => {
    const props = {
      meditate: () => this.props.goToMeditate(),
      stats: () => this.props.goToStats()
    }
    switch (sceneProps.scene.route.key) {
      case 'stats':
        return (
          <Stats {...props} />
        )

      case 'meditate':
      default:
        return (
          <Meditate {...props} />
        )
    }
  };

  render() {

    return (
      <VerticalSliderCardStack
        style={styles.navigator}
        cardStyle={styles.cardStyle}
        renderScene={this.renderScene}
        navigationState={this.props.navState}
        onNavigateBack={this.props.goToMeditate}
      />
    )
  }
}



const mapStateToProps = state => {
  return {
    navState: state.routes
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(appActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)


