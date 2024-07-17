"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTripDetails = getTripDetails;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
const client_error_1 = require("../errors/client-error");
async function getTripDetails(app) {
    app.withTypeProvider().get("/trips/:tripId", {
        schema: {
            params: zod_1.default.object({
                tripId: zod_1.default.string().uuid(),
            }),
        },
    }, async (req) => {
        const { tripId } = req.params;
        const trip = await prisma_1.prisma.trip.findUnique({
            where: { id: tripId },
            select: {
                id: true,
                destination: true,
                starts_at: true,
                ends_at: true,
                is_confirmed: true,
            },
        });
        if (!trip)
            throw new client_error_1.ClientError("Could not find this trip.");
        return { trip };
    });
}
