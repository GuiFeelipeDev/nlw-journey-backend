import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { prisma } from "../lib/prisma"
import { ClientError } from "../errors/client-error"

export async function createInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/invites",
    {
      schema: {
        body: z.object({
          email: z.string().email(),
        }),
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async (req, reply) => {
      const { email } = req.body
      const { tripId } = req.params

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
      })

      if (!trip) throw new ClientError("Could not find this trip.")

      const participant = await prisma.participant.create({
        data: {
          email,
          trip_id: tripId,
        },
      })

      return { participantId: participant.id }
    }
  )
}
