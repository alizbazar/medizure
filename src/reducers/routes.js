import {
  NavigationExperimental
} from 'react-native'

const {
  StateUtils: NavigationStateUtils
} = NavigationExperimental

import {
  NAV_MEDITATE,
  NAV_STATS
} from 'src/constants'

const initialState = {
  index: 0,
  routes: [
    {
      key: 'meditate'
    },
    {
      key: 'stats'
    }
  ]
}

export default function (currentstate = initialState, action) {
  switch (action.type) {

    case NAV_MEDITATE:
      return NavigationStateUtils.back(currentstate)

    case NAV_STATS:
      return NavigationStateUtils.forward(currentstate)

    default:
      return currentstate
  }
}
