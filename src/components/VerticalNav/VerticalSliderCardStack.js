/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Facebook, Inc. ("Facebook") owns all right, title and interest, including
 * all intellectual property and other proprietary rights, in and to the React
 * Native CustomComponents software (the "Software").  Subject to your
 * compliance with these terms, you are hereby granted a non-exclusive,
 * worldwide, royalty-free copyright license to (1) use and copy the Software;
 * and (2) reproduce and distribute the Software as part of your own software
 * ("Your Software").  Facebook reserves all rights not expressly granted to
 * you in this license agreement.
 *
 * THE SOFTWARE AND DOCUMENTATION, IF ANY, ARE PROVIDED "AS IS" AND ANY EXPRESS
 * OR IMPLIED WARRANTIES (INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE) ARE DISCLAIMED.
 * IN NO EVENT SHALL FACEBOOK OR ITS AFFILIATES, OFFICERS, DIRECTORS OR
 * EMPLOYEES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @providesModule SliderCardStack
 * @flow
 */
'use strict';

const NavigationTransitioner = require('NavigationTransitioner');
const NavigationCard = require('NavigationCard');
const NavigationCardStackStyleInterpolator = require('NavigationCardStackStyleInterpolator');
const VerticalNavigationCardStackPanResponder = require('./VerticalNavigationCardStackPanResponder');
const NavigationPropTypes = require('NavigationPropTypes');
const React = require('React');
const StyleSheet = require('StyleSheet');
const View = require('View');

const {PropTypes} = React;
const {Directions} = VerticalNavigationCardStackPanResponder;

import type {
  NavigationState,
  NavigationSceneRenderer,
  NavigationSceneRendererProps,
  NavigationTransitionProps,
} from 'NavigationTypeDefinition';

import type {
  NavigationGestureDirection,
} from 'VerticalNavigationCardStackPanResponder';

type Props = {
  direction: NavigationGestureDirection,
  navigationState: NavigationState,
  onNavigateBack?: Function,
  onNavigateForward?: Function,
  renderScene: NavigationSceneRenderer,
  cardStyle?: any,
  style: any,
  gestureResponseDistance?: ?number,
  enableGestures: ?boolean
};

type DefaultProps = {
  direction: NavigationGestureDirection,
  enableGestures: boolean
};

/**
 * A controlled navigation view that renders a stack of cards.
 *
 * ```html
 *     +------------+
 *   +-|   Header   |
 * +-+ |------------|
 * | | |            |
 * | | |  Focused   |
 * | | |   Card     |
 * | | |            |
 * +-+ |            |
 *   +-+            |
 *     +------------+
 * ```
 *
 * ## Example
 *
 * ```js
 *
 * class App extends React.Component {
 *   constructor(props, context) {
 *     this.state = {
 *       navigation: {
 *         index: 0,
 *         routes: [
 *           {key: 'page 1'},
 *         },
 *       },
 *     };
 *   }
 *
 *   render() {
 *     return (
 *       <NavigationCardStack
 *         navigationState={this.state.navigation}
 *         renderScene={this._renderScene}
 *       />
 *     );
 *   }
 *
 *   _renderScene: (props) => {
 *     return (
 *       <View>
 *         <Text>{props.scene.route.key}</Text>
 *       </View>
 *     );
 *   };
 * ```
 */

/**
 * Render the initial style when the initial layout isn't measured yet.
 */
function forInitial(props) {
  const {
    navigationState,
    scene,
  } = props;

  const focused = navigationState.index === scene.index;
  const opacity = focused ? 1 : 0;
  // If not focused, move the scene to the far away.
  const translate = focused ? 0 : 1000000;
  return {
    opacity,
    transform: [
      { translateX: translate },
      { translateY: translate },
    ],
  };
}

function forVertical(props) {
  const {
    layout,
    position,
    scene,
  } = props;

  if (!layout.isMeasured) {
    return forInitial(props);
  }

  const index = scene.index;
  const inputRange = [index - 1, index, index + 1];
  const height = layout.initHeight;

  const opacity = position.interpolate({
    inputRange,
    outputRange: [0.6, 1, 0.6],
  });

  const scale = position.interpolate({
    inputRange,
    outputRange: [1, 1, 1],
  });

  const translateX = 0;
  const translateY = position.interpolate({
    inputRange,
    outputRange: [-height, 0, height],
  });

  return {
    opacity,
    transform: [
      { scale },
      { translateX },
      { translateY },
    ],
  };
}

class SliderCardStack extends React.Component<DefaultProps, Props, void> {
  _render : NavigationSceneRenderer;
  _renderScene : NavigationSceneRenderer;

  static propTypes = {
    /**
     * Custom style applied to the card.
     */
    cardStyle: View.propTypes.style,

    /**
     * The distance from the edge of the card which gesture response can start
     * for. Defaults value is `30`.
     */
    gestureResponseDistance: PropTypes.number,

    /**
     * Enable gestures. Default value is true
     */
    enableGestures: PropTypes.bool,

    /**
     * The controlled navigation state. Typically, the navigation state
     * look like this:
     *
     * ```js
     * const navigationState = {
     *   index: 0, // the index of the selected route.
     *   routes: [ // A list of routes.
     *     {key: 'page 1'}, // The 1st route.
     *     {key: 'page 2'}, // The second route.
     *   ],
     * };
     * ```
     */
    navigationState: NavigationPropTypes.navigationState.isRequired,

    /**
     * Callback that is called when the "back" action is performed.
     * This happens when the back button is pressed or the back gesture is
     * performed.
     */
    onNavigateBack: PropTypes.func,
    onNavigateForward: PropTypes.func,

    /**
     * Function that renders the a scene for a route.
     */
    renderScene: PropTypes.func.isRequired,

    /**
     * Custom style applied to the cards stack.
     */
    style: View.propTypes.style,
  };

  static defaultProps: DefaultProps = {
    direction: Directions.VERTICAL,
    enableGestures: true,
  };

  constructor(props: Props, context: any) {
    super(props, context);
  }

  componentWillMount(): void {
    this._render = this._render.bind(this);
    this._renderScene = this._renderScene.bind(this);
  }

  render(): ReactElement<any> {
    return (
      <NavigationTransitioner
        navigationState={this.props.navigationState}
        render={this._render}
        style={this.props.style}
        configureTransition={this._configureTransition}
      />
    );
  }

  _configureTransition(transitionProps, prevTransitionProps) {
    return {duration: 150}
  }

  _render(props: NavigationTransitionProps): ReactElement<any> {

    const scenes = props.scenes.map(
     scene => this._renderScene({
       ...props,
       scene,
     })
    );

    return (
      <View style={styles.container}>
        <View
          style={styles.scenes}>
          {scenes}
        </View>
      </View>
    );
  }

  _renderScene(props: NavigationSceneRendererProps): ReactElement<any> {
    const style = forVertical(props);

    let panHandlers = null;

    if (this.props.enableGestures) {
      const panHandlersProps = {
        ...props,
        onNavigateBack: this.props.onNavigateBack,
        onNavigateForward: this.props.onNavigateForward,
        gestureResponseDistance: this.props.gestureResponseDistance || 300,
      };
      panHandlers = VerticalNavigationCardStackPanResponder.forVertical(panHandlersProps);
    }

    return (
      <NavigationCard
        {...props}
        key={'card_' + props.scene.key}
        panHandlers={panHandlers}
        renderScene={this.props.renderScene}
        style={[style, this.props.cardStyle]}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Header is physically rendered after scenes so that Header won't be
    // covered by the shadows of the scenes.
    // That said, we'd have use `flexDirection: 'column-reverse'` to move
    // Header above the scenes.
    // flexDirection: 'column-reverse',
  },
  scenes: {
    flex: 1,
  },
});

module.exports = SliderCardStack;