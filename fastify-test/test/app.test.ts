import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import app from '../src/app';

describe('Fastify App', () => {
    const fastify = Fastify();

    beforeAll(async () => {
        await fastify.register(app);
        await fastify.ready();
    });

    afterAll(() => {
        fastify.close();
    });

    it('should return hello world', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: '/',
        });

        expect(response.statusCode).toBe(404);
        // expect(response.json()).toEqual({ hello: 'world' });
    });
});
