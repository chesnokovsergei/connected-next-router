"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routerMethods = exports.initialRouterState = exports.createRouterMiddleware = exports.routerReducer = exports.ConnectedRouter = exports.routerActions = exports.prefetch = exports.goForward = exports.goBack = exports.go = exports.replace = exports.push = exports.CALL_ROUTER_METHOD = exports.LOCATION_CHANGE = void 0;

var _createAll2 = _interopRequireDefault(require("./utils/createAll"));

var _plain = _interopRequireDefault(require("./structure/plain"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _createAll = (0, _createAll2["default"])(_plain["default"]),
    LOCATION_CHANGE = _createAll.LOCATION_CHANGE,
    CALL_ROUTER_METHOD = _createAll.CALL_ROUTER_METHOD,
    push = _createAll.push,
    replace = _createAll.replace,
    go = _createAll.go,
    goBack = _createAll.goBack,
    goForward = _createAll.goForward,
    prefetch = _createAll.prefetch,
    routerActions = _createAll.routerActions,
    ConnectedRouter = _createAll.ConnectedRouter,
    routerReducer = _createAll.routerReducer,
    createRouterMiddleware = _createAll.createRouterMiddleware,
    initialRouterState = _createAll.initialRouterState,
    routerMethods = _createAll.routerMethods;

exports.routerMethods = routerMethods;
exports.initialRouterState = initialRouterState;
exports.createRouterMiddleware = createRouterMiddleware;
exports.routerReducer = routerReducer;
exports.ConnectedRouter = ConnectedRouter;
exports.routerActions = routerActions;
exports.prefetch = prefetch;
exports.goForward = goForward;
exports.goBack = goBack;
exports.go = go;
exports.replace = replace;
exports.push = push;
exports.CALL_ROUTER_METHOD = CALL_ROUTER_METHOD;
exports.LOCATION_CHANGE = LOCATION_CHANGE;