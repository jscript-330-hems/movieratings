const { Router } = require('express');
const router = Router();
const { isAuthorized, isAdmin } = require('../middleware/auth');


const theaterDAO = require('../daos/theaters');


// Get all theaters
router.get('/', async (req, res, next) => {
  try {
    const theaters = await theaterDAO.getAllTheaters();
    res.json(theaters);
  } catch (e) {
    next(e);
  }
})

// Get movies by theater id 
router.get('/:id/movies', async (req, res, next) => {
  try {
    const movies = await theaterDAO.getMoviesByTheaterId(req.params.id);
    if (!movies) {
      res.status(400).send('Invalid ID');    
    } else if (movies.length === 0) {
      res.status(404).send('Theater not found');
    } else {
      res.json(movies);
    }
  } catch (e) {
    next(e);
  }
})

// Get theaters by zip code
router.get('/zipcode/:id', async (req, res, next) => {
  try {
    let { page, perPage } = req.query;
    page = page ? Number(page): 1;
    perPage = perPage ? Number(perPage): 10;
    const theaters = await theaterDAO.searchByZip(page, perPage, req.params.id);
    res.json(theaters);
  } catch (e) {
    next(e);
  }
})

router.use(isAuthorized);

// Create theater (admin privileges required)
router.post('/', isAdmin, async (req, res, next) => {
  const theater = req.body;
  if (!theater || JSON.stringify(theater) === '{}') {
    res.status(400).send('Theater is required');
  } else {
      try {
        const savedTheater = await theaterDAO.createTheater(theater);
        res.json(savedTheater); 
      } catch (e) {
        next(e);
      } 
  }
})

// Update theater (admin privileges required)
router.put('/:id', isAdmin, async (req, res, next) => {
  const theaterId = req.params.id;
  try {
      const updatedTheater = await theaterDAO.updateTheaterById(theaterId, req.body);
      if (updatedTheater) {
        res.status(200).send('Successfully updated');
      } else {
        res.sendStatus(400);
      }
  } catch (e) {
    next(e);
  }
})

// Delete theater (admin privileges required)
router.delete('/:id', isAdmin, async (req, res, next) => {
  try { 
    const theater = await theaterDAO.deleteTheaterById(req.params.id);
    if (theater) {
      res.status(200).send('Successfully deleted');
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    next(e);
  }
})

module.exports = router
