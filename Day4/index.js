const http = require('http');

const server = http.createServer((req,res)=>{
    res.end("Hello")
});

server.listen(4000,()=>{
    console.log("I am listening at port no 4000");

})