var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { z } from 'zod';
import { env } from '../env.js';
const loginRouter = express.Router();
const loginSchema = z.object({
    username: z.string(),
    password: z.string()
});
loginRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const login_req = loginSchema.parse(req.body);
        const user = yield User.findOne({ username: login_req.username });
        if (!user) {
            throw new Error('No such user');
        }
        else {
            const correct = yield bcrypt.compare(login_req.password, user.pswd_hash);
            if (!correct) {
                throw new Error('wrong password');
            }
            const userForToken = {
                username: user.username,
                id: user._id,
            };
            const token = jwt.sign(userForToken, env.JWT_SECRET);
            res.status(200).send({ token, username: user.username, admin: user.admin });
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
export default loginRouter;
