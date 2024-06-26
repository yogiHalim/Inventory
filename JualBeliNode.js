const fs = require('fs');
const { MongoClient, ServerApiVersion , ObjectId } = require('mongodb');
//dependency dicut dari package.json     "@google-cloud/functions-framework": "^3.4.0",
fUtama().catch(console.error);

async function fUtama(){
  const vURLmongo = "mongodb+srv://inticollection:1ntiCollection@jualbeli.c8qunga.mongodb.net/?retryWrites=true&w=majority&appName=JualBeli"
  const vClient = new MongoClient(vURLmongo);
  await vClient.connect();
  await fDaftarDBS(vClient);
  
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
  
  async function fDaftarDBS(vClient){
    const vDaftarDBS = await vClient.db().admin().listDatabases();
    vDaftarDBS.databases.forEach(db => {
      console.log(`- ${db.name}`);
      //console.log(db.name);
      vClient.db()
    }); 
  }

  const http = require('http');
  const vServer=http.createServer((req,res)=>{  
    console.log(req.url, req.method);
    
    if (req.method==='GET'){
      let vPath ="./";
      switch (req.url) {
        case '/':
          vPath+='JualBeli.html'; //case sensitive di cloud, engga di local
          console.log(vPath+'0');
          break;
        case '/about':
          vPath+='package.json';
          console.log(vPath+'2');
          break;
        default :vPath+='coba.html';
        console.log(vPath+'3');
        //fs.write req.url untuk catat orang nyasar kemana aja
        break;
      };
    
      fs.readFile(vPath, function(err, data) {
        //console.log('1'+this.responseText+data);
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found kan ya");
        } 
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    };

    async function fBaca(vClient,vCari){
      await vClient.connect();
      const vCursor= await vClient.db("IntiCollection").collection("JualBeli").find({nama:vCari}).limit(7).sort({tanggal:-1}).toArray();
      if (vCursor){console.log("ada",vCursor.nama,vCursor.umur,vCursor.matchedCount,vCursor,JSON.stringify(vCursor));}else{console.log("tidak ada")};
      res.writeHead(200,{'Content-Type':'text/json'});
      res.write(JSON.stringify(vCursor));
      res.end();
      await vClient.close();
    };
    async function fCatat(vClient,vCatat2){
      await vClient.connect();
      await vClient.db('IntiCollection').collection('JualBeli').insertOne(vCatat2);
      await vClient.close();
    }
    async function fHapusDiDb(vClient,vIdHapus){
      await vClient.connect();
      const vTerhapus=await vClient.db("IntiCollection").collection("JualBeli").deleteOne({_id:new ObjectId(vIdHapus)})
      console.log(vTerhapus,vIdHapus);
      await vClient.close();
    }

    if (req.method==='POST' && req.url==='/apiBacaAwal'){
      let vCari1={$exists:true};
      fBaca(vClient,vCari1);
    };
    if (req.method==='POST' && req.url==='/apiTampil'){
      let vCari = '';
        req.on('data', chunk => {
          vCari+=chunk.toString();
          });
        req.on('end', () => {
          //vCari = Buffer.concat(vCari).toString();
          const vCari2=JSON.parse(vCari); 
          fBaca(vClient,vCari2.nama);
          });
      console.log(req.body);
    };

    if (req.method==='POST' && req.url==='/apiCatat'){
      let vCatat=''
      req.on('data',chunk=>{
        vCatat+=chunk.toString();
      });
      req.on('end',()=>{
        vCatat2=JSON.parse(vCatat);
        fCatat(vClient,vCatat2);
      });
    };
    if (req.method==='POST'&&req.url==='/apiHapus'){
      let vIdHapus=''
      req.on('data',chunk=>{
        vIdHapus+=chunk.toString();
      })
      req.on('end',()=>{
        fHapusDiDb(vClient,vIdHapus);
      })
    }
  });
  //ip rumah mncplay=http://123.253.233.130
  //ip website jualbeli google cloud http://142.251.221.148
  //sonic-stratum-427310-p3.et.r.appspot.com
  const PORT = process.env.PORT || 8080;
  vServer.listen(PORT,()=>{
    console.log('listening port '+PORT+' ya');  
  });

//vClient.close(); //-->?
};
 
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