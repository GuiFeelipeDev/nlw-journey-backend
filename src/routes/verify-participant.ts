import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { prisma } from "../lib/prisma"
import { ClientError } from "../errors/client-error"
import { env } from "../env"

export async function verifyParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/participants/:tripId/verify",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          email: z.string().email(),
        }),
      },
    },
    async (req, reply) => {
      const { tripId } = req.params
      const { email } = req.body

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
        include: {
          participants: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      })

      if (!trip) throw new ClientError("Could not find a trip with this ID.")

      const participantExistsOnTrip = trip.participants.find(
        (participant) => participant.email === email
      )

      if (!participantExistsOnTrip)
        throw new ClientError("Participant doesn't exists in this trip.")

      return {
        email: participantExistsOnTrip.email,
        id: participantExistsOnTrip.id,
      }
    }
  )
}
