const express = require('express')
const router = express.Router()
const FilmController = require('../controller/film_controller')

router.get('/', FilmController.getAll)
router.get('/:id', FilmController.getOne)
router.post('/', FilmController.create)
router.put('/:id', FilmController.update)
router.delete('/:id', FilmController.delete)

module.exports = router;