const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(6)
.is().max(15)
.has().uppercase()
.has().lowercase()
.has().digits(1)
.has().not().spaces()

module.exports = passwordSchema;
