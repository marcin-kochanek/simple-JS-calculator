let firstNumber, secondNumber, isFirst = true, operator, clickedNumber;
let outputValue = document.getElementById('result');
const allButtons = document.querySelectorAll('.btn');
const numberButtons = document.querySelectorAll('.btn--number');
const clearButton = document.querySelector('.btn--clear');
const dotButton = document.querySelector('.btn--dot');
const plusMinusButton = document.querySelector('.btn--plusminus');
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
  
  if (isFirst || outputValue.value == "0") {
    outputValue.value = clickedNumber;
    isFirst = false;
  } else {
    outputValue.value += clickedNumber;
    secondNumber = parseInt(outputValue.value);
    console.log(secondNumber, clickedNumber);
  }
}

function changeSign() {
  outputValue.value *= -1;
}

function calculateResult() {
  let result;
  secondNumber = parseFloat(outputValue.value); // ustawia second jako to co wyswietla, poprzedni wynik
  
  if (operator == '+') {
    result = firstNumber + secondNumber;
  }

  isFirst = true;
  firstNumber = result;
  outputValue.value = result;
  console.log(firstNumber, secondNumber, result, clickedNumber);
}

function operatorClick() {
  operator = this.value;

  firstNumber = parseInt(outputValue.value);
  console.log(firstNumber);
  isFirst = true;
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
resultButton.addEventListener('click', calculateResult);