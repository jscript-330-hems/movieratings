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

// Get theaters by movie ID
router.get('/:id', async (req, res, next) => {
  try {
    const theaters = await theaterDAO.getTheaterById(req.params.id);
    res.json(theaters);
  } catch (e) {
    next(e);
  }
})

// Get theaters by zip code (query?)
router.get('/search', async (req, res, next) => {
  try {
    let { page, perPage, query } = req.query;
    page = page ? Number(page): 0;
    perPage = perPage ? Number(perPage): 10;
    const theaters = await theaterDAO.searchByZip(page, perPage, query);
    res.json(theaters);
  } catch (e) {
    next(e);
  }
})

router.use(isAuthorized); // Not sure if this should be included - do we only want users who log into be able to access theaters?

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

module.exports = router

