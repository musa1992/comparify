const http = require('http');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
http.createServer((req,res)=>{

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "*");
    
    let filePath = path.join(path.parse(__dirname).dir, 'client', req.url === '/' ? 'index.html' : req.url);

    let extName = path.extname(filePath)

    let contentType = 'text/html';

    switch(extName){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
    }

    fs.readFile(filePath, (err,content)=>{
        if (err){
            if (err.code == 'ENOENT') {
                fs.readFile(path.join(path.parse(__dirname).dir, 'client', '404.html'),
                (err,content)=>{
                    res.writeHead(200, {'Content-Type' : 'text/html'})
                    res.end(content, 'utf-8')
                })
            }else {
                // serer error
                res.writeHead(500)
                res.end(`Server error ${err.code}`)
            }
        }else {
            // succesful response
            if(res.headersSent !== true){
                res.writeHead(200, {'Content-Type' : contentType})
                res.end(content, 'utf-8')
            }
        }
    })

   

   if (req.method === 'OPTIONS' && req.url === '/'){
       
       let body = '';
       req.on('data', chunk =>{
           body += chunk.toString();
       });
       req.on('end', ()=>{
           console.log(body);
           res.end('ok')
       })
   }
   
   
}).listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})