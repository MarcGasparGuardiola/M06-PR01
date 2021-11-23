/* eslint-disable max-len */
/* eslint-disable prefer-template */
async function doRequest(url, params, verb, jsonResponse) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = (xhr.responseText && (xhr.responseText.length > 0)) ? xhr.responseText : true;
                if ((jsonResponse === undefined) || jsonResponse) {
                    response = JSON.parse(xhr.responseText);
                }
                return resolve(response);
            } if (xhr.readyState == 4) {
                var response = (xhr.responseText && (xhr.responseText.length > 0)) ? xhr.responseText : false;
                if ((jsonResponse === undefined) || jsonResponse) {
                    response = JSON.parse(xhr.responseText);
                }
                return reject(response);
            }
        });
        let finalUrl = url;
        if (verb === 'GET') {
            if (params) {
                const stringParams = Object.keys(params).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');

                if (stringParams.length > 0) {
                    finalUrl = url + '?' + stringParams;
                }
            }
        }
        xhr.open(verb, finalUrl);
        //xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.setRequestHeader("x-rapidapi-key", "ebfa151c4637db0f313a47b7489e3770");
        xhr.setRequestHeader("x-rapidapi-host", "v3.football.api-sports.io");
        if (verb === 'POST') {
            const data = JSON.stringify(params);
            xhr.send(data);
        } else {
            xhr.send();
        }
    });
}

async function load() {
    const dataToPass = {
        country: 'Spain',
        league: 140,
        season: 2020,
    };
    const data = await doRequest('https://v3.football.api-sports.io/teams', dataToPass, 'GET');
    console.log(data);
}

document.addEventListener('DOMContentLoaded', () => {
    load();
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