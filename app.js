"use strict";

const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

const operation = []; // User entries
const operators = ["*", "+", "-", "/"]; // Operators
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]; // Numbers
let number = ""; // User number entry
let equalIsClicked = false; // if equal button clicked, the user should not be able to enter operators only to avoid any new number to be concatenated with the current result

buttons.addEventListener("click", function (e) {
  const target = e.target.closest("button");
  if (!target) return; // Guard Clause

  const value = target.textContent; // Current value of the clicked button, inc(Clear, =, +, -, *, /, ., 0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
  const lastEntry = operation.slice(-1).join(); // Last value of the user entries

  if (value === "Clear") {
    // If user click 'Clear' //

    // The display will be set to '0' //
    display.textContent = "0";

    // The opertaion array entries will be removed //
    operation.splice(0, operation.length);

    // The last number entry will be removed //
    number = "";

    // Equal clicked back to false //
    equalIsClicked = false;
  } else if (value === "=") {
    // If user clicked '=' //

    // Guard Clause //
    if (number === "") return;

    // The last number entry pushed to the operation array //
    operation.push(number);

    // The Operation is calculated, display updated with the result //
    display.textContent = eval(operation.join(""));

    // The opertaion array entries removed //
    operation.splice(0, operation.length);

    // The result pushed to the operation array for a possible next operation with the result //
    operation.push(display.textContent);

    // The last number entry removed for a new number entry//
    number = "";

    // Equal clicked set to true, to block the user from entring any number and wait for an operator //
    equalIsClicked = true;
  } else if (
    !number.includes(".") &&
    !operators.includes(value) &&
    !equalIsClicked
  ) {
    // If the user enter any number not including yet any '.' and the operators not including the value clicked and the equal clicked is false //

    // The current value is added to the number entry //
    number += value;

    // Guard Clause
    // This prevent the user from breaking the operation //
    // A number should not start with a '.' or '0'(not inc 0.01 or 0.1 for ex) //
    // strict mode doesn't allow decimals starting with a '0' (ex: 0123 + 04 is an error) //
    if (
      number[0] === "." ||
      (number[0] === "0" && numbers.includes(number[1]))
    ) {
      number = "";
      display.textContent = 0;
      return;
    }

    // Display the current number //
    display.textContent = number;
  } else if (value !== "." && !operators.includes(value) && !equalIsClicked) {
    // If the user already entered a number including a '.'  and the operators not including the value clicked and the equal clicked is false //
    // The current value should not be a '.' //

    // The current value is added to the number //
    number += value;

    // Display the current number //
    display.textContent = number;
  } else if (operators.includes(value)) {
    // If the user clicks one of the operators //

    // Guard Clause //
    // 1. The last entry should not be another operator, because the user already selected an operator and the number should be empty, because the user should enter a new number after selecting an operator //
    // 2. The first value should not be an operator if the operation array the number entry are empty, this is for preventing the operation from starting with an operator //
    if (
      (operators.includes(lastEntry) && number === "") ||
      (operators.includes(value) && operation.length === 0 && number === "")
    ) {
      return;
    }

    // The current number entry will be pushed to the operation array //
    operation.push(number);

    // The current operator the user selected will also be pushed to the operation array //
    operation.push(value);

    // The last number entry  removed //
    number = "";

    // The operation is displayed //
    display.textContent = operation.join("");

    // Equal clicked back to false //
    equalIsClicked = false;
  }
});
