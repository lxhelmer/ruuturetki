import app from "../app.js";
import request from "supertest";
import { describe, it, expect, beforeEach, afterAll, beforeAll } from 'vitest'
import Game from '../models/Game.js'
import User from '../models/User.js'

let token: string

beforeAll(async () => {
  await User.deleteMany({})
  const user = await request(app).post('/api/users').send({username: 'test-game', password: 'test-password'})
  console.log(user.body)
})


beforeEach(async () => {
  await Game.deleteMany({})
  const tokenRes = await request(app).post('/api/login').send({username: 'test-game', password: 'test-password'})
  console.log(tokenRes.body)
  token = tokenRes.body.token
})

afterAll(async () => {
  await Game.deleteMany({})
  await User.deleteMany({})
})


describe("POST /api/games", () => {
  it("return 201 + object and with valid rounds, score and token", async () => {
    console.log(token)
    expect(token).toBeDefined()
    const res = await request(app)
      .post('/api/games')
      .set('Authorization', token)
      .send({rounds: 5, score: 40100},)

    expect(res.statusCode).toEqual(201)
    expect(res.body.rounds).toEqual(5)
    expect(res.body.score).toEqual(40100)
  })
  it("return 400 and validation error on bad data", async () => {
    const res = await request(app)
      .post('/api/games')
      .send({user: "test-game"})
    expect(res.statusCode).toEqual(400)
    expect(res.body.name).toEqual('ZodError')
  })
})
