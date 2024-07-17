"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLink = createLink;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
const client_error_1 = require("../errors/client-error");
async function createLink(app) {
    app.withTypeProvider().post("/trips/:tripId/links", {
        schema: {
            body: zod_1.default.object({
                title: zod_1.default.string().min(4),
                url: zod_1.default.string().url(),
            }),
            params: zod_1.default.object({
                tripId: zod_1.default.string().uuid(),
            }),
        },
    }, async (req) => {
        const { url, title } = req.body;
        const { tripId } = req.params;
        const trip = await prisma_1.prisma.trip.findUnique({
            where: { id: tripId },
        });
        if (!trip)
            throw new client_error_1.ClientError("Could not find this trip.");
        const link = await prisma_1.prisma.link.create({
            data: {
                title,
                url,
                trip_id: tripId,
            },
        });
        return { linkId: link.id };
    });
}
