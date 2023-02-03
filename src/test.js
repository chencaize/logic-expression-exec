let LogicExpressionExec = require("../lib/index");

let logicExpressionExec = new LogicExpressionExec({
    parseExpression: (item) => {
        if (item == "true") {
            return true;
        } else if (item == "false") {
            return false;
        } else {
            return item;
        }
    }
})

let testCases = [
    "true",
    "false",
    "true && true",
    "true && false",
    "false && true",
    "false && false",
    "true || true",
    "true || false",
    "false || true",
    "false || false",
    "true && true && true",
    "true && false || false",
    "false && true && true",
    "false && false || false",
    "true || true && true",
    "true || false || false",
    "false || true && true",
    "false || false || false",
    "true && ( false && true )",
    "( true || false ) && false",
    "( true && true ) || false && true && ( true || false )",
    "true && ( false || true )",
    "false || false || true",
    "false && false && false || true",
    "false && false || true",
    "true || true || true && false",
    "(1&&2||3||(4&&(5||6)&&(7&&8))||9)",
    "(1&&0||(3&&4)&&4||4)",
    "(0&&0&&0&&0||0&&0&&5||0&&0&&0&&0||0&&0||0&&22)&&(0&&0&&0&&0||0&&0&&5&&(0&&0&&0&&0||0&&0&&5||0&&0&&0&&0||0&&0||0&&22)||0&&0&&0&&0||0&&0||0&&22)",
    "1&&2||3||4&&5||7&&2131||fsd",
]
testCases.forEach(testCase => {
    let result1 = eval(testCase);

    logicExpressionExec.update({ expression: testCase });

    let result2 = logicExpressionExec.exec();

    console.assert(result1 == result2, `${testCase} is error! the value should be ${result1} , but it is ${result2}`);
})