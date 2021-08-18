const request = require("supertest");

const server = require("../server");
const testUtils = require('../test-utils');

const User = require('../models/user');
const Movie = require('../models/movie');
const Review = require('../models/review');

describe("/reviews", () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);
  
    afterEach(testUtils.clearDB);

    const review1 = { score: 7, review: "Review 1 for movie 1" };
    const review2 = { score: 8, review: "Review 2 for movie 1" };
    const review3 = { score: 9, review: "Review 3 for movie 2" };

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
        savedMovies = (await Movie.insertMany([movie1, movie2])).map(i => i.toJSON());
        review1.movieId = savedMovies[0]._id;
        review2.movieId = savedMovies[0]._id;
        review3.movieId = savedMovies[1]._id;
        savedReview = (await Review.insertMany([review1, review2, review3])).map(i => i.toJSON());
    });

    describe('Before login', () => {
        describe('POST /', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server).post("/reviews").send(savedReview[0]);
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server)
                    .post("/reviews")
                    .set('Authorization', 'Bearer BAD')
                    .send(savedReview[0]);
                expect(res.statusCode).toEqual(401);
            });
        });
        describe('GET /movie/:id', () => {
            it('should send 200 and reviews with a correct movie ID', async () => {
                const res = await request(server).get("/reviews/movie/" + savedMovies[0]._id);
                expect(res.statusCode).toEqual(200);
                expect(res.body[0]).toMatchObject({ review: "Review 1 for movie 1" });
                expect(res.body[1]).toMatchObject({ review: "Review 2 for movie 1" });
            });
            it('should send 404 with wrong movie ID', async () => {
                const res = await request(server).get("/reviews/movie/12345");
                expect(res.statusCode).toEqual(404);
            });
        });
    });
});