const express = require('express')
const router = express.Router()
const userrouter = require('./user.routes')
const useApp = (app)=>{
    app.use('/api/v1', router)
    router.use('/users',userrouter)
}

module.exports = useApp