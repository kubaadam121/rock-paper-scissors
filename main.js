const options = document.getElementById('options');
const choiceTab = document.getElementById('choice-tab');
const gameTab = document.getElementById('game-tab');
const btnContinue = document.getElementById('btn-continue');
const endOfGameUI = document.getElementById('end-of-game');
let playerScore = 0;
let computerScore = 0;

// start game
function startGame(e) {
  if(!e.target.parentElement.classList.contains('option')) {
    return;
  }

  btnContinue.style.display = 'none';

  let playerChoice = playerChoiceFunction(e.target);
  let computerChoice = generateComputerChoice();

  displayGameScene(playerChoice, computerChoice);

  const roundResult = whoWonRound(playerChoice, computerChoice);

  if(roundResult === 'player') {
    playerScore++;
  } else if(roundResult === 'computer') {
    computerScore++;
  } else {
    playerScore++;
    computerScore++;
  }

  displayPoints(playerScore, computerScore);
  checkPotentialEndOfGame();
}

// player choice
function playerChoiceFunction(targetClass) {
  this.targetClass = targetClass;
  if(this.targetClass.classList.contains('rock'))       return 'rock';
  else if(this.targetClass.classList.contains('paper')) return 'paper';
  else                                                  return 'scissors';
}

// generate computer choice
function generateComputerChoice() {
  let random = Math.floor(Math.random() * 3) + 1;
  
  if(random === 1)      return 'rock';
  else if(random === 2) return 'paper';
  else                  return 'scissors';
}

// display game scene
function displayGameScene(player, computer) {
  choiceTab.style.display = 'none';
  gameTab.style.display = 'flex';
  btnContinue.style.display = 'block';
  
  gameTab.innerHTML = `
    <div>
      <img src="images/${player}.png" class="img">
    </div>
    <div>
      VS
    </div>
    <div>
      <img src="images/${computer}.png" class="img">
    </div>
  `;
}

// who won round
function whoWonRound(player, computer) {
  let result;
  if(player === computer) {
    result = 'draw';
    return result;
  }
  
  if(player === 'rock') {
    if(computer === 'paper') result = 'computer';
    else                     result = 'player'
  } else if(player === 'paper') {
    if(computer === 'rock') result = 'player'
    else                    result = 'computer';
  } else {
    if(computer === 'paper') result = 'player'
    else                     result = 'computer';
  }

  return result;
}

// display points
function displayPoints(player, computer) {
  const playerPointsUI = document.querySelector('.player-points');
  const playerPointsList = playerPointsUI.querySelectorAll('.point');
  
  for(let i = 0; i < player; i++) {
    playerPointsList[i].style.backgroundColor = '#1e81b0';
  }

  const computerPointsUI = document.querySelector('.computer-points');
  const computerPointsList = computerPointsUI.querySelectorAll('.point');
  
  for(let i = 0; i < computer; i++) {
    computerPointsList[i].style.backgroundColor = '#1e81b0';
  }
}

// check potential end of game
function checkPotentialEndOfGame() {
  if(playerScore < 3 && computerScore < 3)
    return;

  const finalMsg = document.getElementById('final-message');
  let msg;

  if(playerScore === computerScore) {
    msg = 'Draw, let\'s try again!';
  } else if(playerScore >= 3) {
    msg = 'You won, keep going!';
  } else {
    msg = 'You lost, let\'s try again!';
  }

  btnContinue.style.display = 'none';

  setTimeout(() => {
    endOfGameUI.style.display = 'flex';
    gameTab.style.display = 'none';
    finalMsg.textContent = msg;
  }, 2000);
}

// next round
function nextRound() {
  choiceTab.style.display = 'block';
  gameTab.style.display = 'none';
  btnContinue.style.display = 'none';
}

// event listeners
options.addEventListener('click', startGame);
btnContinue.addEventListener('click', nextRound);
endOfGameUI.addEventListener('click', () => {
    window.location.reload();
});