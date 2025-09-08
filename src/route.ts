import { Env } from './types';

interface Route {
    name: string; // name of the route, just for tracking
    path: string; // path pattern for handler
    handler: (env: Env, req: Request, match: URLPatternResult) => Promise<Response>; // handler to handle request
    cache: number;
}

import getItems from './routes/getItems';
import index from './routes/index';
import ping from './routes/ping';

const routes: Route[] = [
    { name: 'getItems', path: '/getItems/:steamId', handler: getItems, cache: 0 },
    { name: 'index', path: '/', handler: index, cache: 600 },
    { name: 'ping', path: '/ping', handler: ping, cache: 0 },
];

export async function router(env: Env, req: Request) {
    for (const route of routes) {
        const reg = new URLPattern({ pathname: route.path })
        const match = reg.exec(req.url);
        if (match) {
            return {
                response: await route.handler(env, req, match),
                cache: route.cache
            };
        }
    }
    return { response: Response.json('404! Page Not Found!', { status: 404 }), cache: 600 };
}
