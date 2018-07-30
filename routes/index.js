const express = require('express');
const movieController = require('../controllers/movieController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

/* GET home page. */
router.get('/', movieController.homePage);

router.get('/movies', movieController.getMovies);
router.get('/filldata', movieController.fillData);
router.get('/playMovie', movieController.play);

router.get('/admin', authController.isLoggedIn, movieController.admin);
router.get('/admin/delete/:id', movieController.deleteMovie);
router.get('/admin/edit/:id', movieController.editMovie);
router.post('/admin/edit/:id', movieController.updateMovie);

router.get('/add', movieController.addMovie);
router.post('/add', movieController.createMovie);

router.get('/register', userController.register);
router.post('/register', userController.registerUser);

router.get('/login', userController.login);
router.post('/login', authController.login);

router.get('/logout', (req, res)=> {
    req.logout();
    res.redirect('/movies');
});
module.exports = router;
