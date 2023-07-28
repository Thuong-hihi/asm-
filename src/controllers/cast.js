import { casts } from "../../db";
import fs from 'fs'
import Joi from 'joi'

export const getAllCasts = function (req, res) {
    if (casts) {
        res.status(200).send(casts)
    } else {
        res.status(500).send({
            message: "Server internal errors"
        })
    }
    res.end()
}

export const getCastsById = function (req, res) {
    const { id } = req.params;
    const casts = casts.find(c => c.id == id);
    if (!casts) {
        // Nếu không tìm thấy bộ phim với ID đã cho, trả về phản hồi 404 Not Found
        return res.status(404).json({ error: 'Không tìm thấy diễn viên' });
      }
    
      // Nếu tìm thấy bộ phim, trả về phản hồi 200 OK với dữ liệu của bộ phim
      res.status(200).json(casts);
    };
  
export const addCasts = function (req, res) {
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

export const createCasts = function (req, res) {
    req.body.id = Date.now();
    const { error, value } = schema.validate(req.body);
    if (error) {
        res.status(400).send({
            message: error.details[0].message
        });
    } else {
        const newCast = { ...value };
        casts.push(newCast);
        res.status(200).json(newCast);
    }
  };
  
// PUT/update a Movie
export const updateCasts = function (req, res) {
    const id = parseInt(req.params.id);
    req.body.id = id;
    const updatedCasts = req.body;
    const castsIndex = casts.findIndex(c => c.id === id);

    if (castsIndex !== -1) {
        const { error, value } = schema.validate(updatedCasts);
        if (error) {
            res.status(400).send({
                message: error.details[0].message
            });
        } else {
        casts[castsIndex] = { ...casts[castsIndex], ... value};
        res.send(casts[castsIndex]);
        }
    } else {
        res.status(404).send('Casts not found');
    }
};

  // DELETE a Movie
  export const deleteCasts = function (req, res) {
    const id = parseInt(req.params.id);
    const castsIndex = casts.findIndex(c => c.id === id);
    if (castsIndex !== -1) {
        const deletedCasts = casts.splice(castsIndex, 1);
        res.status(200).json("Xóa thành công");
    } else {
        res.status(404).send('Casts not found');
    }
};
