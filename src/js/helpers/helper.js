export function getList(list) {
    try {
        const data = JSON.parse(localStorage.getItem(list));
        if (!data) {
            return { status: false };
        }
        return { status: true, list: data };
    } catch (e) {
        console.log(e);
        return { status: false, error: e };
    }
}

export function removePlayerFromListById(list, id) {
    return list.filter((player) => player.player.id !== Number(id));
}

export function saveList(list, data) {
    try {
        localStorage.setItem(list, JSON.stringify(data));
    } catch (e) {
        window.alert(e.message);
    }
}

export function showAlert(text, toastAlert, toastList) {
    toastAlert.innerText = text;
    toastList[0].show();
}

export function removePlayerFromLocalStorageList(list, data, id) {
    const returnedData = removePlayerFromListById(data, id);
    saveList(list, returnedData);
    return returnedData;
}

export async function doRequest(url, params, verb, jsonResponse) {
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

        xhr.setRequestHeader('x-rapidapi-key', 'b8e3f84170115e163466d456511a18a5');
        xhr.setRequestHeader('x-rapidapi-host', 'v3.football.api-sports.io');

        xhr.send();
    });
}

export function checkPlayerIsInList(list, id) {
    return list.some((val) => val.player.id === Number(id));
}

export function removePlayerFromMyTeam(id) {
    const myTeam = getList('myTeam');
    removePlayerFromLocalStorageList('myTeam', myTeam.list, id);
}