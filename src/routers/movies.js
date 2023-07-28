import { Router } from 'express'
import { createMovie, deleteMoviePage, getAllMovies, getMovieById, updateMoviePage } from '../controllers/movies'
import multer from 'multer'

const router = Router()

const upload = multer({ dest: "public/uploads"});

router.get("/", getAllMovies)

router.post("/add", upload.single("avatar"), createMovie)

router.put("/update/:id", updateMoviePage) 

router.delete("/delete/:id",deleteMoviePage)

// Dynamic routing
router.get("/:id", getMovieById)

export default router