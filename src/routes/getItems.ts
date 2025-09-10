import { Env } from '../types';
import { requestItems } from '../utils';



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

    if (typeof match.pathname.groups == 'undefined' ||
        typeof match.pathname.groups.steamId == 'undefined' ||
        match.pathname.groups.steamId == null ||
        match.pathname.groups.steamId.length != 17 ||
        match.pathname.groups.steamId == "" ||
        match.pathname.groups.steamId == "0") {
        return Response.json('invalid steamId type', {
            status: 400,
            headers: {
                'content-type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }


    const steamId = BigInt(match.pathname.groups.steamId).toString();

    const items = await requestItems(steamId);

    return Response.json(items, {
        status: 200,
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        }
    });
}
