"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _router = _interopRequireDefault(require("next/router"));

var _routerMethods = _interopRequireDefault(require("./routerMethods"));

var _actions = require("./actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * This middleware captures CALL_ROUTER_METHOD actions to redirect to the
 * Router singleton. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */
var createRouterMiddleware = function createRouterMiddleware() {
  var middlewareOpts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _middlewareOpts$Route = middlewareOpts.Router,
      Router = _middlewareOpts$Route === void 0 ? _router["default"] : _middlewareOpts$Route,
      _middlewareOpts$metho = middlewareOpts.methods,
      methods = _middlewareOpts$metho === void 0 ? {} : _middlewareOpts$metho;
  var resolvedMethods = Object.values(_routerMethods["default"]).reduce(function (acc, method) {
    acc[method] = methods[method] ? methods[method] : method;
    return acc;
  }, {});
  return function () {
    return function (next) {
      return function (action) {
        var type = action.type,
            payload = action.payload;

        if (type !== _actions.CALL_ROUTER_METHOD) {
          return next(action);
        }

        var args = payload.args;
        var method = resolvedMethods[payload.method];
        Router[method].apply(Router, _toConsumableArray(args));
      };
    };
  };
};

var _default = createRouterMiddleware;
exports["default"] = _default;