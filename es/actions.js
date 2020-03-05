import * as RouterMethods from './routerMethods';
/**
 * This action type will be dispatched after Router's history
 * receives a location change.
 */

export var LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
export var onLocationChanged = function onLocationChanged(location, action) {
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

export var CALL_ROUTER_METHOD = '@@router/CALL_ROUTER_METHOD';

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


export var push = callRouterActionCreator(RouterMethods.PUSH);
export var replace = callRouterActionCreator(RouterMethods.REPLACE);
export var go = callRouterActionCreator(RouterMethods.GO);
export var prefetch = callRouterActionCreator(RouterMethods.PREFETCH);
export var goBack = function goBack() {
  return go(-1);
};
export var goForward = function goForward() {
  return go(1);
};
export var routerActions = {
  push: push,
  replace: replace,
  go: go,
  goBack: goBack,
  goForward: goForward,
  prefetch: prefetch
};