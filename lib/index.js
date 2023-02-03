/*
* 
* logic-expression-exec v1.0.0
* 
* Copyright 2023, Caize.Chen.
* All rights reserved.
*       
*/
'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  _classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}

var _basic = /*#__PURE__*/new WeakMap();
var _operator = /*#__PURE__*/new WeakMap();
var _config = /*#__PURE__*/new WeakMap();
var _status = /*#__PURE__*/new WeakMap();
var _isEmpty = /*#__PURE__*/new WeakMap();
var _isBinaryMatch = /*#__PURE__*/new WeakMap();
var _getExpression = /*#__PURE__*/new WeakMap();
var _getExpressionArraySpliter = /*#__PURE__*/new WeakMap();
var _getExpressionArray = /*#__PURE__*/new WeakMap();
var _getExpressionBracketInfo = /*#__PURE__*/new WeakMap();
var _handle = /*#__PURE__*/new WeakMap();
var LogicExpressionExec = /*#__PURE__*/function () {
  function LogicExpressionExec() {
    var basic = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _operator2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, LogicExpressionExec);
    _classPrivateFieldInitSpec(this, _basic, {
      writable: true,
      value: {
        expression: "",
        parseExpression: undefined,
        parseExpressionProps: undefined,
        appendProps: undefined
      }
    });
    _classPrivateFieldInitSpec(this, _operator, {
      writable: true,
      value: {
        and: "&&",
        or: "||",
        bracketLeft: "(",
        bracketRight: ")"
      }
    });
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: {
        expressionArraySpliter: "(\&\&|\|\||\(|\))",
        expressionArray: [],
        expressionBracketInfo: {}
      }
    });
    _classPrivateFieldInitSpec(this, _status, {
      writable: true,
      value: void 0
    });
    _defineProperty(this, "EXCLUSIVEOR", 65535);
    _defineProperty(this, "EXPRESSION_SET", /*                   */1);
    _defineProperty(this, "PARSEEXPRESSION_SET", /*              */2);
    _defineProperty(this, "PARSEEXPRESSIONPROPS_SET", /*         */4);
    _defineProperty(this, "APPENDPROPS_SET", /*                  */8);
    _defineProperty(this, "AND_SET", /*                          */16);
    _defineProperty(this, "OR_SET", /*                           */32);
    _defineProperty(this, "BRACKETLEFT_SET", /*                  */64);
    _defineProperty(this, "BRACKETRIGHT_SET", /*                 */128);
    _defineProperty(this, "EXPRESSIONARRAY_SET", /*              */256);
    _defineProperty(this, "EXPRESSIONBRACKETINFO_SET", /*        */512);
    _defineProperty(this, "EXPRESSIONARRAYSPLITER_SET", /*       */1024);
    _defineProperty(this, "INIT_SET", this.AND_SET | this.OR_SET | this.BRACKETLEFT_SET | this.BRACKETRIGHT_SET | this.EXPRESSIONARRAYSPLITER_SET);
    _defineProperty(this, "SET_SUCCESS", this.EXPRESSION_SET | this.PARSEEXPRESSION_SET | this.AND_SET | this.OR_SET | this.BRACKETLEFT_SET | this.BRACKETRIGHT_SET | this.EXPRESSIONARRAY_SET | this.EXPRESSIONBRACKETINFO_SET | this.EXPRESSIONARRAYSPLITER_SET);
    _classPrivateFieldInitSpec(this, _isEmpty, {
      writable: true,
      value: function value(data) {
        if (data === "") return true; //检验空字符串
        if (!data && data !== 0 && data !== "") return true; //检验 undefined 和 null 
        return false;
      }
    });
    _classPrivateFieldInitSpec(this, _isBinaryMatch, {
      writable: true,
      value: function value(a, b) {
        return ((b ^ a) & a) == 0;
      }
    });
    _classPrivateFieldInitSpec(this, _getExpression, {
      writable: true,
      value: function value(expression) {
        var _expression = expression.replaceAll(/ +/gi, ""); //replace all space
        return _expression;
      }
    });
    _classPrivateFieldInitSpec(this, _getExpressionArraySpliter, {
      writable: true,
      value: function value(operator) {
        var spliter = "";
        spliter += "(";
        Object.keys(operator).forEach(function (key) {
          var val = operator[key];
          val.split("").forEach(function (item) {
            spliter += "\\";
            spliter += item;
          });
          spliter += "|";
        });
        spliter = spliter.slice(0, -1);
        spliter += ")";
        return spliter;
      }
    });
    _classPrivateFieldInitSpec(this, _getExpressionArray, {
      writable: true,
      value: function value(expression, spliter) {
        var expressionArray = [];
        expressionArray = expression.split(new RegExp(spliter, "gi"));
        expressionArray = expressionArray.filter(function (item) {
          return item != "";
        });
        return expressionArray;
      }
    });
    _classPrivateFieldInitSpec(this, _getExpressionBracketInfo, {
      writable: true,
      value: function value(expressionArray, operator) {
        var expressionBracketInfo = {},
          bracketStack = [];
        for (var i = 0; i < expressionArray.length; i++) {
          if (expressionArray[i] == operator.bracketLeft) {
            bracketStack.push(i);
          } else if (expressionArray[i] == operator.bracketRight) {
            var idx = bracketStack.pop();
            if (idx != undefined) {
              expressionBracketInfo[idx] = i;
            } else {
              expressionBracketInfo = false;
              break;
            }
          }
        }
        if (bracketStack.length != 0) expressionBracketInfo = false;
        return expressionBracketInfo;
      }
    });
    _classPrivateFieldInitSpec(this, _handle, {
      writable: true,
      value: function value(expressionArray, expressionBracketInfo, parseExpression, operator, props) {
        function loop(start, end) {
          var stack = [];
          for (var i = start; i <= end; i++) {
            var val = expressionArray[i];
            switch (val) {
              case operator.bracketLeft:
                stack.push(loop(i + 1, expressionBracketInfo[i] - 1));
                i = expressionBracketInfo[i];
                break;
              case operator.bracketLeft:
                break;
              default:
                if (val == operator.or) {
                  var tempResult = true;
                  var item = void 0;
                  while ((item = stack.shift()) != undefined && tempResult > 0) {
                    tempResult = tempResult && parseExpression(item, props);
                  }
                  stack = []; //clear stack
                  if (tempResult > 0) {
                    return tempResult;
                  }
                } else if (val == operator.and) {
                  continue;
                } else {
                  stack.push(val);
                }
                break;
            }
          }
          if (stack.length != 0) {
            var _tempResult = true;
            var _item;
            while ((_item = stack.shift()) != undefined && _tempResult > 0) {
              _tempResult = _tempResult && parseExpression(_item, props);
            }
            return _tempResult;
          }
          return -1;
        }
        return loop(0, expressionArray.length - 1);
      }
    });
    _classPrivateFieldSet(this, _status, this.INIT_SET);
    this.update(basic, _operator2);
  }
  _createClass(LogicExpressionExec, [{
    key: "getBasic",
    value:
    //const

    function getBasic(key) {
      return _classPrivateFieldGet(this, _basic)[key];
    }
  }, {
    key: "getOperator",
    value: function getOperator(key) {
      return _classPrivateFieldGet(this, _operator)[key];
    }
  }, {
    key: "update",
    value: function update() {
      var basic = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var operator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var expression = basic.expression,
        parseExpression = basic.parseExpression,
        parseExpressionProps = basic.parseExpressionProps,
        appendProps = basic.appendProps;
      var and = operator.and,
        or = operator.or,
        bracketLeft = operator.bracketLeft,
        bracketRight = operator.bracketRight;
      var shouldUpdateConfig = false;
      if (!_classPrivateFieldGet(this, _isEmpty).call(this, expression)) {
        _classPrivateFieldGet(this, _basic).expression = _classPrivateFieldGet(this, _getExpression).call(this, expression);
        _classPrivateFieldSet(this, _status, _classPrivateFieldGet(this, _status) | this.EXPRESSION_SET);
        shouldUpdateConfig = true;
      }
      if (!_classPrivateFieldGet(this, _isEmpty).call(this, parseExpression) && parseExpression instanceof Function) {
        _classPrivateFieldGet(this, _basic).parseExpression = parseExpression;
        _classPrivateFieldSet(this, _status, _classPrivateFieldGet(this, _status) | this.PARSEEXPRESSION_SET);
      }
      if (!_classPrivateFieldGet(this, _isEmpty).call(this, parseExpressionProps)) {
        _classPrivateFieldGet(this, _basic).parseExpressionProps = parseExpressionProps;
        _classPrivateFieldSet(this, _status, _classPrivateFieldGet(this, _status) | this.PARSEEXPRESSIONPROPS_SET);
      }
      if (!_classPrivateFieldGet(this, _isEmpty).call(this, appendProps)) {
        _classPrivateFieldGet(this, _basic).appendProps = appendProps;
        _classPrivateFieldSet(this, _status, _classPrivateFieldGet(this, _status) | this.APPENDPROPS_SET);
      }
      if (!_classPrivateFieldGet(this, _isEmpty).call(this, and)) {
        _classPrivateFieldGet(this, _operator).and = and;
        _classPrivateFieldSet(this, _status, _classPrivateFieldGet(this, _status) | this.AND_SET);
        shouldUpdateConfig = true;
      }
      if (!_classPrivateFieldGet(this, _isEmpty).call(this, or)) {
        _classPrivateFieldGet(this, _operator).or = or;
        _classPrivateFieldSet(this, _status, _classPrivateFieldGet(this, _status) | this.OR_SET);
        shouldUpdateConfig = true;
      }
      if (!_classPrivateFieldGet(this, _isEmpty).call(this, bracketLeft)) {
        _classPrivateFieldGet(this, _operator).bracketLeft = bracketLeft;
        _classPrivateFieldSet(this, _status, _classPrivateFieldGet(this, _status) | this.BRACKETLEFT_SET);
        shouldUpdateConfig = true;
      }
      if (!_classPrivateFieldGet(this, _isEmpty).call(this, bracketRight)) {
        _classPrivateFieldGet(this, _operator).bracketRight = bracketRight;
        _classPrivateFieldSet(this, _status, _classPrivateFieldGet(this, _status) | this.BRACKETRIGHT_SET);
        shouldUpdateConfig = true;
      }
      if (shouldUpdateConfig) {
        _classPrivateFieldGet(this, _config).expressionArraySpliter = _classPrivateFieldGet(this, _getExpressionArraySpliter).call(this, _classPrivateFieldGet(this, _operator));
        _classPrivateFieldSet(this, _status, _classPrivateFieldGet(this, _status) | this.EXPRESSIONARRAYSPLITER_SET);
        _classPrivateFieldGet(this, _config).expressionArray = _classPrivateFieldGet(this, _getExpressionArray).call(this, _classPrivateFieldGet(this, _basic).expression, _classPrivateFieldGet(this, _config).expressionArraySpliter);
        _classPrivateFieldSet(this, _status, _classPrivateFieldGet(this, _status) | this.EXPRESSIONARRAY_SET);
        _classPrivateFieldGet(this, _config).expressionBracketInfo = _classPrivateFieldGet(this, _getExpressionBracketInfo).call(this, _classPrivateFieldGet(this, _config).expressionArray, _classPrivateFieldGet(this, _operator));
        if (_classPrivateFieldGet(this, _config).expressionBracketInfo == false) {
          _classPrivateFieldSet(this, _status, _classPrivateFieldGet(this, _status) & (this.EXPRESSIONBRACKETINFO_SET ^ this.EXCLUSIVEOR));
        } else {
          _classPrivateFieldSet(this, _status, _classPrivateFieldGet(this, _status) | this.EXPRESSIONBRACKETINFO_SET);
        }
      }
    }
  }, {
    key: "exec",
    value: function exec() {
      if (!_classPrivateFieldGet(this, _isBinaryMatch).call(this, this.SET_SUCCESS, _classPrivateFieldGet(this, _status))) {
        console.error("Config is not right!Please check!");
        return -1;
      }
      var result = -1;
      try {
        result = _classPrivateFieldGet(this, _handle).call(this, _classPrivateFieldGet(this, _config).expressionArray, _classPrivateFieldGet(this, _config).expressionBracketInfo, _classPrivateFieldGet(this, _basic).parseExpression, _classPrivateFieldGet(this, _operator), _classPrivateFieldGet(this, _basic).parseExpressionProps);
      } catch (error) {
        console.error("Handle failed!", error);
      }
      if (result == -1) {
        console.warn("Config may be not right!");
      }
      return result;
    }
  }]);
  return LogicExpressionExec;
}();

module.exports = LogicExpressionExec;
