"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyParticipant = verifyParticipant;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
const client_error_1 = require("../errors/client-error");
async function verifyParticipant(app) {
    app.withTypeProvider().post("/participants/:tripId/verify", {
        schema: {
            params: zod_1.default.object({
                tripId: zod_1.default.string().uuid(),
            }),
            body: zod_1.default.object({
                email: zod_1.default.string().email(),
            }),
        },
    }, async (req, reply) => {
        const { tripId } = req.params;
        const { email } = req.body;
        const trip = await prisma_1.prisma.trip.findUnique({
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
        });
        if (!trip)
            throw new client_error_1.ClientError("Could not find a trip with this ID.");
        const participantExistsOnTrip = trip.participants.find((participant) => participant.email === email);
        if (!participantExistsOnTrip)
            throw new client_error_1.ClientError("Participant doesn't exists in this trip.");
        return {
            email: participantExistsOnTrip.email,
            id: participantExistsOnTrip.id,
        };
    });
}
