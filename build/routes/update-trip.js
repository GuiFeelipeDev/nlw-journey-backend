"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTrip = updateTrip;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
const dayjs_1 = require("../lib/dayjs");
const client_error_1 = require("../errors/client-error");
async function updateTrip(app) {
    app.withTypeProvider().patch("/trips/:tripId", {
        schema: {
            body: zod_1.default.object({
                destination: zod_1.default.string().min(4).optional(),
                starts_at: zod_1.default.coerce.date().optional(),
                ends_at: zod_1.default.coerce.date().optional(),
            }),
            params: zod_1.default.object({
                tripId: zod_1.default.string().uuid(),
            }),
        },
    }, async (req) => {
        const { destination, ends_at, starts_at } = req.body;
        const { tripId } = req.params;
        const trip = await prisma_1.prisma.trip.findUnique({
            where: {
                id: tripId,
            },
        });
        if (!trip)
            throw new client_error_1.ClientError("Could not find a trip with this ID .");
        if (!!starts_at) {
            if ((0, dayjs_1.dayjs)(starts_at).isBefore(new Date())) {
                throw new client_error_1.ClientError("Invalid trip start date.");
            }
        }
        if (!!starts_at) {
            if ((0, dayjs_1.dayjs)(starts_at).isAfter(ends_at ?? trip.ends_at)) {
                throw new client_error_1.ClientError("You could not change a start date to after the end date.");
            }
        }
        if (!!ends_at) {
            if ((0, dayjs_1.dayjs)(ends_at).isBefore(starts_at ?? trip.starts_at)) {
                throw new client_error_1.ClientError("Invalid trip end date.");
            }
        }
        await prisma_1.prisma.trip.update({
            where: { id: tripId },
            data: {
                destination,
                starts_at,
                ends_at,
            },
        });
        return { tripId: trip.id };
    });
}
