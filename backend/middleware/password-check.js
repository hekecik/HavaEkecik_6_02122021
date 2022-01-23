const passwordSchema = require('../models/Password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({
            message: 'Le mot de passe doit faire 6 caractères, avec une majuscule, une minuscule et au moins un chiffre.'
        });
    } else {
        next();
    }
};
