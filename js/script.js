console.log("The script is running");

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
    if (y = 0) return "ERR_DIV_BY_0";
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


const calcDisplay = document.querySelector("display");
const nums = document.querySelectorAll("num");
const operations = document.querySelectorAll("op");
const deletion = document.querySelectorAll("deletion");

for (const op of operations) {
    op.addEventListener("click", () => {
        const theOp = op.textContent;
        if (first !== "" && operation !== "" && second !== "") {
            first = operate(first, operation, second);
            if (theOp !== "=") {
                operation = theOp;
            } else {
                operation = "";
            }
            second = "";
            currNum = FIRST;
            if (first.includes(".")) {
                decimal = true;
            }
            calcDisplay.textContent = first;
        } else if (first !== "" && theOp !== "=") {
            operation = theOp;
            currNum = SECOND;
        }
    })
}

for (const num of nums) {
    num.addEventListener("click", () => {
        let theNum = (currNum === FIRST) ? first : second;
        if (theNum.length === 13) return;
        if (num.textContent === "." && decimal === false) {
            theNum += ".";
            decimal = true;
        } else {
            theNum += num.textContent;
        }
        if (currNum === FIRST) {
            first = theNum;
        } else {
            second = theNum;
        }
    });
}



// op
// on operation: run operate if conditions met, otherwise replace operation if first exists unless op is equals
// deletion
// on AC: reset first, operation, and second to ""
// on DEL: pop last char from current operand if not empty, otherwise do nothing
// num
// on num: append num to current operand
// on decimal: if decimal exists, do nothing, othewise if operand empty append 0., otherwise append .
