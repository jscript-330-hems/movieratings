const request = require("supertest");

const server = require("../server");
const testUtils = require('../test-utils');

const User = require('../models/user');
const Movie = require('../models/movie');
const Theater = require('../models/theater');

describe("/reviews", () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);
  
    afterEach(testUtils.clearDB);
   
    const movie1 = {
        title: "Movie 1",
        actors: ["John Doe", "Jane Doe"],
        genre: ["Drama", "Musical"],
        synopsis: "Story about John and Jane",
        releaseYear: 2020,
        rating: "PG",
        moviePicUrl: "https://pictures.url/movie1.png"
    };
    const movie2 = {
        title: "Movie 2",
        actors: ["Actor One", "Actor Two"],
        genre: ["Crime", "Drama"],
        synopsis: "Movie two synopsis.",
        releaseYear: 2021,
        rating: "R",
        moviePicUrl: "https://pictures.url/movie2.png"
    };
    
    let theater1, theater2, savedTheaters, savedMovies;

    beforeEach(async () => {
        theater1 = { name: "Theater One", movies: [], zip: 98001 };
        theater2 = { name: "Theater Two", movies: [], zip: 98002 };
        savedMovies = (await Movie.insertMany([movie1, movie2])).map(i => i.toJSON());
        theater1.movies.push(savedMovies[0]._id);
        theater1.movies.push(savedMovies[1]._id);
        theater2.movies.push(savedMovies[0]._id);
        savedTheaters = (await Theater.insertMany([theater1, theater2])).map(i => i.toJSON());
    });

    describe('Before login', () => {
        describe('POST /', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server).post("/theaters").send(theater1);
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server)
                    .post("/theaters")
                    .set('Authorization', 'Bearer BAD')
                    .send(theater1);
                expect(res.statusCode).toEqual(401);
            });
        });
        describe('PUT /:id', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server)
                    .put("/theaters/" + savedTheaters[1]._id)
                    .send({ ...theater1, zip: theater1.zip++ });
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server)
                    .put("/theaters/" + savedTheaters[1]._id)
                    .set('Authorization', 'Bearer BAD')
                    .send({ ...theater1, zip: theater1.zip++ });
                expect(res.statusCode).toEqual(401);
            });
        });
        describe('DELETE /:id', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server).delete("/theaters/" + savedTheaters[1]._id).send();
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server)
                  .delete("/theaters/" + savedTheaters[1]._id)
                  .set('Authorization', 'Bearer BAD')
                  .send();
                expect(res.statusCode).toEqual(401);
            });
        });
        describe('GET /', () => {
            it('should send an array of theaters without login', async () => {
                const res = await request(server).get("/theaters");
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveLength(2);
                res.body.forEach(element => {
                    expect(element.movies.includes(savedMovies[0]._id));
                });
            });
        });
        describe("GET /:id/movies", () => {
            it('should send an array of movie IDs with a correct theater ID', async () => {
                const res = await request(server).get("/theaters/" + savedTheaters[0]._id + "/movies");
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveLength(2);
                expect(res.body.includes(savedMovies[0]._id));
            });
            it('should send 404 with bad theater ID', async () => {
                const res = await request(server).get("/theaters/12345/movies");
                expect(res.statusCode).toEqual(404);
            });
            it('should send 404 with non-existing theater ID', async () => {
                const res = await request(server).get("/theaters/6111a815bf04188d7ccdb099/movies");
                expect(res.statusCode).toEqual(404);
            });
        });
        describe("GET /zipcode/:id", () => {
            it("should return one matching theater", async () => {
                const res = await request(server).get("/theaters/zipcode/98001");
                expect(res.statusCode).toEqual(200);
                expect(res.body[0]).toMatchObject({ name: 'Theater One' });
            });
            it("should return an empty array if no match", async () => {
                const res = await request(server).get("/theaters/zipcode/12345");
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveLength(0);
            });
        });
    });

    describe('After login', () => {
        const testUser = {
            email: 'testuser@mail.com',
            password: 'somepassword'
        };
        const testAdmin = {
            email: 'admin@mail.com',
            password: 'iamsuperuser'
        };
        const testTheater = { 
            name: "Theater TEST",
            movies: [],
            zip: 98105
        };
        let token1, adminToken;
        beforeEach(async () => {
            await request(server).post("/login/signup").send(testUser);
            const resp1 = await request(server).post("/login").send(testUser);
            token1 = resp1.body.token;
            await request(server).post("/login/signup").send(testAdmin);
            await User.updateOne({ email: testAdmin.email }, { $push: { roles: 'admin'} });
            const resp2 = await request(server).post("/login").send(testAdmin);
            adminToken = resp2.body.token;
        });
        describe('POST /', () => {
            it('should send 403 with non-admin user', async () => {
                const res = await request(server)
                    .post("/theaters")
                    .set('Authorization', 'Bearer ' + token1)
                    .send(testTheater);
                expect(res.statusCode).toEqual(403);
            });
            it('should send 200 and create theater with admin account', async () => {
                const res = await request(server)
                    .post("/theaters")
                    .set('Authorization', 'Bearer ' + adminToken)
                    .send(testTheater);
                expect(res.statusCode).toEqual(200);
                const newTheater = await Theater.findOne({ _id: res.body._id });
                expect(newTheater).toMatchObject({ name: 'Theater TEST' });
            });
        });
        describe('PUT /:id', () => {
            it("should send 403 with non-admin user", async () => {
                const res = await request(server)
                    .put("/theaters/" + savedTheaters[1]._id)
                    .set('Authorization', 'Bearer ' + token1)
                    .send({ ...theater2, zip: 98123 });
                expect(res.statusCode).toEqual(403);
            });
            it("should reject a bad id", async () => {
                const res = await request(server)
                    .put("/theaters/12345")
                    .set('Authorization', 'Bearer ' + adminToken)
                    .send({ ...theater2, zip: 98123 });
                expect(res.statusCode).toEqual(400);
            });
            it("should update a movie", async () => {
                const res = await request(server)
                    .put("/theaters/" + savedTheaters[1]._id)
                    .set('Authorization', 'Bearer ' + adminToken)
                    .send({ ...theater2, zip: 98123 });
                expect(res.statusCode).toEqual(200);
                const updatedTheater = await Theater.findById(savedTheaters[1]._id).lean();
                expect(updatedTheater.zip).toEqual(98123);
            });
        });
        describe('DELETE /:id', () => {
            it("should send 403 with non-admin user", async () => {
                const res = await request(server)
                    .delete("/theaters/" + savedTheaters[1]._id)
                    .set('Authorization', 'Bearer ' + token1)
                    .send();
                expect(res.statusCode).toEqual(403);
            });
            it("should reject a bad id", async () => {
                const res = await request(server)
                    .delete("/theaters/12345")
                    .set('Authorization', 'Bearer ' + adminToken)
                    .send();
                expect(res.statusCode).toEqual(400);
            });
            it("should delete a theater", async () => {
                const res = await request(server)
                    .delete("/theaters/" + savedTheaters[1]._id)
                    .set('Authorization', 'Bearer ' + adminToken)
                    .send();
                expect(res.statusCode).toEqual(200);
                const deletedTheater = await Theater.findOne(savedTheaters[1]._id);
                expect(deletedTheater).toBeNull();
            });
        });
    });
});