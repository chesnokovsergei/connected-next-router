import { LOCATION_CHANGE } from './actions';
import createInitialRouterState from './utils/createInitialRouterState';

var createRouterReducer = function createRouterReducer(structure) {
  var merge = structure.merge;
  var initialRouterState = createInitialRouterState(structure);
  var initialState = initialRouterState();
  /**
   * This reducer will update the state with the most recent location Router
   * has transitioned to. This may not be in sync with the Router, particularly
   * if you have use getInitialProps, so reading from and relying on
   * this state is discouraged.
   */

  var routerReducer = function routerReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        type = _ref.type,
        payload = _ref.payload;

    switch (type) {
      case LOCATION_CHANGE:
        {
          return merge(state, payload);
        }

      default:
        return state;
    }
  };

  return routerReducer;
};

export default createRouterReducer;