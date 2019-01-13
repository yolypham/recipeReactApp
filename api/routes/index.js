const express = require("express");
const Router = express.Router;
const router = Router();

router.use('/auth', require('./auth'));
router.use('/recipes', require('./recipe').router);
router.use('/users', require('./user').router);


module.exports = router;
