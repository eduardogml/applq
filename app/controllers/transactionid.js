var sanitize = require('mongo-sanitize');

module.exports = function (app) {

  var Transactionid = app.models.transactionid;

  var controller = {}

  controller.listaTransactionids = function(req, res) {
    
    Transactionid.find().populate('cupons').exec()
    .then(
      function(transactionids) {
         res.json(transactionids);
       },
       function(erro) {
         console.error(erro)
         res.status(500).json(erro);
       } 
    );    
  };
  
  controller.obtemTransactionid = function(req, res) {

    var _id = req.params.id;
    Transactionid.findById(_id).populate('cupons').exec()
    .then(
      function(transactionid) {
        if (!transactionid) throw new Error("Transactionid não encontrada");
        res.json(transactionid)     
      }, 
      function(erro) {
        console.log(erro);
        res.status(404).json(erro)
      }
    );    
  };

  controller.removeTransactionid = function(req, res) { 

    var _id = sanitize(req.params.id);

    Transactionid.remove({"_id" : _id}).exec()
    .then(
      function() {
        res.end();  
      }, 
      function(erro) {
        return console.error(erro);
      }
    );
  };

  controller.salvaTransactionid = function(req, res) {

    var _id = req.body._id;

    var dados = { 
      "id" : req.body.id, 
      "qtdmudas" : req.body.qtdmudas, 
      "facebookname" : req.body.facebookname || null,
      "facebookidapp" : req.body.facebookidapp || null,
      "facebookemail" : req.body.facebookemail || null,
      "facebooklink" : req.body.facebooklink || null,
      "cupons" : req.body.cupons || null
    };

    if(_id) {
     Transactionid.findByIdAndUpdate(_id, dados).exec()
     .then(
      function(transactionid) {
        res.json(transactionid);
      }, 
      function(erro) {
        console.error(erro)
        res.status(500).json(erro);
      }
     );
    } else {
      Transactionid.create(dados)
      .then(
        function(transactionid) {
          res.status(201).json(transactionid);
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