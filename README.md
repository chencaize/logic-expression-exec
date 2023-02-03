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

    expression: "( true && true ) || false && true && ( true || false ) ",
    parseExpression: (expression, props) => { //you can write your own logic to determine the expression is true or not
        if (expression == "true") {
            return true;
        } else if (expression == "false") {
            return false;
        } else {
            return expression;
        }
    }

});

//exec 
expressionExec.update({
    parseExpressionProps: {
        a: 10
    }
}); //you can update before exec
console.log(expressionExec.exec());
```
