const request = require("supertest");

const server = require("../server");
const testUtils = require("../test-utils");

const User = require("../models/user");
const Movie = require("../models/movie");
const Review = require("../models/review");

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
    moviePicUrl: "https://pictures.url/movie1.png",
  };
  const movie2 = {
    title: "Movie 2",
    actors: ["Actor One", "Actor Two"],
    genre: ["Crime", "Drama"],
    synopsis: "Movie two synopsis.",
    releaseYear: 2021,
    rating: "R",
    moviePicUrl: "https://pictures.url/movie2.png",
  };

  beforeEach(async () => {
    savedMovies = (await Movie.insertMany([movie1, movie2])).map((i) =>
      i.toJSON()
    );
    review1.movieId = savedMovies[0]._id;
    review2.movieId = savedMovies[0]._id;
    review3.movieId = savedMovies[1]._id;
    savedReview = (
      await Review.insertMany([review1, review2, review3])
    ).map((i) => i.toJSON());
  });

  describe("Before login", () => {
    describe("POST /", () => {
      it("should send 401 without a token", async () => {
        const res = await request(server).post("/reviews").send(savedReview[0]);
        expect(res.statusCode).toEqual(401);
      });
      it("should send 401 with a bad token", async () => {
        const res = await request(server)
          .post("/reviews")
          .set("Authorization", "Bearer BAD")
          .send(savedReview[0]);
        expect(res.statusCode).toEqual(401);
      });
    });
    describe("GET /movie/:id", () => {
      it("should send 200 and reviews with a correct movie ID", async () => {
        const res = await request(server).get(
          "/reviews/movie/" + savedMovies[0]._id
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toMatchObject({ review: "Review 1 for movie 1" });
        expect(res.body[1]).toMatchObject({ review: "Review 2 for movie 1" });
      });
      it("should send 404 with wrong movie ID", async () => {
        const res = await request(server).get("/reviews/movie/12345");
        expect(res.statusCode).toEqual(404);
      });
    });
    describe("DELETE /:id", () => {
      it("should send 401 without a token", async () => {
        const res = await request(server)
          .delete("/reviews/" + savedReview[1]._id)
          .send();
        expect(res.statusCode).toEqual(401);
      });
      it("should send 401 with a bad token", async () => {
        const res = await request(server)
          .delete("/theaters/" + savedReview[1]._id)
          .set("Authorization", "Bearer BAD")
          .send();
        expect(res.statusCode).toEqual(401);
      });
    });
  });

  describe("After login", () => {
    const testUser = {
      email: "testuser@mail.com",
      password: "somepassword",
    };
    const testAdmin = {
      email: "admin@mail.com",
      password: "iamsuperuser",
    };
    const testReview = {
      score: 5,
      review: "This is a review of movie1",
    };
    let token1, adminToken;
    beforeEach(async () => {
      await request(server).post("/login/signup").send(testUser);
      const resp1 = await request(server).post("/login").send(testUser);
      token1 = resp1.body.token;
      await request(server).post("/login/signup").send(testAdmin);
      await User.updateOne(
        { email: testAdmin.email },
        { $push: { roles: "admin" } }
      );
      const resp2 = await request(server).post("/login").send(testAdmin);
      adminToken = resp2.body.token;
    });

    describe("POST /", () => {
      it("should reject a bad id", async () => {
        testReview.movieId = 12345;
        const res = await request(server)
          .post("/reviews")
          .set("Authorization", "Bearer " + token1)
          .send();
        expect(res.statusCode).toEqual(400);
      });
      it("should send 200 and create review object", async () => {
        testReview.movieId = savedMovies[0]._id;
        const res = await request(server)
          .post("/reviews")
          .set("Authorization", "Bearer " + token1)
          .send(testReview);
        expect(res.statusCode).toEqual(200);
        const newReview = await Review.findOne({ _id: res.body._id });
        expect(newReview).toMatchObject({
          movieId: savedMovies[0]._id,
        });
      });
    });

    describe("DELETE /:id", () => {
      it("should reject a bad id", async () => {
        const res = await request(server)
          .delete("/reviews/12345")
          .set("Authorization", "Bearer " + adminToken)
          .send();
        expect(res.statusCode).toEqual(400);
      });
      it("should send 403 with non-admin user", async () => {
        const res = await request(server)
          .delete("/reviews/" + savedReview[0]._id)
          .set("Authorization", "Bearer " + token1)
          .send();
        expect(res.statusCode).toEqual(403);
      });
      it("should delete a review", async () => {
        const res = await request(server)
          .delete("/reviews/" + savedReview[1]._id)
          .set("Authorization", "Bearer " + adminToken)
          .send();
        expect(res.statusCode).toEqual(200);
        const deletedReview = await Review.findOne(savedReview[1]._id);
        expect(deletedReview).toBeNull();
      });
    });
  });
});
