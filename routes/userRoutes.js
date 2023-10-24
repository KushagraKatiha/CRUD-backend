const express = require('express');
const { home, addUser, getUser, delUser, updateUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', home);
router.post('/adduser', addUser)
router.post('/getuser', getUser)
router.delete('/deleteuser', delUser)
router.patch('/updateuser', updateUser)

module.exports = router;