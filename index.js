const btnElement = document.getElementById('btn');
const scoreBoard = document.querySelector('.score-board');

let playerList = [];

btnElement.addEventListener("click", () => {
  const firstName = document.querySelector('#firstname').value.trim();
  const lastName = document.querySelector('#lastname').value.trim();
  const country = document.querySelector('#country').value.trim();
  const score = parseFloat(document.querySelector('#score').value.trim());
  

  if (!firstName || !lastName || !country || country === "" || !score) {
    alert("Please fill out all fields with valid values!");
    return;
  }

  const parsedScore = parseInt(score);
  if (isNaN(parsedScore) || parsedScore < 0) {
    alert("Please enter a valid score!");
    return;
  }

  alert("Score added successfully!");

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  const playerObj = {};

  playerObj.name = firstName + ' ' + lastName;
  playerObj.country = country;
  playerObj.score = score;
  playerObj.date = formattedDate;
  playerObj.id = Date.now();

  playerList.push(playerObj);

  sortData();

  document.querySelector('#firstname').value = '';
  document.querySelector('#lastname').value = '';
  document.querySelector('#country').value = 'Select Country';
  document.querySelector('#score').value = '';
});

const sortData = () => {
  playerList.sort((a, b) => {
      return b.score - a.score;
  });

  scoreBoard.innerHTML = '';
  playerList.forEach((playerData) => {
    const name = playerData.name;
    const country = playerData.country;
    const playerScore = playerData.score;
    const playerDate = playerData.date;

    const playerDiv = document.createElement('div');
    playerDiv.classList.add('player-data');

    const nameTag = document.createElement('p');
    nameTag.setAttribute('class','name');
    const dateTag = document.createElement('p');
    dateTag.setAttribute('class', 'date');
    const countryTag = document.createElement('p');
    countryTag.setAttribute('class','country');
    const scoreTag = document.createElement('p');
    scoreTag.setAttribute('class','score');
    

    playerDiv.addEventListener("click", (event) => {
      const target = event.target;
      const action = target.getAttribute('action');
      if(action === 'delete') {
        scoreBoard.removeChild(playerDiv);
        playerList = playerList.filter(item => item.id !== playerData.id);
      } else if(action === 'increase') {
        increaseValue(playerData);
      } else if(action === 'decrease'){
        decreaseValue(playerData);
      }
    });

    const deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('action', 'delete');
    deleteIcon.classList.add('fa', 'fa-trash');
    deleteIcon.style.cursor = 'pointer';

    const increaseButton = document.createElement('button');
    increaseButton.setAttribute('action', 'increase');
    increaseButton.innerText = '+5';

    const decreaseButton = document.createElement('button');
    decreaseButton.setAttribute('action', 'decrease');
    decreaseButton.innerText = '-5';

    nameTag.innerText = name;
    countryTag.innerText = country;
    scoreTag.innerText = playerScore;
    dateTag.innerText = playerDate;
    
    playerDiv.appendChild(nameTag);
    playerDiv.appendChild(countryTag);
    playerDiv.appendChild(scoreTag);
    
    playerDiv.appendChild(deleteIcon);
    playerDiv.appendChild(increaseButton);
    playerDiv.appendChild(decreaseButton);
    playerDiv.appendChild(dateTag);

    scoreBoard.appendChild(playerDiv);
  });
}
const increaseValue = (playerData) => {
  playerData.score += 5;
  sortData();
}

const decreaseValue = (playerData) => {
  playerData.score -= 5;
  sortData();
}