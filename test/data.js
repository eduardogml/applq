function proximoSorteio(){

  var dataObj = new Date();
  var hoje = dataObj.getDay();
  var horaDoSorteio = 16;
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

var MongoClient = require('mongodb').MongoClient;

var sorteio = [
  {data: proximoSorteio(), status: 'ANDAMENTO', resultado: '1234', created_at: Date.now},
  {data: Date.now, status: 'FINALIZDO', resultado: '1234', created_at: Date.now}
];

MongoClient.connect('mongodb://localhost/applq_test', 
  function(erro, db) {
    if(erro) throw erro; 

    db.dropDatabase(function(err) {
       if(err) return console.log(err);
       console.log('Banco apagado com sucesso')
       db.collection('sorteios').insert(sorteio, 
       function(err, inserted) {
         if(err) return console.log(err);
         console.log('Banco populado com sucesso')
         process.exit(0);
      });
    });
  }
);