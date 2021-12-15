// import '../css/index.css';
import * as helperFunctions from './helpers/helper';

let selectedPlayer = null;
let playerAge = null;
let playerSurname = null;
let playerName = null;
let playerImg = null;
let favouritePlayers = null;

let starPlayer = null;

function loadDocument() {
    playerImg = document.getElementById('playerImg');
    playerName = document.getElementById('playerName');
    playerSurname = document.getElementById('playerSurname');
    playerAge = document.getElementById('playerAge');
    starPlayer = document.getElementById('starPLayer');

    favouritePlayers = helperFunctions.getList('favouritePlayers');
}

function setStarEvent() {
    starPlayer.addEventListener('click', () => {
        if (starPlayer.innerText === 'star') {
            starPlayer.innerText = 'star_border';
            favouritePlayers.list = helperFunctions.removePlayerFromLocalStorageList('favouritePlayers', favouritePlayers.list, selectedPlayer.player.id);
            helperFunctions.removePlayerFromMyTeam(favouritePlayers.list);
        } else {
            starPlayer.innerText = 'star';
            favouritePlayers.list.push(selectedPlayer);
            helperFunctions.saveList('favouritePlayers', favouritePlayers.list);
        }
    });
}

export default async function loadPlayer(playerId) {
    loadDocument();
    setStarEvent();

    const dataToPass = {
        id: playerId,
        league: 140,
        season: 2020,
    };
    // const response = await helperFunctions.doRequest('https://v3.football.api-sports.io/players', dataToPass, 'GET');
    const response = require('../json/Player.json');
    const { error } = response;

    // Si no errors
    if (error !== []) {
        starPlayer.removeAttribute('hidden');
        playerImg.src = '';
        playerName.innerText = '';
        playerSurname.innerText = '';
        playerAge.innerText = '';
        // Create player detail view
        const privatePlayer = response.response[0];
        selectedPlayer = privatePlayer;
        playerImg.src = selectedPlayer.player.photo;
        playerName.innerText = `Player name: ${selectedPlayer.player.firstname}`;
        playerSurname.innerText = `Player lastname: ${selectedPlayer.player.lastname}`;
        playerAge.innerText = `Age: ${selectedPlayer.player.age}`;

        console.log(favouritePlayers);
        if (helperFunctions.checkPlayerIsInList(favouritePlayers.list, selectedPlayer.player.id)) {
            starPlayer.innerText = 'star';
        } else {
            starPlayer.innerText = 'star_border';
        }
    } else {
        starPlayer.setAttribute('hidden', true);
        console.log(error.join(' '));
    }
}