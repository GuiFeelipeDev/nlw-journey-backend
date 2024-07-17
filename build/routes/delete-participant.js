"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteParticipant = deleteParticipant;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
const client_error_1 = require("../errors/client-error");
async function deleteParticipant(app) {
    app.withTypeProvider().delete("/participants/:participantId", {
        schema: {
            params: zod_1.default.object({
                participantId: zod_1.default.string().uuid(),
            }),
        },
    }, async (req) => {
        const { participantId } = req.params;
        try {
            await prisma_1.prisma.participant.delete({
                where: { id: participantId },
            });
        }
        catch (error) {
            throw new client_error_1.ClientError("Failed to delete this participant");
        }
        return { message: "Deleted successfully" };
    });
}
