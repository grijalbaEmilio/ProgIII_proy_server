const express = require('express')
const api = express.Router()
const controllerSubjects= require('../controllers/controller.subject')

api.post('/createSubject', controllerSubjects.createSubject)
api.get('/getSubject', controllerSubjects.getSubject)
api.get('/filterNumPiaa/:numPiaa', controllerSubjects.filterNumPiaa)
module.exports = api 