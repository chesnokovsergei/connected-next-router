import locationFromUrl from './locationFromUrl';

var createInitialRouterState = function createInitialRouterState(_ref) {
  var fromJS = _ref.fromJS;
  return function () {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
    return fromJS({
      location: locationFromUrl(url),
      action: 'POP'
    });
  };
};

export default createInitialRouterState;