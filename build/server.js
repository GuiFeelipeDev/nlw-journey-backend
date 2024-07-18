"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const create_trip_1 = require("./routes/create-trip");
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const confirm_trip_1 = require("./routes/confirm-trip");
const cors_1 = __importDefault(require("@fastify/cors"));
const confirm_participant_1 = require("./routes/confirm-participant");
const create_activity_1 = require("./routes/create-activity");
const get_activities_1 = require("./routes/get-activities");
const create_link_1 = require("./routes/create-link");
const get_links_1 = require("./routes/get-links");
const get_participants_1 = require("./routes/get-participants");
const create_invite_1 = require("./routes/create-invite");
const update_trip_1 = require("./routes/update-trip");
const get_trip_details_1 = require("./routes/get-trip-details");
const get_participant_1 = require("./routes/get-participant");
const error_handler_1 = require("./error-handler");
const env_1 = require("./env");
const delete_activity_1 = require("./routes/delete-activity");
const delete_link_1 = require("./routes/delete-link");
const delete_participant_1 = require("./routes/delete-participant");
const verify_participant_1 = require("./routes/verify-participant");
const app = (0, fastify_1.default)();
app.register(cors_1.default, {
    origin: "*",
});
app.setErrorHandler(error_handler_1.errorHandler);
app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
// Trip =====================
app.register(create_trip_1.createTrip);
app.register(confirm_trip_1.confirmTrip);
app.register(update_trip_1.updateTrip);
app.register(create_invite_1.createInvite);
app.register(get_trip_details_1.getTripDetails);
// Participant =====================
app.register(confirm_participant_1.confirmParticipant);
app.register(get_participants_1.getParticipants);
app.register(get_participant_1.getParticipant);
app.register(delete_participant_1.deleteParticipant);
app.register(verify_participant_1.verifyParticipant);
// Activity =====================
app.register(create_activity_1.createActivity);
app.register(get_activities_1.getActivities);
app.register(delete_activity_1.deleteActivity);
// Link =====================
app.register(create_link_1.createLink);
app.register(get_links_1.getLinks);
app.register(delete_link_1.deleteLink);
const port = env_1.env.PORT || 3333;
app.listen({ port, host: "0.0.0.0" }).then(() => {
    console.log("Server Running on Port " + port);
});
