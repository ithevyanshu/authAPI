"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const createUserSchema = zod_1.default.object({
    email: zod_1.default.string().email({ message: "Invalid email" }),
    username: zod_1.default.string().min(3, { message: "Too short" }),
    name: zod_1.default.string().min(3, { message: "Too short" }),
    password: zod_1.default.string().min(8, { message: "Too short" }),
});
exports.createUserSchema = createUserSchema;
