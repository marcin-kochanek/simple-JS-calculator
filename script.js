let firstNumber = 0, secondNumber = 0, isFirst = true, operator, clickedNumber, result = 0, number, integerPart, n, resultLength = 0;
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
  function getResultLength(result) {
    let stringifiedResult = Math.abs(result).toString(),
        isNegative = 0;

    resultLength = 0;

    console.log(stringifiedResult);

    Array.from(stringifiedResult).map(figure => {  
      if (Number.isInteger(parseInt(figure))) {
        resultLength++;
        return resultLength;
      } else {
        integerPart = stringifiedResult.indexOf(figure);
        return integerPart;
      }
    });
    console.log(resultLength);
  }

  Math.decimal = function(result, k) {
    var factor;
  
    getResultLength(result);
    
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

function getResultLength(result) {
  let stringifiedResult = result.toString(),
      resultLength = 0, isNegative = 0;
  
  Array.from(stringifiedResult).map(figure => {  
    if (Number.isInteger(parseInt(figure))) {
      resultLength++;
    } else if (figure === '-') {
      isNegative = -1;
    } else if (figure === '.') {
      integerPart = stringifiedResult.indexOf(figure) + isNegative;
    }
  });
}

Math.decimal = function(result, k) {
  var factor;
 
  getResultLength(result);
  
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
function checkResult(result) {
  getResultLength(result);

  if ((integerPart || resultLength) >= 11) {
    n = result.toExponential(4);
    outputValue.value = n;
  } else if ((integerPart || resultLength) == 10) {
    n = result.toExponential(5);
    outputValue.value = n;
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
  resultLength = 0;
}

function addDot() {
  console.log(result);

  if ((!outputValue.value.includes('.') && !isNaN(result) && secondNumber.toString().length < numberOfDisplayedFigures) || !isFinite(result)) {
    outputValue.value += '.';
    console.log(firstNumber, secondNumber, result);
  } else if ((result == "Error" || secondNumber == undefined) && (outputValue.value !== "0.")) {
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
      outputValue.value = parseFloat(outputValue.value);
      secondNumber = parseFloat(outputValue.value);
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
  checkResult(result);
}

function changeSign() {
  if (isNaN(secondNumber) || secondNumber == '0') {
    secondNumber = outputValue.value = '-0';
  } else {
    secondNumber = outputValue.value *= -1;
    result *= -1;
    checkResult(secondNumber);
  }

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
}

function operatorClick() {
  operator = this.value;

  if (result === 0) {
    firstNumber = parseFloat(outputValue.value);
  } else {
    firstNumber = result;
    outputValue.value = result;
    checkResult(result);
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