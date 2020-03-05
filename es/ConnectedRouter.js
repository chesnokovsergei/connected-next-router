function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { connect, ReactReduxContext } from 'react-redux';
import NextRouter from 'next/router';
import { onLocationChanged } from './actions';
import { patchRouter, unpatchRouter } from './patchRouter';
import locationFromUrl from './utils/locationFromUrl';

var createConnectedRouter = function createConnectedRouter(structure) {
  var getIn = structure.getIn;
  /*
    * ConnectedRouter listens to Next Router events.
    * When history is changed, it dispatches an action
    * to update router state in redux store.
    */

  var ConnectedRouter = /*#__PURE__*/function (_React$Component) {
    _inherits(ConnectedRouter, _React$Component);

    function ConnectedRouter(props) {
      var _this;

      _classCallCheck(this, ConnectedRouter);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ConnectedRouter).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "enableTimeTravel", function () {
        _this._isTimeTravelEnabled = true;
      });

      _defineProperty(_assertThisInitialized(_this), "disableTimeTravel", function () {
        _this._isTimeTravelEnabled = false;
      });

      _defineProperty(_assertThisInitialized(_this), "listenStoreChanges", function () {
        /**
         * Next.js asynchronously loads routes, and Redux actions can be
         * dispatched during this process before Router's history change.
         * To prevent time travel changes during it, time travel detection
         * is disabled when Router change starts, and later enabled on change
         * completion or error.
         */
        if (!_this._isTimeTravelEnabled) {
          return;
        }

        var _this$props = _this.props,
            Router = _this$props.Router,
            shallowTimeTravel = _this$props.shallowTimeTravel,
            reducerKey = _this$props.reducerKey,
            store = _this$props.store; // Extract store's location

        var __state = store.getState(); // suggest immutable.map


        if (__state.constructor.name === 'Map') {
          __state = store.getState().toJS();
        }

        var storeLocation = getIn(__state, [reducerKey, 'location']);
        var pathnameInStore = storeLocation.pathname,
            searchInStore = storeLocation.search,
            hashInStore = storeLocation.hash; // Extract Router's location

        var historyLocation = locationFromUrl(Router.asPath);
        var pathnameInHistory = historyLocation.pathname,
            searchInHistory = historyLocation.search,
            hashInHistory = historyLocation.hash; // If we do time travelling, the location in store is changed but location in Router is not changed

        var locationMismatch = pathnameInHistory !== pathnameInStore || searchInHistory !== searchInStore || hashInStore !== hashInHistory;

        if (locationMismatch) {
          var url = "".concat(pathnameInStore).concat(searchInStore).concat(hashInStore); // Update Router's location to match store's location

          if (shallowTimeTravel) {
            Router._timeTravelChange(url);
          } else if (!_this.inTimeTravelling) {
            _this.inTimeTravelling = true;

            Router._timeTravelChange(url);
          }
        }
      });

      _defineProperty(_assertThisInitialized(_this), "listenRouteChanges", function (url, action) {
        // Dispatch onLocationChanged except when we're in time travelling
        if (!_this.inTimeTravelling) {
          _this.props.onLocationChanged(locationFromUrl(url), action);
        } else {
          _this.inTimeTravelling = false;
        }
      });

      _this.inTimeTravelling = false;
      return _this;
    }

    _createClass(ConnectedRouter, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var _this$props2 = this.props,
            shallowTimeTravel = _this$props2.shallowTimeTravel,
            Router = _this$props2.Router,
            store = _this$props2.store;
        Router.ready(function () {
          patchRouter(Router, {
            shallowTimeTravel: shallowTimeTravel
          });
          _this2.unsubscribe = store.subscribe(_this2.listenStoreChanges);
          Router.router.events.on('routeChangeStart', _this2.disableTimeTravel);
          Router.router.events.on('routeChangeError', _this2.enableTimeTravel);
          Router.router.events.on('routeChangeComplete', _this2.enableTimeTravel);
          Router.router.events.on('routeChangeCompleteWithAction', _this2.listenRouteChanges);
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var Router = this.props.Router;

        if (this.unsubscribe) {
          unpatchRouter(Router);
          this.unsubscribe();
          Router.router.events.off('routeChangeStart', this.disableTimeTravel);
          Router.router.events.off('routeChangeError', this.enableTimeTravel);
          Router.router.events.off('routeChangeComplete', this.enableTimeTravel);
          Router.router.events.off('routeChangeCompleteWithAction', this.listenRouteChanges);
        }
      }
    }, {
      key: "render",
      value: function render() {
        return this.props.children;
      }
    }]);

    return ConnectedRouter;
  }(React.Component);

  _defineProperty(ConnectedRouter, "propTypes", {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    shallowTimeTravel: PropTypes.bool,
    reducerKey: PropTypes.string,
    Router: PropTypes.shape(),
    onLocationChanged: PropTypes.func.isRequired,
    store: PropTypes.shape({
      getState: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired
    }).isRequired
  });

  _defineProperty(ConnectedRouter, "defaultProps", {
    shallowTimeTravel: true,
    reducerKey: 'router',
    Router: NextRouter
  });

  var ConnectedRouterWithContext = function ConnectedRouterWithContext(props) {
    var Context = props.context || ReactReduxContext;

    if (Context == null) {
      throw 'connected-react-router@^1.0.0 requires react-redux v6. ' + 'If you are using react-redux v5, install connected-react-router@^0.0.1.';
    }

    return React.createElement(Context.Consumer, null, function (_ref) {
      var store = _ref.store;
      return React.createElement(ConnectedRouter, _extends({
        store: store
      }, props));
    });
  };

  ConnectedRouterWithContext.propTypes = {
    context: PropTypes.object
  };
  return connect(null, {
    onLocationChanged: onLocationChanged
  })(ConnectedRouterWithContext);
};

export default createConnectedRouter;