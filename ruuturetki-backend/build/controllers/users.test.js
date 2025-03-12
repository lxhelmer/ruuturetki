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
import { describe, it, expect, beforeEach, afterEach, afterAll } from 'vitest';
import User from '../models/User';
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield User.deleteMany({});
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield User.deleteMany({});
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield User.deleteMany({});
}));
describe("POST /api/users", () => {
    it("return 201 + object and with valid username and password", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .post('/api/users')
            .send({ username: "test-user", password: "megaforce" });
        expect(res.statusCode).toEqual(201);
        expect(res.body.username).toEqual("test-user");
    }));
    it("return 400 and validation error on bad data", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .post('/api/users')
            .send({ user: "test-user" });
        expect(res.statusCode).toEqual(400);
        expect(res.body.name).toEqual('ZodError');
    }));
    it("return 201 + no dublicates", () => __awaiter(void 0, void 0, void 0, function* () {
        const res1 = yield request(app)
            .post('/api/users')
            .send({ username: "test-user", password: "megaforce" });
        const res2 = yield request(app)
            .post('/api/users')
            .send({ username: "test-user", password: "megaforce" });
        expect(res1.statusCode).toEqual(201);
        expect(res1.body.username).toEqual("test-user");
        expect(res2.statusCode).toEqual(400);
    }));
});
