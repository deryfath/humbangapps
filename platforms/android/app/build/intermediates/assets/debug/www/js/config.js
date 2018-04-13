// Database Init & function ---------------------------------------------------------------------

db = openDatabase('app_humbang', '1.0', 'Test DB', 5 * 1024 * 1024);


function viewDatabase() {
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM TOPIC', [], function (tx, results) {
      var res = "";
      var len = results.rows.length, i;
      Template7.global.topic = [];
      Template7.global.topicName = [];
      for (i = 0; i < len; i++){
         //console.log(results.rows.item(i).id+"|"+results.rows.item(i).log);
         item = ' <li class="swipeout">'+
                    '<div class="swipeout-content item-content">'+
                      '<div class="item-inner">'+results.rows.item(i).log+'</div>'+
                    '</div>'+
                    '<div class="swipeout-actions-right">'+
                      '<a href="#" class="swipeout-delete" data-id="'+results.rows.item(i).id+'">Delete</a>'+
                    '</div>'+
                  '</li>';
         res = res + item;
         Template7.global.topic.push(results.rows.item(i).id);
         Template7.global.topicName.push(results.rows.item(i).log);
         // console.log(Template7.global.topic);
         // console.log(Template7.global.topicName);
      }
      $$('#mytopic-list-index').html(res);
      $$(".swipeout-delete").click(function(){
          deleteMytopic($$(this).data('id'));
          deleteIdRowDatabase($$(this).data('id'));
          viewDatabase();
      });
    }, null);
  });
}

function insertDatabase(id, topic) {
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS TOPIC (id unique, log)');
    tx.executeSql('INSERT INTO TOPIC (id, log) VALUES ("'+id+'", "'+topic+'")');
  });
}

function deleteAllRowDatabase() {
  db.transaction(function (tx) {
    tx.executeSql('DELETE FROM TOPIC', [], function (tx, results) {
      console.log('success clear');
      Template7.global.topic = [];
      Template7.global.topicName = [];
    });
  });
}

function deleteIdRowDatabase(id) {
  db.transaction(function (tx) {
    tx.executeSql('DELETE FROM TOPIC WHERE id="'+id+'"', [], function (tx, results) {
      console.log('success delete');
    });
  });
}

function tootleCheckTopic(){

}

function updateNightMode(mode){
  var query = 'UPDATE SESSION SET night_mode = '+mode;
  db.transaction(function (tx) {
      tx.executeSql(query,[], function (tx, results){
            console.log(results);
      });
  }, function(err) {
    console.log('ERROR: ' + JSON.stringify(err));
  });
}

// function updateProfile(param_profile){
//   console.log(param_profile);
//   if (param_profile.name!='' && param_profile.email!='') {
//     var query = 'UPDATE SESSION SET full_name = "'+param_profile.name+'", email_address = "'+param_profile.email+'"';
//   }else if (param_profile.name!='') {
//     var query = 'UPDATE SESSION SET full_name = "'+param_profile.name+'"';
//   }else{
//     var query = 'UPDATE SESSION SET email_address = "'+param_profile.email+'"';
//   }
//   db.transaction(function (tx) {
//       tx.executeSql(query,[], function (tx, results){
//             console.log(results);
//       });
//   }, function(err) {
//     console.log('ERROR: ' + JSON.stringify(err.message));
//   });
// }

function updateAccessToken(token,refresh_token){
  var query = 'UPDATE SESSION SET access_token = "'+token+'", refresh_token ="'+refresh_token+'"';
  db.transaction(function (tx) {
      tx.executeSql(query,[], function (tx, results){
            Template7.global.access_token = token;
            Template7.global.refresh_token = refresh_token;
      });
  }, function(err) {
    console.log('ERROR: ' + JSON.stringify(err.message));
  });
}

/* BOOKMARKS */
function insertBookmark(postData){
    // console.log(postData);
    var idTable;
    var created_time;

    if(postData.statement_id != "" && postData.statement_id != undefined){
      
        idTable = postData.statement_id;
    }else{

        idTable = postData.id;
        
    }

    if(postData.createdTime != ""){
        created_time = postData.createdTime;
        
    }else{
        created_time = getCurrentDate();
    }

    var query = 'CREATE TABLE IF NOT EXISTS BOOKMARKS ('+
                            'id_bookmark INTEGER PRIMARY KEY AUTOINCREMENT,'+
                            'id text,'+
                            'pubDate datetime,'+
                            'type text,'+
                            'created_time datetime'+
                    ')';

    var query2 = 'INSERT INTO BOOKMARKS (id, pubDate,type, created_time) VALUES ("'+idTable+'", "'+postData.datetime+'", "'+postData.type+'","'+created_time+'")';
    db.transaction(function (tx) {
      tx.executeSql(query);
      tx.executeSql(query2);
    }, function(err) {
      console.log('ERROR: ' + JSON.stringify(err.message));
    });
}

function removeBookmark(postData){
    var idTable;

    if(postData.statement_id != "" && postData.statement_id != undefined){
      
        idTable = postData.statement_id;
        
    }else{

        idTable = postData.id;
        
    }

    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM BOOKMARKS WHERE id="'+idTable+'"', [], function (tx, results) {
          console.log(results);
      });
    });
}

function getBookmark(start,limit){
  var query = 'SELECT * FROM BOOKMARKS ORDER BY datetime(created_time) DESC LIMIT '+limit+' OFFSET '+start;
  console.log(query);
  db.transaction(function (tx) {
      tx.executeSql(query,[], function (tx, results){
          var len = results.rows.length, i;
          for (i = 0; i < len; i++){
            Template7.global.bookmark.push(results.rows.item(i));
          }
          console.log(Template7.global.bookmark);

      });

      // loadFavoriteItemNews();
  }, function(err) {
    console.log('ERROR: ' + JSON.stringify(err.message));
  });
}

function getAllBookmark(){
  Template7.global.arrIDBookmark = [];
  var arrDuplicate = [];
  console.log('masuk func bookmark all');
  var query = 'CREATE TABLE IF NOT EXISTS BOOKMARKS ('+
                            'id_bookmark INTEGER PRIMARY KEY AUTOINCREMENT,'+
                            'id text,'+
                            'pubDate datetime,'+
                            'type text,'+
                            'created_time datetime'+
                    ')';
  var query2 = 'SELECT * FROM BOOKMARKS';
  db.transaction(function (tx) {
      tx.executeSql(query);
      tx.executeSql(query2,[], function (tx, results){
          var len = results.rows.length, i;

          Template7.global.lengthAllBookmark = len;
          console.log(Template7.global.lengthAllBookmark);  
          
          if(len > 0){
            for (i = 0; i < len; i++){
              arrDuplicate.push(results.rows.item(i).id);
            }

            $.each(arrDuplicate, function(i, el){
                  if($.inArray(el, Template7.global.arrIDBookmark) === -1) Template7.global.arrIDBookmark.push(el);
            });

            console.log(Template7.global.arrIDBookmark);
          }
      });
  }, function(err) {
    console.log('ERROR: ' + JSON.stringify(err.message));
  });

  
}

////////////////////////////////////////////////// ACCOUNT ////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkLogin(username,password){
  // var query = 'CREATE TABLE IF NOT EXISTS USER ('+
  //                           'id_user text PRIMARY KEY,'+
  //                           'created_time datetime,'+
  //                           'username text,'+
  //                           'password text,'+
  //                           'fullname text,'+
  //                           'farm_name text,'+
  //                           'email text,' +
  //                           'address text,'+
  //                           'phone text,'+
  //                           'user_type text'+
  // ')';
  
  // var query2 = 'SELECT * FROM USER WHERE username="'+username+'" AND password="'+password+'" ';

  // db.transaction(function (tx) {
  //     tx.executeSql(query);
  //     tx.executeSql(query2,[], function (tx, results){
  //         var len = results.rows.length, i;

  //         Template7.global.lengthLogin = len;
  //         console.log(Template7.global.lengthLogin); 
           
  //         if(len == 1){
  //           Template7.global.userdata = {
  //             id:results.rows.item(0).id_user,
  //             fullname:results.rows.item(0).fullname,
  //             username:results.rows.item(0).username,
  //             email:results.rows.item(0).email,
  //             address:results.rows.item(0).address,
  //             phone:results.rows.item(0).phone,
  //             usertype:results.rows.item(0).user_type,
  //             farm_name:results.rows.item(0).farm_name
  //           }
  //           console.log(Template7.global.userdata);

  //           //INSERT SESSION
  //           insertSession(results.rows.item(0).id_user,results.rows.item(0).username,results.rows.item(0).fullname,results.rows.item(0).address,results.rows.item(0).phone,results.rows.item(0).farm_name,results.rows.item(0).email,results.rows.item(0).user_type);
  //         }
          
  //     });

  //   }, function(err) {
  //     console.log('ERROR: ' + JSON.stringify(err.message));
  //   });

    usernameUrl = '"'+username+'"';

    $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/user/data.json?orderBy=\"username\"&equalTo="+usernameUrl,
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           showLoading();
        },
        success : function(data){

            var result = JSON.parse(data);

            console.log(Object.keys(result).length);
            
            if(Object.keys(result).length>0){
              $$.each(result, function (index, value) {

                   if(result[index].password==password){
                      Template7.global.userdata = {
                        id:result[index].user_id,
                        fullname:result[index].fullname,
                        username:result[index].username,
                        email:result[index].email,
                        address:result[index].address,
                        phone:result[index].phone,
                        usertype:result[index].user_type,
                        farm_name:result[index].farm_name,
                        comodity_type:result[index].comodity_type,
                        certificate:result[index].certificate,
                        image : result[index].image
                      }
                      console.log(Template7.global.userdata);


                      //INSERT SESSION
                      insertSession(result[index].user_id,result[index].username,result[index].fullname,result[index].address,result[index].phone,result[index].farm_name,result[index].email,result[index].user_type,result[index].comodity_type,result[index].certificate,result[index].image);
         
                   }
                  
              })

                    Template7.global.lengthLogin = 1;
                
              }

      }

    })

    
}

function insertRegister(postData){
    var created_time = getCurrentDate();
    var userIdGen = makeid();
    console.log(userIdGen);
    // var query = 'CREATE TABLE IF NOT EXISTS USER ('+
    //                         'id_user text PRIMARY KEY,'+
    //                         'created_time datetime,'+
    //                         'username text,'+
    //                         'password text,'+
    //                         'fullname text,'+
    //                         'farm_name text,'+
    //                         'email text,' +
    //                         'address text,'+
    //                         'phone text,'+
    //                         'user_type text'+
    //                 ')';

    // var query2 = 'SELECT * FROM USER WHERE email="'+postData.email+'" AND username="'+postData.username+'" ';
    // var query3 = 'INSERT INTO USER (id_user, created_time, username, password, fullname, farm_name, email, address, phone, user_type) VALUES ("'+userIdGen+'","'+created_time+'", "'+postData.username+'", "'+postData.password+'", "'+postData.name+'", "'+postData.farm_name+'", "'+postData.email+'","'+postData.address+'", "'+postData.phone+'", "'+postData.usertype+'")';
    
    // db.transaction(function (tx) {
    //   tx.executeSql(query);
    //   tx.executeSql(query2,[], function (tx, results){
    //       var len = results.rows.length, i;

    //       Template7.global.lengthRegister = len;
    //       console.log(Template7.global.lengthRegister); 
           
    //       if(len == 0){
    //         tx.executeSql(query3);
    //         Template7.global.userdata = {
    //           id:userIdGen,
    //           fullname:postData.name,
    //           username:postData.username,
    //           email:postData.email,
    //           address:postData.address,
    //           phone:postData.phone,
    //           usertype:postData.usertype,
    //           farm_name:postData.farm_name
    //         }
    //         console.log(Template7.global.userdata);


    //         //INSERT SESSION
    //         insertSession(userIdGen,postData.username,postData.name,postData.address,postData.phone,postData.farm_name,postData.email,postData.usertype);
          
    //       }
          
    //   });

    // }, function(err) {
    //   console.log('ERROR: ' + JSON.stringify(err.message));
    // });
    
    emailUrl = '"'+postData.email+'"';

    $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/user/data.json?orderBy=\"email\"&equalTo="+emailUrl,
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           showLoading();
        },
        success : function(data){

            var result = JSON.parse(data);

            console.log(Object.keys(result).length);

            Template7.global.lengthRegister = 0;

            var isSame = false;
            
            if(Object.keys(result).length>0){
              $$.each(result, function (index, value) {

                   if(result[index].username==postData.username && result[index].password == postData.password ){
                      Template7.global.lengthRegister = 1;
                      isSame = true;
                      return false;
                   }
                  
              })

              console.log("SAME "+isSame);

              if(!isSame){

                insertUserExt(postData,userIdGen);

                Template7.global.userdata = {
                    id:userIdGen,
                    fullname:postData.name,
                    username:postData.username,
                    email:postData.email,
                    address:postData.address,
                    phone:postData.phone,
                    usertype:postData.usertype,
                    farm_name:postData.farm_name,
                    comodity_type:postData.comodityType,
                    certificate:postData.certificate
                  }
                  console.log(Template7.global.userdata);


                  //INSERT SESSION
                  insertSession(userIdGen,postData.username,postData.name,postData.address,postData.phone,postData.farm_name,postData.email,postData.usertype,postData.comodityType,postData.certificate,"");
                  
              }

            }else{
              insertUserExt(postData,userIdGen);

               Template7.global.userdata = {
                  id:userIdGen,
                  fullname:postData.name,
                  username:postData.username,
                  email:postData.email,
                  address:postData.address,
                  phone:postData.phone,
                  usertype:postData.usertype,
                  farm_name:postData.farm_name,
                  comodity_type:postData.comodityType,
                  certificate:postData.certificate
                }
                console.log(Template7.global.userdata);


                //INSERT SESSION
                insertSession(userIdGen,postData.username,postData.name,postData.address,postData.phone,postData.farm_name,postData.email,postData.usertype,postData.comodityType,postData.certificate,"");
                  
            }

      }

    })

}

function insertUserExt(postData,userID){
     var created_time = getCurrentDate();

     var dataSend = {
                  user_id : userID,
                  created_time : created_time,
                  username : postData.username,
                  password : postData.password, 
                  fullname : postData.name, 
                  farm_name : postData.farm_name, 
                  email : postData.email, 
                  address : postData.email, 
                  phone : postData.phone, 
                  user_type : postData.usertype,
                  comodity_type:postData.comodityType,
                  certificate:postData.certificate,
                  image : ""
                }

      $.ajax({
          type: "POST",
          url: "https://catatani-ba229.firebaseio.com/user/data.json",
          // The key needs to match your method's input parameter (case-sensitive).
          data: JSON.stringify(dataSend),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(data){

            console.log(data.name);

            $.ajax({
                type: "PUT",
                url: "https://catatani-ba229.firebaseio.com/user/data/"+data.name+"/id.json",
                // The key needs to match your method's input parameter (case-sensitive).
                data: JSON.stringify(data.name),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){

                  console.log(data);
                  
                },
                failure: function(errMsg) {
                    alert(errMsg);
                }
            });


          },
          failure: function(errMsg) {
              alert(errMsg);
          }
      });
}

function getFarmNameByUserId(userID){

    //  var query = 'CREATE TABLE IF NOT EXISTS USER ('+
    //                         'id_user text PRIMARY KEY,'+
    //                         'created_time datetime,'+
    //                         'username text,'+
    //                         'password text,'+
    //                         'fullname text,'+
    //                         'farm_name text,'+
    //                         'email text,' +
    //                         'address text,'+
    //                         'phone text,'+
    //                         'user_type text'+
    //                 ')';

    // var query2 = 'SELECT farm_name FROM USER WHERE id_user = "'+userID+'" ';
    // db.transaction(function (tx) {
    //    tx.executeSql(query);
    //   tx.executeSql(query2,[], function (tx, results){
    //       var len = results.rows.length, i;

    //       for (var i = 0; i < len; i++) {
    //         Template7.global.arrFarmName.push(results.rows.item(i).farm_name)
    //       }

    //       console.log(Template7.global.arrFarmName);
          
    //   });
    // });

    userIdUrl = '"'+userID+'"';
    console.log(userID);

    $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/user/data.json?orderBy=\"user_id\"&equalTo="+userIdUrl,
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           // showLoading();
        },
        success : function(data){

            var result = JSON.parse(data);  

            if(result != null){
              console.log(Object.keys(result).length);
              Template7.global.arrDataComodity = [];

              if(Object.keys(result).length>0){
                $$.each(result, function (index, value) {
                  // console.log(result[index].farm_name);

                      Template7.global.arrFarmName.push(result[index].farm_name)                  

                })

                console.log(Template7.global.arrFarmName);

              }

            }
            

        }
      });
}



function updateProfile(fullname,username,password,email,address,phone,usertype,farmName,comodityType,certificate,image){
    var userID = Template7.global.userdata.id;
     var query;
     Template7.global.userdata = {};

  //   if(password!=""){
  //     query = 'UPDATE USER SET fullname = "'+fullname+'", farm_name = "'+farmName+'", username = "'+username+'", password = "'+password+'", email = "'+email+'", address = "'+address+'", phone = "'+phone+'" WHERE id_user = "'+userID+'" ';
  //   }else{
  //     query = 'UPDATE USER SET fullname = "'+fullname+'", farm_name = "'+farmName+'", username = "'+username+'", email = "'+email+'", address = "'+address+'", phone = "'+phone+'" WHERE id_user = "'+userID+'" ';
   
  //   }
  //    db.transaction(function (tx) {
  //     tx.executeSql(query,[], function (tx, results){
  //           console.log(results);
  //           Template7.global.userdata = {
  //             id:userID,
  //             fullname:fullname,
  //             username:username,
  //             email:email,
  //             address:address,
  //             phone:phone,
  //             usertype:usertype,
  //             farm_name:farmName
  //           }

  //           Template7.global.arrDataComodity = [];
  //           //CHECK COMODITY
  //           getAllComodity();
  //           updateSession(fullname,username,address,phone,email,farmName,userID)

  //     });
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err));
  // });

  userIdUrl = '"'+userID+'"';

    $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/user/data.json?orderBy=\"user_id\"&equalTo="+userIdUrl,
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           showLoading();
        },
        success : function(data){

            var result = JSON.parse(data);  
            var dataSend;

            if(result != null){
              console.log(Object.keys(result).length);
              Template7.global.arrDataComodity = [];

              if(Object.keys(result).length>0){
                $$.each(result, function (index, value) {
                  // console.log(result[index].type);
                  // console.log(type);

                  if(password!=""){
                    dataSend = {
                       fullname : fullname, 
                       farm_name : farmName, 
                       username : username, 
                       password : password, 
                       email : email, 
                       address : address, 
                       phone : phone,
                       comodity_type : comodityType,
                       certificate :certificate,
                       image : image
                    }
                  }else{
                    dataSend = {
                       fullname : fullname, 
                       farm_name : farmName, 
                       username : username, 
                       email : email, 
                       address : address, 
                       phone : phone,
                       comodity_type : comodityType,
                       certificate :certificate,
                       image : image
                    }
                  }

                  $.ajax({
                      type: "PATCH",
                      url: "https://catatani-ba229.firebaseio.com/user/data/"+result[index].id+".json",
                      // The key needs to match your method's input parameter (case-sensitive).
                      data: JSON.stringify(dataSend),
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      success: function(data){

                        console.log(data);
                        Template7.global.userdata = {
                          id:userID,
                          fullname:fullname,
                          username:username,
                          email:email,
                          address:address,
                          phone:phone,
                          usertype:usertype,
                          farm_name:farmName,
                          comodity_type : comodityType,
                          certificate :certificate,
                          image: image
                        }

                          Template7.global.arrDataComodity = [];
                          //CHECK COMODITY
                          getAllComodity();
                          updateSession(fullname,username,address,phone,email,farmName,userID,comodityType,certificate,image)
                        
                      },
                      failure: function(errMsg) {
                          alert(errMsg);
                      }
                  });
                  

                })

                console.log(Template7.global.arrFarmName);

              }

            }
            

        }
      });


}

function updateDeliveryAccount(fullname,email,address,phone){
    var userID = Template7.global.userdata.id;
     
     Template7.global.userdata = {};
      
  //    var query = 'UPDATE USER SET fullname = "'+fullname+'", email = "'+email+'", address = "'+address+'", phone = "'+phone+'" WHERE id_user = "'+userID+'" ';
     
  //    var query2 = 'SELECT * FROM USER WHERE id_user ="'+userID+'" ';


  //    db.transaction(function (tx) {
  //     tx.executeSql(query,[], function (tx, results){
  //           console.log(results);
  //     });
  //      tx.executeSql(query2,[], function (tx, results){
  //         var len = results.rows.length, i;

  //         Template7.global.lengthRegister = len;
  //         console.log(Template7.global.lengthRegister); 
           
  //         if(len == 1){
  //           Template7.global.userdata = {
  //             id:results.rows.item(0).id_user,
  //             fullname:results.rows.item(0).fullname,
  //             username:results.rows.item(0).username,
  //             email:results.rows.item(0).email,
  //             address:results.rows.item(0).address,
  //             phone:results.rows.item(0).phone,
  //             usertype:results.rows.item(0).user_type,
  //             farm_name:results.rows.item(0).farm_name
  //           }
  //           console.log(Template7.global.userdata);

  //           //UPDATE SESSION FOR DELIEVERY ACCOUNT
  //           updateSessionDeliveryAccount(results.rows.item(0).fullname,results.rows.item(0).address,results.rows.item(0).phone,results.rows.item(0).email,results.rows.item(0).id_user)

  //         }
          
  //     });
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err));
  // });

  userIdUrl = '"'+userID+'"';

    $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/user/data.json?orderBy=\"user_id\"&equalTo="+userIdUrl,
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           showLoading();
        },
        success : function(data){

            var result = JSON.parse(data);  
            var dataSend;
            Template7.global.lengthRegister = 0;

            if(result != null){
              console.log(Object.keys(result).length);

              if(Object.keys(result).length>0){
                $$.each(result, function (index, value) {
                  // console.log(result[index].type);
                  // console.log(type);

                   dataSend = {
                     fullname : fullname,
                     email : email, 
                     address : address, 
                     phone : phone
                  }
            
                  $.ajax({
                      type: "PATCH",
                      url: "https://catatani-ba229.firebaseio.com/user/data/"+result[index].id+".json",
                      // The key needs to match your method's input parameter (case-sensitive).
                      data: JSON.stringify(dataSend),
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      success: function(data){

                        console.log(data);
                        
                      },
                      failure: function(errMsg) {
                          alert(errMsg);
                      }
                  });

                  Template7.global.userdata = {
                    id:result[index].user_id,
                    fullname:fullname,
                    username:result[index].username,
                    email:email,
                    address:address,
                    phone:phone,
                    usertype:result[index].user_type,
                    farm_name:result[index].farm_name
                  }
                  console.log(Template7.global.userdata);

                  //UPDATE SESSION FOR DELIEVERY ACCOUNT
                  updateSessionDeliveryAccount(fullname,address,phone,email,result[index].user_id)

                 
                  

                })

                Template7.global.lengthRegister = 1;

              }

            }
            

        }
      });
  
}

function insertSession(username,id){

    var query = 'CREATE TABLE IF NOT EXISTS SESSION ('+
                            'id text PRIMARY KEY,'+
                            'username text'+
                            
                            
                    ')';
    db.transaction(function (tx) {
      tx.executeSql(query);
      tx.executeSql('INSERT INTO SESSION (id, username) VALUES ("'+id+'", "'+username+'")');
      
    }, function(err) {
      console.log('ERROR: ' + JSON.stringify(err.message));
    });
}

function deleteSession(){
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM SESSION', [], function (tx, results) {
        Template7.global.userdata = {};
        
      });
    });
}

function getSession(){
    Template7.global.lengthSession = 0;
    Template7.global.userdata = {};

     var query1 = 'CREATE TABLE IF NOT EXISTS SESSION ('+
                            'id text PRIMARY KEY,'+
                            'username text'+
                            
                            
                    ')';
    var query2 = 'SELECT * FROM SESSION LIMIT 1';
    db.transaction(function (tx) {
      tx.executeSql(query1);
      tx.executeSql(query2,[], function (tx, results){
            if(results.rows.length==1){
              Template7.global.lengthSession = results.rows.length;

              Template7.global.userdata = {
                id:results.rows.item(0).id,
                username:results.rows.item(0).username

              }
            }else{

            }
      });
    });
}

function updateSession(fullname,username,address,phone,email,farmName,userID,comodityType,certificate,image){
  var query = 'UPDATE SESSION SET fullname = "'+fullname+'", username = "'+username+'", address ="'+address+'", phone = "'+phone+'", email = "'+email+'", farm_name = "'+farmName+'", comodity_type = "'+comodityType+'", certificate = "'+certificate+'", image = "'+image+'" WHERE id = "'+userID+'" ';
  db.transaction(function (tx) {
      tx.executeSql(query,[], function (tx, results){
          console.log(results);
      });
  }, function(err) {
    console.log('ERROR: ' + JSON.stringify(err.message));
  });
}

function updateSessionImage(image,userID){
  var query = 'UPDATE SESSION SET image = "'+image+'" WHERE id = "'+userID+'" ';
  db.transaction(function (tx) {
      tx.executeSql(query,[], function (tx, results){
          console.log(results);
      });
  }, function(err) {
    console.log('ERROR: ' + JSON.stringify(err.message));
  });
}

function updateSessionDeliveryAccount(name,address,phone,email,userID){
  var query = 'UPDATE SESSION SET fullname = "'+name+'", address ="'+address+'", phone = "'+phone+'", email = "'+email+'" WHERE id = "'+userID+'" ';
  db.transaction(function (tx) {
      tx.executeSql(query,[], function (tx, results){
          console.log(results);
      });
  }, function(err) {
    console.log('ERROR: ' + JSON.stringify(err.message));
  });
}



///////////////////////////////////////////////// COMODITY ///////////////////////////////////////////////////////////////////////////////////////////////////

function insertComodity(postData){

    var created_time = getCurrentDate();
    console.log(Template7.global.userdata);
    var userID = Template7.global.userdata.id;
    var isPriority =false;

    if(parseInt(postData.total)>=100){
      isPriority = true;
    }

    var grade = "";
    if(Template7.global.userdata.comodity_type=="Konvensional"){
      grade = checkGrade(postData.comodityWeight,postData.comodityHeight);
    }
    
    var dataSend = {
                item_id : postData.item_id,
                created_time  : created_time,
                name : postData.name,
                image : postData.image,
                total : postData.total,
                type : postData.item_type,
                farm_name : Template7.global.userdata.farm_name,
                start_harvest : postData.start_harvest,
                finish_harvest : postData.finish_harvest,
                start_plan : postData.start_plan,
                finish_plan : postData.finish_plan,
                user_id : userID,
                is_notif : false,
                price_min : postData.priceMin,
                price_max : postData.priceMax,
                comodity_type : postData.comodityType,
                comodity_height : postData.comodityHeight,
                comodity_weight : postData.comodityWeight,
                desc : postData.desc,
                is_priority : isPriority,
                grade : grade,
                origin : postData.origin,
                process : postData.process

              }

    $.ajax({
        type: "POST",
        url: "https://catatani-ba229.firebaseio.com/comodity/data.json",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(dataSend),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){

          console.log(data.name);

          $.ajax({
              type: "PUT",
              url: "https://catatani-ba229.firebaseio.com/comodity/data/"+data.name+"/id.json",
              // The key needs to match your method's input parameter (case-sensitive).
              data: JSON.stringify(data.name),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){

                console.log(data);
                
              },
              failure: function(errMsg) {
                  alert(errMsg);
              }
          });


        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });

    
    // var query = 'CREATE TABLE IF NOT EXISTS COMODITY ('+
    //                         'item_id text,'+
    //                         'created_time datetime,'+
    //                         'name text,'+
    //                         'image text,'+
    //                         'total text,'+
    //                         'price text,' +
    //                         'type text,' +
    //                         'start_harvest text,'+
    //                         'finish_harvest text,'+
    //                         'start_plan text,'+
    //                         'finish_plan text,'+
    //                         'user_id text'+
    //                 ')';

    // var query2 = 'INSERT INTO COMODITY (item_id, created_time, name, image, total, price, type, start_harvest, finish_harvest, start_plan, finish_plan, user_id) VALUES ("'+postData.item_id+'", "'+created_time+'", "'+postData.name+'", "'+postData.image+'", "'+postData.total+'","'+postData.price+'","'+postData.item_type+'","'+postData.start_harvest+'","'+postData.finish_harvest+'","'+postData.start_plan+'","'+postData.finish_plan+'", "'+userID+'")';
    // db.transaction(function (tx) {
    //   tx.executeSql(query);
    //   tx.executeSql(query2);
    // }, function(err) {
    //   console.log('ERROR: ' + JSON.stringify(err.message));
    // });
}

function insertAddFieldComodityNonParse(comodityId,newField,newValue){

    $.ajax({
              type: "PUT",
              url: "https://catatani-ba229.firebaseio.com/comodity/data/"+comodityId+"/"+newField+".json",
              // The key needs to match your method's input parameter (case-sensitive).
              data: JSON.stringify(newValue),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){

                console.log(data);
                
              },
              failure: function(errMsg) {
                  alert(errMsg);
              }
          });
}

function removeComodity(id,itemId){
    var userID = Template7.global.userdata.id;
    // db.transaction(function (tx) {
    //   tx.executeSql('DELETE FROM COMODITY WHERE item_id="'+id+'" AND user_id = "'+userID+'" ', [], function (tx, results) {
    //       console.log(results);
    //   });
    // });

    console.log('ID : '+id);
    console.log('itemID : '+itemId);

    $.ajax({
          type: "DELETE",
          url: "https://catatani-ba229.firebaseio.com/comodity/data/"+id+".json",
          // The key needs to match your method's input parameter (case-sensitive).
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(data){

            console.log(data);
            
          },
          failure: function(errMsg) {
              alert(errMsg);
          }
      });

    //remove comodity in cart table on free trx
    //get comodity in cart
    $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/cart/data.json",
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){

        },
        success : function(data){

            var result = JSON.parse(data);  

            if(result != null){
              console.log(Object.keys(result).length);
              
              if(Object.keys(result).length>0){
                $$.each(result, function (index, value) {
                  // console.log(result[index].type);
                  // console.log(type);

                  if(result[index].status=="" && result[index].trx_id == "" && result[index].item_id == itemId && result[index].device_id == device.uuid){
                    
                      $.ajax({
                          type: "DELETE",
                          url: "https://catatani-ba229.firebaseio.com/cart/data/"+result[index].id+".json",
                          // The key needs to match your method's input parameter (case-sensitive).
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          success: function(data){

                            console.log(data);
                            
                          },
                          failure: function(errMsg) {
                              alert(errMsg);
                          }
                      });

                  }

                })

                
              }

            }
            

        }
      });


}

function getTotalComodityByItemId(itemId){

  var userID = Template7.global.userdata.id;

  console.log(itemId);

  // var query = 'CREATE TABLE IF NOT EXISTS COMODITY ('+
  //                           'item_id text,'+
  //                           'created_time datetime,'+
  //                           'name text,'+
  //                           'image text,'+
  //                           'total text,'+
  //                           'price text,' +
  //                           'type text,' +
  //                           'start_harvest text,'+
  //                           'finish_harvest text,'+
  //                           'start_plan text,'+
  //                           'finish_plan text,'+
  //                           'user_id text'+
  //                   ')';
  // var query2 = 'SELECT * FROM COMODITY WHERE user_id = "'+userID+'" AND type = "'+type+'" ';
  // db.transaction(function (tx) {
  //     tx.executeSql(query);
  //     tx.executeSql(query2,[], function (tx, results){
  //         var len = results.rows.length, i;

  //         Template7.global.lengthComodity = len;
  //         Template7.global.arrDataComodity = [];
          
  //         if(len > 0){
  //           for (i = 0; i < len; i++){
  //             Template7.global.arrDataComodity.push({
  //                 item_id: results.rows.item(i).item_id,
  //                 name: results.rows.item(i).name,
  //                 image: results.rows.item(i).image,
  //                 total: results.rows.item(i).total,
  //                 price: results.rows.item(i).price,
  //                 item_type: results.rows.item(i).type,
  //                 startHarvest: results.rows.item(i).start_harvest,
  //                 finishHarvest: results.rows.item(i).finish_harvest,
  //                 startPlan: results.rows.item(i).start_plan,
  //                 finishPlan: results.rows.item(i).finish_plan,
  //                 user_id:results.rows.item(i).user_id
  //             });
  //           }

  //           console.log(Template7.global.arrDataComodity);

            
  //         }
  //     });
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err.message));
  // });


  // type = '"'+type+'"';

  $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/comodity/data.json?orderBy=\"item_id\"&equalTo="+itemId,
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           
        },
        success : function(data){

            var result = JSON.parse(data); 

            console.log(result); 

            if(result != null){
              console.log(Object.keys(result).length);

              var totalAcc = 0;
              
              if(Object.keys(result).length>0){
                $$.each(result, function (index, value) {
             
                    totalAcc = totalAcc + parseInt(result[index].total);
                         
                })

                 Template7.global.arrDataComodity.push({
                        item_id : itemId,
                        total: totalAcc
    
                  });

                //  Template7.global.arrDataComodity.sort(function(a, b) {
                //      return parseInt(a.item_id) - parseInt(b.item_id);
                // });


                console.log(Template7.global.arrDataComodity);

                Template7.global.lengthComodity = Template7.global.arrDataComodity.length;

              }else{
                
                Template7.global.arrDataComodity.push({
                      item_id : itemId,
                      total: 0
  
                });
              }

            }
            

        }
      });

  
}

function getComodityByType(type){

  var userID = Template7.global.userdata.id;

  console.log(userID);

  // var query = 'CREATE TABLE IF NOT EXISTS COMODITY ('+
  //                           'item_id text,'+
  //                           'created_time datetime,'+
  //                           'name text,'+
  //                           'image text,'+
  //                           'total text,'+
  //                           'price text,' +
  //                           'type text,' +
  //                           'start_harvest text,'+
  //                           'finish_harvest text,'+
  //                           'start_plan text,'+
  //                           'finish_plan text,'+
  //                           'user_id text'+
  //                   ')';
  // var query2 = 'SELECT * FROM COMODITY WHERE user_id = "'+userID+'" AND type = "'+type+'" ';
  // db.transaction(function (tx) {
  //     tx.executeSql(query);
  //     tx.executeSql(query2,[], function (tx, results){
  //         var len = results.rows.length, i;

  //         Template7.global.lengthComodity = len;
  //         Template7.global.arrDataComodity = [];
          
  //         if(len > 0){
  //           for (i = 0; i < len; i++){
  //             Template7.global.arrDataComodity.push({
  //                 item_id: results.rows.item(i).item_id,
  //                 name: results.rows.item(i).name,
  //                 image: results.rows.item(i).image,
  //                 total: results.rows.item(i).total,
  //                 price: results.rows.item(i).price,
  //                 item_type: results.rows.item(i).type,
  //                 startHarvest: results.rows.item(i).start_harvest,
  //                 finishHarvest: results.rows.item(i).finish_harvest,
  //                 startPlan: results.rows.item(i).start_plan,
  //                 finishPlan: results.rows.item(i).finish_plan,
  //                 user_id:results.rows.item(i).user_id
  //             });
  //           }

  //           console.log(Template7.global.arrDataComodity);

            
  //         }
  //     });
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err.message));
  // });


  userID = '"'+userID+'"';
  // type = '"'+type+'"';

  $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/comodity/data.json?orderBy=\"user_id\"&equalTo="+userID,
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           showLoading();
        },
        success : function(data){

            var result = JSON.parse(data);  

            if(result != null){
              console.log(Object.keys(result).length);
              Template7.global.arrDataComodity = [];

              
              if(Object.keys(result).length>0){
                $$.each(result, function (index, value) {
                  // console.log(result[index].type);
                  // console.log(type);

                  if(result[index].type==type){
                    Template7.global.arrDataComodity.push({
                        id: result[index].id,
                        item_id: result[index].item_id,
                        name: result[index].name,
                        image: result[index].image,
                        total: result[index].total,
                        item_type: result[index].type,
                        farm_name : result[index].farm_name,
                        startHarvest: result[index].start_harvest,
                        finishHarvest: result[index].finish_harvest,
                        startPlan: result[index].start_plan,
                        finishPlan: result[index].finish_plan,
                        user_id:result[index].user_id,
                        is_notif : result[index].is_notif,
                        price_min : result[index].price_min,
                        price_max : result[index].price_max,
                        comodity_type : result[index].comodity_type,
                        comodity_height : result[index].comodity_height,
                        comodity_weight : result[index].comodity_weight,
                        desc : result[index].desc,
                        is_priority : result[index].is_priority,
                        grade : result[index].grade,
                        origin : result[index].origin,
                        process : result[index].process

                    });
                  }

                })

                console.log(Template7.global.arrDataComodity);

                Template7.global.lengthComodity = Template7.global.arrDataComodity.length;

              }else{
                
                Template7.global.lengthComodity = Object.keys(result).length;
              }

            }
            

        }
      });

  
}

function getAllComodityShop(){

  var userID = Template7.global.userdata.id;
  // var query = 'CREATE TABLE IF NOT EXISTS COMODITY ('+
  //                           'item_id text,'+
  //                           'created_time datetime,'+
  //                           'name text,'+
  //                           'image text,'+
  //                           'total text,'+
  //                           'price text,' +
  //                           'type text,' +
  //                           'start_harvest text,'+
  //                           'finish_harvest text,'+
  //                           'start_plan text,'+
  //                           'finish_plan text,'+
  //                           'user_id text'+
  //                   ')';
  // var query2 = 'SELECT * FROM COMODITY WHERE user_id != "'+userID+'" ORDER BY name';
  // db.transaction(function (tx) {
  //     tx.executeSql(query);
  //     tx.executeSql(query2,[], function (tx, results){
  //         var len = results.rows.length, i;

  //         Template7.global.lengthComodity = len;
  //         Template7.global.arrDataComodity = [];
          
  //         if(len > 0){
  //           for (i = 0; i < len; i++){
  //             Template7.global.arrDataComodity.push({
  //                 item_id: results.rows.item(i).item_id,
  //                 name: results.rows.item(i).name,
  //                 image: results.rows.item(i).image,
  //                 total: results.rows.item(i).total,
  //                 price: results.rows.item(i).price,
  //                 item_type: results.rows.item(i).type,
  //                 startHarvest: results.rows.item(i).start_harvest,
  //                 finishHarvest: results.rows.item(i).finish_harvest,
  //                 startPlan: results.rows.item(i).start_plan,
  //                 finishPlan: results.rows.item(i).finish_plan,
  //                 user_id:results.rows.item(i).user_id
  //             });
  //           }

  //           console.log(Template7.global.arrDataComodity);

            
  //         }
  //     });
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err.message));
  // });


  $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/comodity/data.json",
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           showLoading();
        },
        success : function(data){

            var result = JSON.parse(data);  

            if(result != null){

              console.log(Object.keys(result).length);
              Template7.global.arrDataComodity = [];
              
              if(Object.keys(result).length>0){
                $$.each(result, function (index, value) {
                  // console.log(result[index].type);
                  // console.log(type);

                  if(result[index].user_id!=userID){
                    Template7.global.arrDataComodity.push({
                        id: result[index].id,
                        item_id: result[index].item_id,
                        name: result[index].name,
                        image: result[index].image,
                        total: result[index].total,
                        item_type: result[index].type,
                        farm_name : result[index].farm_name,
                        startHarvest: result[index].start_harvest,
                        finishHarvest: result[index].finish_harvest,
                        startPlan: result[index].start_plan,
                        finishPlan: result[index].finish_plan,
                        user_id:result[index].user_id,
                        is_notif : result[index].is_notif,
                        price_min : result[index].price_min,
                        price_max : result[index].price_max,
                        comodity_type : result[index].comodity_type,
                        comodity_height : result[index].comodity_height,
                        comodity_weight : result[index].comodity_weight,
                        desc : result[index].desc,
                        is_priority : result[index].is_priority,
                        grade : result[index].grade,
                        origin : result[index].origin,
                        process : result[index].process
                    });
                  }

                })

                console.log(Template7.global.arrDataComodity);
                Template7.global.lengthComodity = Template7.global.arrDataComodity.length;

              }else{

                Template7.global.lengthComodity = Object.keys(result).length;
              }

            }
            

        }
      });

  
}

function getAllComodityShopBySellerIdAndItemId(sellerId,itemId){

  // var query = 'CREATE TABLE IF NOT EXISTS COMODITY ('+
  //                           'item_id text,'+
  //                           'created_time datetime,'+
  //                           'name text,'+
  //                           'image text,'+
  //                           'total text,'+
  //                           'price text,' +
  //                           'type text,' +
  //                           'start_harvest text,'+
  //                           'finish_harvest text,'+
  //                           'start_plan text,'+
  //                           'finish_plan text,'+
  //                           'user_id text'+
  //                   ')';
  // var query2 = 'SELECT * FROM COMODITY WHERE user_id = "'+sellerId+'" AND item_id = "'+itemId+'" ';
  // db.transaction(function (tx) {
  //     tx.executeSql(query);
  //     tx.executeSql(query2,[], function (tx, results){
  //         var len = results.rows.length, i;

  //         if(len > 0){
  //           for (i = 0; i < len; i++){
  //             Template7.global.arrTotalComodityUser.push(results.rows.item(i).total);
  //           }

  //           console.log(Template7.global.arrTotalComodityUser);

            
  //         }
  //     });
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err.message));
  // });

  var sellerId = '"'+sellerId+'"';

  $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/comodity/data.json?orderBy=\"user_id\"&equalTo="+sellerId,
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           showLoading();
        },
        success : function(data){

              var result = JSON.parse(data);  

              if(result != null){
              console.log(Object.keys(result).length);

              console.log(result);
              
              if(Object.keys(result).length>0){
                $$.each(result, function (index, value) {
                  // console.log(result[index].item_id);
                  // console.log(itemId);

                  if(result[index].id==itemId){
                    Template7.global.arrTotalComodityUser.push({
                      total : result[index].total,
                      id : result[index].id,
                      start_harvest : result[index].start_harvest,
                      finish_harvest : result[index].finish_harvest
                    }); 

                    console.log(Template7.global.arrTotalComodityUser);
                  }
                                    

                })

              }

              console.log(Template7.global.arrTotalComodityUser);

            }
            

        }
      });

  
}

function getAllComodityShopByType(type){

  var userID = Template7.global.userdata.id;
  // var query = 'CREATE TABLE IF NOT EXISTS COMODITY ('+
  //                           'item_id text,'+
  //                           'created_time datetime,'+
  //                           'name text,'+
  //                           'image text,'+
  //                           'total text,'+
  //                           'price text,' +
  //                           'type text,' +
  //                           'start_harvest text,'+
  //                           'finish_harvest text,'+
  //                           'start_plan text,'+
  //                           'finish_plan text,'+
  //                           'user_id text'+
  //                   ')';
  // var query2 = 'SELECT * FROM COMODITY WHERE type = "'+type+'" AND user_id != "'+userID+'" ORDER BY name';
  // db.transaction(function (tx) {
  //     tx.executeSql(query);
  //     tx.executeSql(query2,[], function (tx, results){
  //         var len = results.rows.length, i;

  //         Template7.global.lengthComodity = len;
  //         Template7.global.arrDataComodity = [];
          
  //         if(len > 0){
  //           for (i = 0; i < len; i++){
  //             Template7.global.arrDataComodity.push({
  //                 item_id: results.rows.item(i).item_id,
  //                 name: results.rows.item(i).name,
  //                 image: results.rows.item(i).image,
  //                 total: results.rows.item(i).total,
  //                 price: results.rows.item(i).price,
  //                 item_type: results.rows.item(i).type,
  //                 startHarvest: results.rows.item(i).start_harvest,
  //                 finishHarvest: results.rows.item(i).finish_harvest,
  //                 startPlan: results.rows.item(i).start_plan,
  //                 finishPlan: results.rows.item(i).finish_plan,
  //                 user_id:results.rows.item(i).user_id
  //             });
  //           }

  //           console.log(Template7.global.arrDataComodity);

            
  //         }
  //     });
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err.message));
  // });

  var type = '"'+type+'"';
  
  $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/comodity/data.json?orderBy=\"type\"&equalTo="+type,
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           showLoading();
        },
        success : function(data){

            var result = JSON.parse(data);  

            if(result != null){
              console.log(Object.keys(result).length);
              Template7.global.arrDataComodity = [];

              
              if(Object.keys(result).length>0){
                $$.each(result, function (index, value) {
                  // console.log(result[index].type);
                  // console.log(type);

                  if(result[index].user_id!=userID){
                    Template7.global.arrDataComodity.push({
                        id: result[index].id,
                        item_id: result[index].item_id,
                        name: result[index].name,
                        image: result[index].image,
                        total: result[index].total,
                        item_type: result[index].type,
                        farm_name : result[index].farm_name,
                        startHarvest: result[index].start_harvest,
                        finishHarvest: result[index].finish_harvest,
                        startPlan: result[index].start_plan,
                        finishPlan: result[index].finish_plan,
                        user_id:result[index].user_id,
                        is_notif : result[index].is_notif,
                        price_min : result[index].price_min,
                        price_max : result[index].price_max,
                        comodity_type : result[index].comodity_type,
                        comodity_height : result[index].comodity_height,
                        comodity_weight : result[index].comodity_weight,
                        desc : result[index].desc,
                        is_priority : result[index].is_priority,
                        grade : result[index].grade,
                        origin : result[index].origin,
                        process : result[index].process
                    });
                  }

                })

                Template7.global.lengthComodity = Template7.global.arrDataComodity.length;

              }else{
                Template7.global.lengthComodity = Object.keys(result).length;
              }

            
            }

        }
      });
  
}

function getAllComodityShopByName(name){

  var userID = Template7.global.userdata.id;
  var query = 'CREATE TABLE IF NOT EXISTS COMODITY ('+
                            'item_id text,'+
                            'created_time datetime,'+
                            'name text,'+
                            'image text,'+
                            'total text,'+
                            'price text,' +
                            'type text,' +
                            'start_harvest text,'+
                            'finish_harvest text,'+
                            'start_plan text,'+
                            'finish_plan text,'+
                            'user_id text'+
                    ')';
  var query2 = 'SELECT * FROM COMODITY WHERE name = "'+name+'" AND user_id != "'+userID+'" ';
  db.transaction(function (tx) {
      tx.executeSql(query);
      tx.executeSql(query2,[], function (tx, results){
          var len = results.rows.length, i;

          Template7.global.lengthComodity = len;
          Template7.global.arrDataComodity = [];
          
          if(len > 0){
            for (i = 0; i < len; i++){
              Template7.global.arrDataComodity.push({
                  id: result[index].id,
                  item_id: result[index].item_id,
                  name: result[index].name,
                  image: result[index].image,
                  total: result[index].total,
                  item_type: result[index].type,
                  farm_name : result[index].farm_name,
                  startHarvest: result[index].start_harvest,
                  finishHarvest: result[index].finish_harvest,
                  startPlan: result[index].start_plan,
                  finishPlan: result[index].finish_plan,
                  user_id:result[index].user_id,
                  is_notif : result[index].is_notif,
                  price_min : result[index].price_min,
                  price_max : result[index].price_max,
                  comodity_type : result[index].comodity_type,
                  comodity_height : result[index].comodity_height,
                  comodity_weight : result[index].comodity_weight,
                  desc : result[index].desc,
                  is_priority : result[index].is_priority,
                  grade : result[index].grade,
                  origin : result[index].origin,
                  process : result[index].process
              });
            }

            console.log(Template7.global.arrDataComodity);

            
          }
      });
  }, function(err) {
    console.log('ERROR: ' + JSON.stringify(err.message));
  });

  
}

function getAllComodity(){

  var userID = Template7.global.userdata.id;
  // var query = 'CREATE TABLE IF NOT EXISTS COMODITY ('+
  //                           'item_id text,'+
  //                           'created_time datetime,'+
  //                           'name text,'+
  //                           'image text,'+
  //                           'total text,'+
  //                           'price text,' +
  //                           'type text,' +
  //                           'start_harvest text,'+
  //                           'finish_harvest text,'+
  //                           'start_plan text,'+
  //                           'finish_plan text,'+
  //                           'user_id text'+
  //                   ')';
  // var query2 = 'SELECT * FROM COMODITY WHERE user_id = "'+userID+'"';
  // db.transaction(function (tx) {
  //     tx.executeSql(query);
  //     tx.executeSql(query2,[], function (tx, results){
  //         var len = results.rows.length, i;

  //         Template7.global.lengthComodity = len;
  //         Template7.global.arrDataComodity = [];
          
  //         if(len > 0){
  //           for (i = 0; i < len; i++){
  //             Template7.global.arrDataComodity.push({
  //                 item_id: results.rows.item(i).item_id,
  //                 name: results.rows.item(i).name,
  //                 image: results.rows.item(i).image,
  //                 total: results.rows.item(i).total,
  //                 price: results.rows.item(i).price,
  //                 item_type: results.rows.item(i).type,
  //                 startHarvest: results.rows.item(i).start_harvest,
  //                 finishHarvest: results.rows.item(i).finish_harvest,
  //                 startPlan: results.rows.item(i).start_plan,
  //                 finishPlan: results.rows.item(i).finish_plan,
  //                 user_id:results.rows.item(i).user_id
  //             });
  //           }

  //           console.log(Template7.global.arrDataComodity);

            
  //         }
  //     });
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err.message));
  // });

  userID = '"'+userID+'"';

  $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/comodity/data.json?orderBy=\"user_id\"&equalTo="+userID,
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           showLoading();
        },
        success : function(data){

            var result = JSON.parse(data);

            if(result != null){

            console.log(Object.keys(result).length);
            Template7.global.lengthComodity = Object.keys(result).length;
            Template7.global.arrDataComodity = [];

            
            if(Object.keys(result).length>0){
              $$.each(result, function (index, value) {
                console.log(result[index].name);

                var dateSplit = result[index].start_harvest.split(" ");
                var splitDate = dateSplit[0].split("/");
                var newDate = splitDate[1]+"/"+splitDate[0]+"/"+splitDate[2];
                var newDatetime = newDate+" "+dateSplit[1];

                var damageTotal = 0;
                var damageAfterTotal = 0;
                var harvestTotal = 0;
                var harvestEstimateTotal = 0;

                if(result[index].hasOwnProperty('harvest_estimate_total')){
                  
                  damageTotal = value.damage_total;
                  damageAfterTotal = value.damage_after_total;
                  harvestTotal = value.harvest_total;
                  harvestEstimateTotal = value.harvest_estimate_total;

                }

                Template7.global.arrDataComodity.push({
                    id: result[index].id,
                    item_id: result[index].item_id,
                    name: result[index].name,
                    image: result[index].image,
                    total: result[index].total,
                    item_type: result[index].type,
                    farm_name : result[index].farm_name,
                    startHarvest: result[index].start_harvest,
                    finishHarvest: result[index].finish_harvest,
                    startPlan: result[index].start_plan,
                    finishPlan: result[index].finish_plan,
                    user_id:result[index].user_id,
                    is_notif : result[index].is_notif,
                    price_min : result[index].price_min,
                    price_max : result[index].price_max,
                    comodity_type : result[index].comodity_type,
                    comodity_height : result[index].comodity_height,
                    comodity_weight : result[index].comodity_weight,
                    desc : result[index].desc,
                    is_priority : result[index].is_priority,
                    grade : result[index].grade,
                    sort_date : newDatetime,
                    damage_total : damageTotal,
                    damage_after_total : damageAfterTotal,
                    harvest_total : harvestTotal,
                    harvest_estimate_total : harvestEstimateTotal,
                    origin : result[index].origin,
                    process : result[index].process
                });

              })

              Template7.global.lengthComodity = Template7.global.arrDataComodity.length;

            }else{
                
                Template7.global.lengthComodity = Object.keys(result).length;
            }
            
          }
        }
      });

  
}

function updateComodity(comodityId,total,priceMin,priceMax,startHarvest,finishHarvest,startPlan,finishPlan,id,userid,comodityType,height,weight,desc,origin,process){

  console.log(comodityId);
  console.log(id);
  //   var query = 'UPDATE COMODITY SET total = "'+total+'", price = "'+price+'", start_harvest = "'+startHarvest+'", finish_harvest = "'+finishHarvest+'",start_plan = "'+startPlan+'", finish_plan = "'+finishPlan+'" WHERE item_id = "'+id+'" AND user_id = "'+userid+'" ';
  // db.transaction(function (tx) {
  //     tx.executeSql(query,[], function (tx, results){
  //           console.log(results);
  //     });
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err));
  // });

    if(comodityId!=null){

      var isPriority = false;

      if(parseInt(total)>=100){
        isPriority =true;
      }

      var grade = checkGrade(weight,height);

      var dataSend = {
         total : total,
         price_min : priceMin,
         price_max : priceMax,
         start_harvest : startHarvest,
         finish_harvest : finishHarvest,
         start_plan : startPlan,
         finish_plan : finishPlan,
         comodity_type : comodityType,
         comodity_height : height,
         comodity_weight : weight,
         desc : desc,
         is_priority : isPriority,
         grade : grade,
         origin : origin,
         process : process
      }

      $.ajax({
          type: "PATCH",
          url: "https://catatani-ba229.firebaseio.com/comodity/data/"+comodityId+".json",
          // The key needs to match your method's input parameter (case-sensitive).
          data: JSON.stringify(dataSend),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(data){

            console.log(data);
            
          },
          failure: function(errMsg) {
              alert(errMsg);
          }
      });
    }


}

function updateTotalComodityByUserId(comodityId,total,status,quantityKg){

  // var query = 'CREATE TABLE IF NOT EXISTS COMODITY ('+
  //                           'item_id text,'+
  //                           'created_time datetime,'+
  //                           'name text,'+
  //                           'image text,'+
  //                           'total text,'+
  //                           'price text,' +
  //                           'type text,' +
  //                           'start_harvest text,'+
  //                           'finish_harvest text,'+
  //                           'start_plan text,'+
  //                           'finish_plan text,'+
  //                           'user_id text'+
  //                   ')';

  // var query2 = 'SELECT total FROM COMODITY WHERE user_id = "'+userId+'" AND item_id = "'+itemId+'" AND name = "'+name+'" ';
  
  // db.transaction(function (tx) {
  //     tx.executeSql(query);
  //     tx.executeSql(query2,[], function (tx, results){
  //         var len = results.rows.length, i;

  //         var amount = 0;

  //         if(status=="decrease"){

  //           console.log(results.rows.item(0).total+" "+parseInt(total));
            
  //           amount = parseInt(results.rows.item(0).total) - parseInt(total);

  //         }else{

  //           amount = parseInt(results.rows.item(0).total) + parseInt(total);

  //         }

  //         console.log('AMOUNT '+amount);


  //         var query3 = 'UPDATE COMODITY SET total = "'+amount+'" WHERE user_id = "'+userId+'" AND item_id = "'+itemId+'" AND name = "'+name+'" ';
 
  //         tx.executeSql(query3,[], function (tx, results){
  //               console.log(results);
  //         });
          
  //     });

      
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err));
  // });

  if(comodityId!=null){

    console.log('comodity ID '+comodityId);

    $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/comodity/data/"+comodityId+".json",
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           // showLoading();
        },
        success : function(data){

            var result = JSON.parse(data);

            var totalMax;
            
            if(!jQuery.isEmptyObject(result)){
                
              totalMax = result.total;

              var amount = 0;

              console.log('total MAX '+totalMax);
              console.log('total '+total);
              console.log('quantity Kg '+quantityKg);

              if(quantityKg){

                 if(status=="decrease"){
                
                    amount = parseInt(totalMax) - parseInt(total);

                  }else{

                    amount = parseInt(totalMax) + parseInt(total);

                  }

              }else{

                  if(status=="decrease"){
                    // console.log('total MAX '+parseFloat(totalMax)*1000);
                    // console.log('total '+parseInt(total)*250);
                  
                    amount = ((parseFloat(totalMax)*1000) - (parseInt(total)*250))/1000;

                  }else{

                    amount = ((parseFloat(totalMax)*1000) + (parseInt(total)*250))/1000;

                  }


              }

              console.log('AMOUNT '+amount);

              if(amount!=null){

                var isPriority = false;

                if(parseInt(amount)>=100){
                  isPriority =true;
                }

                var dataSend = {
                   total : amount,
                   is_priority: isPriority
                }

                $.ajax({
                    type: "PATCH",
                    url: "https://catatani-ba229.firebaseio.com/comodity/data/"+comodityId+".json",
                    // The key needs to match your method's input parameter (case-sensitive).
                    data: JSON.stringify(dataSend),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data){

                      console.log(data);
                      
                    },
                    failure: function(errMsg) {
                        alert(errMsg);
                    }
                });
              }

              

            }
            

        }
      });


      
    }


}

function checkGrade(weight,height){

  var grade = "";
  if(parseInt(weight)>30 && parseInt(height)>100){
    grade = "A";
  }else{
    grade = "B";
  }

  return grade;

}

///////////////////////////////////// LOCATION ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function insertLocation(locationId, address,latitude,longitude){
    
    var created_time = getCurrentDate();
    var userID = Template7.global.userdata.id;
    // var query = 'CREATE TABLE IF NOT EXISTS LOCATION ('+
    //                         'location_id text,'+
    //                         'created_time datetime,'+
    //                         'address text,'+
    //                         'latitude float,'+
    //                         'longitude float,'+
    //                         'user_id text'+
    //                 ')';

    // var query2 = 'INSERT INTO LOCATION (location_id, created_time, address, latitude, longitude, user_id) VALUES ("'+locationId+'", "'+created_time+'", "'+address+'", "'+latitude+'", "'+longitude+'", "'+userID+'")';
    // db.transaction(function (tx) {
    //   tx.executeSql(query);
    //   tx.executeSql(query2);
    // }, function(err) {
    //   console.log('ERROR: ' + JSON.stringify(err.message));
    // });


    var dataSend = {
                location_id : locationId,
                created_time  : created_time,
                address : address,
                latitude : latitude,
                longitude : longitude,
                user_id : userID

              }

    $.ajax({
        type: "POST",
        url: "https://catatani-ba229.firebaseio.com/location/data.json",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(dataSend),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){

          console.log(data.name);

          $.ajax({
              type: "PUT",
              url: "https://catatani-ba229.firebaseio.com/location/data/"+data.name+"/id.json",
              // The key needs to match your method's input parameter (case-sensitive).
              data: JSON.stringify(data.name),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){

                console.log(data);
                
              },
              failure: function(errMsg) {
                  alert(errMsg);
              }
          });


        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}

function removeLocation(id){
    var userID = Template7.global.userdata.id;
    // db.transaction(function (tx) {
    //   tx.executeSql('DELETE FROM LOCATION WHERE location_id="'+id+'" AND user_id = "'+userID+'" ', [], function (tx, results) {
    //       console.log(results);
    //   });
    // });

    console.log(id);

    
    $.ajax({
        type: "DELETE",
        url: "https://catatani-ba229.firebaseio.com/location/data/"+id+".json",
        // The key needs to match your method's input parameter (case-sensitive).
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){

          console.log(data);
          
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });

    

    
}

function removeLocationByLocationId(id){
    var userID = Template7.global.userdata.id;
    // db.transaction(function (tx) {
    //   tx.executeSql('DELETE FROM LOCATION WHERE location_id="'+id+'" AND user_id = "'+userID+'" ', [], function (tx, results) {
    //       console.log(results);
    //   });
    // });

    console.log(id);

    userID = '"'+userID+'"';

    $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/location/data.json?orderBy=\"user_id\"&equalTo="+userID,
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           // showLoading();
        },
        success : function(data){

            var result = JSON.parse(data);  

            if(result != null){
              console.log(Object.keys(result).length);

              
              if(Object.keys(result).length>0){
                $$.each(result, function (index, value) {
                  
                  if(value.location_id==id){
                      $.ajax({
                          type: "DELETE",
                          url: "https://catatani-ba229.firebaseio.com/location/data/"+value.id+".json",
                          // The key needs to match your method's input parameter (case-sensitive).
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          success: function(data){

                            console.log(data);
                            
                          },
                          failure: function(errMsg) {
                              alert(errMsg);
                          }
                      });
                   }

                })

                  
                }
              }

            }
            


      });

    

    
}

function getAllLocation(){

  var userID = Template7.global.userdata.id;
  // var query = 'CREATE TABLE IF NOT EXISTS LOCATION ('+
  //                           'location_id text,'+
  //                           'created_time datetime,'+
  //                           'address text,'+
  //                           'latitude float,'+
  //                           'longitude float,'+
  //                           'user_id text'+
  //                   ')';
  // var query2 = 'SELECT * FROM LOCATION WHERE user_id = "'+userID+'"';
  // db.transaction(function (tx) {
  //     tx.executeSql(query);
  //     tx.executeSql(query2,[], function (tx, results){
  //         var len = results.rows.length, i;

  //         Template7.global.lengthLocation = len;
  //         Template7.global.arrDataLocation = [];
          
  //         if(len > 0){
  //           for (i = 0; i < len; i++){
  //             Template7.global.arrDataLocation.push({
  //                 location_id: results.rows.item(i).location_id,
  //                 address: results.rows.item(i).address,
  //                 latitude: results.rows.item(i).latitude,
  //                 longitude: results.rows.item(i).longitude,
  //                 user_id:results.rows.item(i).user_id
  //             });
  //           }

  //           console.log(Template7.global.arrDataLocation);

            
  //         }
  //     });
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err.message));
  // });


  userID = '"'+userID+'"';

  $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/location/data.json?orderBy=\"user_id\"&equalTo="+userID,
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           showLoading();
        },
        success : function(data){

            console.log(data);
            var result = JSON.parse(data);  

            if(result != null){
              console.log(Object.keys(result).length);
              Template7.global.arrDataLocation = [];

              
              if(Object.keys(result).length>0){
                $$.each(result, function (index, value) {
                  
                    Template7.global.arrDataLocation.push({
                        location_id: result[index].location_id,
                        address: result[index].address,
                        latitude: result[index].latitude,
                        longitude: result[index].longitude,
                        user_id:result[index].user_id,
                        id:result[index].id
                    });

                })

                console.log(Template7.global.arrDataLocation);
              }

            }
            

        }
      });
  
}

/////////////////////////////////////////// CART ///////////////////////////////////////////////////////////////////////////////////////////////////

function insertCart(postData){

    console.log('masuk insert cart');
    console.log(Template7.global.userdata);
    var userID,userIdUrl;

    if(Template7.global.userdata!=undefined && Template7.global.userdata!=null && !jQuery.isEmptyObject(Template7.global.userdata) ){
        
        userID = Template7.global.userdata.id;
        userIdUrl = '"'+userID+'"';
    }else{
        userIdUrl = "\"\"";
        userID = "";
    }

    $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/cart/data.json?orderBy=\"user_id\"&equalTo="+userIdUrl,
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           // showLoading();
        },
        success : function(data){

            var result = JSON.parse(data);

            console.log(Object.keys(result).length);

            console.log(result);

            var comodityIdTmp,totalTmp;
            var isSame = false;
            
            if(Object.keys(result).length>0){
              $$.each(result, function (index, value) {

                   if(result[index].seller_id==postData.seller_id && result[index].item_id==postData.item_id && result[index].delivery_time==postData.delivery_time && result[index].special==postData.special && result[index].trx_id=="" && result[index].status=="" && result[index].device_id == device.uuid){ //&& result[index].device_id == device.uuid
                      isSame = true;
                      comodityIdTmp = result[index].id;
                      totalTmp = result[index].total;
                      return false;
                   }
                
                  
              })

              console.log("SAME "+isSame);
              console.log(comodityIdTmp);
              console.log(totalTmp);

              if(isSame){
                //update total cart


                  var amountTotal;

                  // if(postData.unit){
                      amountTotal = parseInt(totalTmp) + parseInt(postData.total);
                  // }else{
                  //     amountTotal = parseInt(totalTmp) + parseInt(postData.total);
                  // }

                  var dataSend = {
                     total : amountTotal,
                     total_max : postData.totalMax
                  }

                  $.ajax({
                      type: "PATCH",
                      url: "https://catatani-ba229.firebaseio.com/cart/data/"+comodityIdTmp+".json",
                      // The key needs to match your method's input parameter (case-sensitive).
                      data: JSON.stringify(dataSend),
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      success: function(data){

                        document.getElementById("cart_total").innerHTML = String(postData.cart_total);
                        console.log(data);
                        
                      },
                      failure: function(errMsg) {
                          alert(errMsg);
                      }
                  });
              }else {
                insertCartExt(postData,userID);
              }


            }else{
              insertCartExt(postData,userID);
            }

          

        }
    });



    // var query = 'CREATE TABLE IF NOT EXISTS CART ('+
    //                         'cart_id text,'+
    //                         'created_time datetime,'+
    //                         'item_id text,'+
    //                         'name text,'+
    //                         'seller_id text,'+
    //                         'farm text,'+
    //                         'image text,'+
    //                         'price text,'+
    //                         'total text,'+
    //                         'total_max text,'+
    //                         'status text,' +
    //                         'delivery_time text,'+
    //                         'special int,'+
    //                         'trx_id text,'+
    //                         'user_id text'+
    //                 ')';

    // var query2 = 'INSERT INTO CART (cart_id, created_time, item_id, name, seller_id, farm, image,price, total, total_max, status, delivery_time, special, trx_id, user_id) VALUES ("'+cartId+'", "'+created_time+'","'+postData.item_id+'", "'+postData.name+'", "'+postData.seller_id+'", "'+postData.farm+'", "'+postData.image+'", "'+postData.price+'", "'+postData.total+'","'+postData.totalMax+'","","'+postData.delivery_time+'","'+postData.special+'","'+trxID+'","'+userID+'")';
    // var query3 = 'SELECT * FROM CART WHERE seller_id = "'+postData.seller_id+'" AND item_id = "'+postData.item_id+'" AND delivery_time = "'+postData.delivery_time+'" AND special = "'+postData.special+'" ';

    // db.transaction(function (tx) {
    //   tx.executeSql(query);

    //    tx.executeSql(query3,[], function (tx, results){
    //         var len = results.rows.length, i;

    //         if(len==0){
    //           console.log('insert cart');
    //           tx.executeSql(query2);

    //         }else{
    //           console.log('update cart insert');
    //           var amountTotal = parseInt(results.rows.item(0).total) + parseInt(postData.total);
    //           var query4 = 'UPDATE CART SET total = "'+amountTotal+'", total_max = "'+postData.totalMax+'" WHERE cart_id = "'+results.rows.item(0).cart_id+'" ';
    //           tx.executeSql(query4,[], function (tx, results){
    //                 console.log(results);
    //           });
    //         }

    //    })

    // }, function(err) {
    //   console.log('ERROR: ' + JSON.stringify(err.message));
    // });
}

function insertCartExt(postData,userID){


  //insert cart
  var cartId = makeid();
  var created_time = getCurrentDate();
  var trxID = "";
  // var deviceId = "test";
  var deviceId = device.uuid;

     var dataSend = {
                  cart_id : cartId,
                  created_time : created_time,
                  item_id : postData.item_id,
                  name : postData.name,
                  seller_id : postData.seller_id,
                  farm : postData.farm,
                  image :postData.image,
                  price : postData.price,
                  total :postData.total,
                  total_max : postData.totalMax,
                  status : "",
                  delivery_time : postData.delivery_time,
                  special : postData.special,
                  trx_id : trxID,
                  user_id : userID,
                  device_id : deviceId,
                  unit_kg : postData.unit,
                  address_user : postData.address
                }

      $.ajax({
          type: "POST",
          url: "https://catatani-ba229.firebaseio.com/cart/data.json",
          // The key needs to match your method's input parameter (case-sensitive).
          data: JSON.stringify(dataSend),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(data){

            console.log(data.name);

            $.ajax({
                type: "PUT",
                url: "https://catatani-ba229.firebaseio.com/cart/data/"+data.name+"/id.json",
                // The key needs to match your method's input parameter (case-sensitive).
                data: JSON.stringify(data.name),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){

                  postData.cart_total++;
                  document.getElementById("cart_total").innerHTML= String(postData.cart_total);

                  console.log(data);
                  
                },
                failure: function(errMsg) {
                    alert(errMsg);
                }
            });


          },
          failure: function(errMsg) {
              alert(errMsg);
          }
      });
}

function getAllCart(){

  var userID;
  var query2;

  console.log(Template7.global.userdata);

  // if(Template7.global.userdata!=undefined && Template7.global.userdata!=null && !jQuery.isEmptyObject(Template7.global.userdata) ){
  //     userID = Template7.global.userdata.id;
  //     console.log(userID);
  //     query2 = 'SELECT * FROM CART WHERE user_id = "'+userID+'" AND trx_id = "" ';
  // }else{
  //   console.log('not login');
  //     query2 = 'SELECT * FROM CART WHERE user_id = "" AND trx_id = "" ';
  // }

  // var query = 'CREATE TABLE IF NOT EXISTS CART ('+
  //                           'cart_id text,'+
  //                           'created_time datetime,'+
  //                           'item_id text,'+
  //                           'name text,'+
  //                           'seller_id text,'+
  //                           'farm text,'+
  //                           'image text,'+
  //                           'price text,'+
  //                           'total text,'+
  //                           'total_max text,'+
  //                           'status text,' +
  //                           'delivery_time text,'+
  //                           'special int,'+
  //                           'trx_id text,'+
  //                           'user_id text'+
  //                   ')';

  // db.transaction(function (tx) {
  //         tx.executeSql(query);

  //         tx.executeSql(query2,[], function (tx, results){
  //           var len = results.rows.length, i;

  //           Template7.global.lengthCart = len;
  //           Template7.global.arrDataCart = [];
            
  //           if(len > 0){
  //             for (i = 0; i < len; i++){
  //               Template7.global.arrDataCart.push({
  //                   cart_id: results.rows.item(i).cart_id,
  //                   item_id: results.rows.item(i).item_id,
  //                   name: results.rows.item(i).name,
  //                   seller_id: results.rows.item(i).seller_id,
  //                   farm: results.rows.item(i).farm,
  //                   image: results.rows.item(i).image,
  //                   price: results.rows.item(i).price,
  //                   total: results.rows.item(i).total,
  //                   total_max: results.rows.item(i).total_max,
  //                   status: results.rows.item(i).status,
  //                   special: results.rows.item(i).special,
  //                   delivery_time: results.rows.item(i).delivery_time
  //               });
  //             }

  //             console.log(Template7.global.arrDataCart);

              
  //           }
  //       });
      
     
      
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err.message));
  // });

  
  userID = "\"\"";

  if(Template7.global.userdata!=undefined && Template7.global.userdata!=null && !jQuery.isEmptyObject(Template7.global.userdata) ){
      userID = Template7.global.userdata.id;
      userID = '"'+userID+'"';
  }

  console.log('userID '+userID);
  // console.log('UUID '+device.uuid);

  $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/cart/data.json?orderBy=\"user_id\"&equalTo="+userID,
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           showLoading();
        },
        success : function(data){

            var result = JSON.parse(data);

            if(result!=null){

            console.log(Object.keys(result).length);
            Template7.global.arrDataCart = [];

            
            if(Object.keys(result).length>0){
              $$.each(result, function (index, value) {
                console.log(result[index].name);

                if(result[index].trx_id=="" && result[index].device_id == device.uuid){ //&& result[index].device_id == device.uuid
                  Template7.global.arrDataCart.push({
                      id:result[index].id,
                      cart_id: result[index].cart_id,
                      item_id: result[index].item_id,
                      name: result[index].name,
                      seller_id: result[index].seller_id,
                      farm: result[index].farm,
                      image: result[index].image,
                      price: result[index].price,
                      total: result[index].total,
                      total_max: result[index].total_max,
                      status: result[index].status,
                      special: result[index].special,
                      delivery_time: result[index].delivery_time,
                      unit_kg : result[index].unit_kg
                  });
                }
                

              })

              Template7.global.lengthCart = Template7.global.arrDataCart.length;

            }else{
                
                Template7.global.lengthCart = Object.keys(result).length;
            }
           
            
          }
            
            

        }
      });

  
}

function getAllItemPerSellerCart(){

  var userID;
  var query2;

  console.log(Template7.global.userdata);

  if(Template7.global.userdata!=undefined && Template7.global.userdata!=null && !jQuery.isEmptyObject(Template7.global.userdata) ){
      userID = Template7.global.userdata.id;
      console.log(userID);
      query2 = 'SELECT DISTINCT cart_id, item_id, name, seller_id, farm, image, price, SUM(total) as total, MIN(total_max) as total_max, status, special, delivery_time FROM CART WHERE user_id = "'+userID+'" AND trx_id = "" GROUP BY seller_id, item_id, delivery_time, special';
  }else{
    console.log('not login');
      query2 = 'SELECT DISTINCT cart_id, item_id, name, seller_id, farm, image, price, SUM(total) as total, MIN(total_max) as total_max, status, special, delivery_time FROM CART WHERE user_id = "" AND trx_id = "" GROUP BY seller_id, item_id, delivery_time, special ';
  }

  var query = 'CREATE TABLE IF NOT EXISTS CART ('+
                            'cart_id text,'+
                            'created_time datetime,'+
                            'item_id text,'+
                            'name text,'+
                            'seller_id text,'+
                            'farm text,'+
                            'image text,'+
                            'price text,'+
                            'total text,'+
                            'total_max text,'+
                            'status text,' +
                            'delivery_time text,'+
                            'special int,'+
                            'trx_id text,'+
                            'user_id text'+
                    ')';

  db.transaction(function (tx) {
          tx.executeSql(query);

          tx.executeSql(query2,[], function (tx, results){
            var len = results.rows.length, i;

            Template7.global.lengthCart = len;
            Template7.global.arrDataCart = [];

            console.log(len);
            
            if(len > 0){
              for (i = 0; i < len; i++){
                Template7.global.arrDataCart.push({
                    cart_id: results.rows.item(i).cart_id,
                    item_id: results.rows.item(i).item_id,
                    name: results.rows.item(i).name,
                    seller_id: results.rows.item(i).seller_id,
                    farm: results.rows.item(i).farm,
                    image: results.rows.item(i).image,
                    price: results.rows.item(i).price,
                    total: results.rows.item(i).total,
                    total_max: results.rows.item(i).total_max,
                    status: results.rows.item(i).status,
                    special: results.rows.item(i).special,
                    delivery_time: results.rows.item(i).delivery_time
                });
              }

              console.log(Template7.global.arrDataCart);

              
            }
        });
      
     
      
  }, function(err) {
    console.log('ERROR: ' + JSON.stringify(err.message));
  });

  
}

function removeCartById(id){
    // var userID = Template7.global.userdata.id;
    // db.transaction(function (tx) {
    //   tx.executeSql('DELETE FROM CART WHERE item_id = "'+itemId+'" AND seller_id = "'+sellerId+'" AND delivery_time = "'+deliveryTime+'" AND special = "'+special+'" ', [], function (tx, results) {
    //       console.log(results);
    //   });
    // });

    $.ajax({
          type: "DELETE",
          url: "https://catatani-ba229.firebaseio.com/cart/data/"+id+".json",
          // The key needs to match your method's input parameter (case-sensitive).
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(data){

            console.log(data);
            
          },
          failure: function(errMsg) {
              alert(errMsg);
          }
      });
}

function removeAllCart(){
    var userID = Template7.global.userdata.id;
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM CART WHERE user_id = "'+userID+'" ', [], function (tx, results) {
          console.log(results);
      });
    });
}

function updateCartFreeUser(){

  var userID = Template7.global.userdata.id;
  //   var query = 'UPDATE CART SET user_id = "'+userID+'" WHERE user_id = "" ';
  // db.transaction(function (tx) {
  //     tx.executeSql(query,[], function (tx, results){
  //           console.log(results);
  //     });
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err));
  // });

  //find match sellerId and userId
  var userIdUrl = "\"\"";

  $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/cart/data.json",
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           // showLoading();
        },
        success : function(data){

            var result = JSON.parse(data);
            var match = false;
            if(result!=null){

              console.log(Object.keys(result).length);
              Template7.global.arrDataCart = [];

              if(Object.keys(result).length>0){
                $$.each(result, function (index, value) {
                // console.log(result[index].id);

                  if(result[index].seller_id!=userID && result[index].user_id=="" && result[index].device_id==device.uuid){

                      match = true;
                      var dataSend = {
                         user_id : userID
                      }

                      console.log('coba update free user');

                      $.ajax({
                          type: "PATCH",
                          url: "https://catatani-ba229.firebaseio.com/cart/data/"+result[index].id+".json",
                          // The key needs to match your method's input parameter (case-sensitive).
                          data: JSON.stringify(dataSend),
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          success: function(data){

                            console.log(data);
                            
                          },
                          failure: function(errMsg) {
                              alert(errMsg);
                          }
                      })         
                                          

                    }
                  });


                }

                if(mainView.activePage.name=="cart_shop_list"){

                  if(!match){
                    myApp.alert("Barang yang dibeli menggunakan akun penjual yang sama, Silahkan gunakan akun lain","notifikasi")
                  }

                }
      

          }
        }
  })
  

}

function updateCartById(cartUid,deliveryTime,totalMax,status){

  // console.log(id);

  // var query;
  // var userID;
  // var isLogin;

  // if(Template7.global.userdata!=undefined && Template7.global.userdata!=null && !jQuery.isEmptyObject(Template7.global.userdata)){
  //   userID = Template7.global.userdata.id;
  //   isLogin = 1;
  // }else{
  //   userID = "";
  //   isLogin = 0;
  // }

  // var query2 = 'SELECT total FROM CART WHERE cart_id = "'+id+'" AND item_id = "'+itemId+'" AND seller_id = "'+sellerId+'" AND delivery_time = "'+deliveryTime+'" AND special = "'+special+'" ';
  
  // db.transaction(function (tx) {
  //     tx.executeSql(query2,[], function (tx, results){
  //         var len = results.rows.length, i;

  //         var amount = 0;

  //         if(status=="decrease"){
            
  //           amount = parseInt(results.rows.item(0).total) - 1;

  //         }else{

  //           amount = parseInt(results.rows.item(0).total) + 1;

  //         }

  //         console.log('AMOUNT '+amount);

  //         var query3 = 'UPDATE CART SET total = "'+amount+'", delivery_time = "'+deliveryTime+'", total_max = "'+totalMax+'" WHERE cart_id = "'+id+'" AND user_id = "'+userID+'" AND trx_id = "" ';

  //         tx.executeSql(query3,[], function (tx, results){
  //               console.log(results);
  //         });
          
  //     });
  // })
    
    console.log('cartUid '+cartUid);

    $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/cart/data/"+cartUid+".json",
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           showLoading();
        },
        success : function(data){

            console.log('masuk update cart');

            var result = JSON.parse(data);

            console.log(result);

            if(!jQuery.isEmptyObject(result)){

                  var amount = 0;

                  console.log(result.total);
                  console.log(parseInt(result.total));

                  if(status=="decrease"){
                    
                    amount = parseInt(result.total) - 1;

                  }else{

                    amount = parseInt(result.total) + 1;

                  }

                  
                  var dataSend = {
                     delivery_time : deliveryTime,
                     total : amount,
                     total_max : totalMax
                  }

                  console.log(dataSend);

                  $.ajax({
                      type: "PATCH",
                      url: "https://catatani-ba229.firebaseio.com/cart/data/"+cartUid+".json",
                      // The key needs to match your method's input parameter (case-sensitive).
                      data: JSON.stringify(dataSend),
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      success: function(data){

                        console.log(data);
                        
                      },
                      failure: function(errMsg) {
                          alert(errMsg);
                      }
                  });

            }


        }
    });

}

function updateTrxIdCartByUserid(trxID,cartID,deliveryStatus){

  var userID = Template7.global.userdata.id;
  // var query = 'UPDATE CART SET trx_id = "'+trxID+'",status = "'+deliveryStatus+'" WHERE cart_id = "'+cartID+'" AND user_id = "'+userID+'" ';
  // db.transaction(function (tx) {
  //     tx.executeSql(query,[], function (tx, results){
  //           console.log(results);
  //     });
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err));
  // });

  var userIdUrl = '"'+userID+'"';

  $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/cart/data.json?orderBy=\"user_id\"&equalTo="+userIdUrl,
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           showLoading();
        },
        success : function(data){

            hideLoading();

            var result = JSON.parse(data);

            console.log(Object.keys(result).length);

            if(Object.keys(result).length>0){
              $$.each(result, function (index, value) {
                console.log(result[index].cart_id);

                if(result[index].cart_id == cartID ){ //&& result[index].device_id == device.uuid

                   var dataSend = {
                     trx_id : trxID,
                     status : deliveryStatus
                  }

                  $.ajax({
                      type: "PATCH",
                      url: "https://catatani-ba229.firebaseio.com/cart/data/"+result[index].id+".json",
                      // The key needs to match your method's input parameter (case-sensitive).
                      data: JSON.stringify(dataSend),
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      success: function(data){

                        console.log(data);
                        
                      },
                      failure: function(errMsg) {
                          alert(errMsg);
                      }
                   });
                }

              })

             
            }
           
            

            
            

        }
      });

}

function getCartByTrxId(trxId){

  console.log(Template7.global.userdata.id);
  var userId = Template7.global.userdata.id;

  // var query = 'CREATE TABLE IF NOT EXISTS CART ('+
  //                           'cart_id text,'+
  //                           'created_time datetime,'+
  //                           'item_id text,'+
  //                           'name text,'+
  //                           'seller_id text,'+
  //                           'farm text,'+
  //                           'image text,'+
  //                           'price text,'+
  //                           'total text,'+
  //                           'total_max text,'+
  //                           'status text,' +
  //                           'delivery_time text,'+
  //                           'special int,'+
  //                           'trx_id text,'+
  //                           'user_id text'+
  //                   ')';
  
  // var query2 = 'SELECT * FROM CART WHERE user_id = "'+userId+'" AND trx_id = "'+trxId+'" ';
  
  // db.transaction(function (tx) {
  //         tx.executeSql(query);

  //         tx.executeSql(query2,[], function (tx, results){
  //           var len = results.rows.length, i;

  //           console.log(len);

  //           Template7.global.lengthCart = len;
  //           Template7.global.arrDataCart = [];
            
  //           if(len > 0){
  //             for (i = 0; i < len; i++){
  //               Template7.global.arrDataCart.push({
  //                   cart_id: results.rows.item(i).cart_id,
  //                   item_id: results.rows.item(i).item_id,
  //                   name: results.rows.item(i).name,
  //                   seller_id: results.rows.item(i).seller_id,
  //                   farm: results.rows.item(i).farm,
  //                   image: results.rows.item(i).image,
  //                   price: results.rows.item(i).price,
  //                   total: results.rows.item(i).total,
  //                   total_max: results.rows.item(i).total_max,
  //                   status: results.rows.item(i).status,
  //                   special: results.rows.item(i).special,
  //                   delivery_time: results.rows.item(i).delivery_time
  //               });
                    
  //             }
  //               console.log(Template7.global.arrDataCart);
  //               Template7.global.arrCartTransaction.push(Template7.global.arrDataCart);
  //               Template7.global.arrDataCart = [];
  //           }
  //       });
      
     
      
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err.message));
  // });

  var userIdUrl = '"'+userId+'"';

  console.log('USER ID '+userIdUrl);
  
  $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/cart/data.json?orderBy=\"user_id\"&equalTo="+userIdUrl,
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           // showLoading();
        },
        success : function(data){

          // setTimeout(function(){

            var result = JSON.parse(data);

            if(result!=null){

            console.log(Object.keys(result).length);
            Template7.global.arrDataCart = [];

            if(Object.keys(result).length>0){
              $$.each(result, function (index, value) {
                // console.log(result[index].id);

                if(result[index].trx_id==trxId && result[index].device_id == device.uuid){

                    Template7.global.arrDataCart.push({
                      id : result[index].id,
                      cart_id: result[index].cart_id,
                      item_id: result[index].item_id,
                      name: result[index].name,
                      seller_id: result[index].seller_id,
                      farm: result[index].farm,
                      image: result[index].image,
                      price: result[index].price,
                      total: result[index].total,
                      total_max: result[index].total_max,
                      status: result[index].status,
                      special: result[index].special,
                      delivery_time: result[index].delivery_time
                  });
                } 

              })

              Template7.global.arrCartTransaction.push(Template7.global.arrDataCart);
              Template7.global.lengthCart = Template7.global.arrDataCart.length;
              Template7.global.arrDataCart = [];

            }

          // }, 1000);
          
          }

        }

  })
  
}

function getCartItemByFarmNameAndUserId(){

  console.log(Template7.global.userdata.id);
  var userId = Template7.global.userdata.id;
  var farmName = Template7.global.userdata.farm_name;

  // var query = 'CREATE TABLE IF NOT EXISTS CART ('+
  //                           'cart_id text,'+
  //                           'created_time datetime,'+
  //                           'item_id text,'+
  //                           'name text,'+
  //                           'seller_id text,'+
  //                           'farm text,'+
  //                           'image text,'+
  //                           'price text,'+
  //                           'total text,'+
  //                           'total_max text,'+
  //                           'status text,' +
  //                           'delivery_time text,'+
  //                           'special int,'+
  //                           'trx_id text,'+
  //                           'user_id text'+
  //                   ')';
  
  // var query2 = 'SELECT * FROM CART WHERE user_id != "'+userId+'" AND farm = "'+farmName+'" AND status = "diterima" ORDER BY created_time DESC ';
  
  // db.transaction(function (tx) {
  //         tx.executeSql(query);

  //         tx.executeSql(query2,[], function (tx, results){
  //           var len = results.rows.length, i;

  //           console.log(len);

  //           Template7.global.lengthCart = len;
  //           Template7.global.arrDataCart = [];
            
  //           if(len > 0){
  //             for (i = 0; i < len; i++){
  //               Template7.global.arrDataCart.push({
  //                   cart_id: results.rows.item(i).cart_id,
  //                   item_id: results.rows.item(i).item_id,
  //                   name: results.rows.item(i).name,
  //                   seller_id: results.rows.item(i).seller_id,
  //                   farm: results.rows.item(i).farm,
  //                   image: results.rows.item(i).image,
  //                   price: results.rows.item(i).price,
  //                   total: results.rows.item(i).total,
  //                   total_max: results.rows.item(i).total_max,
  //                   status: results.rows.item(i).status,
  //                   special: results.rows.item(i).special,
  //                   delivery_time: results.rows.item(i).delivery_time
  //               });
                    
  //             }
                
  //           }
  //       });
      
     
      
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err.message));
  // });

  $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/cart/data.json",
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           // showLoading();
        },
        success : function(data){

            // hideLoading();

            var result = JSON.parse(data);

            if(result!=null){

            console.log(Object.keys(result).length);
            Template7.global.arrDataCart = [];

            var splitDate = [];

            if(Object.keys(result).length>0){
              $$.each(result, function (index, value) {
                console.log(result[index].seller_id);
                // && result[index].device_id == device.uuid
                if(result[index].seller_id==userId && result[index].device_id == device.uuid  && result[index].farm==farmName && result[index].status=="diterima"){

                    // dateSplit = result[index].created_time.split(" ");
                    // splitDate.push(dateSplit[0]);
                    var dateSplit = result[index].created_time.split(" ");
                    var splitDate = dateSplit[0].split("/");
                    var newDate = splitDate[1]+"/"+splitDate[0]+"/"+splitDate[2];
                    var newDatetime = newDate+" "+dateSplit[1];

                    console.log(newDatetime);

                      Template7.global.arrDataCart.push({
                        id : result[index].id,
                        cart_id: result[index].cart_id,
                        item_id: result[index].item_id,
                        name: result[index].name,
                        seller_id: result[index].seller_id,
                        farm: result[index].farm,
                        image: result[index].image,
                        price: result[index].price,
                        total: result[index].total,
                        total_max: result[index].total_max,
                        status: result[index].status,
                        special: result[index].special,
                        delivery_time: result[index].delivery_time,
                        address: result[index].address_user,
                        created_time: result[index].created_time,
                        sort_date: newDatetime
                      });   
                } 

              })

              // console.log("split date "+splitDate);

              Template7.global.arrDataCart.sort(function(a, b) {
                   return new Date(b.sort_date) - new Date(a.sort_date);
              });

              console.log(Template7.global.arrDataCart)
           

            }

          }

        }

  })

}

function updateDeliveryTimeCart(comodityId,deliveryTimeUpdate){
  // var userID = Template7.global.userdata.id;
  // var query = 'UPDATE CART SET delivery_time = "'+deliveryTimeUpdate+'" WHERE seller_id = "'+sellerId+'" AND item_id = "'+itemId+'" AND delivery_time = "'+deliveryTime+'" AND special = "'+special+'" ';
  // db.transaction(function (tx) {
  //     tx.executeSql(query,[], function (tx, results){
  //           console.log(results);
  //     });
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err));
  // });

  var dataSend = {
       delivery_time : deliveryTimeUpdate
    }

    $.ajax({
        type: "PATCH",
        url: "https://catatani-ba229.firebaseio.com/cart/data/"+comodityId+".json",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(dataSend),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){

          console.log(data);
          
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });

}

function updateStatusCart(deliveryStatus,cartID){
  var userID = Template7.global.userdata.id;
  // var query = 'UPDATE CART SET status = "'+deliveryStatus+'" WHERE cart_id = "'+cartID+'" AND user_id != "'+userID+'" ';
  // db.transaction(function (tx) {
  //     tx.executeSql(query,[], function (tx, results){
  //           console.log(results);
  //     });
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err));
  // });

  $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/cart/data.json",
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           showLoading();
        },
        success : function(data){

            var result = JSON.parse(data);

            console.log(Object.keys(result).length);

            if(Object.keys(result).length>0){
              $$.each(result, function (index, value) {
                console.log(result[index].cart_id);

                if(result[index].cart_id == cartID && result[index].device_id == device.uuid && result[index].user_id !=userID){

                   var dataSend = {
                     status : deliveryStatus
                  }

                  $.ajax({
                      type: "PATCH",
                      url: "https://catatani-ba229.firebaseio.com/cart/data/"+result[index].id+".json",
                      // The key needs to match your method's input parameter (case-sensitive).
                      data: JSON.stringify(dataSend),
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      success: function(data){

                        console.log(data);
                        
                      },
                      failure: function(errMsg) {
                          alert(errMsg);
                      }
                   });
                }

              })

             
            }
           
            

            
            

        }
      });

}

///////////////////////////////////////// TRANSACTION ////////////////////////////////////////////////////////////////////////////////////////////

function insertTransaction(total,paymentMethod){
    var created_time = getCurrentDate();
    var userID = Template7.global.userdata.id;
    var orderID = makeid();
    // var query = 'CREATE TABLE IF NOT EXISTS ORDER_SHOP ('+
    //                         'trx_id text,'+
    //                         'created_time datetime,'+
    //                         'payment_method text,'+
    //                         'total text,'+
    //                         'user_id text'+
    //                 ')';

    // var query2 = 'INSERT INTO ORDER_SHOP (trx_id, created_time, payment_method, total, user_id) VALUES ("'+orderID+'", "'+created_time+'","'+paymentMethod+'", "'+total+'", "'+userID+'" )';
    // db.transaction(function (tx) {
    //   tx.executeSql(query);
    //   tx.executeSql(query2);

    //   var deliveryStatus = "diterima";

    //   if(Template7.global.lengthCart>0){
    //     for(var i=0; i<Template7.global.lengthCart; i++){
    //       var cartID = Template7.global.arrDataCart[i].cart_id;
    //       updateTrxIdCartByUserid(orderID,cartID,deliveryStatus);
    //     }
    //   }
     
      
    // }, function(err) {
    //   console.log('ERROR: ' + JSON.stringify(err.message));
    // });
    


    var dataSend = {
                trx_id : orderID,
                created_time  : created_time,
                payment_method : paymentMethod,
                total : total,
                user_id : userID,
                device_id : device.uuid
              }

    $.ajax({
        type: "POST",
        url: "https://catatani-ba229.firebaseio.com/order/data.json",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(dataSend),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){

          console.log(data.name);

          $.ajax({
              type: "PUT",
              url: "https://catatani-ba229.firebaseio.com/order/data/"+data.name+"/id.json",
              // The key needs to match your method's input parameter (case-sensitive).
              data: JSON.stringify(data.name),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){

                hideLoading();
                console.log(data);

                var deliveryStatus = "diterima";

                if(Template7.global.arrDataCart.length>0){
                  for(var i=0; i<Template7.global.arrDataCart.length; i++){
                    var cartID = Template7.global.arrDataCart[i].cart_id;
                    updateTrxIdCartByUserid(orderID,cartID,deliveryStatus);
                  }
                }
                
              },
              failure: function(errMsg) {
                  alert(errMsg);
              }
          });


        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });

}

function getAllTransactionByUserId(){

  var userID = Template7.global.userdata.id;
  //  var query = 'CREATE TABLE IF NOT EXISTS ORDER_SHOP ('+
  //                           'trx_id text,'+
  //                           'created_time datetime,'+
  //                           'payment_method text,'+
  //                           'total text,'+
  //                           'user_id text'+
  //                   ')';
  // var query2 = 'SELECT * FROM ORDER_SHOP WHERE user_id = "'+userID+'" ORDER BY created_time DESC';
  // db.transaction(function (tx) {
  //     tx.executeSql(query);
  //     tx.executeSql(query2,[], function (tx, results){
  //         var len = results.rows.length, i;

  //         Template7.global.arrTransaction = [];
          
  //         if(len > 0){
  //           for (i = 0; i < len; i++){

  //             Template7.global.arrTransaction.push({
  //                 trx_id: results.rows.item(i).trx_id,
  //                 created_time: results.rows.item(i).created_time,
  //                 total: results.rows.item(i).total,
  //                 payment_method: results.rows.item(i).payment_method
  //             });
  //           }

  //           console.log(Template7.global.arrTransaction);

            
  //         }
  //     });
  // }, function(err) {
  //   console.log('ERROR: ' + JSON.stringify(err.message));
  // });

  var userIdUrl = '"'+userID+'"';

  $$.ajax({
        url: "https://catatani-ba229.firebaseio.com/order/data.json?orderBy=\"user_id\"&equalTo="+userIdUrl,
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           showLoading();
        },
        success : function(data){

            var result = JSON.parse(data);  

            if(result!=null){
              console.log(Object.keys(result).length);
              console.log(result);
              Template7.global.arrTransaction = [];
              
              if(Object.keys(result).length>0){
                $$.each(result, function (index, value) {
                  // console.log(result[index].type);
                  // console.log(type);

                  if(result[index].device_id==device.uuid){

                    // splitDate = result[index].created_time.split(" ");
                    var dateSplit = result[index].created_time.split(" ");
                    var splitDate = dateSplit[0].split("/");
                    var newDate = splitDate[1]+"/"+splitDate[0]+"/"+splitDate[2];
                    var newDatetime = newDate+" "+dateSplit[1];

                    console.log(newDatetime);

                    Template7.global.arrTransaction.push({
                        id : result[index].id,
                        trx_id: result[index].trx_id,
                        created_time: result[index].created_time,
                        total: result[index].total,
                        payment_method: result[index].payment_method,
                        sord_date : newDatetime
                    });
                    
                  }

                  

                })

                Template7.global.arrTransaction.sort(function(a, b) {
                     return new Date(b.sord_date) - new Date(a.sord_date);
                });

                console.log(Template7.global.arrTransaction);

              }

            }
            

        }
      });

  
}


//--------------------------------------------------------------------------------------
person_select = "";
person_color = "";
//--------------------------------------------------------------------------------------
influencer_select = "";
influencer_color = "";
influencer_name = "";
influencer_time = "";
influencer_media = "";
influencer_personid = "";
page_influencer = 0;
//--------------------------------------------------------------------------------------
post_id = "";