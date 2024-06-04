// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var myobj = { name: "Company Inc", address: "Highway 37" };
//   dbo.collection("customers").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });
console.log(1+1);
console.log(__dirname);
console.log(__filename);

const fs = require('fs');
const { json } = require('stream/consumers');
const aa =  JSON.stringify([
  {
      "nama":"yogi",
      "umur":41,
      "pets":[
          { "animal":"dog", "name":"Fido" },
          { "animal":"cat", "name":"Felix" },
          { "animal":"hamster", "name":"Lightning" }
      ]
  },//'\n',
  {
    "nama":"uk",
    "umur":41
}])

// const ab = JSON.stringify([
//   {
//       "nama":"uk",
//       "umur":41
//   }
//   ])
  const a = aa//+'\n'+ab;
  console.log(a);
fs.writeFile('bulanan.txt',a,()=>{
  console.log('tulis');
});


const http = require('http');
const vServer=http.createServer((req,res)=>{
  console.log(req.url, req.method);
  res.setHeader('content-type','text/html');
  //res.write('ahoy');
  // const baca=fs.readFile('JualBeli.html');
  // console.log(baca);
  let vPath ="";
  switch (req.url) {
    case '/':
      vPath+='jualbeli.html';
      console.log(vPath+'0');
      break;
    case '/about':
      vPath+='about.html';
      console.log(vPath+'2');
      break;
    default :vPath+='coba.html';
    console.log(vPath+'3');
    //fs.write req.url untuk catat orang nyasar kemana aja
    break;
  }
  fs.readFile(vPath,(err,data)=>{
    console.log('1'+vPath);
    if (err) {
      console.log('err');
      res.end();
    }else {
      console.groupCollapsed('tulis html');
      //res.write(data);
      res.end(data);
    }
  });

});
vServer.listen(3000,'localhost',()=>{
  console.log('listening port 3000 ya');
});