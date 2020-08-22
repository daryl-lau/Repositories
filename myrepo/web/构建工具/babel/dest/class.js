"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Father = /*#__PURE__*/function () {
  function Father(x, y) {
    _classCallCheck(this, Father);

    this.x = x;
    this.y = y;
    this.name = {
      name: 'Father'
    };
  }

  _createClass(Father, [{
    key: "sum",
    value: function sum() {
      return this.x + this.y;
    }
  }]);

  return Father;
}();

var Son = /*#__PURE__*/function (_Father) {
  _inherits(Son, _Father);

  var _super = _createSuper(Son);

  function Son(a, b, c) {
    var _this;

    _classCallCheck(this, Son);

    // 如果要在子类里面声明自己的属性，则必须调用super
    // super关键字在constructor中就是相当于调用了父类的constructor，父类怎么传参，super就怎么传参
    // 在子类中，super调用的this指向的是子类的实例对象，因此可以在下面直接使用this.x this.y来获取
    _this = _super.call(this, a, b);
    _this.c = c;
    _this.state = {
      a: 1
    };
    return _this;
  }

  _createClass(Son, [{
    key: "log",
    value: function log() {
      console.log(this.state);
      console.log(this.a);
      console.log(this.b);
      console.log(this.c);
      console.log(this.name);
    }
  }]);

  return Son;
}(Father);

var son = new Son(1, 2, 3);
son.log(); // 注意有一个很容易忽略的地方，比如下面的构造函数

var sumCalculator = /*#__PURE__*/function () {
  function sumCalculator(num1, num2) {
    _classCallCheck(this, sumCalculator);

    this.num1 = num1;
    this.num2 = num2;
  }

  _createClass(sumCalculator, [{
    key: "sum",
    value: function sum() {
      return this.num1 + this.num2;
    }
  }, {
    key: "cheng",
    value: function cheng() {
      return this.num1 * this.num2;
    }
  }, {
    key: "log",
    value: function log() {
      return [this.num1, this.num2];
    }
  }]);

  return sumCalculator;
}(); // 当子类调用了super()之后，在内部还是需要用this.num1来获取属性，为什么？
// 那是因为其实super(num1, num2)只是调用了父类的constructor构造函数，super把其内部的this指向了子类的实例
// 但是父类构造函数中写死了this.num1 = num1，所以子类实例只能通过this.num1来获取属性，和形参传不传相同是没有关系的


var Son2 = /*#__PURE__*/function (_sumCalculator) {
  _inherits(Son2, _sumCalculator);

  var _super2 = _createSuper(Son2);

  function Son2(a, b, c) {
    var _this2;

    _classCallCheck(this, Son2);

    _this2 = _super2.call(this, a, b);
    _this2.c = c;
    return _this2;
  }

  _createClass(Son2, [{
    key: "log",
    value: function log() {
      console.log(this.num1, this.num2);
    }
  }]);

  return Son2;
}(sumCalculator);

var cal5 = new Son2(1, 2, 3);
cal5.log(); // react 需要使用super(props)的原因

var Component = function Component(props, context) {
  _classCallCheck(this, Component);

  this.props = props;
  this.context = context;
};

var MyComp = /*#__PURE__*/function (_Component) {
  _inherits(MyComp, _Component);

  var _super3 = _createSuper(MyComp);

  // constructor可以不写，但是如果说想要在子组件中有自己的状态，则必须写
  function MyComp() {
    var _this3;

    _classCallCheck(this, MyComp);

    for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
      props[_key] = arguments[_key];
    }

    _this3 = _super3.call.apply(_super3, [this].concat(props));
    _this3.state = {};
    return _this3;
  }

  _createClass(MyComp, [{
    key: "log",
    value: function log() {
      console.log(this.props);
      console.log(this.state);
    }
  }]);

  return MyComp;
}(Component);

var Comp = new MyComp('props');
Comp.log();