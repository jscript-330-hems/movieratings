const request = require("supertest");

const server = require("../server");
const testUtils = require('../test-utils');

const User = require('../models/user');
const Movie = require('../models/movie');
const Theater = require('../models/theater');

describe("/movies", () => {
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

    beforeEach(async () => {
        const theater1 = {
            name: "AMC",
            movies: [],
            zip: 98004
        }
        savedMovies = (await Movie.insertMany([movie1, movie2])).map(i => i.toJSON());
        theater1.movies.push(savedMovies[0]._id)
        savedTheater = await Theater.create(theater1);
    });
    
    describe('Before login', () => {
        describe('POST /', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server).post("/movies").send(movie1);
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server)
                    .post("/movies")
                    .set('Authorization', 'Bearer BAD')
                    .send(movie1);
                expect(res.statusCode).toEqual(401);
            });
        });
        describe('PUT /:id', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server)
                    .put("/movies/" + savedMovies[1]._id)
                    .send({ ...movie1, releaseYear: movie1.releaseYear++ });
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server)
                    .put("/movies/" + savedMovies[1]._id)
                    .set('Authorization', 'Bearer BAD')
                    .send({ ...movie1, releaseYear: movie1.releaseYear++ });
                expect(res.statusCode).toEqual(401);
            });
        });
        describe('DELETE /:id', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server).delete("/movies/" + savedMovies[1]._id).send();
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server)
                  .delete("/movies/" + savedMovies[1]._id)
                  .set('Authorization', 'Bearer BAD')
                  .send();
                expect(res.statusCode).toEqual(401);
            });
        });
        describe('GET /', () => {
            it('should send an array of movie without login', async () => {
                const res = await request(server).get("/movies");
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveLength(2);
                res.body.forEach(element => {
                    expect(element.reviewCount === 0);
                    expect(element.averageScore === 0);
                });
            });
        });
        describe('GET /:id', () => {
            it('should send 200 and movie detail with a correct movie ID', async () => {
                const res = await request(server).get("/movies/" + savedMovies[1]._id);
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject({ title: "Movie 2" });
            });
            it('should send 404 with wrong movie ID', async () => {
                const res = await request(server).get("/movies/12345");
                expect(res.statusCode).toEqual(404);
            });
        });
        describe("GET /:id/theaters", () => {
            it('should send an array of theaters', async () => {
                const res = await request(server).get("/movies/" + savedMovies[0]._id + "/theaters");
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveLength(1);
                expect(res.body[0]._id).toEqual(savedTheater._id.toString());
            });
            it('should send 404 with wrong movie ID', async () => {
                const res = await request(server).get("/movies/12345/theaters");
                expect(res.statusCode).toEqual(404);
            });
        });
        describe("GET /search", () => {
            it("should return one matching movie", async () => {
                const res = await request(server).get("/movies/search?query=John");
                expect(res.statusCode).toEqual(200);
                expect(res.body[0]).toMatchObject({title: 'Movie 1'});
            });
        });
        it("should return two matching movies", async () => {
            const res = await request(server).get("/movies/search?query=Drama");
            expect(res.statusCode).toEqual(200);
            expect(res.body[0]).toMatchObject({ title: 'Movie 1' });
            expect(res.body[1]).toMatchObject({ title: 'Movie 2' });
        });
        it("should return an empty array if no match", async () => {
            const res = await request(server).get("/movies/search?query=randomSearchTerm");
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveLength(0);
        });
    });

    describe('After login', () => {
        const testUser = {
            email: 'testuser@mail.com',
            password: 'somepassword'
        };
        const testMovie = {
            title: "Test Movie",
            actors: ["Test 1", "Test 2"],
            genre: ["Comedy"],
            synopsis: "A great movie",
            releaseYear: 2019,
            rating: "G",
            moviePicUrl: "https://pictures.url/testmovie.png"
        };
        let token1;
        beforeEach(async () => {
            await request(server).post("/login/signup").send(testUser);
            const resp = await request(server).post("/login").send(testUser);
            token1 = resp.body.token;
        });

        describe('POST /', () => {
            it('should send 200 and create movie object', async () => {
                const res = await request(server)
                    .post("/movies")
                    .set('Authorization', 'Bearer ' + token1)
                    .send(testMovie);
                expect(res.statusCode).toEqual(200);
                const newMovie = await Movie.findOne({ _id: res.body._id });
                expect(newMovie).toMatchObject({ title: 'Test Movie' });
            });
        });
        describe('PUT /:id', () => {
            it("should reject a bad id", async () => {
                const res = await request(server)
                    .put("/movies/12345")
                    .set('Authorization', 'Bearer ' + token1)
                    .send({ movie1 });
                expect(res.statusCode).toEqual(400);
            });
            it("should update a movie", async () => {
                const res = await request(server)
                    .put("/movies/" + savedMovies[1]._id)
                    .set('Authorization', 'Bearer ' + token1)
                    .send({ ...movie1, releaseYear: movie1.releaseYear++ });
                expect(res.statusCode).toEqual(200);
                const updatedMovie = await Movie.findById(savedMovies[1]._id).lean();
                expect(updatedMovie.releaseYear).toEqual(2022);
            });
        });
        describe('DELETE /:id', () => {
            it("should reject a bad id", async () => {
                const res = await request(server)
                    .delete("/movies/12345")
                    .set('Authorization', 'Bearer ' + token1)
                    .send();
                expect(res.statusCode).toEqual(400);
            });
            it("should delete a movie", async () => {
                const { _id } = savedMovies[1];
                const res = await request(server)
                    .delete("/movies/" + _id)
                    .set('Authorization', 'Bearer ' + token1)
                    .send();
                expect(res.statusCode).toEqual(200);
                const deletedMovie = await Movie.findOne({ _id });
                expect(deletedMovie).toBeNull();
            });
        });
    });
});