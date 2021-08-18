const { Router } = require("express")
const router = Router()

const movieDAO = require('../daos/movies');
const { isAuthorized } = require('../middleware/auth');
const { handleErrors } = require('../middleware/errorhandler');

// Read - Single movie in theaters
router.get("/:id/theaters", async (req, res, next) => {
  try {
    const theater = await movieDAO.getTheaterByMovieId(req.params.id);
    if (theater) {
      res.json(theater);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

// Read - search
router.get("/search", async (req, res, next) => {
    try {
      let { page, perPage, query } = req.query;
      page = page ? Number(page) : 1;
      perPage = perPage ? Number(perPage) : 10;
      const movies = await movieDAO.search(page, perPage, query);
      res.json(movies);
    } catch (e) {
      next(e);
    }
  });

// Read - Single movie
router.get("/:id", async (req, res, next) => {
    try {
      const movie = await movieDAO.getMovieById(req.params.id);
      if (movie) {
        res.json(movie);
      } else {
        res.sendStatus(404);
      }
    } catch (e) {
      next(e);
    }
  });

// Read - All movies
router.get("/", async (req, res, next) => {
  let { page, perPage } = req.query;
  page = page ? Number(page) : 1;
  perPage = perPage ? Number(perPage) : 10;
  try {
    const savedMovies = await movieDAO.getAllMovies(page, perPage);
    res.json(savedMovies);
  } catch (e) {
    next(e);
  }
});

// Create
router.post("/", isAuthorized, async (req, res, next) => {
    try {
      const created = await movieDAO.create(req.body);
      res.json(created);
    } catch (e) {
      next(e);
    }
  });

// Update
router.put("/:id", isAuthorized, async (req, res, next) => {
  try {
    const updated = await movieDAO.updateMovie(req.params.id, req.body);
    if (updated) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    next(e);
  }
});

// Delete
router.delete("/:id", isAuthorized, async (req, res, next) => {
    try {
      const deleted = await movieDAO.deleteMovieById(req.params.id);
      res.sendStatus(deleted ? 200 : 400);
    } catch(e) {
      next(e);
    }
  });

// Error handle middleware
router.use(handleErrors);

module.exports = router