const router = require('express').Router();
const userController = require('../controller/UserController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', userController.logIn);
router.post('/signup', userController.signUp);
router.get('/statistic', authMiddleware, userController.getStatistic);

router.get('/shot', authMiddleware, userController.addShot);
router.get('/hit', authMiddleware, userController.addHit);
router.get('/battle', authMiddleware, userController.addBattle);
router.get('/winning', authMiddleware, userController.addWinningBattle);
router.get('/losing', authMiddleware, userController.addLosingBattle);

module.exports = router;