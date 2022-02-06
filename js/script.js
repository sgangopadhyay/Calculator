"use strict";
window.addEventListener("keydown", function (e) {
  e.preventDefault();
  numberButtons.forEach((button) => {
    if (button.innerText === e.key) button.click();
  });
  operatorButtons.forEach((button) => {
    if (button.innerText === e.key) button.click();
  });

  switch (e.key) {
    case "Enter":
      equalsButton.click();
      break;
    case "Backspace":
      deleteButton.click();
      break;
    case "Delete":
      allClearButton.click();
      break;
  }
});

document.body.innerHTML = `<div class="calculator-grid">
      <div class="output">
        <div data-first-operand class="first-operand"></div>
        <div data-second-operand class="second-operand"></div>
      </div>
      <button data-all-clear class="span-two">AC</button>
      <button data-delete>DEL</button>
      <button data-operator>÷</button>
      <button data-number>1</button>
      <button data-number>2</button>
      <button data-number>3</button>
      <button data-operator>*</button>
      <button data-number>4</button>
      <button data-number>5</button>
      <button data-number>6</button>
      <button data-operator>+</button>
      <button data-number>7</button>
      <button data-number>8</button>
      <button data-number>9</button>
      <button data-operator>-</button>
      <button data-number>.</button>
      <button data-number>0</button>
      <button data-equals class="span-two">=</button>
    </div>`;

class Calculator {
  constructor(firstOperandTextElement, secondOperandTextElement) {
    this.firstOperandTextElement = firstOperandTextElement;
    this.secondOperandTextElement = secondOperandTextElement;
    this.clear();
  }

  clear() {
    this.firstOperand = "";
    this.secondOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.secondOperand = this.secondOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.secondOperand.includes(".")) return;
    this.secondOperand = this.secondOperand.toString() + number.toString();
  }
  selectOperation(operation) {
    if (this.secondOperand === "") return;
    if (this.firstOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.firstOperand = this.secondOperand;
    this.secondOperand = "";
  }
  compute() {
    let result;
    const prev = parseFloat(this.firstOperand);
    const curr = parseFloat(this.secondOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "÷":
        result = prev / curr;
        break;
      default:
        return;
    }
    this.secondOperand = result;
    this.firstOperand = "";
    this.operation = undefined;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerPart = parseFloat(stringNumber.split(".")[0]);
    const decimalPart = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerPart)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerPart.toLocaleString("en", {
        maximunFractionDigits: 0,
      });
    }
    if (decimalPart != null) return `${integerDisplay} . ${decimalPart}`;
    else return integerDisplay;
    if (decimalPart === "") {
      return integerDisplay;
    } else {
      return `${integerDisplay}.${decimalPart}`;
    }
  }

  updateDisplay() {
    this.secondOperandTextElement.innerText = this.getDisplayNumber(
      this.secondOperand
    );
    if (this.operation != null) {
      this.firstOperandTextElement.innerText = `${this.getDisplayNumber(
        this.firstOperand
      )} ${this.operation}`;
    } else {
      this.firstOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const firstOperandTextElement = document.querySelector("[data-first-operand]");
const secondOperandTextElement = document.querySelector(
  "[data-second-operand]"
);

const calculator = new Calculator(
  firstOperandTextElement,
  secondOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.selectOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
