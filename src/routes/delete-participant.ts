import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { prisma } from "../lib/prisma"
import { ClientError } from "../errors/client-error"

export async function deleteParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/participants/:participantId",
    {
      schema: {
        params: z.object({
          participantId: z.string().uuid(),
        }),
      },
    },
    async (req) => {
      const { participantId } = req.params

      try {
        await prisma.participant.delete({
          where: { id: participantId },
        })
      } catch (error) {
        throw new ClientError("Failed to delete this participant")
      }

      return { message: "Deleted successfully" }
    }
  )
}
