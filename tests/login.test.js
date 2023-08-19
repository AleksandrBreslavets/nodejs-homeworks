/* eslint-disable */
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

beforeEach(async () => {
  await mongoose.connect(process.env.DB_HOST);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/users/login", () => {
    it("should return token and object with user.", async () => {

        const res = await request(app).post("/api/users/login").send({
            email: "123@test.com",
            password: "12234567"
        }).set('Content-Type', 'application/json');
        const { token, user } = res.body;

        expect(res.status).toBe(200);
        expect(Object.keys(res.body).length).toBe(2);
        expect(token).toBeDefined();
        expect(user).toBeDefined();
        expect(Object.keys(user).length).toBe(2);
        expect(user.email).toBeDefined();
        expect(user.subscription).toBeDefined();
        expect(typeof user.email).toBe("string");
        expect(typeof user.subscription).toBe("string");
    });
});