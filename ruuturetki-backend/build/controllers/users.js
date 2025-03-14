var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import express from 'express';
const usersRouter = express.Router();
import User from '../models/User.js';
import { z } from 'zod';
import { MongoServerError } from 'mongodb';
const newUserSchema = z.object({
    username: z.string(),
    password: z.string()
});
usersRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User.find({});
    res.json(users);
}));
usersRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const new_user = newUserSchema.parse(req.body);
        const saltRounds = 10;
        const pswd_hash = yield bcrypt.hash(new_user.password, saltRounds);
        const user = new User({
            username: new_user.username,
            pswd_hash: pswd_hash,
            admin: false
        });
        const saved = yield user.save();
        res.status(201).json(saved);
    }
    catch (error) {
        console.log(error);
        if (error instanceof MongoServerError) {
            if (error.code === 11000) {
                res.status(400).send({ errorMessage: "Username already taken" });
            }
        }
        else {
            res.status(400).send(error);
        }
    }
}));
export default usersRouter;
