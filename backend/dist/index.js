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
const express_1 = __importDefault(require("express"));
const Validation_1 = require("./utils/Validation");
const client_1 = require("@prisma/client");
const token_1 = require("./utils/token");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const prisma = new client_1.PrismaClient();
app.post("/api/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
app.post("/api/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const parseInfo = Validation_1.createUserSchema.safeParse(user);
        if (!parseInfo.success) {
            return res.status(400).json(parseInfo.error);
        }
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
                password: (0, token_1.hashPassword)(user.password),
                name: user.name,
            },
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json("Internal Server Error");
    }
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
