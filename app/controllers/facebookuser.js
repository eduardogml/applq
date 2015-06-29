var sanitize = require('mongo-sanitize');

module.exports = function (app) {

  var Facebookuser = app.models.facebookuser;

  var controller = {};

  controller.salvaFacebookuser = function(req, res) {

    var transactionCode = req.body.transactionCode;

    var dados = {
      "useId": req.body.useId,
      "birthday": req.body.birthday,
      "email": req.body.email,
      "first_name": req.body.first_name,
      "last_name": req.body.last_name,
      "gender": req.body.gender,
      "link": req.body.link
    };

    Facebookuser.findOrCreate(dados, function(err, facebook, created){
      if(err) res.status(500).json(err);

      if(transactionCode){
        var _id = facebook._id;
        Facebookuser.findByIdAndUpdate(
          _id, 
          { $push: {transiction: transactionCode} }, 
          function(erro, doc){
            if(erro){
              res.status(500).json(erro);
            }else{
              res.status(201).json(doc);
            }
          });
      }else{
        res.status(201).json(facebook);
      }

    });
  };

  return controller;
};