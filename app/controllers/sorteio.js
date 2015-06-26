var sanitize = require('mongo-sanitize');

module.exports = function (app) {

  var Sorteio = app.models.sorteio;

  var controller = {};

  controller.listaSorteios = function(req, res) {
    
    Sorteio.find().exec()
    .then(
      function(sorteios) {
         res.json(sorteios);
       },
       function(erro) {
         console.error(erro)
         res.status(500).json(erro);
       } 
    );
  };

  controller.obtemSorteio = function(req, res) {

    var _id = req.params.id;
    Sorteio.findById(_id).exec()
    .then(
      function(sorteio) {
        if (!sorteio){
          throw new Error("Sorteio não encontrado");
        }else{
          Cupon = app.models.cupon;
          Cupon.find({the_sorteio: sorteio._id}, function(err, cupons){
            if(cupons) sorteio.cupons = cupons;
            res.json(sorteio);
          });
        }
      }, 
      function(erro) {
        console.log(erro);
        res.status(404).json(erro)
      }
    );    
  };

  return controller;
};