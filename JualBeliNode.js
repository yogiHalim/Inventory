const fs = require('fs');
const { MongoClient, ServerApiVersion , ObjectId } = require('mongodb');
const url = require('url');
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
    console.log(req.url, req.method, url.parse(req.url).pathname, url.parse(req.url).query);
    
    if (req.method==='GET'){
      let vPath ="./";
      const vQrScan=url.parse(req.url).query;
      switch (url.parse(req.url).pathname) {
        case '/':
          vPath+='JualBeli.html'; //case sensitive di cloud, engga di local
          break;
        case '/about':
          vPath+='package.json';
          break;
        case '/apiNota':
          vPath+='nota.html';
          break; 
        default :vPath+='coba.html';
        break;
      };
      console.log(vPath+'0');
    

      fs.readFile(vPath, function(err, vHtml) {
        res.writeHead(200, {'Content-Type': 'text/html'})
        if (url.parse(req.url).pathname="/"){
        res.write(vHtml.toString().replace('{{vQrScanNama}}',url.parse(req.url,true).query.nama||'').replace('{{vQrScanIsiSatuan}}',url.parse(req.url,true).query.isiSatuan||'').replace('{{vQrScanUnitSatuan}}',url.parse(req.url,true).query.unitSatuan||''));
        }else{res.write(vHtml);}
        res.end();
      });
      //document.querySelector("#isiNamaBarang").value=${url.parse(req.url).query};alert(document.querySelector("#isiNamaBarang").value
      //console.log(url.parse(req.url).query+url.parse(req.url).query.split('?')[0]+'queryyyyyyyyyyy')
      //res.end(`${url.parse(req.url).query}`);
        //`${vHtml.replace('{{vQrScan}}',url.parse(req.url).query)}`);

      //scan dari qrcode req.url ambil nama barang, fBaca(), onload status==200 nama barang=this.response --> cek this respon nya fs readFile apa fBaca();
    };
    //async function fCatatTerkini(){}
    // upsert
    // mongo
    // https://www.youtube.com/watch?v=fbYExfeFsI0&t=138s 
    // menit 28:00 ${result.matchedCount} ${result.modifiedCount} 
    // {upsert:true} result.upsertCount ${result.upsertedId}

    async function fBacaNota(vClient,vCariNota,vSkip){
      // await vClient.connect();
      const vCursor=await vClient.db("IntiCollection").collection("JualBeli").find({nomorNota:vCariNota}).sort({tanggal:-1}).limit(8).skip(vSkip).toArray();
      if (vCursor.length>0){console.log("ada ",vCursor.length,' document(s) nota ',vCursor)}
      res.writeHead(200,{'Content-Type':'text/json'});
      res.write(JSON.stringify(vCursor));
      res.end();
      // await vClient.close();
    }
    async function fBaca(vClient,vCari3,vSkip){
      // await vClient.connect(); 
      console.log(vCari3,'cari 3', vSkip,'skip')
      const vCursor= await vClient.db("IntiCollection").collection("JualBeli").find(vCari3).limit(6).sort({tanggal:-1}).skip(vSkip).toArray();
      if (vCursor.length>0){console.log("ada",vCursor[0].nama,' umur ',vCursor.length,' document(s) ditemukan',JSON.stringify(vCursor));console.table(vCursor);}else{console.log("tidak ada")};
      res.writeHead(200,{'Content-Type':'text/json'});
      if (vCursor.length>0){res.write(JSON.stringify(vCursor));}else{res.write(JSON.stringify([{nama:'  Akhir Data',jumlah:'==Akhir Data=='}]))}
      console.table({nama:'==Akhir Data=='})
      res.end();
      // await vClient.close();
    };
    async function fCatatDiDB(vClient,vCatat2){
      // await vClient.connect();
      await vClient.db('IntiCollection').collection('JualBeli').insertOne(vCatat2);
      //pakainya inseert.upsert:true await vClient.db('IntiCollection').collection('AjaxNama').upsert(nama=vCatat2.nama)
      console.log('tercatat yay');
      // await vClient.close();
    }
    async function fHapusDiDB(vClient,vIdHapus){
      // await vClient.connect();
      console.log(vIdHapus,'di fHApusDiDB')
      const vTerhapus=await vClient.db("IntiCollection").collection("JualBeli").deleteOne({_id:new ObjectId(vIdHapus)})
      console.log(vTerhapus,vIdHapus);
      // await vClient.close();
    }

    if (req.method==='POST' && req.url==='/apiBacaAwal'){
      let vCari1={nama:{$exists:true}};
      let vSkip=0;
      fBaca(vClient,vCari1,vSkip);
    };
    if (req.method=='POST' && req.url=='/apiCetakNota'){
      let vCariNota ='';
      req.on('data',chunk=>{vCariNota+=chunk.toString();console.log(chunk.toString(),'chunk inii')});
//      req.on('end',()=>{fBacaNota(vClient,{nomorNota:vCariNota})});
      
      req.on('end',()=>{vCariNota2=JSON.parse(vCariNota); fBacaNota(vClient,vCariNota2.nomorNota,Number(vCariNota2.skip));});
    }
    if (req.method==='POST' && req.url==='/apiTampil'){
      let vCari = '';
        req.on('data', chunk => {
          vCari+=chunk.toString();
          });
        req.on('end', () => {
          //vCari = Buffer.concat(vCari).toString();
          const vCari2=JSON.parse(vCari);
          let vCari3={};
          if (vCari2.tanggal){vCari3={tanggal:vCari2.tanggal}}
          if (vCari2.nama){vCari3={nama:vCari2.nama}}else{vCari3={}}
          if (!vCari2.halTampil){vSkip=0}else{vSkip=(vCari2.halTampil-1)*6;if(vSkip<1){vSkip=0}}
          fBaca(vClient,vCari3,vSkip);
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
        fCatatDiDB(vClient,vCatat2);
      });
    };
    if (req.method==='POST'&&req.url==='/apiHapus'){
      let vIdHapus=''
      req.on('data',chunk=>{
        vIdHapus+=chunk.toString();
        console.log(vIdHapus,'di req.on')
      })
      req.on('end',()=>{
        fHapusDiDB(vClient,vIdHapus);
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

//pass variable to frontend --> res.end(`Pathname: ${pathname}`); res.end(`Value of "myParam": ${vMyParam}`); 

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