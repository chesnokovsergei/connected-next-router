"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routerActions = exports.goForward = exports.goBack = exports.prefetch = exports.go = exports.replace = exports.push = exports.CALL_ROUTER_METHOD = exports.onLocationChanged = exports.LOCATION_CHANGE = void 0;

var RouterMethods = _interopRequireWildcard(require("./routerMethods"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * This action type will be dispatched after Router's history
 * receives a location change.
 */
var LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
exports.LOCATION_CHANGE = LOCATION_CHANGE;

var onLocationChanged = function onLocationChanged(location, action) {
  return {
    type: LOCATION_CHANGE,
    payload: {
      location: location,
      action: action
    }
  };
};
/**
 * This action type will be dispatched by the history actions below.
 * If you're writing a middleware to watch for navigation events, be sure to
 * look for actions of this type.
 */


exports.onLocationChanged = onLocationChanged;
var CALL_ROUTER_METHOD = '@@router/CALL_ROUTER_METHOD';
exports.CALL_ROUTER_METHOD = CALL_ROUTER_METHOD;

var callRouterActionCreator = function callRouterActionCreator(method) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return {
      type: CALL_ROUTER_METHOD,
      payload: {
        method: method,
        args: args
      }
    };
  };
};
/**
 * These actions correspond to the history API.
 * The associated routerMiddleware will capture these events before they get to
 * your reducer and reissue them as the matching function on your history.
 */


var push = callRouterActionCreator(RouterMethods.PUSH);
exports.push = push;
var replace = callRouterActionCreator(RouterMethods.REPLACE);
exports.replace = replace;
var go = callRouterActionCreator(RouterMethods.GO);
exports.go = go;
var prefetch = callRouterActionCreator(RouterMethods.PREFETCH);
exports.prefetch = prefetch;

var goBack = function goBack() {
  return go(-1);
};

exports.goBack = goBack;

var goForward = function goForward() {
  return go(1);
};

exports.goForward = goForward;
var routerActions = {
  push: push,
  replace: replace,
  go: go,
  goBack: goBack,
  goForward: goForward,
  prefetch: prefetch
};
exports.routerActions = routerActions;