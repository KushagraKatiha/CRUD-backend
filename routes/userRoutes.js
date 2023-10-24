const express = require('express');
const { home, addUser, getUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', home);
router.post('/adduser', addUser)
router.post('/getuser', getUser)



module.exports = router;