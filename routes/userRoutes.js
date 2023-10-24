const express = require('express');
const { home, addUser, getUser, delUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', home);
router.post('/adduser', addUser)
router.post('/getuser', getUser)
router.delete('/deleteuser', delUser)

module.exports = router;