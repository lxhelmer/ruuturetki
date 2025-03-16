import app from "../app.js";
import request from "supertest";
import { describe, it, expect, beforeEach, afterEach, afterAll } from 'vitest'
import User from '../models/User.js'
import mongoose from 'mongoose'
import { hash_pswd } from '../utils/hasher.js'

beforeEach(async () => {
  await User.deleteMany({})
  const default_pswd_hash = await hash_pswd("megaforce")
  let defaultUser = new User({
    username: "default-user",
    pswd_hash: default_pswd_hash
  })
  await defaultUser.save()

})

afterEach(async () => {
  await User.deleteMany({})
})

afterAll(async () => {
  await mongoose.connection.close()
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
  it("fail and return 400 with missing password", async() => {
    const res = await request(app)
      .post('/api/users')
      .send({username: "test-user"})
    expect(res.statusCode).toEqual(400)
  })
  it("fail and return 400 with missing username", async() => {
    const res = await request(app)
      .post('/api/users')
      .send({password: "megaforce"})
    expect(res.statusCode).toEqual(400)
  })
  it("fail when creating duplicate username user, return proper errorMessage", async () => {
    const res = await request(app)
      .post('/api/users')
      .send({username: "default-user", password: "megaforce"})
    expect(res.statusCode).toEqual(400)
    expect(res.body.errorMessage).toEqual('Username already taken')
  })
})
