const express = require('express')
const UserController = require('../controllers/cotroller.user')
const api = express.Router()

const Model = require('../models/user.model')

//const userServices = require('../services/users.services')
//const service = new userServices()
//console.log(UserController.singUp)
//console.log('function-->', UserController.signUp);
api.post('/signup', UserController.signUp)

api.post('/signin', UserController.signIn)

module.exports = api

/* Router.post('/user', (req, res, next)=>{
    talently
})

Router.get('/', (req, res, next)=>{
    res.send(service.get())
})

Router.get('/:id', (req, res, next)=>{
    const {id} = req.params
    res.json({id:id})
})

module.exports = Router; */