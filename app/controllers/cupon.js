var sanitize = require('mongo-sanitize');

module.exports = function (app) {

  var Cupon = app.models.cupon;
  var Sorteio = app.models.sorteio;

  var controller = {}

  controller.numerosParaSorteio = function(req, res){
    var _idSorteio = req.params.id;

    if(_idSorteio){
      query = Cupon.find({the_sorteio: _idSorteio}).select('numero');

      query.exec(function(err, numeros){
        if(err){
          res.status(500).json(err);
        }else{
          res.json(numeros);
        }
      });

    }else{
      res.status(404).end();
    }
  };

  controller.listaCupons = function(req, res) {
    
    Cupon.find().populate('the_sorteio').exec()
    .then(
      function(cupons) {
         res.json(cupons);
       },
       function(erro) {
         console.error(erro)
         res.status(500).json(erro);
       } 
    );    
  };
  
  controller.obtemCupon = function(req, res) {

    var _id = req.params.id;
    Cupon.findById(_id).exec()
    .then(
      function(cupon) {
        if (!cupon) throw new Error("Cupon não encontrada");
        res.json(cupon)     
      }, 
      function(erro) {
        console.log(erro);
        res.status(404).json(erro)
      }
    );    
  };

  controller.removeCupon = function(req, res) { 

    var _id = sanitize(req.params.id);

    Cupon.remove({"_id" : _id}).exec()
    .then(
      function() {
        res.end();  
      }, 
      function(erro) {
        return console.error(erro);
      }
    );
  };

  controller.salvaCupon = function(req, res) {

    var _id = req.body._id;

    var dados = { 
      "numero" : req.body.numero, 
      "created_at" : req.body.created_at, 
      "the_sorteio" : req.body.the_sorteio || null
    };

    if(_id) {
     Cupon.findByIdAndUpdate(_id, dados).exec()
     .then(
      function(cupon) {
        res.json(cupon);
      }, 
      function(erro) {
        console.error(erro)
        res.status(500).json(erro);
      }
     );
    } else {
      Cupon.create(dados)
      .then(
        function(cupon) {
          res.status(201).json(cupon);
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