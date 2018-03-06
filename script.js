let firstNumber, secondNumber, isFirst = true, operator, clickedNumber, result, number;

let outputValue = document.getElementById('resultBox');
const allButtons = document.querySelectorAll('.btn');
const numberButtons = document.querySelectorAll('.btn--number');
const clearButton = document.querySelector('.btn--clear');
const dotButton = document.querySelector('.btn--dot');
const plusMinusButton = document.querySelector('.btn--plusminus');
const percentageButton = document.querySelector('.btn--percentage');
const operatorButtons = document.querySelectorAll('.btn--operator');
const resultButton = document.querySelector('.btn--equals');

Math.decimal = function(n, k) {
  var factor = Math.pow(10, k+1);

  n = Math.round(Math.round(n*factor)/10);
  return n/(factor/10);
}

function calculateResult() {
  if (operator == '+') {
    result = firstNumber + secondNumber;
  } else if (operator == '-') {
    result = firstNumber - secondNumber;
  } else if (operator == '/' && !secondNumber == 0) {
    result = firstNumber / secondNumber;
  } else if (operator == '*') {
    result = firstNumber * secondNumber;
  } else if (isNaN(result)) {
    result = "Błąd";
  } else {
    result = "Błąd";
  }

  result = Math.decimal(result, 8);
}

function goodSound() {
  const sound = new Audio();
  
  sound.src = "./tink.wav";
  sound.play();
}

function wrongSound() {
  const sound = new Audio();
  
  sound.src = "./wrong.wav";
  sound.play();
}

function clearAll() {
  outputValue.value = 0;
  isFirst = true;
  firstNumber = 0;
  secondNumber = 0;
  result = 0;
}

function addDot() {
  if (!outputValue.value.includes('.')) {
    outputValue.value += '.';
  } else {
    wrongSound();
  }
}

function clickNumber() {
  clickedNumber = this.value;
  
  if (outputValue.value.length <= 8) {
    if (isFirst || outputValue.value == "0") {
      outputValue.value = clickedNumber;
      secondNumber = parseFloat(outputValue.value);
      isFirst = false;
    } else {
      outputValue.value += clickedNumber;
      secondNumber = parseFloat(outputValue.value);
    }
  } else {
    wrongSound();
  }

  calculateResult()
}

function showPercentage() {
  outputValue.value /= 100;
}

function changeSign() {
  secondNumber = outputValue.value *= -1;
  calculateResult()
}

function showResult() {
  calculateResult()

  firstNumber = result;
  outputValue.value = result;
  isFirst = true;
}

function operatorClick() {
  operator = this.value;

  if (isNaN(result) || result === 0) {
    firstNumber = parseFloat(outputValue.value);
  } else {
    firstNumber = result;
    outputValue.value = result;
  }
    
  secondNumber = undefined;
  isFirst = true;
}


// Nasłuchiwanie zdarzeń 'click'
Array.from(allButtons).forEach(btn => {
  btn.addEventListener('click', goodSound);
});

Array.from(numberButtons).forEach(btn => {
  btn.addEventListener('click', clickNumber);
});

Array.from(operatorButtons).forEach(btn => {
  btn.addEventListener('click', operatorClick);
});

clearButton.addEventListener('click', clearAll);
dotButton.addEventListener('click', addDot);
plusMinusButton.addEventListener('click', changeSign);
percentageButton.addEventListener('click', showPercentage);
resultButton.addEventListener('click', showResult);