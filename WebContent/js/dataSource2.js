/**
 * Created by jf on 2015/9/11.
 * Modified by bear on 2016/9/7.
 */
$(function () {
	
	layui.config({
		  version: '20170325'
		}).use('mobile', function(){
		  var mobile = layui.mobile
		  ,layim = mobile.layim
		  ,layer = mobile.layer;
		  
		  //演示自动回复
//		  var autoReplay = [
//		    '您好，我现在有事不在，一会再和您联系。', 
//		    '你没发错吧？face[微笑] ',
//		    '洗澡中，请勿打扰，偷窥请购票，个体四十，团体八折，订票电话：一般人我不告诉他！face[哈哈] ',
//		    '你好，我是主人的美女秘书，有什么事就跟我说吧，等他回来我会转告他的。face[心] face[心] face[心] ',
//		    'face[威武] face[威武] face[威武] face[威武] ',
//		    '<（@￣︶￣@）>',
//		    '你要和我说话？你真的要和我说话？你确定自己想说吗？你一定非说不可吗？那你说吧，这是自动回复。',
//		    'face[黑线]  你慢慢说，别急……',
//		    '(*^__^*) face[嘻嘻] ，是贤心吗？'
//		  ];
		  
		  layim.config({
		    //上传图片接口
		    uploadImage: {
		      url: '/upload/image' //（返回的数据格式见下文）
		      ,type: '' //默认post
		    } 
		    
		    //上传文件接口
		    ,uploadFile: {
		      url: '/upload/file' //（返回的数据格式见下文）
		      ,type: '' //默认post
		    }
		    
		    ,init: {
		      //我的信息
		      mine: {
		        "username": "李小龙" //我的昵称
		        ,"id": "test2" //我的ID
		        ,"avatar": "images/avator/161501321839_.pic.jpg" //我的头像
		        ,"sign": "懒得签名"
		      }
		      //我的好友列表
		      ,friend: [{
		        "groupname": "知名人物"
		        ,"id": 0
		        ,"list": [{
		          "username": "月亮"
		          ,"id": "test"
		          ,"avatar": "images/avator/161501321839_.pic.jpg"
		          ,"sign": "这些都是测试数据，实际使用请严格按照该格式返回"
		          ,"status": "online"
		        }]
		      }]
		    }
		    
		    //扩展更多列表
		    ,moreList: [{
		      alias: 'find'
		      ,title: '发现'
		      ,iconUnicode: '&#xe628;' //图标字体的unicode，可不填
		      ,iconClass: '' //图标字体的class类名
		    },{
		      alias: 'share'
		      ,title: '分享与邀请'
		      ,iconUnicode: '&#xe641;' //图标字体的unicode，可不填
		      ,iconClass: '' //图标字体的class类名
		    }]
		    
		    //,isNewFriend: false //是否开启“新的朋友”
		    ,isgroup: true //是否开启“群聊”
		    //,chatTitleColor: '#c00' //顶部Bar颜色
		    //,title: 'LayIM' //应用名，默认：我的IM
		  });
		  
		  //创建一个会话
		  /*
		  layim.chat({
		    id: 111111
		    ,name: '许闲心'
		    ,type: 'kefu' //friend、group等字符，如果是group，则创建的是群聊
		    ,avatar: '//tp1.sinaimg.cn/1571889140/180/40030060651/1'
		  });
		  */
		  
		  //监听点击“新的朋友”
		  layim.on('newFriend', function(){
		    layim.panel({
		      title: '新的朋友' //标题
		      ,tpl: '<div style="padding: 10px;">自定义模版，{{d.data.test}}</div>' //模版
		      ,data: { //数据
		        test: '么么哒'
		      }
		    });
		  });
		  
		  //查看聊天信息
		  layim.on('detail', function(data){
		    //console.log(data); //获取当前会话对象
		    layim.panel({
		      title: data.name + ' 聊天信息' //标题
		      ,tpl: '<div style="padding: 10px;">自定义模版，<a href="http://www.layui.com/doc/modules/layim_mobile.html#ondetail" target="_blank">参考文档</a></div>' //模版
		      ,data: { //数据
		        test: '么么哒'
		      }
		    });
		  });
		  
		  //监听点击更多列表
		  layim.on('moreList', function(obj){
		    switch(obj.alias){
		      case 'find':
		        layer.msg('自定义发现动作');
		        
		        //模拟标记“发现新动态”为已读
		        layim.showNew('More', false);
		        layim.showNew('find', false);
		      break;
		      case 'share':
		        layim.panel({
		          title: '邀请好友' //标题
		          ,tpl: '<div style="padding: 10px;">自定义模版，{{d.data.test}}</div>' //模版
		          ,data: { //数据
		            test: '么么哒'
		          }
		        });
		      break;
		    }
		  });
		  
			client.onMessageArrived = onMessageArrived;  
			
			function onMessageArrived(message) {  
				
			    console.log("收到消息:"+message.payloadString);  
			    
			    var  rc=JSON.parse(message.payloadString);
			    
			    layim.getMessage({
				      username: rc.mine.username
				      ,avatar: rc.mine.avatar
				      ,id: rc.mine.id
				      ,type: "friend"
				      ,cid: Math.random()*100000|0 //模拟消息id，会赋值在li的data-cid上，以便完成一些消息的操作（如撤回），可不填
				      ,content: rc.mine.content
				    });
			} 
		  
		  //监听发送消息
		  layim.on('sendMessage', function(data){
		    var To = data.to;
		    console.log(data);
		    console.log(To);
		    
		    var mt=JSON.stringify(data);
		    message = new Messaging.Message(mt);
		    message.destinationName = To.id;
		    client.send(message);
		    

		    //演示自动回复
		   /*  setTimeout(function(){
		      var obj = {};
		      if(To.type === 'group'){
		        obj = {
		          username: '模拟群员'+(Math.random()*100|0)
		          ,avatar: layui.cache.dir + 'images/face/'+ (Math.random()*72|0) + '.gif'
		          ,id: To.id
		          ,type: To.type
		          ,content: autoReplay[Math.random()*9|0]
		        }
		      } else {
		        obj = {
		          username: To.name
		          ,avatar: To.avatar
		          ,id: To.id
		          ,type: To.type
		          ,content: autoReplay[Math.random()*9|0]
		        }
		      }
		      layim.getMessage(obj);
		    }, 1000); */
		  });
		  
		  //模拟收到一条好友消息
		/*   setTimeout(function(){
		    layim.getMessage({
		      username: "贤心"
		      ,avatar: "//tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"
		      ,id: "100001"
		      ,type: "friend"
		      ,cid: Math.random()*100000|0 //模拟消息id，会赋值在li的data-cid上，以便完成一些消息的操作（如撤回），可不填
		      ,content: "嗨，欢迎体验LayIM。演示标记："+ new Date().getTime()
		    });
		  }, 2000); */
		  
		  //监听查看更多记录
		  layim.on('chatlog', function(data, ul){
		    console.log(data);
		    layim.panel({
		      title: '与 '+ data.username +' 的聊天记录' //标题
		      ,tpl: '<div style="padding: 10px;">这里是模版，{{d.data.test}}</div>' //模版
		      ,data: { //数据
		        test: 'Hello'
		      }
		    });
		  });
		  
		  
		  
		  //模拟"更多"有新动态
		  layim.showNew('More', true);
		  layim.showNew('find', true);
		});

});