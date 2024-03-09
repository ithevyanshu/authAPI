"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createAccessToken = (payload) => {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accessTokenSecret) {
        throw new Error("Access token secret not provided");
    }
    return jsonwebtoken_1.default.sign(payload, accessTokenSecret, {
        expiresIn: "1d",
    });
};
exports.createAccessToken = createAccessToken;
const hashPassword = (password) => bcrypt_1.default.hashSync(password, parseInt(process.env.SALT_ROUNDS || "10"));
exports.hashPassword = hashPassword;
const verifyPassword = (password, hash) => bcrypt_1.default.compare(password, hash);
exports.verifyPassword = verifyPassword;
