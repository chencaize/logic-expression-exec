class LogicExpressionExec {
    #basic = {
        expression: "",
        parseExpression: undefined,
        parseExpressionProps: undefined,
        appendProps: undefined,
    }

    #operator = {
        and: "&&",
        or: "||",
        bracketLeft: "(",
        bracketRight: ")",
    };

    #config = {
        expressionArraySpliter: "(\&\&|\|\||\(|\))",
        expressionArray: [],
        expressionBracketInfo: {},
    }

    #status;

    //const
    EXCLUSIVEOR = 65535;
    EXPRESSION_SET = /*                   */ 0b0000000000000001;
    PARSEEXPRESSION_SET = /*              */ 0b0000000000000010;
    PARSEEXPRESSIONPROPS_SET = /*         */ 0b0000000000000100;
    APPENDPROPS_SET = /*                  */ 0b0000000000001000;
    AND_SET = /*                          */ 0b0000000000010000;
    OR_SET = /*                           */ 0b0000000000100000;
    BRACKETLEFT_SET = /*                  */ 0b0000000001000000;
    BRACKETRIGHT_SET = /*                 */ 0b0000000010000000;
    EXPRESSIONARRAY_SET = /*              */ 0b0000000100000000;
    EXPRESSIONBRACKETINFO_SET = /*        */ 0b0000001000000000;
    EXPRESSIONARRAYSPLITER_SET = /*       */ 0b0000010000000000;

    INIT_SET = this.AND_SET | this.OR_SET | this.BRACKETLEFT_SET | this.BRACKETRIGHT_SET | this.EXPRESSIONARRAYSPLITER_SET;
    SET_SUCCESS = this.EXPRESSION_SET | this.PARSEEXPRESSION_SET | this.AND_SET | this.OR_SET | this.BRACKETLEFT_SET | this.BRACKETRIGHT_SET | this.EXPRESSIONARRAY_SET | this.EXPRESSIONBRACKETINFO_SET | this.EXPRESSIONARRAYSPLITER_SET;

    getBasic(key) {
        return this.#basic[key];
    }

    getOperator(key) {
        return this.#operator[key];
    }

    constructor(basic = {}, operator = {}) {
        this.#status = this.INIT_SET;
        this.update(basic, operator);
    }

    update(basic = {}, operator = {}) {

        const { expression, parseExpression, parseExpressionProps, appendProps } = basic;
        const { and, or, bracketLeft, bracketRight } = operator;

        let shouldUpdateConfig = false;

        if (!this.#isEmpty(expression)) {
            this.#basic.expression = this.#getExpression(expression);
            this.#status |= this.EXPRESSION_SET;
            shouldUpdateConfig = true;
        }

        if (!this.#isEmpty(parseExpression) && parseExpression instanceof Function) {
            this.#basic.parseExpression = parseExpression;
            this.#status |= this.PARSEEXPRESSION_SET;
        }

        if (!this.#isEmpty(parseExpressionProps)) {
            this.#basic.parseExpressionProps = parseExpressionProps;
            this.#status |= this.PARSEEXPRESSIONPROPS_SET;
        }

        if (!this.#isEmpty(appendProps)) {
            this.#basic.appendProps = appendProps;
            this.#status |= this.APPENDPROPS_SET;
        }

        if (!this.#isEmpty(and)) {
            this.#operator.and = and;
            this.#status |= this.AND_SET;
            shouldUpdateConfig = true;
        }

        if (!this.#isEmpty(or)) {
            this.#operator.or = or;
            this.#status |= this.OR_SET;
            shouldUpdateConfig = true;
        }

        if (!this.#isEmpty(bracketLeft)) {
            this.#operator.bracketLeft = bracketLeft;
            this.#status |= this.BRACKETLEFT_SET;
            shouldUpdateConfig = true;
        }

        if (!this.#isEmpty(bracketRight)) {
            this.#operator.bracketRight = bracketRight;
            this.#status |= this.BRACKETRIGHT_SET;
            shouldUpdateConfig = true;
        }

        if (shouldUpdateConfig) {
            this.#config.expressionArraySpliter = this.#getExpressionArraySpliter(this.#operator);
            this.#status |= this.EXPRESSIONARRAYSPLITER_SET;

            this.#config.expressionArray = this.#getExpressionArray(this.#basic.expression, this.#config.expressionArraySpliter);
            this.#status |= this.EXPRESSIONARRAY_SET;

            this.#config.expressionBracketInfo = this.#getExpressionBracketInfo(this.#config.expressionArray, this.#operator);
            if (this.#config.expressionBracketInfo == false) {
                this.#status &= (this.EXPRESSIONBRACKETINFO_SET ^ this.EXCLUSIVEOR);
            } else {
                this.#status |= this.EXPRESSIONBRACKETINFO_SET;
            }
        }

    }

    exec() {
        if (!(this.#isBinaryMatch(this.SET_SUCCESS, this.#status))) {
            console.error("Config is not right!Please check!");
            return -1;
        }

        let result = -1;

        try {
            result = this.#handle(this.#config.expressionArray, this.#config.expressionBracketInfo, this.#basic.parseExpression, this.#operator, this.#basic.parseExpressionProps);
        } catch (error) {
            console.error("Handle failed!", error);
        }

        if (result == -1) {
            console.warn("Config may be not right!");
        }

        return result;
    }

    #isEmpty = (data) => {
        if (data === "") return true; //检验空字符串
        if (!data && data !== 0 && data !== "") return true; //检验 undefined 和 null 
        return false;
    }

    #isBinaryMatch = (a, b) => {
        return ((b ^ a) & a) == 0;
    }

    #getExpression = (expression) => {
        let _expression = expression.replaceAll(/ +/gi, "");//replace all space
        return _expression;
    }

    #getExpressionArraySpliter = (operator) => {
        let spliter = "";
        spliter += "(";

        Object.keys(operator).forEach(key => {
            let val = operator[key];

            val.split("").forEach(item => {
                spliter += "\\";
                spliter += item;
            })

            spliter += "|";
        })

        spliter = spliter.slice(0, -1);

        spliter += ")";

        return spliter;
    }

    #getExpressionArray = (expression, spliter) => {
        let expressionArray = [];
        expressionArray = expression.split(new RegExp(spliter, "gi"));
        expressionArray = expressionArray.filter(item => item != "");
        return expressionArray;
    }

    #getExpressionBracketInfo = (expressionArray, operator) => {
        let expressionBracketInfo = {}, bracketStack = [];
        for (let i = 0; i < expressionArray.length; i++) {
            if (expressionArray[i] == operator.bracketLeft) {
                bracketStack.push(i);
            } else if (expressionArray[i] == operator.bracketRight) {
                let idx = bracketStack.pop();
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

    #handle = (expressionArray, expressionBracketInfo, parseExpression, operator, props) => {
        function loop(start, end) {
            let stack = [];
            for (let i = start; i <= end; i++) {

                let val = expressionArray[i];

                switch (val) {
                    case operator.bracketLeft:
                        stack.push(loop(i + 1, expressionBracketInfo[i] - 1));
                        i = expressionBracketInfo[i];
                        break;
                    case operator.bracketLeft: break;
                    default:
                        if (val == operator.or) {
                            let tempResult = true;
                            let item;
                            while ((item = stack.shift()) != undefined && tempResult > 0) {
                                tempResult = tempResult && parseExpression(item, props);
                            }
                            stack = [];//clear stack
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
                let tempResult = true;
                let item;
                while ((item = stack.shift()) != undefined && tempResult > 0) {
                    tempResult = tempResult && parseExpression(item, props);
                }

                return tempResult;
            }

            return -1;
        }

        return loop(0, expressionArray.length - 1);
    }
}

export default LogicExpressionExec;