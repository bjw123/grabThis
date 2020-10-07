const express = require("express");
const bodyParser = require('body-parser');
const PORT = 3030
const services = require('./services')
const routers = require('./routes')

let app = new express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.json());

app.use('/createProfile', routers.creatProfile.createProfileRoute)


//setup database
services.mongo.startDB()


http.listen(PORT,()=>{
    console.log('server started on port 3030')
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});