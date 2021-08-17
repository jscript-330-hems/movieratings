const { Router } = require("express")
const router = Router()

const reviewsDAO = require('../daos/reviews');
const { isAuthorized, isAdmin } =  require('../middleware/auth');
const { handleErrors } = require('../middleware/errorhandler');

// GET	/reviews/movie/:id
router.get("/movie/:id", async (req, res, next) => {
  const movieId = req.params.id;
  try {
    const reviews = await reviewsDAO.getReview(movieId);
    res.json(reviews);
  } catch (e) {
    next(e);
  }
});

// POST	/reviews/
router.post("/", isAuthorized, async (req, res, next) => {
  const review = req.body;
  try {
    const reviewCreated = await reviewsDAO.createReview(review);
    res.json(reviewCreated);
  } catch (e) {
    next(e);
  }
});

// DELETE	/reviews/:id
router.delete("/:id", isAuthorized, isAdmin, async (req, res, next) => {
  const reviewId = req.params.id;
  try {
    const reviewDeleted = await reviewsDAO.deleteReview(reviewId);
    if (reviewDeleted) {
      res.sendStatus(success ? 200 : 400);
    }
  } catch (e) {
    next(e);
  }  
});

// Error
router.use(handleErrors);

module.exports = router
