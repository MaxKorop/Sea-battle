const router = require('express').Router();
const userController = require('../controller/UserController');

router.post('/login', userController.logIn);
router.post('/signup', userController.signUp);
router.get('/statistic', userController.getStatistic);

module.exports = router;