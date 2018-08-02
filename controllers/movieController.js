const Movie = require('../models/Movie');
const url = require('url');

exports.homePage = (req, res) => {
  res.render('index', { title: 'Home' });
};
/*get movies from DB*/
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

/*get movies from DB*/
exports.getMoviesApi = (req, res) => {
  Movie.find((err, movies) => {
    if (err) {
      res.json({message: 'error!'});
    } else {
      res.json(movies);
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
/*fill data for testing*/
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
/* add movie */
exports.addMovie = (req, res) => {
  res.render('addMovie', {
    title: 'Add Movie',
  });
};
/* Create a movie entry*/
exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.redirect('/movies');
  } catch (err) {
    console.log(err);
  }
};
/*to use if movies trailers are included*/
exports.play = (req, res) => {
  const moviePassed = url.parse(req.url, true).query;
  res.render('playMovie', {
    title: moviePassed.movie,
  });
};
/* delete*/
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
  

  Movie.update({ _id: req.params.id }, req.body, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/admin');
    }
  });
};
