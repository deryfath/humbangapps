function request_error(xhr,status,view){
    
    if(xhr.response!=''){
        var response = JSON.parse(xhr.response);
	    	
    	/* Invalid Token */
    	if(xhr.status==401 && response.message == 'Invalid token. Invalid header padding'){
    		//menampilkan login screen & auth ulang untuk mendapatkan token baru.
    		deleteSession();	
    	}
    	
    	/* Token Expired */
    	else if(xhr.status==401 && response.message=='Invalid token. Signature has expired'){
    		//refresh token
    		RefreshToken(view);
    	}
	}else{
		if (xhr.readyState == 4 && xhr.status==0) {
	        // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
	        myApp.alert('Failed request data','IMM');
	    }
	    else if (xhr.readyState == 0 && xhr.status==0) {
	        // Network error (i.e. connection refused, access denied due to CORS, etc.)
	        myApp.alert('Failed request data','IMM');
	    }
	    hideLoading();
	}    
}

function getNewToken(postData){

	$$.ajax({
      url: Template7.global.api_url+'/auth',
      //url : 'http://im3dummy.mbdv.gluk2.org:90/auth',
      method : 'POST',
      headers: {
        "Authorization":"Basic 0f9b274bc0168e6213b2255e23f1c0fe"
      },
      data : {
      	grant_type : 'login',
        username : postData.username,
        password : postData.password
      },
      statusCode: {
          404: function (xhr) { myApp.alert('page not found'); },
          401: function (xhr) {
             var response = JSON.parse(xhr.response);
             myApp.alert(response.message,'Login Failed');
             hideLoading();
          }
      },
      beforeSend : function(xhr){ 

      	showLoading(); 

      },
      success : function(data){
          var result = JSON.parse(data);
          if(result.status==true){
          	updateAccessToken(result.data.access_token,result.data.refresh_token);
          }
      }
    });

}

function getUser(token,refresh_token){
	$$.ajax({
      url: Template7.global.api_url+'/get_user',
      method : 'GET',
      headers:{
	  	'Authorization' : 'Bearer '+token
      },
      beforeSend : function(){ showLoading(); },
      success : function(data){
          var result = JSON.parse(data);
          if(result.status==true){
            hideLoading();
            myApp.closeModal($$('.login-screen'));
            var userData = {
              user_name : result.data.username,
              group_id : result.data.usergroup_id,
              id_user : result.data.id,
              workspace_id : result.data.workspace_id,
              full_name : result.data.name
            }
            Template7.global.userdata = {
                id:result.data.id,
                user_name:result.data.username,
                workspace_id:result.data.workspace_id,
                night_mode:0,
                full_name : result.data.name                
            };

            getAllBookmarkAPI();
            userData.night_mode = 0;
            userData.notif_general = 0;
            userData.notif_topic = 0;
            insertSession(userData);

            updateAccessToken(token,refresh_token);

            /* send device user */
            //add_device_user(result.data.id)            
          }else{
            myApp.alert(response.message,'Login Failed');
          } 
      }
  });
}

function AuthTokenAndLogin(postData){

	$$.ajax({
      url: Template7.global.api_url+'/auth',
      //url : 'http://im3dummy.mbdv.gluk2.org:90/auth',
      method : 'POST',
      headers: {
        "Authorization":"Basic 0f9b274bc0168e6213b2255e23f1c0fe"
      },
      data : {
      	grant_type : 'login',
        username : postData.username,
        password : postData.password
      },
      statusCode: {
          404: function (xhr) { myApp.alert('page not found'); },
          401: function (xhr) {
             var response = JSON.parse(xhr.response);
             myApp.alert(response.message,'Login Failed');
             hideLoading();
          }
      },
      beforeSend : function(xhr){ 
      	showLoading(); 
      },
      success : function(data){
          var result = JSON.parse(data);
          if(result.status==true){
            /*get info user */
          	getUser(result.data.access_token,result.data.refresh_token);
          }
      }
    });

}

function RefreshToken(view){
	$$.ajax({
      url: Template7.global.api_url+'/auth',
      //url : 'http://im3dummy.mbdv.gluk2.org:90/auth',
      method : 'POST',
      headers: {
        "Authorization":"Basic 0f9b274bc0168e6213b2255e23f1c0fe"
      },
      data : {
      	grant_type : 'refresh_token',
       	refresh_token : Template7.global.refresh_token
      },
      statusCode: {
          404: function (xhr) { myApp.alert('page not found'); },
          401: function (xhr) {
             var response = JSON.parse(xhr.response);
             myApp.alert(response.message,'Login Failed');
             hideLoading();
          }
      },
      beforeSend : function(xhr){ 

      	showLoading(); 

      },
      error : function(xhr){
      	if(xhr.status==423 || xhr.status==429){
      		deleteSession();
      	}
      },
      success : function(data){
          var result = JSON.parse(data);
          if(result.status==true){
          	setTimeout(function() {
              view.router.refreshPage();
            }, 3000);
          	updateAccessToken(result.data.access_token,result.data.refresh_token);
          }
      }
    });
}

function add_device_user(user_id){
  $$.ajax({
      url: Template7.global.api_url+'/app_messaging/add_device_user',
      method : 'POST',
      data : {
        device_id : '',
        user_id : user_id
      },
      success : function(data){

      },
      error : function(xhr){
        console.log('error add device user');
      }
  });
}
