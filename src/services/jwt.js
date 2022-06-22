const jwt = require("jwt-simple");
const moment = require("moment");
const SECRET_KEY = "clave-proia-2022";

/* cuncion para crear el token de acceso */
exports.createAccesWidthtoken = (user)=>{
    const payload = {
        id : user._id,
        user_name : user.name_user,
        lastname : user.lastname,
        email : user.email,
        role : user.role,
        /* fecha de expiración del token será en 12 horas */
        expiration_date : moment().add(12, 'hours').unix()
    }
    return jwt.encode(payload,  SECRET_KEY)
}

exports.createRefreshToken=(user)=>{
    const payload ={
        id : user._id,
        expiration_date : moment().add(30, 'days').unix()
    }
    return jwt.encode(payload,  SECRET_KEY)

}
/* Función qe decodifica cualquera de los dos tokens */

exports.decodedToken = (token)=>{
    return kwt.decoded(token, SECRET_KEY, true)
}


exports.createTokenSubject = () => {
    return jwt.encode(payload,  SECRET_KEY)
}