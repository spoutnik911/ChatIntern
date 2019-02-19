const express = require("express");
const serverStatic = require("serve-static");
const WebSocket = require("ws");

var app = express();
app.use(serverStatic("clientHome", {"index": ["index.html", "index.htm"]}));
app.listen(80);

const wss = new WebSocket.Server({ port: 8080 });

var addressList = [];
var wsList = [];


wss.on("connection", function connection(ws){

    addressList.push(ws._socket.address());
    wsList.push(ws);
    ws.send("Client Connected");

    ws.on("message", function incomping(message){
        // data deal
        if (message !== undefined) {

            console.log(message);

            for (var i = 0; i < addressList.length; i++) {
                if (addressList[i] !== ws._socket.address()) {
                    ws.send(message);
                }
            }

        }
    });


});
