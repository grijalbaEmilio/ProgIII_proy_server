const mongoose = require("mongoose");
const app = require("./app");
const PORT_SERVER = process.env.PORT || 3977;
const { API_VERSIO, IP_SERVER, PORT_DB, API_VERESION } = require("./config");


/* mongoose.connect()
    .then(() => {
            // Cuando se realiza la conexión, lanzamos este mensaje por consola
        console.log('La conexióòn a MongoDB se ha realizado correctamente!!');
    })
    .catch(err => null); */
    // Si no se conecta correctamente escupimos el error

/*`mongodb://${IP_SERVER}:${PORT_DB}/proyect_db`*/
mongoose.connect(
  `mongodb+srv://username:username@cluster0.egnxu.mongodb.net/test`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Succes conection to db");
      
      app.listen(PORT_SERVER, () => {
        console.log("se esta escuchando el puerto", PORT_SERVER);
        console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERESION}/`);
      });
    }
  }
);

//mongoose.connect(`mongodb+srv://username:username@cluster0.egnxu.mongodb.net/test`).then((data)=>console.log(`mongodb://${IP_SERVER}:${PORT_DB}/proyect_db`))
