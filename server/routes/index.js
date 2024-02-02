const router = require('express').Router();
const userController = require('../controller/UserController');

router.post('/login', userController.logIn);
router.post('/signup', userController.signUp);

module.exports = router;