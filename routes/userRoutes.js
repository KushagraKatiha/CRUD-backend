const express = require('express');
const { home, addUser, getUser, delUser, updateUser, getAllUsers } = require('../controllers/userController');
const authToken = require('../middleware/authToken');

const router = express.Router();

router.get('/', home);
router.post('/adduser', addUser)
router.post('/getuser', getUser)
router.delete('/deleteuser',authToken, delUser)
router.patch('/updateuser',authToken, updateUser)
router.get('/getallusers', getAllUsers)

module.exports = router;