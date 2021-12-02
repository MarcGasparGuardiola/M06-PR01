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

const itemHTML = `
    <tr>
        <td style="align-text: center">$$TEAM_NAME$$</td>
        <td><img src="$$TEAM_LOGO$$" style="width: 125px; height: 125px"></td>
    </tr>
`;

const table = document.getElementById('tableBody');
let team = null;

async function load() {
    const dataToPass = {
        country: "Spain",
        league: 140,
        season: 2020,
    };
    const response = await doRequest('https://v3.football.api-sports.io/teams', dataToPass, 'GET');
    const { error } = response;

    console.log(response);
    // Si no errors
    if (error !== []) {
        
        response.response.forEach((team) => {
            let str = '';
            str = itemHTML.replace('$$TEAM_NAME$$', team.team.name);
            str = str.replace('$$TEAM_LOGO$$', team.team.logo);
            table.insertAdjacentHTML('beforeEnd', str);
        });
        
    } else {
        console.log(error.join(' '));
    }

    console.log(response);
}

document.addEventListener('DOMContentLoaded', () => {
    load();
});