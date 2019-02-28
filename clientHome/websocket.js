var ws = new WebSocket("ws://localhost:8080");

window.pseudo = "truc";

ws.onmessage = function(event) {
  console.log(event.data);
  onReceivMessage(event.data);
};

function onsendmsg(event) {
  if (event.keyCode === 13 && pseudo !== "nothing") {
    sendMsgtoServ(document.getElementById("textbox").value, pseudo);
  }
}

function sendMsgtoServ(msg, pseudo) {
  var cache = {
    msg: msg,
    pseudo: pseudo
  };

  if (cache.msg.includes("/nick")){
    let pseudoSplit = cache.msg.split(" ");
    cache.pseudo = pseudoSplit[1];
    window.pseudo = pseudoSplit[1];
  }


  cache = JSON.stringify(cache);
  onReceivMessage(cache);
  ws.send(cache);
}

function onReceivMessage(msg) {
  var message = document.createElement("div");
  message.innerText = JSON.parse(msg).pseudo + ":" + JSON.parse(msg).msg;
  message.className = "message_div";
  document.getElementsByClassName("contentbox")[0].insertBefore(message, document.getElementById("endcontentbox"));
}
