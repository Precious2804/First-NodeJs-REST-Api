const express = require('express')
const routes = require('./routes/api')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
//setup express app
const app = express();

//connect to mongoDb
const url = 'mongodb://localhost/ninjago'
mongoose.connect(url, { useNewUrlParser: true })

app.use(express.static('public'));

//initialize body parser
app.use(bodyParser.json())

//initialize routes
app.use('/api', routes)

//error handling middleware
app.use((err, req, res, next) => {
    res.status(422).json({ status: false, message: err.message });
})

//Route does not exist
app.use((req, res) => {
    res.status(404).json({ status: false, message: 'Route does not exist' })
})

//listen to request from port
app.listen(process.env.port || 3000, () => {
    console.log('listening for requests on port 3000')
})