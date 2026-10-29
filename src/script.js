import "./style.css";

const display =
  document.querySelector("#display");
const keys = document.querySelector("#keys");
const themeToggle = document.querySelector(
  "#theme-toggle",
);

let firstNumber = "";
let operator = "";
let finish = false;
const action = ["-", "+", "*", "/"];

keys.addEventListener("click", function (event) {
  const button = event.target;

  if (!button.classList.contains("btn")) {
    return;
  }
  const value = button.textContent.trim();

  if (button.classList.contains("clean-all")) {
    display.value = "";
    firstNumber = "";
    operator = "";
    finish = false;
    return;
  }

  if (button.classList.contains("number")) {
    if (finish || display.value === "Error") {
      display.value = "";
      finish = false;
    }

    if (display.value === "0") {
      display.value = value;
    } else {
      display.value += value;
    }

    return;
  }

  if (value === ".") {
    if (
      finish ||
      display.value === "" ||
      display.value === "Error"
    ) {
      display.value = "0";
      finish = false;
    }

    if (!display.value.includes(".")) {
      display.value += ".";
    }

    return;
  }

  if (action.includes(value)) {
    if (
      display.value === "" ||
      display.value === "Error"
    ) {
      return;
    }

    firstNumber = Number(display.value);
    operator = value;

    finish = true;

    return;
  }

  if (button.classList.contains("equals")) {
    if (
      firstNumber === "" ||
      operator === "" ||
      display.value === "" ||
      finish ||
      display.value === "Error"
    ) {
      return;
    }

    const secondNumber = Number(display.value);
    let result;

    if (operator === "+") {
      result = firstNumber + secondNumber;
    } else if (operator === "-") {
      result = firstNumber - secondNumber;
    } else if (operator === "*") {
      result = firstNumber * secondNumber;
    } else if (operator === "/") {
      //не делим на 0
      if (secondNumber === 0) {
        display.value = "Error";
        firstNumber = "";
        operator = "";
        finish = false;
        return;
      }

      result = firstNumber / secondNumber;
    }

    display.value = result;

    firstNumber = "";
    operator = "";
    finish = true;
  }
});

themeToggle.addEventListener(
  "click",
  function () {
    document.body.classList.toggle("dark-theme");
    if (
      document.body.classList.contains(
        "dark-theme",
      )
    ) {
      themeToggle.textContent = "Light";
    } else {
      themeToggle.textContent = "Dark";
    }
  },
);
