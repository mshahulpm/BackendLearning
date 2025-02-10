import { FastifyPluginAsync } from "fastify"
import { BadRequest } from "../../errors/badrequest.js"

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return 'this is an example'
  })

  fastify.get('/error', async function (request, reply) {
    throw new BadRequest('fastify error test')
  })

  fastify.post('/',
    {
      schema: {
        body: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', minimum: 5, maxLength: 10 },
            place: { type: ['string',], minimum: 5, maxLength: 10 },
          }
        }
      }
    },
    (req, reply) => {
      reply.status(201).send({ body: req.body })
    }
  )
}

export default example;
