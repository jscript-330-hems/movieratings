const { Router } = require("express");
const router = Router();

router.use("/login", require('./login'));
router.use("/movies", require('./movies'));
router.use("/theaters", require('./theaters'));
router.use("/reviews", require('./reviews'));

module.exports = router;

