import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { prisma } from "../lib/prisma"
import { ClientError } from "../errors/client-error"
import { env } from "../env"

export async function confirmTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/confirm",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async (req, reply) => {
      const { tripId } = req.params

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
        include: {
          participants: {
            where: {
              is_owner: false,
            },
          },
        },
      })

      if (!trip) throw new ClientError("Trip not found.")

      if (trip.is_confirmed)
        return reply.redirect(env.WEB_BASE_URL + "/trips/" + tripId)

      await prisma.trip.update({
        where: { id: tripId },
        data: { is_confirmed: true },
      })

      return reply.redirect(env.WEB_BASE_URL + "/trips/" + tripId)
    }
  )
}
