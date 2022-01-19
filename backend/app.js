const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const cors = require('cors');

// LOGIQUE POUR SE CONNECTER À MONGODB
mongoose
    .connect(
        "mongodb+srv://havatarr:JSfAReSN.0503@cluster0.ff3fs.mongodb.net/test", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/sauce', sauceRoutes);
//'Le début de la route', on utilise le router de sauceRoutes
app.use('/api/auth', userRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));
//indique à Express qu'il faut gérer la ressource images de manière statique (un sous-répertoire de notre répertoire de base, __dirname )
//à chaque fois qu'elle reçoit une requête vers la route /images

module.exports = app;
