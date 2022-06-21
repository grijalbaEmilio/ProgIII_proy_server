const mongoose = require('mongoose')

const SubjectModel = mongoose.Schema({
    depatment : {
        type : String,
        require : true
    },
    academic_activity : {
        type : String,
        require : true
    },
    activity_code : {
        type : Number,
        require : true
    },
    number_code:{
        type : Number,
        require : true
    },
    piaa_version:{
        type : Number,
        require : true
    },
    file_number:{
        type : Number,
        require : true,
        month_file:{
            type : Number,
            require : true
        },
        year_file:{
            type : Number,
            require : true
        }
    },
    file_date:{
        type : Date,
        require : true
    },
    theory_hours:{
        type : Number,
        require : true
    },
    offsire_hours:{
        type : Number,
        require : true
    },
    hourson_attendence_reprovais:{
        type : Number,
        require : true
    },
    last_chance:{
        type : Boolean,
        require : true
    },
    

})

module.exports = mongoose.model('subject', SubjectModel)