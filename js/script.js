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

// evaluates if equal or another operation is pressed while first, operation, and second exist
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

let first = "";
let operation = "";
let second = "";
let decimal = false;



// on operation: run operate if conditions met, otherwise replace operation unless op is equals
// on AC: reset first, operation, and second to ""
// on DEL: pop last char from current operand if not empty, otherwise do nothing
// on num: append num to current operand
// on decimal: if decimal exists, do nothing, othewise if operand empty append 0., otherwise append .
