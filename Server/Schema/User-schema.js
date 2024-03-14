import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(value) {
                    // Regular expression to validate email format
                    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
                    return regex.test(value);
                },
                message: 'Please enter a valid email address.'
            }
        },
        password: {
            type: String,
            required: true
        },
        terms: {
            type: Boolean,
            required: true
        },
        todos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Todo'
            }
        ]
    },

    {
        timestamps: true,
    }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;