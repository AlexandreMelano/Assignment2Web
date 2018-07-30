const Movie = require('../models/Movie');
const url = require('url');

exports.homePage = (req, res) => {
  res.render('index', { title: 'Home' });
};

exports.getMovies = (req, res) => {
  Movie.find((err, movies) => {
    if (err) {
      res.render('error');
    } else {
      res.render('movies', {
        title: 'All Movies',
        movies,
        user: req.user,
      });
    }
  });
};

exports.admin = async (req, res) => {
  // use Movie model to query db for Movie data
  const movies = await Movie.find().sort({ title: 'asc' });

  res.render('admin', {
    title: 'Admin',
    movies,
    user: req.user,
  });
};

exports.fillData = (req, res) => {
  const data = [
    {
      title: 'Lord of the Rings: Fellowship of the Ring',
      director: 'Peter Jackson',
      imageUrl: 'https://images.991.com/large_image/The+Lord+Of+The+Rings+The+Fellowship+Of+The+Ring-208554.jpg',
      year: 2001,
    },
    {
      title: 'Lord of the Rings: The Two Towers',
      director: 'Peter Jackson',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/ad/Lord_of_the_Rings_-_The_Two_Towers.jpg',
      year: 2002,
    },
    {
      title: 'Lord of the Rings: The Return of the King',
      director: 'Peter Jackson',
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg',
      year: 2003,
    },
  ];

  Movie.collection.insertMany(data);
  res.redirect('/admin');
};

exports.addMovie = (req, res) => {
  res.render('addMovie', {
    title: 'Add Movie',
  });
};

exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.redirect('/Movies');
  } catch (err) {
    console.log(err);
  }
};

exports.play = (req, res) => {
  const moviePassed = url.parse(req.url, true).query;
  res.render('playMovie', {
    title: moviePassed.movie,
  });
};

exports.deleteMovie = (req, res) => {
  Movie.findByIdAndRemove(
    { _id: req.params.id },
    async (err, movieJustDeleted) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/admin');
      }
    },
  );
};

exports.editMovie = (req, res, next) => {
  // use Movie model to find the selected document
  Movie.findById({ _id: req.params.id }, (err, movie) => {
    if (err) {
      console.log(err);
    } else {
      res.render('editMovie', {
        title: 'Edit',
        movie,
        isActive: 'admin',
      });
    }
  });
};

exports.updateMovie = (req, res) => {
  // get year from last 4 characters of imageURL
  req.body.year = req.body.imageUrl.substr(-4);

  Movie.update({ _id: req.params.id }, req.body, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/admin');
    }
  });
};
