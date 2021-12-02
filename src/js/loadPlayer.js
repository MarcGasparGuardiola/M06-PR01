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

let teams = getFavouritePlayers();
let team = null;

function removeFavouritePlayerFromList(id) {
    teams.list = teams.list.filter((playerElm) => playerElm.id !== id);
    saveList(teams.list);
    return teams.list;
}

async function load() {
    const dataToPass = {
        id: 144,
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
        team = response.response[0].player;
        console.log(team);
        playerImg.src = team.photo;
        playerName.innerText = `Player name: ${team.firstname}`;
        playerSurname.innerText = `Player lastname: ${team.lastname}`;
        playerAge.innerText = `Age: ${team.age}`;
    } else {
        console.log(error.join(' '));
    }

    console.log(response);
}

document.addEventListener('DOMContentLoaded', () => {
    load();
    

    if (teams.status === false) {
        teams = [];
    }
});

starPlayer.addEventListener('click', () => {
    console.log(team);
    if (starPlayer.innerText === 'star') {
        starPlayer.innerText = 'star_border';
        removeFavouritePlayerFromList(team.id);
    } else {
        starPlayer.innerText = 'star';
        console.log(teams);
        teams.list.push(team);
        saveList(teams.list);
    }
});

// async function request(url, verb) {
//     try {
//         const result = await fetch(url, {
//             method: verb,
//         });
//         const data = await result.json();
//         if (result.status !== 200) {
//             return false;
//         }
//         return data;
//     } catch (error) {
//         console.error(error.message);
//         return false;
//     }
// }