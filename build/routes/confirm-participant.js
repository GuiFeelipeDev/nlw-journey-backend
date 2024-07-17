"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmParticipant = confirmParticipant;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
const client_error_1 = require("../errors/client-error");
async function confirmParticipant(app) {
    app.withTypeProvider().post("/participants/:tripId/confirm", {
        schema: {
            params: zod_1.default.object({
                tripId: zod_1.default.string().uuid(),
            }),
            body: zod_1.default.object({
                name: zod_1.default.string(),
                email: zod_1.default.string().email(),
            }),
        },
    }, async (req, reply) => {
        const { tripId } = req.params;
        const { name, email } = req.body;
        const trip = await prisma_1.prisma.trip.findUnique({
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
        });
        if (!trip)
            throw new client_error_1.ClientError("Could not find a trip with this ID.");
        const participantExists = trip.participants.find((participant) => participant.email === email);
        if (!participantExists)
            throw new client_error_1.ClientError("Could not find a participant with this email.");
        if (participantExists.is_confirmed)
            return { message: "Participant is already confirmed." };
        await prisma_1.prisma.participant.update({
            where: {
                id: participantExists.id,
            },
            data: { is_confirmed: true, name },
        });
        return { message: "Participant confirmed successfully." };
    });
}
