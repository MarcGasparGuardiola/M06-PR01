
async function request(url, verb) {
    try {
        const result = await fetch(url, {
            method: verb,
        });
        const data = await result.json();
        if (result.status !== 200) {
            return false;
        }
        return data;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}