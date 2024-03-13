"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = exports.loginController = void 0;
const token_1 = require("../utils/token");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(400).json("Invalid email or password");
        }
        const passwordMatch = yield (0, token_1.verifyPassword)(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json("Invalid password");
        }
        const accessToken = (0, token_1.createAccessToken)({
            userId: user.id,
            email: user.email,
        });
        res.json(accessToken);
    }
    catch (error) {
        res.status(500).json("Internal Server Error");
    }
});
exports.loginController = loginController;
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const emailExists = yield prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });
        if (emailExists) {
            return res.status(400).json("Email already exists");
        }
        yield prisma.user.create({
            data: {
                email: user.email,
                username: user.username,
                password: bcrypt_1.default.hashSync(user.password, 10),
                name: user.name,
            },
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json("Internal Server Error");
    }
});
exports.registerController = registerController;
