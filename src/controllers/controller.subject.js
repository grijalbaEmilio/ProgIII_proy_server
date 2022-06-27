const Subject = require("../models/subject.mode");

// crea asignaturas
const createSubject = async (req, res) => {
    const subject = new Subject();
    const body = req.body
    const {
        department,
        academic_activity,
        activity_code,
        number_credits,
        piaa_version,
        piaa_status,
        file_number,
        file_date,
        theory_hours,
        offsite_hours,
        hourson_attendence_reprovals,
        last_chance,
        duration_semester,
        practical_hours,
        presential_teacher_hours,
        maximum_quotas,
        passing_score,
        weeks_duration
    } = body

    subject.department = department
    subject.academic_activity = academic_activity
    subject.activity_code = activity_code
    subject.number_credits = number_credits
    subject.piaa_version = piaa_version
    subject.piaa_status = piaa_status
    subject.file_number = file_number
    subject.file_date = file_date
    subject.theory_hours = theory_hours
    subject.offsite_hours = offsite_hours
    subject.hourson_attendence_reprovals = hourson_attendence_reprovals
    subject.last_chance = last_chance
    subject.duration_semester = duration_semester
    subject.practical_hours = practical_hours
    subject.presential_teacher_hours = presential_teacher_hours
    subject.maximum_quotas = maximum_quotas
    subject.passing_score = passing_score
    subject.weeks_duration = weeks_duration

    if (!department ||
        !academic_activity ||
        !activity_code ||
        !number_credits ||
        !piaa_version ||
        piaa_status == null ||
        !file_number ||
        !file_date ||
        !theory_hours ||
        !offsite_hours ||
        !hourson_attendence_reprovals ||
        last_chance == null ||
        !duration_semester ||
        !practical_hours ||
        !presential_teacher_hours ||
        !maximum_quotas ||
        !passing_score ||
        !weeks_duration) {
        res.status(404).json({ message: 'Todos los campos son requeridos !' })
    } else {
        const exists = await existsSubject(activity_code)
        if (exists) {
            res.status(500).json({ message: "La asignatura ya existe." });
        } else {
            subject.save((err, subjectStored) => {
                if (err) {
                    res.status(500).json({ message: err });
                } else {
                    if (!subjectStored) {
                        res.ststus(400).json({ message: "Error al crear la asignatura." });
                    } else {
                        res.status(200).json({ subject: subjectStored });
                    }
                }
            })
        }
    }
}

// retorna true si ya exixte la signatura
async function existsSubject(code) {
    let result = false
    const subjects = await Subject.find().then((data) => {
        return data
    })
    subjects.forEach((item) => {
        if (item.activity_code === code) {
            result = true
        }
    })
    return result
}

// muestra las asignaturas
const getSubject = (req, res) => {
    Subject.find().then((data) => {
        if (!data) {
            res.status(404).send({ message: "No se ha encontrado ninguna Asignatura" })
            return data
        } else {
            res.status(200).send({ data });
            return data
        }
    })
}

// filtra las asignaturas según la versión del piaa
const filterNumPiaa = (req, res) => {
    const { numPiaa } = req.params
    Subject.find({ piaa_version: numPiaa }).then((data) => {
        if(data.length == 0){
            res.status(404).send({ message: "No hay asignaturas con versión de piaa "+ numPiaa })
        }else{
            res.status(200).send({ data })
        }findOne
    })
}

//actualiza una asignatura dado su código
const updateSubject = (req, res) => {
    const {activitCyode} = req.params
    const body = req.body
    //console.log(body);
    Subject.findOneAndUpdate({ activity_code : activitCyode },body, (err, subjectData)=>{
        if(err || !subjectData){
            res.status(404).json({message : "Asignatura no encontrada."})
        }else{
            res.send({subjectData})
        }
    })
}

//elimina una asignatura
const deleteSubject = (req, res) => {
    const {idSubject} = req.params
    Subject.findByIdAndRemove(idSubject, (err, userDeleted) => {
        err
          ? res.status(500).send({ message: "Error del servidor." })
          : !userDeleted
            ? res.status(404).send({ message: "Asignatura no encontrada." })
            : res
              .status(200)
              .send({ message: "La asignatura ha sido eliminada correctamente." });
      });
}

module.exports = { createSubject, getSubject, filterNumPiaa, updateSubject, deleteSubject }