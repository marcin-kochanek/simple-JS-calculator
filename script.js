
let clickerButtons = document.querySelectorAll('.btn');

Array.from(clickerButtons).forEach(btn => {
  btn.addEventListener('click', function() {
    let sound = new Audio();
    
    sound.src = "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/tink.wav";
    sound.play();
  });
});