console.log("If you can see this, the script is running");

function add(x = 0, y = 0) {
    return x + y;
}
function sub(x = 0, y = 0) {
    return x - y;
}
function mul(x = 0, y = 0) {
    return x * y;
}
function div(x = 0, y = 0) {
    if (y === 0) return "ERR_DIV_BY_0";
    return x / y;
}

function clean(x = 0) {
    if (x === "ERR_DIV_BY_0") return x;
    if (x > 999999999999999) return "ERR_OVERFLOW";
    return (Math.round(x * 100000) / 100000);
}

function operate(first = "", operation = "", second = "") {
    switch (operation) {
        case ("+"):
            return clean(add(+first, +second));
        case ("-"):
            return clean(sub(+first, +second));
        case ("*"):
            return clean(mul(+first, +second));
        case ("/"):
            return clean(div(+first, +second));
    }
    return "ERR_NO_OP";
}

function doOperation(theOp = "") {
    if (first !== "" && operation !== "" && second !== "") {
        first = "" + operate(first, operation, second);
        if (theOp !== "=") {
            operation = theOp;
        } else { // if theOp === "="
            operation = "";
        }
        second = "";
        calcDisplay.textContent = first;
        if (first === "ERR_DIV_BY_0" || first === "ERR_OVERFLOW") first = "";
        currNum = FIRST;
        if (first.includes(".")) {
            decimal = true;
        }
    } else if (first !== "" && theOp !== "=") {
        operation = theOp;
        currNum = SECOND;
        calcDisplay.textContent = second;
        decimal = false;
    }
}

function appendToNum(appendee = "") {
    let theNum = (currNum === FIRST) ? first : second;
    if (theNum.length === 13) return;
    if (appendee === "." && decimal === true) return;
    if (theNum.length === 1 && appendee !== ".") {
        if (theNum[0] === "0") {
            theNum = appendee;
        } else {
            theNum += appendee;
        }
    } else if (appendee === "." && decimal === false) {
        if (theNum.length === 0) {
            theNum += "0";
        }
        theNum += ".";
        decimal = true;
    } else {
        theNum += appendee;
    }
    if (currNum === FIRST) {
        first = theNum;
        calcDisplay.textContent = first;
    } else { // if currNum === SECOND
        second = theNum;
        calcDisplay.textContent = second;
    }
}

function deleteNum(mode = "") {
    if (mode === "AC") {
        first = "";
        operation = "";
        second = "";
        decimal = false;
        currNum = FIRST;
        calcDisplay.textContent = first;
    } else { // if mode === "DEL"
        let theNum = (currNum === FIRST) ? first : second;
        if (theNum.length === 0) return;
        if (theNum[theNum.length - 1] === ".") {
            decimal = false;
        }
        if (theNum.length === 2 && theNum[0] === "-") {
            theNum = 0;
        } else {
            theNum = theNum.slice(0, theNum.length - 1);
        }
        if (currNum === FIRST) {
            first = theNum;
            calcDisplay.textContent = first;
        } else { // if currNum === SECOND
            second = theNum;
            calcDisplay.textContent = second;
        }
    }
}

const FIRST = true;
const SECOND = false;

let first = "";
let operation = "";
let second = "";
let decimal = false;
let currNum = FIRST;


const calcDisplay = document.querySelector(".display");
const nums = document.querySelectorAll(".num");
const operations = document.querySelectorAll(".op");
const deletion = document.querySelectorAll(".deletion");

for (const op of operations) {
    op.addEventListener("click", () => doOperation(op.textContent));
}

for (const num of nums) {
    num.addEventListener("click", () => appendToNum(num.textContent));
}

for (const del of deletion) {
    del.addEventListener("click", () => deleteNum(del.textContent));
}
