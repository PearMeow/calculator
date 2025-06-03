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

function operate(first = "", operation = "", second = "") {
    switch (operation) {
        case ("+"):
            return add(+first, +second);
        case ("-"):
            return sub(+first, +second);
        case ("*"):
            return mul(+first, +second);
        case ("/"):
            return div(+first, +second);
    }
    return "ERR_NO_OP";
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
    op.addEventListener("click", () => {
        const theOp = op.textContent;
        if (first !== "" && operation !== "" && second !== "") {
            first = "" + operate(first, operation, second);
            if (theOp !== "=") {
                operation = theOp;
            } else { // if theOp === "="
                operation = "";
            }
            second = "";
            calcDisplay.textContent = first;
            if (first === "ERR_DIV_BY_0") first = "";
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
    })
}

for (const num of nums) {
    num.addEventListener("click", () => {
        let theNum = (currNum === FIRST) ? first : second;
        if (theNum.length === 13) return;
        if (num.textContent === "." && decimal === true) return;
        if (theNum.length === 1 && num.textContent !== ".") {
            if (theNum[0] === "0") {
                theNum = num.textContent;
            } else {
                theNum += num.textContent;
            }
        } else if (num.textContent === "." && decimal === false) {
            if (theNum.length === 0) {
                theNum += "0";
            }
            theNum += ".";
            decimal = true;
        } else {
            theNum += num.textContent;
        }
        if (currNum === FIRST) {
            first = theNum;
            calcDisplay.textContent = first;
        } else { // if currNum === SECOND
            second = theNum;
            calcDisplay.textContent = second;
        }
    });
}

for (const del of deletion) {
    del.addEventListener("click", () => {
        if (del.textContent === "AC") {
            first = "";
            operation = "";
            second = "";
            decimal = false;
            currNum = FIRST;
            calcDisplay.textContent = first;
        } else { // if del.textContent === "DEL"
            let theNum = (currNum === FIRST) ? first : second;
            if (theNum.length === 0) return;
            if (theNum[theNum.length - 1] === ".") {
                decimal = false;
            }
            theNum = theNum.slice(0, theNum.length - 1);
            if (currNum === FIRST) {
                first = theNum;
                calcDisplay.textContent = first;
            } else { // if currNum === SECOND
                second = theNum;
                calcDisplay.textContent = second;
            }
        }
    });
}
