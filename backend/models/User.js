const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //PACKAGE INSTALLÉ DE MONGOOSE

// CREATION DU SCHEMA EN UTILISANT LA METHODE SCHEMA() DE MONGOOSE
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // IMPOSSIBLE DE S'INSCRIRE +EURS FOIS AVEC LE MEME MAIL + PACKAGE UNIQUEVALIDATOR POUR EVITER DES ERREURS ILLISIBLES DE MONGODB
    },
    password: {
        type: String, // HASH DE TYPE STRING
        required: true
    }
});

userSchema.plugin(uniqueValidator); // ON RAJOUTE CE VALIDATOR COMME PLUGIN A NOTRE SCHEMA

module.exports = mongoose.model('User', userSchema); // PUIS EXPORTATION DU SCHEMA SOUS FORME DE MODEL
