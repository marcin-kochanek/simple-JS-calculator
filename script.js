const MAIN_MODULE = (function() {
  let firstNumber = 0, secondNumber = 0, isFirst = true, operator, clickedNumber, result = 0, number, integerPart, n, numberLength = 0, isNewAction = false, x, equalButton, isNumberClicked;
  const numberOfDisplayedFigures = 9;

  let outputValue = document.getElementById('resultBox');
  let outputNumbers = document.getElementById('resultNumbers');

  const getNumberLength = function(number) {
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
  };

  Math.decimal = function(result, k) {
    let factor;

    getNumberLength(result);
    
    if (integerPart <= numberOfDisplayedFigures && numberLength >= numberOfDisplayedFigures) {
      factor = Math.pow(10, k+1-integerPart);
      result = Math.round(Math.round((result)*factor)/10);
      return result/(factor/10);
    } else {
      return result;
    }
  };

  const clearFromZero = function(x) {
    const findE = x.search('e');
    const firstPart = parseFloat(x.substr(0, findE));
    const secondPart = x.substr(findE);
    
    return firstPart+secondPart;
  };

  const checkResult = function(result) {
    getNumberLength(result);

    if (integerPart >= 11 || /*(integerPart !== undefined &&*/ numberLength >= 11) {
      n = result.toExponential(4);
      result = clearFromZero(n);
    } else if (integerPart > 9 || /*(integerPart !== undefined &&*/ numberLength > 9) {
      n = result.toExponential(5);
      result = clearFromZero(n);
    } /*else {
      outputValue.value = result;
    }*/

    return result;
  };

  const  calculateResult = function() {
    if (operator == '+') {
      result = firstNumber + secondNumber;
    } else if (operator == '-') {
      result = firstNumber - secondNumber;
    } else if (operator == ':') {
      result = firstNumber / secondNumber;
    } else if (operator == '*') {
      result = firstNumber * secondNumber;
    } /*else {
      result = secondNumber;
    }*/

    result = Math.decimal(result, numberOfDisplayedFigures);

    if (isNaN(result) || !isFinite(result)) {
      result = "Error";
    }
  };

  const playSound = function(isOk) {
    const sound = new Audio();
    
    isOk ? (sound.src = "./tink.wav") : (sound.src = "./wrong.wav");
    sound.play();
  };

  const clearAll = function() {
    outputValue.value = 0;
    outputNumbers.value = 0;
    isFirst = true;
    firstNumber = 0;
    secondNumber = 0;
    result = 0;
    numberLength = 0;
    integerPart = 0;
  };

  const addDot = function() {
    if ((!outputValue.value.includes('.') && !isNaN(result) && (secondNumber.toString().length < numberOfDisplayedFigures) && !isFirst) || !isFinite(result)) {
      outputValue.value += '.';
    } else if ((result === "Error" || secondNumber === undefined || outputValue.value !== "0.") && isFirst) {
      outputValue.value = "0.";
    } else {
      playSound(false);
    }

    isFirst = false;
  };

  const clickNumber = function() {
    clickedNumber = this.value;

    if (isFirst || outputValue.value === "0") {
      outputValue.value = clickedNumber;
      secondNumber = parseFloat(outputValue.value);
      isFirst = false;
    } else if ((outputValue.value === "-0" && clickedNumber === "0")) {
      outputValue.value = "-0";
      secondNumber = parseFloat(outputValue.value);
      isFirst = false;
    } else if ((outputValue.value.length < numberOfDisplayedFigures && !outputValue.value.includes('.')) || ((outputValue.value.length - 1) < numberOfDisplayedFigures && outputValue.value.includes('.'))) {
      outputValue.value += clickedNumber;
      !outputValue.value.includes('.') ? outputValue.value = parseFloat(outputValue.value) : '';
      secondNumber = parseFloat(outputValue.value);
    } else {
      playSound(false);
    }

    calculateResult();
    isNumberClicked = true;
  };

  const showPercentage = function() {
    secondNumber = outputValue.value /= 100;

    calculateResult();
    result = checkResult(secondNumber);
    outputValue.value = result; // czy checkResult(result)
    isFirst = false;
  };

  const changeSign = function() {
    if (isNaN(secondNumber) || secondNumber == '0' || (!isNewAction && isFirst)) {
      secondNumber = outputValue.value = '-0';
      isFirst = false;
    } else if (isNewAction) {
      firstNumber *= -1;

      if (outputValue.value.charAt(0) === '-') {
        outputValue.value = outputValue.value.slice(1);
        outputNumbers.value = outputNumbers.value.slice(4);
      } else {
        outputValue.value = '-'.concat(outputValue.value);
        outputNumbers.value = '-1 *'.concat(outputNumbers.value);
      }
    } else {
      secondNumber *= -1;

      if (outputValue.value.charAt(0) === '-') {
        outputValue.value = outputValue.value.slice(1);
      } else {
        outputValue.value = '-'.concat(outputValue.value);
      }
    }

    checkResult(result);
    calculateResult();
  };

  const showResult = function() {
    equalButton = this.value;

    calculateResult();

    firstNumber = result;
    //outputValue.value = result;
    result = checkResult(result);
    outputValue.value = result;
    isFirst = true;
    isNewAction = true;

    showResultNumber();
    isNumberClicked = true;
  };

  const operatorClick = function() {
    showResultNumber();
    operator = this.value;

    if (result === 0 || isNewAction) {
      firstNumber = parseFloat(outputValue.value);
      isNewAction = false;
      outputNumbers.value = firstNumber;
    } else {
      firstNumber = result;
      result = checkResult(result);
      outputValue.value = result;
    }

    secondNumber = result;
    isFirst = true;
  };

  const showResultNumber = function() {
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
  };

  const bindEvents = function() {
    const allButtons = document.querySelectorAll('.btn');
    const numberButtons = document.querySelectorAll('.btn--number');
    const clearButton = document.querySelector('.btn--clear');
    const dotButton = document.querySelector('.btn--dot');
    const plusMinusButton = document.querySelector('.btn--plusminus');
    const percentageButton = document.querySelector('.btn--percentage');
    const operatorButtons = document.querySelectorAll('.btn--operator');
    const resultButton = document.querySelector('.btn--equals');

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
  };

  const init = function() {
    bindEvents();
  };

  return {
    init: init
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  MAIN_MODULE.init();
});