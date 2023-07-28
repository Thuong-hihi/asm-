import { genres } from "../../db";
import fs from 'fs'
import Joi from 'joi'

export const getAllGenres = function (req, res) {
    if (genres) {
        res.status(200).send(genres)
    } else {
        res.status(500).send({
            message: "Server internal errors"
        })
    }
    res.end()
}
export const getGenresById = function (req, res) {
    const { id } = req.params;
    const genres = genres.find(c => c.id == id);
    if (!genres) {
        // Nếu không tìm thấy bộ phim với ID đã cho, trả về phản hồi 404 Not Found
        return res.status(404).json({ error: 'Không tìm thấy thể loại' });
      }
    
      // Nếu tìm thấy bộ phim, trả về phản hồi 200 OK với dữ liệu của bộ phim
      res.status(200).json(genres);
    };
  

export const addGenres = function (req, res) {
    const html = fs.readFileSync('./src/pages/add.html', "utf-8");
    console.log(html);
    res.send(html)
    res.end()
}

    const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(10).required().messages({
        'string.empty': "{{#label}} dữ liệu bắt buộc",
        "string.min": "{{#label}} tối thiểu 10 ký tự"
    })
})
// genres: Joi.array().items(Joi.string()).min(1)

export const creatGenres= function (req, res) {
      req.body.id = Date.now();
  const { error, value } = schema.validate(req.body);
  if (error) {
      res.status(400).send({
          message: error.details[0].message
      });
  } else {
      const newGenres = { ...value };
      genres.push(newGenres);
      res.status(200).json(newGenres);
  }
};
// PUT/update a Movie
export const updateGenres = function (req, res) {
    const id = parseInt(req.params.id);
    req.body.id = id;
    const updatedGenres = req.body;
    const genresIndex = genres.findIndex(c => c.id === id);

    if (genresIndex !== -1) {
        const { error, value } = schema.validate(updatedGenres);
        if (error) {
            res.status(400).send({
                message: error.details[0].message
            });
        } else {
        genres[genresIndex] = { ...genres[genresIndex], ...value };
        res.send(genres[genresIndex]);
        }
    } else {
        res.status(404).send('genres not found');
    }
};

  // DELETE a Movie
  export const deleteGenres = function (req, res) {
    const id = parseInt(req.params.id);
    const genresIndex = genres.findIndex(c => c.id === id);
    if (genresIndex !== -1) {
        const deletedGenres = genres.splice(genresIndex, 1);
        res.status(200).json("Xóa thành công");
    } else {
        res.status(404).send('genres not found');
    }
};
