	 var client, topic;
$(function () {


	  
	    var hostname = '192.168.0.101',  
	    port = 61614,  
	    clientId = 'test',   
	    keepAlive = 20,  
	    cleanSession = false,  
	    userName = 'admin',  
	    password = 'password';
	    topic = 'test';  
	client = new Messaging.Client(hostname, port, clientId);  
	//建立客户端实例  
	var options = {  
	    invocationContext: {  
	        host : hostname,  
	        port: port,  
	        path: client.path,  
	        clientId: clientId  
	    },  
	    keepAliveInterval: keepAlive,  
	    cleanSession: false,    
	    userName: userName,  
	    password: password,  
	    onSuccess: onConnect,  
	    onFailure: function(){  
	        console.log(12112);  
	    }  
	};  
	client.connect(options);  
	//连接服务器并注册连接成功处理事件  
	function onConnect() {  
	    console.log("onConnected"); 

	    client.subscribe(topic, {qos: 2});  
	    //订阅主题  
	    //发送消息  
	  
	    // client.send(message);  
	}  
	client.onConnectionLost = onConnectionLost;  
	//注册连接断开处理事件  
	
	//注册消息接收处理事件  
	function onConnectionLost(responseObject) {  
	    if (responseObject.errorCode !== 0) {  
	        console.log("onConnectionLost:"+responseObject.errorMessage);  
	        console.log("连接已断开");  
	    }  
	}  
	

 
	    
	    
	  


});