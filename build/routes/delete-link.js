"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLink = deleteLink;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
const client_error_1 = require("../errors/client-error");
async function deleteLink(app) {
    app.withTypeProvider().delete("/links/:linkId", {
        schema: {
            params: zod_1.default.object({
                linkId: zod_1.default.string().uuid(),
            }),
        },
    }, async (req) => {
        const { linkId } = req.params;
        try {
            await prisma_1.prisma.link.delete({
                where: { id: linkId },
            });
        }
        catch (error) {
            throw new client_error_1.ClientError("Failed to delete this link");
        }
        return { message: "Deleted successfully" };
    });
}
