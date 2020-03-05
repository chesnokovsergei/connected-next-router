function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* global __NEXT_DATA__ */
import rewriteUrlForNextExport from './utils/rewriteUrlForNextExport';
import { parse, format } from 'url';
export var patchRouter = function patchRouter(Router) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (Router.router && !Router._patchedByConnectedRouter) {
    var shallowTimeTravel = opts.shallowTimeTravel;
    Router._patchedByConnectedRouter = true;
    Router.router._unpatchedChange = Router.router.change;

    Router.router.change = function (method, _url, _as, options, action) {
      var as = _typeof(_as) === 'object' ? format(_as) : _as;
      return Router.router._unpatchedChange(method, _url, _as, options).then(function (changeResult) {
        if (changeResult) {
          if (__NEXT_DATA__.nextExport) {
            as = rewriteUrlForNextExport(as);
          }

          Router.router.events.emit('routeChangeCompleteWithAction', as, action);
        }

        return changeResult;
      });
    };

    Router._go = function (delta) {
      window.history.go(delta);
    };

    Router.router._unpatchedReplace = Router.router.replace;

    Router.router.replace = function (url) {
      var as = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : url;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return Router.router.change('replaceState', url, as, options, 'REPLACE');
    };

    Router.router._unpatchedPush = Router.router.push;

    Router.router.push = function (url) {
      var as = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : url;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return Router.router.change('pushState', url, as, options, 'PUSH');
    }; // Keep Router.router._beforePopState for backward compatibility (< Next.js 8)


    Router.router._unpatchedBpsCallback = Router.router._bps || Router.router._beforePopState;
    Router.beforePopState(function (_ref) {
      var url = _ref.url,
          as = _ref.as,
          options = _ref.options;
      Router.router.change('replaceState', url, as, options, 'POP');

      if (Router.router._unpatchedBpsCallback) {
        var _Router$router;

        (_Router$router = Router.router)._unpatchedBpsCallback.apply(_Router$router, arguments);
      }

      return false;
    });
    Router._unpatchedBeforePopState = Router.beforePopState;

    Router.beforePopState = function (cb) {
      Router.router._unpatchedBpsCallback = cb;
    };

    if (shallowTimeTravel) {
      Router._timeTravelChange = timeTravelChange.bind(Router.router);
    } else {
      Router._timeTravelChange = function (url) {
        return Router.router.replace(url);
      };
    }
  }
};
export var unpatchRouter = function unpatchRouter(Router) {
  if (Router._patchedByConnectedRouter) {
    Router.router.change = Router.router._unpatchedChange;
    Router.router.replace = Router.router._unpatchedReplace;
    Router.router.push = Router.router._unpatchedPush;
    Router.beforePopState = Router._unpatchedBeforePopState;

    if (Router.router._unpatchedBpsCallback) {
      Router.beforePopState(Router.router._unpatchedBpsCallback);
    }

    Router.router._unpatchedBpsCallback = undefined;
    Router._timeTravelChange = undefined;
    Router._go = undefined;
    Router._patchedByConnectedRouter = false;
  }
};

function toRoute(path) {
  return path.replace(/\/$/, '') || '/';
}

function timeTravelChange(url) {
  var as = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : url;

  if (this.onlyAHashChange(url)) {
    this.changeState('replaceState', url, as);
    this.scrollToHash(as);
    return true;
  }

  var _parse = parse(url, true),
      pathname = _parse.pathname,
      query = _parse.query,
      hash = _parse.hash;

  var route = toRoute(pathname);
  var routeInfo = this.components[route];
  this.changeState('replaceState', url, as);
  this.set(route, pathname, query, as, _objectSpread({}, routeInfo, {
    hash: hash ? hash : ''
  }));
  return true;
}