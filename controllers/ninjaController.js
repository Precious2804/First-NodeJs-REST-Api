const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

const fetch_all_ninjas = (req, res, next) => {
    Ninja.find()
        .then((result) => {
            res.status(200).json({ status: true, message: "All ninjas retrieved", data: result })
        })
}

const geolocation_ninjas = (req, res, next) => {
    Ninja.aggregate([{
        $geoNear: {
            near: { type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)] },
            spherical: true, maxDistance: 100000, distanceField: "dist.calculated"
        }
    }])
        .then((result) => {
            res.status(200).json({ status: true, message: "Ninjas near me", data: result })
        })
}

const single_ninja = (req, res, next) => {
    Ninja.findOne({ _id: req.params.id }).then((ninja) => {
        if (ninja === null) {
            res.status(404).json({ status: true, message: "Not result found" })
        } else {
            Ninja.findById(req.params.id)
                .then((result) => {
                    res.status(200).json({ status: true, message: "Single Ninja retrieved", data: result })
                })
        }

    })
}

const create_ninja = (req, res, next) => {
    Ninja.create(req.body)
        .then((result) => {
            res.status(200).json({ status: true, message: "New Ninja created", data: result })
        })
        .catch(next)
}

const update_ninja = (req, res, next) => {
    Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then((result) => {
            if (result === null) {
                res.status(404).json({ status: true, message: "Failed to Update Ninja" })
            } else {
                Ninja.findOne({ _id: req.params.id }).then((result) => {
                    res.status(200).json({ status: true, message: "Ninja was updated succesfully", data: result })
                });
            }
        })
        .catch(next);
}

const delete_ninja = (req, res, next) => {
    Ninja.findByIdAndRemove({ _id: req.params.id })
        .then((result) => {
            if (result === null) {
                res.status(404).json({ status: true, message: "Failed to Delete Ninja" })
            } else {
                res.status(200).json({ status: true, message: "Ninja was deleted succesfully" })
            }
        })
        .catch(next);
}

module.exports = {
    fetch_all_ninjas,
    geolocation_ninjas,
    single_ninja,
    create_ninja,
    update_ninja,
    delete_ninja
}