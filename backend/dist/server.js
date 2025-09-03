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
const argon2_1 = __importDefault(require("argon2"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const User_1 = require("./User");
const app = (0, express_1.default)();
const PORT = 5050;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/health-check', (request, response) => {
    response.send('Everything is good :)');
});
app.post('/signup', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = request.body;
    const user = yield User_1.User.findOne({
        where: {
            username: username
        }
    });
    if (user) {
        response.status(409).json({ message: "User already exists" });
        return;
    }
    const encryptedPassword = yield argon2_1.default.hash(password);
    yield User_1.User.create({
        username: username,
        email: email,
        password: encryptedPassword
    });
    response.status(201).json({ message: 'Successfully Registered!!' });
}));
app.post('/login', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.body;
    const user = yield User_1.User.findOne({
        where: {
            username: username
        }
    });
    if (!user) {
        response.status(404).json({ message: "User does not exists" });
        return;
    }
    const validPassword = yield argon2_1.default.verify(user.dataValues.password, password);
    if (!validPassword) {
        response.status(401).json({ message: "Invalid Password" });
        return;
    }
    response.status(200).json({ message: 'Login Successfull!! ' });
}));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectToDB)();
        yield db_1.sequelize.sync({ alter: true });
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:5050/`);
        });
    }
    catch (error) {
        console.error("Error: ", error);
    }
});
startServer();
