import fs from 'fs'
import Joi from 'joi'
import {movies} from '../../db';

// Model

// Controller

export const getAllMovies = function (req, res) {
    if (movies) {
        res.status(200).send(movies)
    } else {
        res.status(500).send({
            message: "Server internal errors"
        })
    }
    res.end()
}

export const getMovieById = function (req, res) {
    const { id } = req.params;
    const movie = movies.find((m) => m.id == id);
  
    if (!movie) {
      // Nếu không tìm thấy bộ phim với ID đã cho, trả về phản hồi 404 Not Found
      return res.status(404).json({ error: 'Không tìm thấy bộ phim' });
    }
  
    // Nếu tìm thấy bộ phim, trả về phản hồi 200 OK với dữ liệu của bộ phim
    res.status(200).json(movie);
  };

export const addMoviePage = function (req, res) {
    const html = fs.readFileSync('./src/pages/add.html', "utf-8");
    console.log(html);
    res.send(html)
    res.end()
}

const schema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().min(10).required().messages({
      'string.empty': '{{#label}} là trường bắt buộc',
      'string.min': '{{#label}} phải có ít nhất {{#limit}} ký tự'
  }),
  year: Joi.number().required().min(1900).max(new Date().getFullYear()),
  cast: Joi.array().items(Joi.string()).min(1).required(),
  genres: Joi.array().items(Joi.string()).min(1).required(),
  href: Joi.string().required(),
  extract: Joi.string().required(),
  thumbnail: Joi.string().uri().required()
});

export const createMovie = function (req, res) {
  req.body.id = Date.now();
  const { error, value } = schema.validate(req.body);
  if (error) {
      res.status(400).send({
          message: error.details[0].message
      });
  } else {
      const newMovie = { ...value };
      movies.push(newMovie);
      res.status(200).json(newMovie);
  }
};

export const updateMoviePage= function (req, res) {
  const id = parseInt(req.params.id);
  req.body.id = id;
  const updatedMovie = req.body;
  const movieIndex = movies.findIndex(m => m.id === id);

  if (movieIndex !== -1) {
      const { error, value } = schema.validate(updatedMovie);
      if (error) {
          res.status(400).send({
              message: error.details[0].message
          });
      } else {
          movies[movieIndex] = { ...movies[movieIndex], ...value };
          res.send(movies[movieIndex]);
      }
  } else {
      res.status(404).send('Movie not found');
  }
};

  // DELETE a Movie
export const deleteMoviePage= function (req, res) {
    const id = parseInt(req.params.id);
    const movieIndex = movies.findIndex(movie => movie.id === id);
    if (movieIndex !== -1) {
      const deletedMovie = movies.splice(movieIndex, 1);
    //   res.send(deletedMovie[0]);
        res.status(200).json("Xoa thanh cong")
    } else {
      res.status(404).send('Movie not found');
    }
  };