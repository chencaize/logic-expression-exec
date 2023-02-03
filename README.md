# logic-expression-exec

Exec AND and OR logic by defination function

# Installation

```
npm install logic-expression-exec
#or
yarn add logic-expression-exec
```

# How to use it

```js html
<! DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="../../dist/logic-expression-exec.min.js"></script>

</head>

<body>

    <script>
        let expressionExec = new window["logic-expression-exec"]({
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
        expressionExec.update({ parseExpressionProps: { a: 10 } });//you can update before exec
        console.log(expressionExec.exec());
    </script>

</body>

</html>

```

```js commonJs
let LogicExpressionExec = require("../../lib/index.cjs");

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
expressionExec.update({ parseExpressionProps: { a: 10 } });//you can update before exec
console.log(expressionExec.exec());

```

```js Es6
import LogicExpressionExec from "../../es/index.mjs"; 

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
expressionExec.update({ parseExpressionProps: { a: 10 } }); //you can update before exec
console.log(expressionExec.exec()); 
```
