import express from 'express';
const gamesRouter = express.Router();
import Game from '../models/Game';
import { z } from 'zod';
import mongoose from 'mongoose';
const newGameSchema = z.object({
    rounds: z.number(),
    score: z.number(),
    user: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)).optional()
});
gamesRouter.get('/', (_req, res) => {
    Game.find({}).populate('user').then(games => {
        res.json(games);
    });
});
gamesRouter.post('/', (req, res) => {
    try {
        const new_game = newGameSchema.parse(req.body);
        const game = new Game({
            rounds: new_game.rounds,
            score: new_game.score,
            user: new_game.user,
        });
        game.save().then(saved => {
            res.status(201).json(saved);
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
});
gamesRouter.delete('/:id', (req, res) => {
    Game.findByIdAndDelete(req.params.id)
        .then(_result => {
        res.status(204).end();
    })
        .catch(error => res.send(error));
});
export default gamesRouter;
