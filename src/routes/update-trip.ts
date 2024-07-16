import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { prisma } from "../lib/prisma"
import { dayjs } from "../lib/dayjs"
import { ClientError } from "../errors/client-error"

export async function updateTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/trips/:tripId",
    {
      schema: {
        body: z.object({
          destination: z.string().min(4).optional(),
          starts_at: z.coerce.date().optional(),
          ends_at: z.coerce.date().optional(),
        }),
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async (req) => {
      const { destination, ends_at, starts_at } = req.body
      const { tripId } = req.params

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
      })

      if (!trip) throw new ClientError("Could not find a trip with this ID .")

      if (!!starts_at) {
        if (dayjs(starts_at).isBefore(new Date())) {
          throw new ClientError("Invalid trip start date.")
        }
      }

      if (!!starts_at) {
        if (dayjs(starts_at).isAfter(ends_at ?? trip.ends_at)) {
          throw new ClientError(
            "You could not change a start date to after the end date."
          )
        }
      }

      if (!!ends_at) {
        if (dayjs(ends_at).isBefore(starts_at ?? trip.starts_at)) {
          throw new ClientError("Invalid trip end date.")
        }
      }

      await prisma.trip.update({
        where: { id: tripId },
        data: {
          destination,
          starts_at,
          ends_at,
        },
      })

      return { tripId: trip.id }
    }
  )
}
