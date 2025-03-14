import app from "../app.js";
import request from "supertest";
import { describe, it, expect, beforeEach, afterEach, afterAll } from 'vitest'
import User from '../models/User.js'

beforeEach(async () => {
  await User.deleteMany({})
})

afterEach(async () => {
})

afterAll(async () => {
  await User.deleteMany({})
})


describe("POST /api/users", () => {
  it("return 201 + object and with valid username and password", async () => {
    const res = await request(app)
      .post('/api/users')
      .send({username: "test-user", password: "megaforce"})
    console.log(res.statusCode)
    expect(res.statusCode).toEqual(201)
    expect(res.body.username).toEqual("test-user")
  })
  it("return 400 and validation error on bad data", async () => {
    const res = await request(app)
      .post('/api/users')
      .send({user: "test-user"})
    expect(res.statusCode).toEqual(400)
    expect(res.body.name).toEqual('ZodError')
  })
  it("return 201 + no dublicates", async () => {
    const res1 = await request(app)
      .post('/api/users')
      .send({username: "test-user", password: "megaforce"})
    const res2 = await request(app)
      .post('/api/users')
      .send({username: "test-user", password: "megaforce"})
    expect(res1.statusCode).toEqual(201)
    expect(res1.body.username).toEqual("test-user")
    expect(res2.statusCode).toEqual(400)
  })
})
