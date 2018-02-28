
const allButtons = document.querySelectorAll('.btn');
const numberButtons = document.querySelectorAll('.btn--number');

function clickedNumber() {
  let currentNumber = this.textContent;

  document.getElementById('result').value += currentNumber;
}

Array.from(allButtons).forEach(btn => {
  btn.addEventListener('click', () => {
    const sound = new Audio();
    
    sound.src = "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/tink.wav";
    sound.play();
  });
});

Array.from(numberButtons).forEach(btn => {
  btn.addEventListener('click', clickedNumber);
});