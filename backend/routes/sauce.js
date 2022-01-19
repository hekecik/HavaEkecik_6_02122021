const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

router.post('/', auth, multer, sauceCtrl.createSauce);

// MODIFIER
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

// SUPPRIMER
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// RECUPERER UN OBJET
router.get('/:id', auth, sauceCtrl.getOneSauce);

// RECUPERER TOUT LES OBJETS
router.get('/', auth, sauceCtrl.getAllSauce);


module.exports = router;
