//librería para encriptar password
const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user.model");
const jwt = require("../services/jwt");

function signUp(req, res) {
  //console.log('inicial --->',User(req.body));
  const user = new User();
  const { name_user, lastname, email, password, repeatPassword } = req.body;
  user.name_user = name_user;
  user.lastname = lastname;
  user.email = email;
  /* por defecto almacenamos rol y si es un usuario o no */
  user.role = "admin";
  user.active = true;
  console.log("final --->", user);
  /* si no exixte una de las password */
  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Las contraseñas son obligatorias" });
  } else {
    if (password !== repeatPassword) {
      res.status(404).json({ message: "Las cotraseñas no coinciden" });
    } else {
      bcrypt.hash(password, null, null, (err, hash) => {
        if (err) {
          res.status(500).json({ message: "Error al encriptar contraseña" });
        } else {
          user.password = hash;
          user.save((err, userStored) => {
            if (err) {
              res.status(500).json({ message: "El usuario ya existe." });
            } else {
              if (!userStored) {
                res.ststus(400).json({ message: "Error al crear el usuario." });
              } else {
                res.status(200).json({ user: userStored });
              }
            }
          });
        }
      });
    }
  }
}

const signIn = (req, res) => {
  console.log("Login correcto");

  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;
  console.log(params);
  User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor." });
    } else {
      if (!userStored) {
        res.status(400).send({ message: "Usuario no encontrado." });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: "Error en el servidor." });
          } else if (!check) {
            res.status(404).send({ message: "La contraseña es incorrecta." });
          } else {
            if (!userStored.active) {
              res
                .status(200)
                .send({ message: "El usuario no se ha activado." });
            } else {
              console.log(userStored);
              res.status(200).send({
                accessToken: jwt.createAccesWidthtoken(userStored),
                refeshToken: jwt.createRefreshToken(userStored),
              });
            }
          }
        });
      }
    }
  });
};

module.exports = { signUp, signIn };
