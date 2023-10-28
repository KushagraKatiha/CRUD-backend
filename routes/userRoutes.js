const express = require('express');
const {addUser, getUser, delUser, updateUser, getAllUsers, userDetails, logOut } = require('../controllers/userController');
const authToken = require('../middleware/authToken');

const router = express.Router();

router.post('/adduser', addUser)
router.post('/getuser', getUser)
router.delete('/deleteuser',authToken, delUser)
router.patch('/updateuser',authToken, updateUser)
router.get('/getallusers', getAllUsers)
router.get('/userdetails',authToken, userDetails)
router.get('/logout',authToken, logOut)

module.exports = router;