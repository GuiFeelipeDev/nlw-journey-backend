import fastify from "fastify"
import { createTrip } from "./routes/create-trip"
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"
import { confirmTrip } from "./routes/confirm-trip"
import cors from "@fastify/cors"
import { confirmParticipant } from "./routes/confirm-participant"
import { createActivity } from "./routes/create-activity"
import { getActivities } from "./routes/get-activities"
import { createLink } from "./routes/create-link"
import { getLinks } from "./routes/get-links"
import { getParticipants } from "./routes/get-participants"
import { createInvite } from "./routes/create-invite"
import { updateTrip } from "./routes/update-trip"
import { getTripDetails } from "./routes/get-trip-details"
import { getParticipant } from "./routes/get-participant"
import { errorHandler } from "./error-handler"
import { env } from "./env"
import { deleteActivity } from "./routes/delete-activity"
import { deleteLink } from "./routes/delete-link"
import { deleteParticipant } from "./routes/delete-participant"
import { verifyParticipant } from "./routes/verify-participant"

const app = fastify()

app.register(cors, {
  origin: "*",
})

app.setErrorHandler(errorHandler)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// Trip =====================
app.register(createTrip)
app.register(confirmTrip)
app.register(updateTrip)
app.register(createInvite)
app.register(getTripDetails)

// Participant =====================
app.register(confirmParticipant)
app.register(getParticipants)
app.register(getParticipant)
app.register(deleteParticipant)
app.register(verifyParticipant)

// Activity =====================
app.register(createActivity)
app.register(getActivities)
app.register(deleteActivity)

// Link =====================
app.register(createLink)
app.register(getLinks)
app.register(deleteLink)

app.listen({ port: env.PORT }).then(() => {
  console.log("Server Running on Port 3333")
})
