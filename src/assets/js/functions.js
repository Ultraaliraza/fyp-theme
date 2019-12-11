// Retrieving all the messages ON ADMIN AREA
function worker(){
	 $.ajax({

       type: "GET",
       url: "functions.php",
       data: {
           getChatData: 1
       },
       success: function(html) {
           $("#displayMsg").html(html);
       },
	   complete: function() {
	      setTimeout(1000);
	      worker();
	   }

   });
}

// Retrieving all the messages ON USER SIDE
function worker_two(){
	 $.ajax({

       type: "GET",
       url: "functions.php",
       data: {
           getUserChatData: 1
       },
       success: function(html) {
           $("#displayMsg").html(html);
       },
	   complete: function() {
	      setTimeout(1000);
	      worker_two();
	   }

   });
}

var sendMsg;
var sendMsgUser;
$(document).ready(function(){

	sendMsg = function()
	{
		var msg = $('#msg').val();
		if(msg == '')
		{

		}else
		{
		 $.ajax({

	           type: "POST",
	           url: "functions.php",
	           data: {
	               sendMessage: msg
	           },
	           success: function(html) {
	               $("#msg").val("");
	           },complete: function()
	           {
	           	scrollFunction();
	           }

	       });
		}
	}

	sendMsgUser = function()
	{
		var msg = $('#msg').val();
		if(msg == '')
		{

		}else
		{
		 $.ajax({

	           type: "POST",
	           url: "functions.php",
	           data: {
	               sendUserMessage: msg
	           },
	           success: function(html) {
	               $("#msg").val("");
	           },complete: function()
	           {
	           	scrollFunction();
	           }

	       });
		}
	}
  		
	
});