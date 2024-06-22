
let v1 = 0;
const vHttp = require('http');
const fs=require('fs');
const vServer=vHttp.createServer((req,res)=>{  
  console.log(req.url, req.method);
if (req.method==='GET' && req.url==='/'){
  res.writeHead(200,{'Contetnt-Type':'text/html'});
  fs.readFile('coba.html',function(err,vHalHtml){
    res.write(vHalHtml);
    res.end();
  });
};
console.log('ke if post',v1++);
if (req.method==='POST' && req.url==='/apiCoba'){
  res.writeHead(200,{'Content-Type':'text/plain'}); //ganti dari text/html
  res.write('haiiiii');
  res.end();
};
});

vServer.listen(3000,'localhost',()=>{
    console.log('listening port 3000 ya');
});

vServer.listen('https://inticollection.azurewebsites.net/',()=>{
  console.log('listening azure nih');
});


// const vServer2=http.createServer((req,res)=>{  
//   console.log(req.url, req.method);
//   res.write('listening to port 3300 ya');
// });

// vServer2.listen(3300,'localhost',()=>{
//     console.log('listening port 3300 ya');
// });

const a = 'aa';
const b = 'bb';
module.exports={aaz : a,bbz : b};