let randomNumber = Math.floor(Math.random() * 100) + 1;


const lastResult = document.querySelector('.lastResult');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const muteButton = document.querySelector('.mute');
const tries = document.querySelector('.tries');
let guessCount = 1;
let resetButton;
var mute = false;
var themeMusic;
var wrongSound;
var winnerSound;
var loseSound;


themeMusic = new sound ('./assets/sounds/theme.mp3');
wrongSound = new sound ('./assets/sounds/wrong.mp3');
winnerSound = new sound ('./assets/sounds/win.mp3');
loseSound = new sound ('./assets/sounds/lose.mp3');



function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }


 

  
themeMusic.sound.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
    }, 
    false);  


function muteOnOff(){

if (mute === false ){
        themeMusic.stop();
        mute = true;
        }
else {
        themeMusic.play();
        mute = false;
        }

}




themeMusic.play();
guessSubmit.addEventListener('click', checkGuess);
muteButton.addEventListener('click', muteOnOff);




function checkGuess() {

    let circle = document.querySelector('.circle');
    circle.remove();
    
    let userGuess = Number(guessField.value);
   
    if (userGuess === randomNumber) {
      lastResult.textContent = 'Wow! You got it right, lucky bastard!';
      themeMusic.stop();
      if (mute === false) winnerSound.play();
      setGameOver();
    } else if (guessCount === 10) {
      lastResult.textContent = '###!!! GAME OVER LOSER !!!###';
      themeMusic.stop();
      if (mute === false) loseSound.play();
      setGameOver();
    } else {
      
      
      if(userGuess < randomNumber) {
        if (mute === false) wrongSound.play();
        lastResult.textContent = 'Too low, idiot!';
        guessSubmit.value = 'Check again';

      } else if(userGuess > randomNumber) {
        if (mute === false) wrongSound.play();
        lastResult.textContent = 'Jerk, that is too high!';
        guessSubmit.value = 'Check again';

      }
    }
   
    guessCount++;
    guessField.value = '';
    guessField.focus();
  }





  function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
    
  }


  function resetGame() {

    
    for (j = 1; j < guessCount; j++) {
    lives = document.createElement('div');
    lives.className = 'circle';
    tries.appendChild(lives);
    }    

    if (mute === false) themeMusic.play();
    lastResult.textContent = 'Please guess a number:';
    guessCount = 1;
    guessSubmit.value = 'Check';
    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    randomNumber = Math.floor(Math.random() * 100) + 1;
  }