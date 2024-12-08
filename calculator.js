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

function round(num) {
  return Math.round(num * 100000)/100000;
}

function add(a,b) {
  return round(a + b);
}

function sub(a,b) {
  return round(a - b);
}

function mult(a,b) {
  return round(a * b);
}

function divide(a,b) {
  // It could be the first calculator in the world, which divide by 0 :)
  if (b == 0) return Math.floor(Math.random() * 2);
  return round(a / b);
}

function operate(a,b,op) {
  switch(op) {
	case '+': return add(a,b);
	case '-': return sub(a,b);
	case '*': return mult(a,b);
	case "/": return divide(a,b);
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

function addDigit(digit) {
  number = number.toString();
  if (equalsOn || number == "0") { // = reset number but no memory, on display is memory
	number = digit;
	equalsOn = false;
  } else if (number.length < 12) {
	number += digit;
  }
  refreshDisplay(number);
}

function addDot() {
  if (equalsOn || number == "0" || !number) {
	number = "0.";
	equalsOn = false;
  } else if (number && !number.includes(".")) {
	number += ".";
  }
  refreshDisplay(number);
}

function doOperation(operatorSymbol) {
  if (memory) {
	memory = operate(+memory, +number, operator); // use previous operator
	refreshDisplay(memory);
	operator = operatorSymbol; // now assign new operator
	number = "";
  } else {
	memory = number; // first operation
	operator = operatorSymbol;
	number = "";
  }
}

function makeResult() {
  if (memory) {
	memory = operate(+memory, +number, operator);
	console.log(memory);
	refreshDisplay(memory);
	number = String(memory);
	memory = "";
	operator = "";
	equalsOn = true; // this flag is important - = reset memory and operator, but last result is ready for next operation
  }
}

function doBackspace() {
  number = number.toString();
  if (number.length <= 1) { // 0 and not an empty display
	number = 0;
  } else {
	number = number.toString().slice(0,-1);
  }
  refreshDisplay(number);
}

numbers.forEach(btn => btn.addEventListener("click", () => addDigit(btn.id))); 

dotButton.addEventListener("click", addDot);

operators.forEach(btn => btn.addEventListener("click", () => doOperation(btn.id)));

equals.addEventListener("click", makeResult);

clearButton.addEventListener("click", function() {
  clear();
  refreshDisplay(0);
});

bckButton.addEventListener("click", doBackspace);

signButton.addEventListener("click", function() {
  number = -Number(number);
  refreshDisplay(number);
});

rndButton.addEventListener("click", function() {
  number = Math.ceil(Math.random() * Number(number)); // RND in DnD style, if you need 0 use -sign
  refreshDisplay(number);
});

// The keyboards events

document.addEventListener("keydown", function(event) {
  const keyName = event.key.toLowerCase();

  if (Number(keyName) >= 0 && Number(keyName) < 10 ) {
	addDigit(keyName);
  } else if (keyName == ".") {
	addDot();
  } else if (keyName == "_") {
	number = -Number(number);
	refreshDisplay(number);
  } else if (keyName == "c") {
	clear();
	refreshDisplay(0);
  } else if (keyName == "r") {
	number = Math.ceil(Math.random() * Number(number));
	refreshDisplay(number);
  } else if (keyName == "backspace") {
	doBackspace();
  } else if (keyName == "=" || keyName == "enter") {
	makeResult();
  } else if (keyName == "+" || keyName == "-" || keyName == "*" || keyName == "/") {
	doOperation(keyName);
  } else if (keyName =="?") {
	alert("Kazio XP \nAdvanced Calculator with eXtreme Power\n" +
	  "RND(r key): random number generator in DnD style\n" +
	  "+/-(_): + or - sign\n (\/) - division\n(*) - multiplication\n\n" +
	  "Warning: this calculator can make quantum calculations.\n" +
	  "Division by zero is possible. Results may be unpredictable.");
  }
});

console.log("press ? for help");
