const express = require('express');
const { home, addUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', home);
router.post('/adduser', addUser)



module.exports = router;