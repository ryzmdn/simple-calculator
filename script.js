"use strict";

let expression = [];
let display = document.getElementById("display");

function appendValue(value) {
  display.value += value;
}

function appendOperator(operator) {
  if (display.value.trim() === '' || ['+', '-', '*', '/', '%'].includes(display.value.trim().slice(-1))) {
    return;
  }

  display.value += ` ${operator} `;
}

function clearDisplay() {
  display.value = "";
}

function backSpace() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  let tokens = display.value.split(" ");
  let stack = [];
  let operator = null;

  for (let token of tokens) {
    if (!isNaN(token)) {
      stack.push(parseFloat(token));
    } else {
      operator = token;
    }
  }

  if (stack.length === 0) {
    display.value = "Error";
    return;
  }

  let result = stack[0];
  for (let i = 1; i < stack.length; i++) {
    switch (operator) {
      case '+':
        result += stack[i];
        break;
      case '-':
        result -= stack[i];
        break;
      case '*':
        result *= stack[i];
        break;
      case '/':
        if (stack[i] === 0) {
          display.value = "Error";
          return;
        }
        result /= stack[i];
        break;
      case '%':
        result %= stack[i];
        break;
      default:
        display.value = "Error";
        return;
    }
  }

  display.value = result;
}