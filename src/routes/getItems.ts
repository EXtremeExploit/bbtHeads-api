import { Env } from '../types';
import { isSteamIdValid } from '../utils';

export default async function (_env: Env, req: Request, match: URLPatternResult) {
    if (req.method != 'GET') {
        return Response.json('Method not allowed', {
            status: 405,
            headers: {
                'content-type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    if (!isSteamIdValid(match.pathname.groups.steamId)) {
        return Response.json('invalid steamId type', {
            status: 400,
            headers: {
                'content-type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }


    const steamId = match.pathname.groups.steamId;

    const MAX_ITEMS = 2500;
    const BBT_APPID = 238460;
    const f = await fetch(`https://steamcommunity.com/inventory/${steamId}/${BBT_APPID}/2?l=english&count=${MAX_ITEMS}`, {
        method: 'GET',
        headers: {
            "User-Agent": "meow",
            "Content-Type": "application/json",
        }
    });
    const items = await f.json();

    return Response.json(items, {
        status: 200,
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        }
    });
}
