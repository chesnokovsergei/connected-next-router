import createAll from './utils/createAll';
import plainStructure from './structure/plain';

var _createAll = createAll(plainStructure),
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

export { LOCATION_CHANGE, CALL_ROUTER_METHOD, push, replace, go, goBack, goForward, prefetch, routerActions, ConnectedRouter, routerReducer, createRouterMiddleware, initialRouterState, routerMethods };