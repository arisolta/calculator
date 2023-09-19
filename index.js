const numberBtn = document.querySelectorAll("[data-number]");
const operatorBtn = document.querySelectorAll("[data-operator]");
const clearBtn = document.querySelector("[data-clear]");
const dotBtn = document.querySelector("[data-dot]");
const equalBtn = document.querySelector("[data-equal]");
const display = document.querySelector("#display");

let firstNum = "";
let secondNum = "";
let operator = "";

//to lock the buttons except "clear" after the result is displayed
let calculatorLocked = false;


clearBtn.addEventListener("click", clear);
numberBtn.forEach((button) => button.addEventListener("click", () => {if (calculatorLocked) return; addNumber(button.textContent)}));
dotBtn.addEventListener("click", () => {if (calculatorLocked) return; addDot()});
operatorBtn.forEach((button) => button.addEventListener("click", () => {if (calculatorLocked) return; addOperator(button.textContent);}));
equalBtn.addEventListener("click", () => evaluate());

//function triggered when an operator is pressed
function addOperator(ops) {
    operator = operator.concat(ops);
    firstNum = firstNum.concat(display.textContent);
    resetDisplay();
    console.log("firstNum:", firstNum);
    console.log("operator:", operator);
}

//function triggered when = is pressed
function evaluate() {
    secondNum = secondNum.concat(display.textContent);
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);

    let result;
    if (operator === "/" && secondNum === 0) {
        result = "LOL...STOP IT";
    } else {
        result = operate(firstNum, operator, secondNum);
        // Limit the result to two decimal places
        result = parseFloat(result.toFixed(2));
        if (String(result).length > 13) {
            result = result.toExponential(2);
        }
    }

    display.textContent = result;
    calculatorLocked = true;

}


//removes any content from display 
function resetDisplay(){
    display.textContent = "";
}

// Add clicked numbers to the screen after removing the initial 0
function addNumber(number) {
    if (display.textContent.length < 13) {
        if (display.textContent === "0" && (number !== "0" && number !== ".")) {
            resetDisplay();
        }
        display.textContent += number;
    }
}

// Add the dot (.) to the display if it doesn't exceed the 13-character limit
function addDot() {
    if (display.textContent.length < 13) {
        if (display.textContent === "0") {
            display.textContent = "0";
        }
        if (!display.textContent.includes(".")) {
            display.textContent += ".";
        }
    }
}


//for when CLEAR button is clicked
function clear(){
    display.textContent = "0";
    firstNum = "";
    operator = "";
    secondNum = "";
    calculatorLocked = false;
}

function add(a, b){
    return a + b;
}

function substract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if (b == 0){
        return "ERROR - DIV BY 0"
    }
    return a / b;
}

function operate(a, operator, b){
    switch(operator){
        case "+":
            return add(a, b)
            break;
        case "-":
            return substract(a, b)
            break;
        case "x":
            return multiply(a, b)
            break;
        case "/":
            return divide(a, b)
            break;

    }
}




