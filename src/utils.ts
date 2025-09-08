function GetLogDate() {
    const d = new Date();

    const year = d.getUTCFullYear();
    const month = (d.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = d.getUTCDate().toString().padStart(2, '0');
    const hours = d.getUTCHours().toString().padStart(2, '0');
    const mins = d.getUTCMinutes().toString().padStart(2, '0');
    const seconds = d.getUTCSeconds().toString().padStart(2, '0');
    const millis = d.getUTCMilliseconds().toString().padStart(3, '0');
    return `${year}/${month}/${day}@${hours}:${mins}:${seconds}.${millis}`;
}

export function LOG(txt: string) {
    console.log(`${GetLogDate()} | ${txt}`);
}

const BBT_APPID = 238460;

export async function requestItems(steamId: string) {
    const f = await fetch(`https://steamcommunity.com/inventory/${steamId}/${BBT_APPID}/2?l=english`, {
        method: 'GET',
        headers: {
            "User-Agent": "meow",
            "Content-Type": "application/json",
        }
    });
    const items = await f.json();
    return items;
}
