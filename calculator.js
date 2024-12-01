const numbers = Array.from(document.querySelectorAll(".number"));
const display = document.querySelector(".display");
const operators = Array.from(document.querySelectorAll(".operator"));
const equals = document.querySelector("#equals");
const clearButton = document.querySelector("#C");
let number = "0";
let memory;
let operator = "";
let equalsOn = false;

function clear() {
  number = "";
  memory = "";
  operator = "";
  equalsOn = false;
}

function add(a,b) {
  return a + b;
}

function sub(a,b) {
  return a - b;
}

function mult(a,b) {
  return a * b;
}

function divide(a,b) {
  if (b == 0) return Infinity;
  return a / b;
}

function operate(a,b,op) {
  switch(op) {
	case 'plus': return add(a,b);
	case 'minus': return sub(a,b);
	case 'multiply': return mult(a,b);
	case "divide": return divide(a,b);
  }
}

function  refreshDisplay(content) {
  if (content == Infinity) {
	content = "Oh NO!!";
  } else if (Number(content) > 999999999999) {
	content = "No memory!!";
	clear();
  }

	display.textContent = content;
}

numbers.forEach(btn => btn.addEventListener("click", function() {
  if (equalsOn || number == "0") {
	number = btn.id;
	equalsOn = false;
  } else if (number.length < 12) {
	number += btn.id;
  }
  refreshDisplay(number);
}));

operators.forEach(btn => btn.addEventListener("click", function() {
  if (memory) {
	memory = operate(+memory, +number, operator);
	refreshDisplay(memory);
	operator = btn.id;
	number = "";
  } else {
	memory = number;
	operator = btn.id;
	number = "";
  }
}));

equals.addEventListener("click", function() {
  if (memory) {
	memory = operate(+memory, +number, operator);
	refreshDisplay(memory);
	number = String(memory);
	memory = "";
	operator = "";
	equalsOn = true;
  }
});

clearButton.addEventListener("click", function() {
  clear();
  refreshDisplay(0);
});
