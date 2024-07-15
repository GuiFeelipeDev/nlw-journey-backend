import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { prisma } from "../lib/prisma"
import { ClientError } from "../errors/client-error"

export async function deleteActivity(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/activities/:activityId",
    {
      schema: {
        params: z.object({
          activityId: z.string().uuid(),
        }),
      },
    },
    async (req) => {
      const { activityId } = req.params

      try {
        await prisma.activity.delete({
          where: { id: activityId },
        })
      } catch (error) {
        throw new ClientError("Failed to delete this activity")
      }

      return { message: "Deleted successfully" }
    }
  )
}
