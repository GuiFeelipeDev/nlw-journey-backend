"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmTrip = confirmTrip;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
const client_error_1 = require("../errors/client-error");
const env_1 = require("../env");
async function confirmTrip(app) {
    app.withTypeProvider().get("/trips/:tripId/confirm", {
        schema: {
            params: zod_1.default.object({
                tripId: zod_1.default.string().uuid(),
            }),
        },
    }, async (req, reply) => {
        const { tripId } = req.params;
        const trip = await prisma_1.prisma.trip.findUnique({
            where: {
                id: tripId,
            },
            include: {
                participants: {
                    where: {
                        is_owner: false,
                    },
                },
            },
        });
        if (!trip)
            throw new client_error_1.ClientError("Trip not found.");
        if (trip.is_confirmed)
            return reply.redirect(env_1.env.WEB_BASE_URL + "/trips/" + tripId);
        await prisma_1.prisma.trip.update({
            where: { id: tripId },
            data: { is_confirmed: true },
        });
        return reply.redirect(env_1.env.WEB_BASE_URL + "/trips/" + tripId);
    });
}
