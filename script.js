let firstNumber = 0, secondNumber = 0, isFirst = true, operator, clickedNumber, result = 0, number, integerPart, n, numberLength = 0, isNewAction = false, x;

const numberOfDisplayedFigures = 9;

let outputValue = document.getElementById('resultBox');
const allButtons = document.querySelectorAll('.btn');
const numberButtons = document.querySelectorAll('.btn--number');
const clearButton = document.querySelector('.btn--clear');
const dotButton = document.querySelector('.btn--dot');
const plusMinusButton = document.querySelector('.btn--plusminus');
const percentageButton = document.querySelector('.btn--percentage');
const operatorButtons = document.querySelectorAll('.btn--operator');
const resultButton = document.querySelector('.btn--equals');


//TODO: DLA DUŻYCH LICZBA POKAŻ LITERĘ EULERA Math.exp(1);
function getNumberLength(number) {
  const stringifiedNumber = Math.abs(number).toString(),
      isNegative = 0;

  numberLength = 0;

  console.log(stringifiedNumber);

  Array.from(stringifiedNumber).map(figure => {  
    if (Number.isInteger(parseInt(figure))) {
      numberLength++;
      return numberLength;
    } else {
      integerPart = stringifiedNumber.indexOf(figure);
      return integerPart;
    }
  });
  console.log(numberLength);
}

Math.decimal = function(result, k) {
  var factor;

  getNumberLength(result);
  
  if (integerPart < numberOfDisplayedFigures) {
    factor = Math.pow(10, k+1-integerPart);  
    result = Math.round(Math.round(result*factor)/10);
    return result/(factor/10);
  } else {
    return result;
  }
};

/*
var result = 12345678.875728688, integerPart;

function getNumberLength(result) {
  let stringifiedNumber = result.toString(),
      numberLength = 0, isNegative = 0;
  
  Array.from(stringifiedNumber).map(figure => {  
    if (Number.isInteger(parseInt(figure))) {
      numberLength++;
    } else if (figure === '-') {
      isNegative = -1;
    } else if (figure === '.') {
      integerPart = stringifiedNumber.indexOf(figure) + isNegative;
    }
  });
}

Math.decimal = function(result, k) {
  var factor;
 
  getNumberLength(result);
  
  if (integerPart <= 8) {
    factor = Math.pow(10, k+1-integerPart);  
    result = Math.round(Math.round(result*factor)/10);
    return result/(factor/10);
  } else {
    return result;
  }
};

console.log(Math.decimal(result, 8));

//isNumber = Number.isInteger(result.toString()[i]);
*/

function clearFromZero(x) {
  const findE = x.search('e');
  const firstPart = parseFloat(x.substr(0, findE));
  const secondPart = x.substr(findE);
  
  return firstPart+secondPart;
}

function checkResult(result) {
  getNumberLength(result);

  if (integerPart >= 11 || numberLength >= 11) {
    n = result.toExponential(4);
    outputValue.value = clearFromZero(n);
  } else if (integerPart >= 9 || numberLength >= 9) {
    n = result.toExponential(5);
    outputValue.value = clearFromZero(n);
  } else {
    outputValue.value = result;
  }
}

function calculateResult() {
  if (operator == '+') {
    result = firstNumber + secondNumber;
  } else if (operator == '-') {
    result = firstNumber - secondNumber;
  } else if (operator == '/') {
    result = firstNumber / secondNumber;
    console.log(firstNumber, secondNumber, result);
  } else if (operator == '*') {
    result = firstNumber * secondNumber;
  }

  result = Math.decimal(result, numberOfDisplayedFigures);
  console.log(result);

  if (isNaN(result) || !isFinite(result)) {
    result = "Error";
    console.log(result);
  }
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
  numberLength = 0;
  integerPart = 0;
}

function addDot() {
  console.log(result);

  if ((!outputValue.value.includes('.') && !isNaN(result) && secondNumber.toString().length < numberOfDisplayedFigures && isNewAction === false)|| !isFinite(result)) {
    outputValue.value += '.';
    console.log(firstNumber, secondNumber, result);
  } else if ((result === "Error" || secondNumber === undefined) && (outputValue.value !== "0.") || isNewAction === true) {
    outputValue.value = "0.";
  } else {
    wrongSound();
  }

  isFirst = false;
  console.log(result);
}

function clickNumber() {
  clickedNumber = this.value;
  
  if (isFirst || outputValue.value == "0") {
    outputValue.value = clickedNumber;
    secondNumber = parseFloat(outputValue.value);
    isFirst = false;
  } else if (outputValue.value.length < numberOfDisplayedFigures) {
    console.log(outputValue.value, secondNumber, clickedNumber);
    outputValue.value += clickedNumber;
    console.log(outputValue.value, secondNumber, clickedNumber);
    //outputValue.value = parseFloat(outputValue.value); niepotrzebne? przez ten zapis nie wyświetla liczb typu 9.03
    secondNumber = parseFloat(outputValue.value);
    console.log(outputValue.value, secondNumber, clickedNumber);
  } else {
    wrongSound();
  }

  calculateResult();
}

function showPercentage() {
  /*if (isNaN(secondNumber)) {
    secondNumber = outputValue.value = "Error";
  } else {*/
    secondNumber = outputValue.value /= 100;

  calculateResult();
}

function changeSign() {
  if (isNaN(secondNumber) || secondNumber == '0') {
    secondNumber = outputValue.value = '-0';
  } else {
    calculateResult();
    secondNumber = outputValue.value *= -1;
    result *= -1;
    checkResult(secondNumber);
  }

  //checkResult(result);
  //isFirst = false;

  // zastosowanie metody toString, aby wyświetlić liczbę z minusem
  //secondNumber = secondNumber.toString();
}

function showResult() {
  calculateResult();

  firstNumber = result;
  outputValue.value = result;
  console.log(outputValue.value, result);
  isFirst = true;
  checkResult(result);
  isNewAction = true;
}

function operatorClick() {
  operator = this.value;

  if (result === 0 || isNewAction == true) {
    firstNumber = parseFloat(outputValue.value);
    isNewAction = false;
  } else {
    firstNumber = result;
    outputValue.value = result;
    //checkResult(result);
  }
  
  //secondNumber = undefined; // potrzebne?
  secondNumber = result;
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