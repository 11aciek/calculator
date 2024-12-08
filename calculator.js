const numbers = Array.from(document.querySelectorAll(".number"));
const display = document.querySelector(".display");
const operators = Array.from(document.querySelectorAll(".operator"));
const equals = document.querySelector("#equals");
const clearButton = document.querySelector("#C");
const dotButton = document.querySelector("#dot");
const bckButton = document.querySelector("#BCK");
const signButton = document.querySelector("#sign");
const rndButton = document.querySelector("#RND");

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
  // It could be the first calculator in the world, which divide by 0 :)
  if (b == 0) return Math.floor(Math.random() * 2);
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
  content = content.toString();
  // There could be better way for this. The display has only 12 places.
  if (Number(content) > 999999999999 || Number(content) < -99999999999) {
	content = "No memory!!";
	clear();
  } else if (content.length > 12) {
	// If number is between 9*10^12 and -9*10^11 and still has 12 places it has to be decimal
	content = content.slice(0,11);
  }
	number = content;
	display.textContent = content;
}

numbers.forEach(btn => btn.addEventListener("click", function() {
  number = number.toString();
  if (equalsOn || number == "0") { // = reset number but no memory, on display is memory
	number = btn.id;
	equalsOn = false;
  } else if (number.length < 12) {
	number += btn.id;
  }
  refreshDisplay(number);
}));


dotButton.addEventListener("click", function() {
  if (equalsOn || number == "0") {
	number = "0.";
	equalsOn = false;
  } else if (number && !number.includes(".")) {
	number += ".";
  }
  refreshDisplay(number);
});

operators.forEach(btn => btn.addEventListener("click", function() {
  if (memory) {
	memory = operate(+memory, +number, operator); // use previous operator
	refreshDisplay(memory);
	operator = btn.id; // now assign new operator
	number = "";
  } else {
	memory = number; // first operation
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
	equalsOn = true; // this flag is important - = reset memory and operator, but last result is ready for next operation
  }
});

clearButton.addEventListener("click", function() {
  clear();
  refreshDisplay(0);
});

bckButton.addEventListener("click", function() {
  number = number.toString();
  if (number.length == 1) { // 0 and not an empty display
	number = 0;
  } else {
	number = number.toString().slice(0,-1);
  }
  refreshDisplay(number);
});

signButton.addEventListener("click", function() {
  number = -Number(number);
  refreshDisplay(number);
});

rndButton.addEventListener("click", function() {
  number = Math.ceil(Math.random() * Number(number)); // RND in DnD style, if you need 0 use -sign
  refreshDisplay(number);
});
