import jwt from 'jsonwebtoken';
import User from '../Schema/User-schema.js';



const signup = async (req, res) => {
    const { email, password, confirm_password, terms } = req.body;

    try {
        // Check if any required field is empty
        if (!email || !password || !confirm_password || !terms) {
            throw new Error('All fields are required');
        }

        // Check if password is at least 8 characters long
        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }

        // Validate password match
        if (password !== confirm_password) {
            throw new Error('Passwords and confirm_password do not match');
        }

        // Check if the user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            const isauser = await userExists.matchPassword(password)
            if (isauser) {
                const token = jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET);
                return res.status(201).json({
                    user: {
                        _id: userExists._id,
                        email: userExists.email,
                    },
                    token
                });
            } else {
                throw new Error('incorrect Password');
            }

        }

        // Create the user
        const user = await User.create({
            email,
            password,
            terms
        });

        // If user is created, generate a token and send user info
        if (user) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            return res.status(201).json({
                user: {
                    _id: user._id,
                    email: user.email,
                },
                token
            });
        }
    } catch (err) {
        console.error(err.message); // Log error for debugging
        res.status(err.status || 400).json({ message: err.message });
    }
};


const fake = (req, res) => {
    res.send("hello world!");
}


export { signup, fake };

