const express = require('express')
const router = express.Router()
const userrouter = require('./user.routes')
const subjectsRouter = require('./subject.routes')

const useApp = (app)=>{
    app.use('/api/v1', router)
    router.use('/users',userrouter)
    router.use('/subjects', subjectsRouter)
}

module.exports = useApp