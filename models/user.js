const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
})
module.exports = mongoose.model('User', userSchema);