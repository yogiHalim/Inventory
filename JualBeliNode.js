const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');

fUtama().catch(console.error);
//fBaca();


async function fUtama(){
  const vURLmongo = "mongodb+srv://inticollection:1ntiCollection@jualbeli.c8qunga.mongodb.net/?retryWrites=true&w=majority&appName=JualBeli"
  const vClient = new MongoClient(vURLmongo);
  await vClient.connect();
  await fDaftarDBS(vClient);
  await fBaca(vClient,"yogi");
//   // untuk run hapus const vTulis =
//   const vTulis = await fInputJualBeli(vClient,[{
//     nama:"yogi",
//     umur:41,
//   },
//   {
//     nama:"uk",
//     umur:41,
//   }]
//   );
//   await vClient.close();
// }
console.log('connected');
vClient.close(); //-->?
};

async function fBaca(vClient,vCari){
  const vTampil= await vClient.db("IntiCollection").collection("JualBeli").findOne({nama:vCari});
  if (vTampil){console.log("ada",vTampil.nama,vTampil.umur,vTampil.matchedCount,vTampil);}else{console.log("tidak ada")};
  const vCursor= await vClient.db("IntiCollection").collection("JualBeli").find({nama:"uk"}).limit(2).toArray();
  if (vTampil){console.log("ada",vCursor.nama,vCursor.umur,vCursor.matchedCount,vCursor);}else{console.log("tidak ada")};
  
  };
// async function fInputJualBeli(vClient,vData){
//   const vDataDisimpan = await vClient.db("IntiCollection").collection("JualBeli").insertMany(vData);
//   console.log(vDataDisimpan.insertedId);
//   console.log("count yang disimpan",vDataDisimpan.insertedCount, vDataDisimpan.insertedIds);
// }
async function fDaftarDBS(vClient){
  const vDaftarDBS = await vClient.db().admin().listDatabases();
  vDaftarDBS.databases.forEach(db => {
    console.log(`- ${db.name}`);
    //console.log(db.name);
  }); 
}




const http = require('http');
const vServer=http.createServer((req,res)=>{  
  console.log(req.url, req.method);
  
  if (req.method==='GET'){
    let vPath ="./";
    switch (req.url) {
      case '/':
        vPath+='jualbeli.html';
        console.log(vPath+'0');
        break;
      case '/about':
        vPath+='bulanan.txt';
        console.log(vPath+'2');
        break;
      default :vPath+='coba.html';
      console.log(vPath+'3');
      //fs.write req.url untuk catat orang nyasar kemana aja
      break;
    }
  
    fs.readFile(vPath, function(err, data) {
      //console.log('1'+this.responseText+data);
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      } 
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  
  };
  if (req.method==='POST' && req.url==='/apiCoba'){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('haiiiii');
    console.log('post ini yaay');
    res.end();
  };
});

vServer.listen(3000,'localhost',()=>{
  console.log('listening port 3000 ya');  
});


//cek cek cek
//cek vResult.find().sort({createdAt:-1}) --> descending

//tampilkan 5 terakhir diupload, dan siapa yang sekarang sedang lihat/edit dalam 2 menit terakhir dan list 5 yang terakhir lihat
//beda warna untuk tiap lihat, dan dilog ditampilkan kecil di kanan atas
//bikin link ajax siapa ini: ditulis iin, yoyok, dst

//1. tambah di html form ---- action="/tambah" method="POST"
//2. untuk kirim POST json dari textbox harus ada "name" supaya jadi name-value pair
//3. di node js tambah app.post('/tambah',(req,res)=>{ }) ---->kyny perlu di loop di variabel
//^di console log untuk cek yang ud sampai node js
//4. untuk get dengan parameter, pakai const vCari = req.params.vDicari trus coba console.log(vCari) part#10 menit 16//5. untuk delete, store id ke vCursor misalnya trus id vCursor didelete
//5. res.json({name:value pair}) enak res.send(variabel)??
//6. lain2 code
//^window.location.href= part#10 menit 32:40