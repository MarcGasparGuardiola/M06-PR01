// import '../css/index.css';

function saveList(list) {
    try {
        localStorage.setItem('favouritePlayers', JSON.stringify(list));
    } catch (e) {
        window.alert(e.message);
    }
}

function getFavouritePlayers() {
    try {
        const list = JSON.parse(localStorage.getItem('favouritePlayers'));
        console.log(list);
        if (!list) {
            return { status: false };
        }
        return { status: true, list };
    } catch (e) {
        return { status: false, error: e };
    }
}

/* eslint-disable max-len */
/* eslint-disable prefer-template */
async function doRequest(url, params, verb, jsonResponse) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let response = (xhr.responseText && (xhr.responseText.length > 0)) ? xhr.responseText : true;
                if ((jsonResponse === undefined) || jsonResponse) {
                    response = JSON.parse(xhr.responseText);
                }
                return resolve(response);
            } if (xhr.readyState === 4) {
                let response = (xhr.responseText && (xhr.responseText.length > 0)) ? xhr.responseText : false;
                if ((jsonResponse === undefined) || jsonResponse) {
                    response = JSON.parse(xhr.responseText);
                }
                return reject(response);
            }
        });
        let finalUrl = url;

        if (params) {
            const stringParams = Object.keys(params).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');

            if (stringParams.length > 0) {
                finalUrl = url + '?' + stringParams;
            }
        }

        xhr.open(verb, finalUrl);

        xhr.setRequestHeader('x-rapidapi-key', 'ebfa151c4637db0f313a47b7489e3770');
        xhr.setRequestHeader('x-rapidapi-host', 'v3.football.api-sports.io');

        xhr.send();
    });
}

const playerImg = document.getElementById('playerImg');
const playerName = document.getElementById('playerName');
const playerSurname = document.getElementById('playerSurname');
const playerAge = document.getElementById('playerAge');
const starPlayer = document.getElementById('starPLayer');

const favouritePlayers = getFavouritePlayers();
let selectedPlayer = null;

function removeFavouritePlayerFromList(id) {
    favouritePlayers.list = favouritePlayers.list.filter((playerElm) =>
    {
        console.log(playerElm);
        return playerElm.player.id !== id;
    });
    saveList(favouritePlayers.list);
    return favouritePlayers.list;
}

async function load() {
    const dataToPass = {
        id: 154,
        league: 140,
        season: 2020,
    };
    const response = await doRequest('https://v3.football.api-sports.io/players', dataToPass, 'GET');
    const { error } = response;

    console.log(response);
    // Si no errors
    if (error !== []) {
        playerImg.src = '';
        playerName.innerText = '';
        playerSurname.innerText = '';
        playerAge.innerText = '';
        // Create player detail view
        const privatePlayer = response.respone[0];
        selectedPlayer = privatePlayer;
        console.log(selectedPlayer.player);
        console.log(selectedPlayer.statics);
        playerImg.src = selectedPlayer.player.photo;
        playerName.innerText = `Player name: ${selectedPlayer.player.firstname}`;
        playerSurname.innerText = `Player lastname: ${selectedPlayer.player.lastname}`;
        playerAge.innerText = `Age: ${selectedPlayer.player.age}`;
    } else {
        console.log(error.join(' '));
    }

    console.log(response);
}

document.addEventListener('DOMContentLoaded', () => {
    load();
    

    if (favouritePlayers.status === false) {
        favouritePlayers.list = [];
    }
});

starPlayer.addEventListener('click', () => {
    console.log(selectedPlayer);
    if (starPlayer.innerText === 'star') {
        starPlayer.innerText = 'star_border';
        removeFavouritePlayerFromList(selectedPlayer.player.id);
    } else {
        starPlayer.innerText = 'star';
        console.log(favouritePlayers);
        favouritePlayers.list.push(selectedPlayer);
        saveList(favouritePlayers.list);
    }
});