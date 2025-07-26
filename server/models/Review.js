const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: {type: String, required: true},
    //rating: {type: Number, required: true, min: 1, max: 5},
    text: { type: String, required: true, maxlength: 1500}
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', ratingSchema);