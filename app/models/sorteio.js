var mongoose = require('mongoose');

function proximoSorteio(){

  var dataObj = new Date();
  var hoje = dataObj.getDay();
  var horaDoSorteio = 19;
  var minDoSorteio = 00;
  var segDoSorteio = 00;

  switch(hoje){
    case 0:
      dataObj.setDate(dataObj.getDate() + 6);
      dataObj.setHours(horaDoSorteio);
      dataObj.setMinutes(minDoSorteio);
      dataObj.setSeconds(segDoSorteio);
      break;
    case 1:
      dataObj.setDate(dataObj.getDate() + 5);
      dataObj.setHours(horaDoSorteio);
      dataObj.setMinutes(minDoSorteio);
      dataObj.setSeconds(segDoSorteio);
      break;
    case 2:
      dataObj.setDate(dataObj.getDate() + 4);
      dataObj.setHours(horaDoSorteio);
      dataObj.setMinutes(minDoSorteio);
      dataObj.setSeconds(segDoSorteio);
      break;
    case 3:
      dataObj.setDate(dataObj.getDate() + 3);
      dataObj.setHours(horaDoSorteio);
      dataObj.setMinutes(minDoSorteio);
      dataObj.setSeconds(segDoSorteio);
      break;
    case 4:
      dataObj.setDate(dataObj.getDate() + 2);
      dataObj.setHours(horaDoSorteio);
      dataObj.setMinutes(minDoSorteio);
      dataObj.setSeconds(segDoSorteio);
      break;
    case 5:
      dataObj.setDate(dataObj.getDate() + 1);
      dataObj.setHours(horaDoSorteio);
      dataObj.setMinutes(minDoSorteio);
      dataObj.setSeconds(segDoSorteio);
      break;
    case 6:
      if(dataObj.getHours < 16){
        dataObj.setDate(dataObj.getDate() + 0);
        dataObj.setHours(horaDoSorteio);
        dataObj.setMinutes(minDoSorteio);
        dataObj.setSeconds(segDoSorteio);
      }else{
        dataObj.setDate(dataObj.getDate() + 7);
        dataObj.setHours(horaDoSorteio);
        dataObj.setMinutes(minDoSorteio);
        dataObj.setSeconds(segDoSorteio);
      }
      break;
  };

  return dataObj;
}

module.exports = function() {
  
  var schema = mongoose.Schema({
    data: {
      type: Date,
      default: proximoSorteio()
    },
    status: {
      type: String,
      default: 'ANDAMENTO'
    },
    resultado: {
      type: String,
      default: ''
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  });

  return mongoose.model('Sorteio', schema);
};