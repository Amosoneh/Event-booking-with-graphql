const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    price: {
        type: 'number',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})
module.exports = mongoose.model('Event', eventSchema)