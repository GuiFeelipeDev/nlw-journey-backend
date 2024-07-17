"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActivity = createActivity;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
const dayjs_1 = require("../lib/dayjs");
const client_error_1 = require("../errors/client-error");
async function createActivity(app) {
    app.withTypeProvider().post("/trips/:tripId/activities", {
        schema: {
            body: zod_1.default.object({
                title: zod_1.default.string().min(4),
                occurs_at: zod_1.default.coerce.date(),
            }),
            params: zod_1.default.object({
                tripId: zod_1.default.string().uuid(),
            }),
        },
    }, async (req) => {
        const { occurs_at, title } = req.body;
        const { tripId } = req.params;
        const trip = await prisma_1.prisma.trip.findUnique({
            where: { id: tripId },
        });
        if (!trip)
            throw new client_error_1.ClientError("Could not find this trip.");
        if ((0, dayjs_1.dayjs)(occurs_at).isBefore(trip.starts_at))
            throw new client_error_1.ClientError("Could not create a activity before trip start date.");
        if ((0, dayjs_1.dayjs)(occurs_at).isAfter(trip.ends_at))
            throw new client_error_1.ClientError("Could not create a activity after trip end date.");
        const activity = await prisma_1.prisma.activity.create({
            data: {
                title,
                occurs_at,
                trip_id: tripId,
            },
        });
        return { activityId: activity.id };
    });
}
