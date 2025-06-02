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
    if (y = 0) return "ERROR";
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
    return "ERROR";
}

let first = "";
let operation = "";
let second = "";

