let buttons = document.querySelectorAll(".calculator__button")
let input = document.getElementById("input").firstChild
let output = document.getElementById("output").firstChild

let previousValue = null;
let canCompute = false;
let operator;

const operators = {
  "add": "+",
  "subtract": "-",
  "multiply": "x",
  "divide": "/",
  "modulo": "%",
}


function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function modulo(a, b) {
  return a % b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
    case "modulo":
      return modulo(a, b);
    default:
      break;
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.value;
    const isOperator = button.className.includes("operator");
    const isAuxiliary = button.className.includes("aux");

    if (isOperator) {
      currentValue = parseFloat(output.textContent);
      if (previousValue === null) {
        previousValue = currentValue;
      } else if (canCompute) {
        previousValue = operate(operator, previousValue, currentValue);
        output.textContent = previousValue;
      }
      operator = value;
      input.textContent = `${previousValue} ${operators[operator]}`;
      canCompute = false;
    } else if (!isAuxiliary) {
      if (output.textContent === "0" || !canCompute) {
        output.textContent = button.value;
      } else {
        output.textContent += button.value;
      }
      canCompute = true;
    }
  });
});


const clearButton = document.getElementById("clear");
clearButton.addEventListener('click', () => {
  input.innerHTML = "";
  output.innerHTML = "0";
  previousValue = null;
  currentValue = null;
  operator = null;
});

const delBtn = document.getElementById("delete");
delBtn.addEventListener('click', () => {
  let currentOutput = output.innerHTML;
  output.innerHTML = currentOutput.length > 1 ? currentOutput.slice(0, -1) : "0";
});

const equalsBtn = document.getElementById("equals");
equalsBtn.addEventListener('click', () => {
  currentValue = parseFloat(output.textContent);
  result = operate(operator, previousValue, currentValue);
  output.innerHTML = result;
  input.innerHTML = "";
  previousValue = null;
});

