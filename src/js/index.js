async function request(verb, url, data) {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    console.log('Sending data');
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open(verb, 'https://v3.football.api-sports.io/teams?country=Spain&league=140&season=2020');

    xhr.setRequestHeader('Authorization', null);
    xhr.setRequestHeader('x-rapidapi-key', 'ebfa151c4637db0f313a47b7489e3770');
    xhr.setRequestHeader('x-rapidapi-host', 'v3.football.api-sports.io');

    if (data) {
        console.log('Sending data');
        xhr.send();
    } else {
        xhr.send();
    }
}

async function load() {
    const dataToPass = {
        country: 'Spain',
        league: 140,
        season: 2020,
    };
    const data = await request('GET', 'https://v3.football.api-sports.io/teams', dataToPass);
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