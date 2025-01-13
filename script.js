//main variables and constants
let firstNumber = 0;
let operator = "";
let secondNumber = 0;
let result = 0;
const listOfOperators = ['+', '-', '*', '/'];
const display = document.querySelector('p');
const inputControls = document.querySelector('.buttons--input');
const numbers = document.querySelector('.buttons--numbers');
const decimalButton = document.querySelector('.decimal-button');
const operators = document.querySelector('.buttons--operators')

//main functions
function add(a, b) {
    return a+b;
}
function subtract(a, b) {
    return a-b;
}
function multiply(a, b) {
    return a*b;
}
function divide(a, b) {
    if(b == 0) return "division by zero is not allowed"
    return a/b;
}

function operate(num1, operator, num2) {
    let output = 0;
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (operator) {
        case "+":
            output = add(num1, num2)
            break;
    
        case "-":
            output = subtract(num1, num2)
            break;
    
        case "*":
            output = multiply(num1, num2)
            break;
    
        case "/":
            output = divide(num1, num2)
            break;
    }
    return output;
}

//event listeners
inputControls.addEventListener('click', event => {
    let target = event.target;

    switch (target.id) {
        case 'clear-all':
            display.textContent = "";
            clearValues();
            break;
        case 'backspace':
            if(operator.length != 0) break;
            let currentValue = display.textContent;
            let updatedValue = currentValue.substring(0, currentValue.length - 1);
            display.textContent = updatedValue;
            break;
    }
})

numbers.addEventListener('click', event => {    
    debugger
    let target = event.target;
    let [exists, opValue] = isLastCharacterAnOperator();
    if(exists) {
        firstNumber = getFirstNumber();
        operator = opValue;
        display.textContent = "";
    }
    if (target.id === '.' && !checkIfDecimalExists()) display.textContent += '.';
    else if (target.id >= '0' && target.id <= '9') display.textContent += target.id;
})

operators.addEventListener('click', event => {
    debugger
    let target = event.target;
    preventMultipleOperators();
    switch (target.id) {
        case '+':
            if(operator) evaluateExistingExpression();
            display.textContent += '+'
            break;
        case '-':
            if(operator) evaluateExistingExpression();
            display.textContent += '-'
            break;
        case '*':
            if(operator) evaluateExistingExpression();
            display.textContent += '*'
            break;
        case '/':
            if(operator) evaluateExistingExpression();
            display.textContent += '/'
            break;
        case '=':
            if(operator) evaluateExistingExpression();
            firstNumber = parseFloat(display.textContent);
            break;
    }
})

//helper functions
function isLastCharacterAnOperator() {
    let opValue = "";
    let displayValue = display.textContent.split("").reverse().join("");
    let exists = listOfOperators.includes(displayValue[0]);
    if(exists) opValue = displayValue[0];
    return [exists, opValue];
}

function evaluateExistingExpression() {
    secondNumber = display.textContent;
    display.textContent = operate(firstNumber, operator, secondNumber);
    operator = "";
}

function preventMultipleOperators() {
    listOfOperators.forEach(op => {
        if(display.textContent.includes(op)) {
            let currentValue = display.textContent;
            let updatedValue = currentValue.substring(0, currentValue.length-1);
            display.textContent = updatedValue;
        }
    })
}

function checkIfDecimalExists() {
    if (display.textContent.includes('.')) return true
}

function getFirstNumber() {
    return parseFloat(display.textContent);
}

function clearValues() {
    firstNumber = 0;
    operator  = "";
    secondNumber = 0;
}