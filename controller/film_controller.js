const { Film } = require('../models');

class FilmController {
    static async getAll(req, res, next) {
        try {
            const films = await Film.findAll();
            res.status(200).json(films);
        } catch (error) {
            next(error);
        }
    }

    static async getOne(req, res, next) {
        try {
            const { id } = req.params;

            const film = await Film.findByPk(id);
            if (!film) {
                return res.status(404).json({ message: 'Film not found' });
            }
            res.status(200).json(film);
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            // Implement logic to create a film
            const newFilm = await Film.create(req.body); // Assuming you have the film data in the request body
            res.status(201).json(newFilm);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            // Implement logic to update a film
            const { id } = req.params;
            const [updatedRowsCount, updatedFilm] = await Film.update(req.body, {
                where: { id },
                returning: true, // Get the updated film
            });

            if (updatedRowsCount === 0) {
                return res.status(404).json({ message: 'Film not found' });
            }

            res.status(200).json(updatedFilm[0]);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            // Implement logic to delete a film
            const { id } = req.params;
            const deletedRowsCount = await Film.destroy({
                where: { id },
            });

            if (deletedRowsCount === 0) {
                return res.status(404).json({ message: 'Film not found' });
            }

            res.status(204).send(); // 204 No Content
        } catch (error) {
            next(error);
        }
    }
    static async uploadPhoto(req, res, next) {
        try {
            const { id } = req.params;
            const film = await Film.findByPk(id);

            if (!film) {
                return res.status(404).json({ message: 'Film not found' });
            }

            // Check if a file is present in the request
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            // Update the film record with the photo data
            film.photo = req.file.buffer; // Assuming 'photo' is the field where you store the photo in your Film model
            await film.save();

            res.status(200).json({ message: 'Photo uploaded successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = FilmController;
