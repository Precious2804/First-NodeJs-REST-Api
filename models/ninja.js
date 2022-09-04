const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create geolocation Schema
const GeoSchema = new Schema({
    type:{
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
})

//create ninja schema on model
const ninjaSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field is required"]
    },
    rank: {
        type: String,
        required: [true, "Rank is required"]
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema

    //add in geo location
}, { timestamps: true })

const Ninja = mongoose.model('ninja', ninjaSchema)
module.exports = Ninja;