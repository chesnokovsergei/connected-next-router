"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _locationFromUrl = _interopRequireDefault(require("./locationFromUrl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createInitialRouterState = function createInitialRouterState(_ref) {
  var fromJS = _ref.fromJS;
  return function () {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
    return fromJS({
      location: (0, _locationFromUrl["default"])(url),
      action: 'POP'
    });
  };
};

var _default = createInitialRouterState;
exports["default"] = _default;