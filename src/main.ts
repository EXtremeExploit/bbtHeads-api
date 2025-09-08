import { router } from './route';
import { Env } from './types';

export default {
    async fetch(request, env, ctx) {
        // Construct the cache key from the cache URL
        const cache = caches.default;
        const cacheKey = new Request(request.url);

        // Check whether the value is already available in the cache
        // if not, you will need to fetch it from origin, and store it in the cache
        let cachedResponse = await cache.match(cacheKey);

        if (cachedResponse) {
            return cachedResponse;
        }

        const result = await router(env, request);

        if (result.cache) {
            result.response.headers.append("Cache-Control", `s-maxage=${result.cache}`);
            ctx.waitUntil(cache.put(cacheKey, result.response.clone()));
        }

        return result.response;
    },
} satisfies ExportedHandler<Env>;
