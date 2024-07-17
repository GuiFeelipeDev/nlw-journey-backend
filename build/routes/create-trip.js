"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrip = createTrip;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
const dayjs_1 = require("../lib/dayjs");
const client_error_1 = require("../errors/client-error");
async function createTrip(app) {
    app.withTypeProvider().post("/trips", {
        schema: {
            body: zod_1.default.object({
                destination: zod_1.default.string().min(4),
                starts_at: zod_1.default.coerce.date(),
                ends_at: zod_1.default.coerce.date(),
                owner_name: zod_1.default.string(),
                owner_email: zod_1.default.string().email(),
                emails_to_invite: zod_1.default.array(zod_1.default.string().email()),
            }),
        },
    }, async (req) => {
        const { destination, ends_at, starts_at, owner_name, owner_email, emails_to_invite, } = req.body;
        if ((0, dayjs_1.dayjs)(starts_at).isBefore(new Date())) {
            throw new client_error_1.ClientError("Invalid trip start date.");
        }
        if ((0, dayjs_1.dayjs)(ends_at).isBefore(starts_at)) {
            throw new client_error_1.ClientError("Invalid trip end date.");
        }
        const trip = await prisma_1.prisma.trip.create({
            data: {
                destination,
                ends_at,
                starts_at,
                participants: {
                    createMany: {
                        data: [
                            {
                                name: owner_name,
                                email: owner_email,
                                is_owner: true,
                                is_confirmed: true,
                            },
                            ...emails_to_invite.map((email) => {
                                return { email };
                            }),
                        ],
                    },
                },
            },
        });
        return { tripId: trip.id };
    });
}
