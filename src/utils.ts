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

export function isSteamIdValid(id: string | null | undefined): boolean {
    if (!id) return false;
    if (id.length != 17) return false;

    return (/^\d{17}$/).test(id);
}
