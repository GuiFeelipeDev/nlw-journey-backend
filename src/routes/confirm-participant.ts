import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { prisma } from "../lib/prisma"
import { ClientError } from "../errors/client-error"

export async function confirmParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/participants/:tripId/confirm",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
      },
    },
    async (req, reply) => {
      const { tripId } = req.params
      const { name, email } = req.body

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
        include: {
          participants: {
            select: {
              id: true,
              email: true,
              is_confirmed: true,
            },
          },
        },
      })

      if (!trip) throw new ClientError("Could not find a trip with this ID.")

      const participantExists = trip.participants.find(
        (participant) => participant.email === email
      )

      if (!participantExists)
        throw new ClientError("Could not find a participant with this email.")

      if (participantExists.is_confirmed)
        return { message: "Participant is already confirmed." }

      await prisma.participant.update({
        where: {
          id: participantExists.id,
        },
        data: { is_confirmed: true, name },
      })

      return { message: "Participant confirmed successfully." }
    }
  )
}
