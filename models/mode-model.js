const mongoose = require('mongoose');

const modeSchema = new mongoose.Schema({
    mode: {
        type: Boolean,
    }
})

const Mode = mongoose.model("Mode", modeSchema);

module.exports = Mode;