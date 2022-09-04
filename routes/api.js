const express = require("express");
const Ninja = require("../models/ninja");
const router = express.Router();
const ninjaController = require('../controllers/ninjaController')

router.get('/', (req, res) => {
    res.status(200).json({ status: true, message: 'Welcome to my First Node Js REST API' })
})

// get a list of ninjas from the db
router.get('/ninjas', ninjaController.fetch_all_ninjas);

//get a list of ninjas based on geolocatio
router.get('/ninjas-near-me', ninjaController.geolocation_ninjas);

// get a single ninja from the db
router.get('/ninja/:id', ninjaController.single_ninja);

// add a new ninja to the db
router.post('/ninjas', ninjaController.create_ninja);

// update a ninja in the db
router.put('/ninjas/:id', ninjaController.update_ninja);

// delete a ninja from the db
router.delete('/ninjas/:id', ninjaController.delete_ninja);

module.exports = router;