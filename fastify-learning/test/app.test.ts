import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import app from '../src/app';

const getPath = (path: string) => 'http://localhost:3000/' + path

describe('Fastify App', () => {
    const fastify = Fastify();

    beforeAll(async () => {
        await fastify.register(app);
        await fastify.listen({ port: 3000 });
    });

    afterAll(() => {
        fastify.close();
    });

    it('should return hello world', async () => {
        const response = await fetch(getPath('/'))
        expect(await response.text()).toBe('Hello')
    });
});
