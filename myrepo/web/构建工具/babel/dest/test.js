"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var a = 1;
var b = 2;
var arr = [1, 2, 3];
var arr2 = [].concat(arr);
console.log(arr2);

var show = function show(a, b) {
  return a + b;
};

show(a, b);

function xxx() {
  return _xxx.apply(this, arguments);
}

function _xxx() {
  _xxx = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return console.log(111);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _xxx.apply(this, arguments);
}