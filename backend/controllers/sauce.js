const Sauce = require('../models/Sauce');
const fs = require("fs");

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.thing);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error: error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ //Modifier un thing dans la BDD
            _id: req.params.id //Objet de comparaison
        }, {
            ...sauceObject, //Récupère le thing qui est dans le corps de la requête, l'id correspond a celui des paramètres
            _id: req.params.id //La nouvelle version de l'objet
        })
        .then(() => res.status(200).json({
            message: 'Sauce modifiée !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(res.status(200).json({ message: "Sauce supprimée" }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find() .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};
