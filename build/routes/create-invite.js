"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvite = createInvite;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
const client_error_1 = require("../errors/client-error");
async function createInvite(app) {
    app.withTypeProvider().post("/trips/:tripId/invites", {
        schema: {
            body: zod_1.default.object({
                email: zod_1.default.string().email(),
            }),
            params: zod_1.default.object({
                tripId: zod_1.default.string().uuid(),
            }),
        },
    }, async (req, reply) => {
        const { email } = req.body;
        const { tripId } = req.params;
        const trip = await prisma_1.prisma.trip.findUnique({
            where: { id: tripId },
        });
        if (!trip)
            throw new client_error_1.ClientError("Could not find this trip.");
        const participant = await prisma_1.prisma.participant.create({
            data: {
                email,
                trip_id: tripId,
            },
        });
        return { participantId: participant.id };
    });
}
