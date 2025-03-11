import app from "../app";
import request from "supertest";
import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import Game from '../models/Game'



beforeEach(async () => {
  await Game.deleteMany({})
})

afterAll(async () => {
  await Game.deleteMany({})
})


describe("POST /api/games", () => {
  it("return 201 + object and with valid rounds and score, no user", async () => {
    const res = await request(app)
      .post('/api/games')
      .send({rounds: 5, score: 40100})
    expect(res.statusCode).toEqual(201)
    expect(res.body.rounds).toEqual(5)
    expect(res.body.score).toEqual(40100)
  })
  it("return 400 and validation error on bad data", async () => {
    const res = await request(app)
      .post('/api/games')
      .send({user: "test-user"})
    expect(res.statusCode).toEqual(400)
    expect(res.body.name).toEqual('ZodError')
  })
})
