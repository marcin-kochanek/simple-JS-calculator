let firstNumber = 0, secondNumber = 0, isFirst = true, operator, clickedNumber, result = 0, number, integerPart, n, numberLength = 0, isNewAction = false, x, equalButton, isNumberClicked;
const numberOfDisplayedFigures = 9;

let outputValue = document.getElementById('resultBox');
let outputNumbers = document.getElementById('resultNumbers');
const allButtons = document.querySelectorAll('.btn');
const numberButtons = document.querySelectorAll('.btn--number');
const clearButton = document.querySelector('.btn--clear');
const dotButton = document.querySelector('.btn--dot');
const plusMinusButton = document.querySelector('.btn--plusminus');
const percentageButton = document.querySelector('.btn--percentage');
const operatorButtons = document.querySelectorAll('.btn--operator');
const resultButton = document.querySelector('.btn--equals');

function getNumberLength(number) {
  const stringifiedNumber = Math.abs(number).toString();

  numberLength = 0;

  Array.from(stringifiedNumber).map(figure => {  
    if (Number.isInteger(parseInt(figure))) {
      numberLength++;
      return numberLength;
    } else {
      integerPart = stringifiedNumber.indexOf(figure);
      return integerPart;
    }
  });
}

Math.decimal = function(result, k) {
  var factor;

  getNumberLength(result);
  
  if (integerPart < numberOfDisplayedFigures && numberLength >= numberOfDisplayedFigures) {
    factor = Math.pow(10, k+1-integerPart);
    result = Math.round(Math.round((result)*factor)/10);
    return result/(factor/10);
  } else {
    return result;
  }
};

function clearFromZero(x) {
  const findE = x.search('e');
  const firstPart = parseFloat(x.substr(0, findE));
  const secondPart = x.substr(findE);
  
  return firstPart+secondPart;
}

function checkResult(result) {
  getNumberLength(result);

  if (integerPart >= 10 || (integerPart == undefined && numberLength >= 10)) {
    n = result.toExponential(4);
    outputValue.value = clearFromZero(n);
  } else if (integerPart >= 9 || (integerPart == undefined && numberLength >= 9)) {
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
  } else if (operator == ':') {
    result = firstNumber / secondNumber;
  } else if (operator == '*') {
    result = firstNumber * secondNumber;
  } else {
    result = secondNumber;
  }

  result = Math.decimal(result, numberOfDisplayedFigures);

  if (isNaN(result) || !isFinite(result)) {
    result = "Error";
  }
}

function playSound(isOk) {
  const sound = new Audio();
  
  isOk ? (sound.src = "./tink.wav") : (sound.src = "./wrong.wav");
  sound.play();
}

function clearAll() {
  outputValue.value = 0;
  outputNumbers.value = 0;
  isFirst = true;
  firstNumber = 0;
  secondNumber = 0;
  result = 0;
  numberLength = 0;
  integerPart = 0;
}

function addDot() {
  if ((!outputValue.value.includes('.') && !isNaN(result) && (secondNumber.toString().length < numberOfDisplayedFigures) && !isFirst) || !isFinite(result)) {
    outputValue.value += '.';
  } else if ((result === "Error" || secondNumber === undefined || outputValue.value !== "0.") && isFirst/*isNewAction*/) {
    outputValue.value = "0.";
  } else {
    playSound(false);
  }

  isFirst = false;
}

function clickNumber() {
  clickedNumber = this.value;

  if (isFirst || outputValue.value === "0") {
    outputValue.value = clickedNumber;
    secondNumber = parseFloat(outputValue.value);
    isFirst = false;
  } else if ((outputValue.value === "-0" && clickedNumber === "0")) {
    outputValue.value = "-0";
    secondNumber = parseFloat(outputValue.value);
    isFirst = false;
  } else if (outputValue.value.length < numberOfDisplayedFigures) {
    outputValue.value += clickedNumber;
    !outputValue.value.includes('.') ? outputValue.value = parseFloat(outputValue.value) : '';
    secondNumber = parseFloat(outputValue.value);
  } else {
    playSound(false);
  }

  calculateResult();
  isNumberClicked = true;
}

function showPercentage() {
  secondNumber = outputValue.value /= 100;

  calculateResult();
  checkResult(secondNumber); // czy checkResult(result)
  isFirst = false;
}

function changeSign() {
  if (isNaN(secondNumber) || secondNumber == '0' || (!isNewAction && isFirst)) {
    secondNumber = outputValue.value = '-0';
    isFirst = false;
  } else {
    if (outputValue.value.charAt(0) === '-') {
      outputValue.value = outputValue.value.slice(1);
    } else {
      outputValue.value = '-'.concat(outputValue.value);
    }

    secondNumber = parseFloat(outputValue.value);
    calculateResult();
    checkResult(secondNumber);
  }
}

function showResult() {
  equalButton = this.value;
  calculateResult();

  firstNumber = result;
  outputValue.value = result;
  checkResult(result);
  isFirst = true;
  isNewAction = true;

  showResultNumber();
  isNumberClicked = true;
}

function operatorClick() {
  showResultNumber();
  operator = this.value;

  if (result === 0 || isNewAction) {
    firstNumber = parseFloat(outputValue.value);
    isNewAction = false;
    outputNumbers.value = firstNumber;
  } else {
    firstNumber = result;
    checkResult(result);
  }

  secondNumber = result;
  isFirst = true;
}

function showResultNumber() {
  const lastSign = [...outputNumbers.value][[...outputNumbers.value].length-1];

  if (isNumberClicked) {
    if (firstNumber === 0 || (equalButton === "=" && isNaN(lastSign))) {
      outputNumbers.value += ` ${secondNumber}`;
    } else if ((operator !== undefined && !isNaN(lastSign))) {
      outputNumbers.value += ` ${operator}`;
      outputNumbers.value += ` ${secondNumber}`;
    } else {
      outputNumbers.value += ` ${secondNumber}`;
      outputNumbers.value += ` ${operator}`;
    }
  }
  isNumberClicked = false;
}

// Nasłuchiwanie zdarzeń 'click'
Array.from(allButtons).forEach(btn => {
  btn.addEventListener('click', playSound, true);
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