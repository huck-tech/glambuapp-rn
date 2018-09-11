import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';
import { FETCH_USER_SUCCESS } from '../config/constants';
export default function navigationReducer(state, action) {
  let nextState;
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      if (action.payload.completeRegister) {
        if (action.payload.gender === 'male') {
          nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'BoyTab' }), state);
        } else {
          nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'GirlTab' }),
            state,
          );
        }
      } else {
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'RegisterationFlow' }),
          state,
        );
      }
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
