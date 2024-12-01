const numbers = Array.from(document.querySelectorAll(".number"));
const display = document.querySelector(".display");
const operators = Array.from(document.querySelectorAll(".operator"));
const equals = document.querySelector("#equals");
const clear = document.querySelector("#C");
let number = "";
let memory;
let operator = "";

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
	display.textContent = content;
  }

numbers.forEach(btn => btn.addEventListener("click", function() {
  if (number.length < 12) {
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
	memory = "";
	number = "";
	operator = "";
  }
});

clear.addEventListener("click", function() {
  memory = "";
  number = "";
  operator = "";
  refreshDisplay(0);
});
