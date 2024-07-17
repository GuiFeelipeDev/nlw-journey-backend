"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActivity = deleteActivity;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
const client_error_1 = require("../errors/client-error");
async function deleteActivity(app) {
    app.withTypeProvider().delete("/activities/:activityId", {
        schema: {
            params: zod_1.default.object({
                activityId: zod_1.default.string().uuid(),
            }),
        },
    }, async (req) => {
        const { activityId } = req.params;
        try {
            await prisma_1.prisma.activity.delete({
                where: { id: activityId },
            });
        }
        catch (error) {
            throw new client_error_1.ClientError("Failed to delete this activity");
        }
        return { message: "Deleted successfully" };
    });
}
