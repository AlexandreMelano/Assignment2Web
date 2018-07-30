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

/*add & create controller*/
router.get('/add', movieController.addMovie);
router.post('/add', movieController.createMovie);

/*register get & post*/
router.get('/register', userController.register);
router.post('/register', userController.registerUser);

/*login & logout*/
router.get('/login', userController.login);
router.post('/login', authController.login);

router.get('/logout', (req, res)=> {
    req.logout();
    res.redirect('/movies');
});

/*google access*/
router.get('/google', authController.googlePre);
router.get('/google/callback', authController.googlePost);
/*github access*/
router.get('/github', authController.githubPre);
router.get('/github/callback', authController.githubPost);

module.exports = router;
