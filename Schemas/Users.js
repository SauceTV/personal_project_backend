const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    firstName: {
        type: String
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);