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
import LogicExpressionExec from "es/index.mjs"; //es
// const LogicExpressionExec = require("lib/index.cjs");//commonjs
// const LogicExpressionExec = window["login-express-exec"];//html

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
