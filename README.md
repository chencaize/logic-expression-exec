# logic-expression-exec

Exec AND and OR logic by defination function

# Installation

```
npm install logic-expression-exec
#or
yarn add logic-expression-exec
```

# API

Basic
| Property | Description | Type | Default |
| --- | --- | --- | --- |
| expression | - | string | "" |
| parseExpression | how to handle expression | function | undefined |
| parseExpressionProps | the props of handleExpression  | any | undefined |
| appendProps | the props to store  | any | undefined |

Operator:
| Property | Description | Type | Default |
| --- | --- | --- | --- |
| and | AND | string | && |
| or | OR | string | \|\| |
| bracketLeft | left of bracket | string | ( |
| bracketLeft | right of bracket | string | ) |

# How to use it

```js
import LogicExpressionExec from "logic-expression-exec"; //es
// const LogicExpressionExec = require("logic-expression-exec");//commonjs
// const LogicExpressionExec = window["logic-expression-exec"];//html

let expressionExec = new LogicExpressionExec({
    expression: "(#0 || #1) && #2",
    parseExpression: (expression, props) => { //you can write your own logic to determine how to handle the expression
        if (typeof expression == "string" && expression.startsWith("#")) {
            let item = props[expression.slice(1)];
            const [val1, opr, val2] = item;
            if (opr == "==") {
                return val1 == val2;
            } else if (opr == ">") {
                return val1 > val2;
            } else if (opr == "<") {
                return val1 < val2;
            }
        }
        return expression;
    }

});

let result;

expressionExec.update({
    parseExpressionProps: [
        [1, "==", 2],
        [2, "==", 2],
        [3, ">", 2],
    ]
});
result = expressionExec.exec();
console.log(result); //true

expressionExec.update({
    parseExpressionProps: [
        [1, "==", 2],
        [2, "==", 2],
        [3, "<", 2],
    ]
});
result = expressionExec.exec();
console.log(result); //false
```
