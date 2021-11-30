// import '../../myteam.html';

const itemHTML = `
    <tr>
        <td>$$PLAYER_ID$$</td>
        <td>$$USER_MAIL$$<td>
        <td><a class="btn-floating waves-effect waves-light btn-small red remove-btn"><i class="material-icons">delete_forever</i></a></td>
    </tr>
`;

const table = document.getElementById('tableBody');

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

const favouritePlayers = getFavouritePlayers();

document.addEventListener('DOMContentLoaded', () => {
    if (favouritePlayers.status === true) {
        favouritePlayers.list.forEach((player) => {
            let str = '';
            str = itemHTML.replace('$$USER_ID$$', player.id);
            str = str.replace('$$USER_NAME$$', player.firstname);
            console.log(str);
            table.insertAdjacentHTML('beforeEnd', str);
        });
    }
});