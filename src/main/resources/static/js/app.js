var stompClient = null;

function setConnected() {
   $("#messages").html("");
}

function connect() {
   var socket = new SockJS('/ws');
   stompClient = Stomp.over(socket);
   stompClient.connect({}, function (frame) {
      setConnected();
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/something', function (data) {
      	 console.log(JSON.parse(data.body));
         show(JSON.parse(data.body));
      });
   });
}

function disconnect () {
   if (stompClient !== null) {
      stompClient.disconnect();
   }
   setConnected ();
   console.log("Disconnected");
}

function sendName() {
   stompClient.send("/app/send", {}, JSON.stringify({'name': $("#name").val(), 'subject': $("#subject").val(), 'message': $("#message").val()}));
}

function show (data) {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	
	var random = Math.floor(Math.random()* (3-1))+1;
	var css_position = random == 1 ? 'left' : 'right';
	
   $("#messages").append(`<div class="chat-message-${css_position} pb-4">
            <div>
                <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
                    class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
                <div class="text-muted small text-nowrap mt-2">${h}:${m}</div>
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                <div class="font-weight-bold mb-1">${data.name}</div>
                ${data.message}
            </div>
        </div>`);
}

$(function () {
	connect();
   $( "form" ).on('submit', function (e) {e.preventDefault();});
   $( "#disconnect" ).click(function() { disconnect(); });
   $( "#send" ).click(function() { sendName(); });
});