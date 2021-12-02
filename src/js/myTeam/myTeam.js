// import '../../myteam.html';

const itemHTML = `
    <tr draggable="true" data-toggle="modal" data-target="#playerModal">
        <td><img src="$$PLAYER_IMG$$" style="width: 75; height: 75px;"></td>
        <td>$$PLAYER_NAME$$</td>
        <td>$$PLAYER_LASTNAME$$</td>
        <td>$$PLAYER_POSITION$$</td>
        <td hidden>$$PLAYER_ID$$</td>
    </tr>
`;

const table = document.getElementById('tableBody');
const noPlayers = document.getElementById('noPlayers');
const playerModal = new bootstrap.Modal(document.getElementById('playerModal'), {
    keyboard: false,
})

function getFavouritePlayers() {
    try {
        const list = JSON.parse(localStorage.getItem('favouritePlayers'));
        console.log(list);
        if (!list) {
            return { status: false };
        }
        return { status: true, list };
    } catch (e) {
        console.log(e);
        return { status: false, error: e };
    }
}

const favouritePlayers = getFavouritePlayers();

document.addEventListener('DOMContentLoaded', () => {
    noPlayers.setAttribute('hidden', 'true');
    console.log(favouritePlayers);
    if (favouritePlayers.status === true && favouritePlayers.list) {
        favouritePlayers.list.forEach((player) => {
            let str = '';
            str = itemHTML.replace('$$PLAYER_ID$$', player.player.id);
            str = str.replace('$$PLAYER_NAME$$', player.player.firstname);
            str = str.replace('$$PLAYER_IMG$$', player.player.photo);
            str = str.replace('$$PLAYER_LASTNAME$$', player.player.lastname);
            str = str.replace('$$PLAYER_POSITION$$', player.statistics[0].games.position);
            console.log(str);
            table.insertAdjacentHTML('beforeEnd', str);
        });
    } else {
        noPlayers.removeAttribute('hidden');
    }
});
function setOpenModal() {
    const tbody = document.getElementsByTagName('tbody');

    [...tbody].forEach((element) => {
        element.addEventListener('click', (e) => {
            console.log('click');
            /*const closestTr = e.target.closest('tr');
            const email = closestTr.getElementsByTagName('td')[1].innerText;
            const user = loadUserInfo(email)[0];
            console.log(user);
            bigUsername.innerText = `user: ${user.username}`;
            smallUsername.innerText = `Username: ${user.username}`;
            modalEmail.innerText = `Email: ${user.email}`;
            modalPhone.innerText = `Phone: ${user.phone}`;*/
            playerModal.toggle();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setOpenModal();
});