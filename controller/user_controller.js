const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {

    static async getAll(req, res, next) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    static async register(req, res, next) {
        try {
            const { email, name, password } = req.body;

            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user in the database
            const newUser = await User.create({ email, name, password: hashedPassword, });

            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // Find the user by email
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Compare the provided password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate a JSON Web Token (JWT) for authentication
            const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
