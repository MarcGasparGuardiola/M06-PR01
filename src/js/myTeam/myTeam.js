// import '../../myteam.html';
import * as helperFunctions from '../helpers/helper';
import * as chartFunctions from './radarChart';

const playerRow = `
    <tr draggable="true" data-toggle="modal" data-target="#playerModal">
        <td><img src="$$PLAYER_IMG$$" style="width: 75; height: 75px;"></td>
        <td>$$PLAYER_NAME$$</td>
        <td>$$PLAYER_LASTNAME$$</td>
        <td>$$PLAYER_POSITION$$</td>
        <td><img src="$$CLUB_IMG$$" style="width: 35; height: 35px;"></td>
        <td hidden>$$PLAYER_ID$$</td>
    </tr>
`;

const playerCard = `
<div class="$$COL-CLASS$$" draggable="true" style="text-align: center;">
    <i class="bi bi-x"></i>
    <img src="$$PLAYER_IMG$$" style="width: 45px; height: 45px;">
    <p>$$PLAYER_NAME$$</p>
    <p hidden>$$PLAYER_ID$$</p>
</div>
`;

const table = document.getElementById('tableBody');
const noPlayers = document.getElementById('noPlayers');
const noData = document.getElementById('chartNoData');
const modalPlayerName = document.getElementById('playerModalTitle');
const modalPlayerImg = document.getElementById('modalPlayerImg');
const modalClubImg = document.getElementById('modalClubImg');

const playerModal = new bootstrap.Modal(document.getElementById('playerModal'), {
    keyboard: false,
});

let idDraged = 0;
const dropZone = document.getElementById('dropZone');
const myTeamTable = document.getElementById('myTeamTable');


let maxAttackers = 3;
let maxMidfielders = 1;
let maxDefenders = 4;
let maxGoalkepers = 1;

const toastAlert = document.getElementById('toastAlert');
const toastBody = document.getElementById('toastBody');

const mockPlayers = [{ "player": { "id": 154, "name": "L. Messi", "firstname": "Lionel Andrés", "lastname": "Messi Cuccittini", "age": 34, "birth": { "date": "1987-06-24", "place": "Rosario", "country": "Argentina" }, "nationality": "Argentina", "height": "170 cm", "weight": "72 kg", "injured": false, "photo": "https://media.api-sports.io/football/players/154.png" }, "statistics": [{ "team": { "id": 529, "name": "Barcelona", "logo": "https://media.api-sports.io/football/teams/529.png" }, "league": { "id": 140, "name": "La Liga", "country": "Spain", "logo": "https://media.api-sports.io/football/leagues/140.png", "flag": "https://media.api-sports.io/flags/es.svg", "season": 2020 }, "games": { "appearences": 35, "lineups": 33, "minutes": 3022, "number": null, "position": "Attacker", "rating": "8.342857", "captain": false }, "substitutes": { "in": 2, "out": 1, "bench": 2 }, "shots": { "total": 141, "on": 91 }, "goals": { "total": 30, "conceded": 0, "assists": 9, "saves": null }, "passes": { "total": 2246, "key": 81, "accuracy": 54 }, "tackles": { "total": 19, "blocks": null, "interceptions": 6 }, "duels": { "total": 501, "won": 286 }, "dribbles": { "attempts": 247, "success": 160, "past": null }, "fouls": { "drawn": 99, "committed": 22 }, "cards": { "yellow": 4, "yellowred": 0, "red": 0 }, "penalty": { "won": null, "commited": null, "scored": 3, "missed": 2, "saved": null } }] }, { "player": { "id": 144, "name": "Sergio Busquets", "firstname": "Sergio", "lastname": "Busquets i Burgos", "age": 33, "birth": { "date": "1988-07-16", "place": "Sabadell", "country": "Spain" }, "nationality": "Spain", "height": "189 cm", "weight": "76 kg", "injured": false, "photo": "https://media.api-sports.io/football/players/144.png" }, "statistics": [{ "team": { "id": 529, "name": "Barcelona", "logo": "https://media.api-sports.io/football/teams/529.png" }, "league": { "id": 140, "name": "La Liga", "country": "Spain", "logo": "https://media.api-sports.io/football/leagues/140.png", "flag": "https://media.api-sports.io/flags/es.svg", "season": 2020 }, "games": { "appearences": 36, "lineups": 32, "minutes": 2529, "number": null, "position": "Midfielder", "rating": "7.052777", "captain": false }, "substitutes": { "in": 4, "out": 19, "bench": 4 }, "shots": { "total": 2, "on": 1 }, "goals": { "total": 0, "conceded": 0, "assists": 5, "saves": null }, "passes": { "total": 2682, "key": 30, "accuracy": 68 }, "tackles": { "total": 63, "blocks": 4, "interceptions": 53 }, "duels": { "total": 313, "won": 171 }, "dribbles": { "attempts": 9, "success": 8, "past": null }, "fouls": { "drawn": 60, "committed": 45 }, "cards": { "yellow": 9, "yellowred": 0, "red": 0 }, "penalty": { "won": null, "commited": null, "scored": 0, "missed": 0, "saved": null } }] }, { "player": { "id": 143, "name": "Carles Aleñá", "firstname": "Carles", "lastname": "Aleña Castillo", "age": 23, "birth": { "date": "1998-01-05", "place": "Mataró", "country": "Spain" }, "nationality": "Spain", "height": "180 cm", "weight": "73 kg", "injured": false, "photo": "https://media.api-sports.io/football/players/143.png" }, "statistics": [{ "team": { "id": 546, "name": "Getafe", "logo": "https://media.api-sports.io/football/teams/546.png" }, "league": { "id": 140, "name": "La Liga", "country": "Spain", "logo": "https://media.api-sports.io/football/leagues/140.png", "flag": "https://media.api-sports.io/flags/es.svg", "season": 2020 }, "games": { "appearences": 22, "lineups": 15, "minutes": 1368, "number": null, "position": "Midfielder", "rating": "6.500000", "captain": false }, "substitutes": { "in": 7, "out": 9, "bench": 7 }, "shots": { "total": 1, "on": null }, "goals": { "total": 2, "conceded": 0, "assists": null, "saves": null }, "passes": { "total": 38, "key": null, "accuracy": 18 }, "tackles": { "total": 1, "blocks": null, "interceptions": null }, "duels": { "total": 8, "won": 1 }, "dribbles": { "attempts": null, "success": null, "past": null }, "fouls": { "drawn": null, "committed": 4 }, "cards": { "yellow": 1, "yellowred": 0, "red": 0 }, "penalty": { "won": null, "commited": null, "scored": 0, "missed": 0, "saved": null } }, { "team": { "id": 529, "name": "Barcelona", "logo": "https://media.api-sports.io/football/teams/529.png" }, "league": { "id": 140, "name": "La Liga", "country": "Spain", "logo": "https://media.api-sports.io/football/leagues/140.png", "flag": "https://media.api-sports.io/flags/es.svg", "season": 2020 }, "games": { "appearences": 2, "lineups": 0, "minutes": 46, "number": null, "position": "Midfielder", "rating": "6.500000", "captain": false }, "substitutes": { "in": 2, "out": 0, "bench": 16 }, "shots": { "total": 1, "on": null }, "goals": { "total": 0, "conceded": 0, "assists": null, "saves": null }, "passes": { "total": 38, "key": null, "accuracy": 18 }, "tackles": { "total": 1, "blocks": null, "interceptions": null }, "duels": { "total": 8, "won": 1 }, "dribbles": { "attempts": null, "success": null, "past": null }, "fouls": { "drawn": null, "committed": 4 }, "cards": { "yellow": 1, "yellowred": 0, "red": 0 }, "penalty": { "won": null, "commited": null, "scored": 0, "missed": 0, "saved": null } }] }, { "player": { "id": 196, "name": "R. Nolan", "firstname": "Ryan", "lastname": "Patrick Nolan", "age": 22, "birth": { "date": "1999-02-17", "place": "Limerick", "country": "Republic of Ireland" }, "nationality": "Republic of Ireland", "height": null, "weight": null, "injured": false, "photo": "https://media.api-sports.io/football/players/196.png" }, "statistics": [{ "team": { "id": 546, "name": "Getafe", "logo": "https://media.api-sports.io/football/teams/546.png" }, "league": { "id": 140, "name": "La Liga", "country": "Spain", "logo": "https://media.api-sports.io/football/leagues/140.png", "flag": "https://media.api-sports.io/flags/es.svg", "season": 2020 }, "games": { "appearences": 0, "lineups": 0, "minutes": 0, "number": null, "position": "Defender", "rating": null, "captain": false }, "substitutes": { "in": 0, "out": 0, "bench": 2 }, "shots": { "total": null, "on": null }, "goals": { "total": 0, "conceded": 0, "assists": null, "saves": null }, "passes": { "total": null, "key": null, "accuracy": null }, "tackles": { "total": null, "blocks": null, "interceptions": null }, "duels": { "total": null, "won": null }, "dribbles": { "attempts": null, "success": null, "past": null }, "fouls": { "drawn": null, "committed": null }, "cards": { "yellow": 0, "yellowred": 0, "red": 0 }, "penalty": { "won": null, "commited": null, "scored": 0, "missed": 0, "saved": null } }] }, { "player": { "id": 46754, "name": "Alberto Cifuentes Martínez", "firstname": "Alberto", "lastname": "Cifuentes Martínez", "age": 41, "birth": { "date": "1979-05-29", "place": "Albacete", "country": "Spain" }, "nationality": "Spain", "height": "189 cm", "weight": "80 kg", "injured": false, "photo": "https://media.api-sports.io/football/players/46754.png" }, "statistics": [{ "team": { "id": 724, "name": "Cadiz", "logo": "https://media.api-sports.io/football/teams/724.png" }, "league": { "id": 140, "name": "La Liga", "country": "Spain", "logo": "https://media.api-sports.io/football/leagues/140.png", "flag": "https://media.api-sports.io/flags/es.svg", "season": 2020 }, "games": { "appearences": 2, "lineups": 2, "minutes": 180, "number": null, "position": "Goalkeeper", "rating": "6.600000", "captain": false }, "substitutes": { "in": 0, "out": 0, "bench": 2 }, "shots": { "total": null, "on": null }, "goals": { "total": 0, "conceded": 0, "assists": null, "saves": 2 }, "passes": { "total": 65, "key": 1, "accuracy": 12 }, "tackles": { "total": null, "blocks": null, "interceptions": null }, "duels": { "total": 1, "won": 1 }, "dribbles": { "attempts": null, "success": null, "past": null }, "fouls": { "drawn": 1, "committed": null }, "cards": { "yellow": 0, "yellowred": 0, "red": 0 }, "penalty": { "won": null, "commited": null, "scored": 0, "missed": 0, "saved": 0 } }] }, { "player": { "id": 47193, "name": "L. Quezada", "firstname": "Luis Miguel", "lastname": "Quezada Sánchez", "age": 25, "birth": { "date": "1996-02-11", "place": "Madrid", "country": "Spain" }, "nationality": "Dominican Republic", "height": "171 cm", "weight": "66 kg", "injured": false, "photo": "https://media.api-sports.io/football/players/47193.png" }, "statistics": [{ "team": { "id": 724, "name": "Cadiz", "logo": "https://media.api-sports.io/football/teams/724.png" }, "league": { "id": 140, "name": "La Liga", "country": "Spain", "logo": "https://media.api-sports.io/football/leagues/140.png", "flag": "https://media.api-sports.io/flags/es.svg", "season": 2020 }, "games": { "appearences": 0, "lineups": 0, "minutes": 0, "number": null, "position": "Midfielder", "rating": null, "captain": false }, "substitutes": { "in": 0, "out": 0, "bench": 0 }, "shots": { "total": null, "on": null }, "goals": { "total": 0, "conceded": null, "assists": null, "saves": null }, "passes": { "total": null, "key": null, "accuracy": null }, "tackles": { "total": null, "blocks": null, "interceptions": null }, "duels": { "total": null, "won": null }, "dribbles": { "attempts": null, "success": null, "past": null }, "fouls": { "drawn": null, "committed": null }, "cards": { "yellow": 0, "yellowred": 0, "red": 0 }, "penalty": { "won": null, "commited": null, "scored": null, "missed": null, "saved": null } }] }]

function getFavouritePlayers() {
    return helperFunctions.getList('favouritePlayers')
}

//const favouritePlayers = getFavouritePlayers();
const favouritePlayers = { list: mockPlayers, status: true };
let myTeam = helperFunctions.getList('myTeam').list ? helperFunctions.getList('myTeam').list : [];

document.addEventListener('DOMContentLoaded', () => {
    noPlayers.setAttribute('hidden', 'true');
    if (favouritePlayers.status === true && favouritePlayers.list) {
        favouritePlayers.list.forEach((player) => {
            let str = '';
            str = playerRow.replace('$$PLAYER_ID$$', player.player.id);
            str = str.replace('$$PLAYER_NAME$$', player.player.firstname);
            str = str.replace('$$PLAYER_IMG$$', player.player.photo);
            str = str.replace('$$PLAYER_LASTNAME$$', player.player.lastname);
            str = str.replace('$$PLAYER_POSITION$$', player.statistics[player.statistics.length - 1].games.position);
            str = str.replace('$$CLUB_IMG$$', player.statistics[player.statistics.length - 1].team.logo)
            table.insertAdjacentHTML('beforeEnd', str);
        });
    } else {
        noPlayers.removeAttribute('hidden');
    }
});

function loadPlayerInfo(id) {
    return favouritePlayers.list.filter((player) => player.player.id === Number(id))[0];
}

function createPercentage(data, total) {
    return (data * 100) / total;
}

function createDataFromPlayerStatistics(statistics) {
    // statistics is an array of statistics but we only get first statistics
    // TODO: Check if this array can have more than one element
    const playerStatistics = statistics[0];

    const shots = createPercentage(playerStatistics.shots.on, playerStatistics.shots.total);
    const passes = playerStatistics.passes.accuracy;
    const keyPasses = createPercentage(playerStatistics.passes.key, playerStatistics.passes.total);
    const wonDuels = createPercentage(playerStatistics.duels.won, playerStatistics.duels.total);
    const dribbles = createPercentage(playerStatistics.dribbles.success, playerStatistics.dribbles.attempts);

    return [shots, passes, keyPasses, wonDuels, dribbles];
}

function setOpenModal() {
    const tbody = document.getElementsByTagName('tbody');
    noData.setAttribute('hidden', 'true');

    [...tbody].forEach((element) => {
        element.addEventListener('click', (e) => {
            chartFunctions.destroyChart();
            const closestTr = e.target.closest('tr');
            const id = closestTr.getElementsByTagName('td')[5].innerText;
            const player = loadPlayerInfo(id);
            const data = createDataFromPlayerStatistics(player.statistics);
            if (data.every((val, i, arr) => (val === undefined || isNaN(val) || val === null))) {
                noData.removeAttribute('hidden');
            } else {
                chartFunctions.createRadarChart(data);
            }
            modalPlayerName.innerText = player.player.name;
            modalPlayerImg.src = player.player.photo;
            modalClubImg.src = player.statistics[player.statistics.length - 1].team.logo;

            playerModal.toggle();
        });

        element.addEventListener('dragstart', (e) => {
            //e.preventDefault();
            console.log("Drag started");
            const closestTr = e.target.closest('tr');
            const id = closestTr.getElementsByTagName('td')[5].innerText;
            idDraged = id;
            console.log(idDraged);
            event.dataTransfer.setData("Text", event.target.id);
        })
    });
}



dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'red';
})
dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'black';
})

function checkNumberOfPlayers() {
    return myTeam.length < 11;
}

function checkPositionOfPlayer(position) {
    const numberOfPlayersInPosition = myTeam.filter((player) => player.statistics[player.statistics.length - 1].games.position === position).length

    switch (position) {
        case 'Attacker':
            return numberOfPlayersInPosition < maxAttackers;
            break;
        case 'Midfielder':
            return numberOfPlayersInPosition < maxMidfielders;
            break;
        case 'Defender':
            return numberOfPlayersInPosition < maxDefenders;
            break;
        case 'Goalkeeper':
            return numberOfPlayersInPosition < maxGoalkepers;
            break;
        default:
            return false;
            break;
    }
}


dropZone.addEventListener('drop', (e) => {
    //console.log(idDraged);
    e.preventDefault();

    if (!checkNumberOfPlayers()) {
        helperFunctions.showAlert('ERROR: You have the max number of players in the team', toastBody, toastList);
        return;
    }

    const player = loadPlayerInfo(idDraged);

    if (!checkPositionOfPlayer(player.statistics[player.statistics.length - 1].games.position)) {
        helperFunctions.showAlert(`ERROR: Max number of ${player.statistics[player.statistics.length - 1].games.position}s reached`, toastBody, toastList);
        return;
    }

    let str = '';
    str = playerCard.replace('$$PLAYER_ID$$', player.player.id);
    str = str.replace('$$PLAYER_NAME$$', player.player.name);
    str = str.replace('$$PLAYER_IMG$$', player.player.photo);

    // TODO Change class in function of position of player and lineup
    str = str.replace('$$COL-CLASS$$', 'col-3');
    const closestDiv = e.target.closest('div');
    if (!helperFunctions.checkPlayerIsInList(myTeam, player.player.id)) {
        myTeam.push(player);
        console.log(myTeam);
        //Save player to myTeam localStorage
        helperFunctions.saveList('myTeam', myTeam);
        closestDiv.insertAdjacentHTML('beforeEnd', str);
    } else {
        helperFunctions.showAlert('ERROR: This player is already in the team', toastBody, toastList);
    }
    dropZone.style.borderColor = 'black';
    idDraged = 0;
})

dropZone.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.matches('div *')) { 
        const closestDiv = e.target.closest('div');
        const id = closestDiv.getElementsByTagName('p')[1].innerText;
        console.log(id);
        myTeam = helperFunctions.removePlayerFromListById(myTeam ,id);
        console.log(myTeam);
        helperFunctions.saveList('myTeam', myTeam);
        const parentDiv = closestDiv.parentElement;
        parentDiv.removeChild(closestDiv);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    setOpenModal();
});

let toastElList = [].slice.call(document.querySelectorAll('.toast'))
let toastList = toastElList.map(function (toastEl) {
  return new bootstrap.Toast(toastEl)
})



