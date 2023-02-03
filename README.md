# logic-expression-exec

Exec AND and OR logic by defination function

# Installation

```
npm install logic-expression-exec
#or
yarn add logic-expression-exec
```

# How to use it

```js
import LogicExpressionExec from "logic-expression-exec"; //es
// const LogicExpressionExec = require("logic-expression-exec");//commonjs
// const LogicExpressionExec = window["logic-expression-exec"];//html

let expressionExec = new LogicExpressionExec({
  expression: "(#0 || #1) && #1",
  parseExpression: (expression, props) => { //you can write your own logic to determine how to handle the expression
      if(typeof expression == "string" && expression.startsWith("#")){
        let item = props[expression.slice(1)];
        const [val1,opr,val2] = item;
        if(opr == "=="){
          return val1 == val2;
        }else if(opr == ">"){
          return val1 > val2;
        }else if(opr == "<"){
          return val1 < val2;
        }
      }
      return expression;
  }

});
expressionExec.update({
  parseExpressionProps: [
    [1,"==",2],
    [2,"==",2],
    [3,">",2],
  ]
});
console.log(expressionExec.exec());
```
