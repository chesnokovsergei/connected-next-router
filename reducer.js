"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _actions = require("./actions");

var _createInitialRouterState = _interopRequireDefault(require("./utils/createInitialRouterState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createRouterReducer = function createRouterReducer(structure) {
  var merge = structure.merge;
  var initialRouterState = (0, _createInitialRouterState["default"])(structure);
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
      case _actions.LOCATION_CHANGE:
        {
          return merge(state, payload);
        }

      default:
        return state;
    }
  };

  return routerReducer;
};

var _default = createRouterReducer;
exports["default"] = _default;