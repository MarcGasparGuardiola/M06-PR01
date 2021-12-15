import loadPlayer from './loadPlayer';

require('../css/teams.css');

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

        xhr.setRequestHeader('x-rapidapi-key', '849bc3ae6284787a953923c8e908e38a');
        xhr.setRequestHeader('x-rapidapi-host', 'v3.football.api-sports.io');

        xhr.send();
    });
}

const itemTeam = `
    <tr class="team row">
        <td hidden>$$TEAM_ID$$</td>
        <td class="col-4" style="align-text: center">$$TEAM_NAME$$</td>
        <td class="col-8 logoCol"><img src="$$TEAM_LOGO$$" style="width: 100px; height: 100px"></td>
    </tr>
`;

const itemPlayer = `
    <tr class="player row">
        <td hidden>$$PLAYER_ID$$</td>
        <td class="col-4" style="align-text: center">$$PLAYER_NAME$$</td>
        <td class="col-8 logoCol"><img src="$$PLAYER_IMG$$" style="width: 125px; height: 125px"></td>
    </tr>
`;

const tableTeams = document.getElementById('tableTeams');
const tablePlayers = document.getElementById('tablePlayers');
const tablePlayerHead = document.getElementById('tablePlayersHead');

async function loadPlayersFromTeam(teamId) {
    const dataToPass = {
        team: teamId,
        league: 140,
        season: 2020,
    };
    // const response = await doRequest('https://v3.football.api-sports.io/players', dataToPass, 'GET');
    const response = require('../json/Players.json');
    const { error } = response;

    console.log(response);
    // Si no errors
    if (error !== []) {
        tablePlayerHead.removeAttribute('hidden');
        response.response.forEach((player) => {
            console.log('player');
            let str = '';
            str = itemPlayer.replace('$$PLAYER_NAME$$', player.player.name);
            str = str.replace('$$PLAYER_ID$$', player.player.id);
            str = str.replace('$$PLAYER_IMG$$', player.player.photo);
            tablePlayers.insertAdjacentHTML('beforeEnd', str);
        });

        const playerRow = document.getElementById('tablePlayers');
        playerRow.addEventListener('click', (e) => {
            const closestTeam = e.target.closest('tr');
            const playerId = closestTeam.getElementsByTagName('td')[0].innerText;
            loadPlayer(playerId);
        });
    } else {
        console.log(error.join(' '));
    }

    console.log(response);
}

async function load() {
    const dataToPass = {
        country: 'Spain',
        league: 140,
        season: 2020,
    };
    // const response = await doRequest('https://v3.football.api-sports.io/teams', dataToPass, 'GET');
    const response = require('../json/Teams.json');
    const { error } = response;

    console.log(response);
    // Si no errors
    if (error !== []) {
        response.response.forEach((team) => {
            let str = '';
            str = itemTeam.replace('$$TEAM_NAME$$', team.team.name);
            str = str.replace('$$TEAM_ID$$', team.team.id)
            str = str.replace('$$TEAM_LOGO$$', team.team.logo);
            tableTeams.insertAdjacentHTML('beforeEnd', str);
        });

        const teamRow = document.getElementById('teams');
        teamRow.addEventListener('click', (e) => {
            const closestTeam = e.target.closest('tr');
            const teamId = closestTeam.getElementsByTagName('td')[0].innerText;
            loadPlayersFromTeam(teamId);
        });
    } else {
        console.log(error.join(' '));
    }

    console.log(response);
}

document.addEventListener('DOMContentLoaded', () => {
    load();
    tablePlayerHead.setAttribute('hidden', true);
});