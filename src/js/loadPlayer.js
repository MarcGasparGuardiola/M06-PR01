// import '../css/index.css';
import * as helperFunctions from './helpers/helper';

const playerImg = document.getElementById('playerImg');
const playerName = document.getElementById('playerName');
const playerSurname = document.getElementById('playerSurname');
const playerAge = document.getElementById('playerAge');
const starPlayer = document.getElementById('starPLayer');

const favouritePlayers = helperFunctions.getList('favouritePlayers');
let selectedPlayer = null;

async function load() {
    const dataToPass = {
        id: 47193,
        league: 140,
        season: 2020,
    };
    const response = await helperFunctions.doRequest('https://v3.football.api-sports.io/players', dataToPass, 'GET');
    const { error } = response;

    // Si no errors
    if (error !== []) {
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
        console.log(error.join(' '));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    load();

    if (favouritePlayers.status === false) {
        favouritePlayers.list = [];
    }
});

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