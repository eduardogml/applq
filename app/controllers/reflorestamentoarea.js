var sanitize = require('mongo-sanitize');

module.exports = function (app) {

  var Reflorestamentoarea = app.models.reflorestamentoarea;

  var controller = {};

  controller.salvaReflorestamentoarea = function(req, res) {

    var _id = req.body._id;

    var dados = { 
      "nome" : req.body.nome, 
      "email" : req.body.email, 
      "cidade" : req.body.cidade,
      "estado" : req.body.estado,
      "telefone" : req.body.telefone,
      "tamanho" : req.body.tamanho,
      "motivo" : req.body.motivo
    };

    if(_id) {
     Reflorestamentoarea.findByIdAndUpdate(_id, dados).exec()
     .then(
      function(reflorestamentoarea) {
        res.json(reflorestamentoarea);
      }, 
      function(erro) {
        console.error(erro)
        res.status(500).json(erro);
      }
     );
    } else {
      Reflorestamentoarea.create(dados)
      .then(
        function(reflorestamentoarea) {
          res.status(201).json(reflorestamentoarea);
        }, 
        function(erro) {
          console.log(erro);
          res.status(500).json(erro);
        }
      );
    }
  };

  return controller;
};