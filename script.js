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

  console.log(firstNumber, secondNumber, result);
}

function showPercentage() {
  outputValue.value /= 100;
}

function changeSign() {
  secondNumber = outputValue.value *= -1;
  console.log(firstNumber, secondNumber, isFirst);
}

function calculateResult() {
  console.log(firstNumber, secondNumber, result);

  if (operator == '+') {
    result = firstNumber + secondNumber;
  } else if (operator == '-') {
    result = firstNumber - secondNumber;
  } else if (operator == '/' && !secondNumber == 0) {
    result = firstNumber/secondNumber;
  } else if (operator == '*') {
    result = firstNumber * secondNumber;
  } else {
    result = "Błąd";
  }
  console.log(firstNumber, secondNumber, result);

  firstNumber = result;
  outputValue.value = result;
  console.log(firstNumber, secondNumber, result);
  isFirst = true;
}

function operatorClick() {
  operator = this.value;

  firstNumber = parseFloat(outputValue.value);
  isFirst = true;
  console.log(firstNumber, secondNumber, result);
}

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
resultButton.addEventListener('click', calculateResult);