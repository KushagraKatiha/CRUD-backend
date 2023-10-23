const express = require('express');
const { home } = require('../controllers/userController');

const router = express.Router();

router.get('/', home);



module.exports = router;