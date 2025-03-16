import app from "../app.js";
import request from "supertest";
import { 
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll
} from 'vitest'
import User from '../models/User.js'
import mongoose from 'mongoose'
import { hash_pswd } from '../utils/hasher.js'


beforeAll(async () => {
})

beforeEach(async () => {
  await User.deleteMany({})
  const default_pswd_hash = await hash_pswd("megaforce")
  let loginUser = new User({
    username: "default-login-user",
    pswd_hash: default_pswd_hash
  })
  await loginUser.save()
})

afterEach(async () => {
  await User.deleteMany({})
})

afterAll(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})

describe("POST /api/users", () => {
  it("With valid login return 200 and token", async() => {
    const res = await request(app)
      .post('/api/login')
      .send({username: "default-login-user", password: "megaforce"})
    expect(res.statusCode).toEqual(200)
  })

  it("With invalid login password return 400, correct message", async() => {
    const res = await request(app)
      .post('/api/login')
      .send({username: "test-user", password: "megaforc"})
    console.log(res)
    expect(res.statusCode).toEqual(400)
  })
})
