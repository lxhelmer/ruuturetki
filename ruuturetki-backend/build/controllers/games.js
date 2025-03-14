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
const gamesRouter = express.Router();
import Game from '../models/Game.js';
import { z } from 'zod';
import { env } from '../env.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const newGameSchema = z.object({
    rounds: z.number(),
    score: z.number(),
});
gamesRouter.get('/', (_req, res) => {
    Game.find({}).populate('user').then(games => {
        res.json(games);
    });
});
// token implementation in ts got help from: https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1
gamesRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const new_game = newGameSchema.parse(req.body);
        const token = (_a = req.get('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            throw new Error('Missing authorization token');
        }
        const decoded = jwt.verify(token, env.JWT_SECRET);
        const user = yield User.findById(decoded.id);
        if (!user) {
            throw new Error("Token doesn't match any user");
        }
        const game = new Game({
            rounds: new_game.rounds,
            score: new_game.score,
            user: user._id,
        });
        game.save().then(saved => {
            res.status(201).json(saved);
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
gamesRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('reached router');
    try {
        const token = (_a = req.get('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            throw new Error('Missing authorization token');
        }
        const decoded = jwt.verify(token, env.JWT_SECRET);
        const user = yield User.findById(decoded.id);
        if (!user) {
            throw new Error("Token doesn't match any user");
        }
        if (user.admin) {
            try {
                yield Game.findByIdAndDelete(req.params.id);
                res.status(204).end();
            }
            catch (error) {
                res.send(error);
            }
        }
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
}));
export default gamesRouter;
