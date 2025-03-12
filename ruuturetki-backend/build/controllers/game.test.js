var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import app from "../app";
import request from "supertest";
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import Game from '../models/Game';
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Game.deleteMany({});
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Game.deleteMany({});
}));
describe("POST /api/games", () => {
    it("return 201 + object and with valid rounds and score, no user", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .post('/api/games')
            .send({ rounds: 5, score: 40100 });
        expect(res.statusCode).toEqual(201);
        expect(res.body.rounds).toEqual(5);
        expect(res.body.score).toEqual(40100);
    }));
    it("return 400 and validation error on bad data", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .post('/api/games')
            .send({ user: "test-user" });
        expect(res.statusCode).toEqual(400);
        expect(res.body.name).toEqual('ZodError');
    }));
});
