"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = __importDefault(require("zod"));
const envSchema = zod_1.default.object({
    DATABASE_URL: zod_1.default.string().url(),
    WEB_BASE_URL: zod_1.default.string().url(),
    PORT: zod_1.default.coerce.number().default(3333),
});
exports.env = envSchema.parse(process.env);
