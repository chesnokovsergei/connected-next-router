"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _url2 = require("url");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var locationFromUrl = function locationFromUrl(_url) {
  var url = _typeof(_url) === 'object' ? (0, _url2.format)(_url) : _url;

  var _parse = (0, _url2.parse)(url),
      hash = _parse.hash,
      search = _parse.search,
      pathname = _parse.pathname;

  return {
    pathname: pathname,
    search: search ? search : '',
    hash: hash ? hash : ''
  };
};

var _default = locationFromUrl;
exports["default"] = _default;