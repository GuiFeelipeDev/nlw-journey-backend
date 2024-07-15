import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { prisma } from "../lib/prisma"
import { ClientError } from "../errors/client-error"

export async function deleteLink(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/links/:linkId",
    {
      schema: {
        params: z.object({
          linkId: z.string().uuid(),
        }),
      },
    },
    async (req) => {
      const { linkId } = req.params

      try {
        await prisma.link.delete({
          where: { id: linkId },
        })
      } catch (error) {
        throw new ClientError("Failed to delete this link")
      }

      return { message: "Deleted successfully" }
    }
  )
}
