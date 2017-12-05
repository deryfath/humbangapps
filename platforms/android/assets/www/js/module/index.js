// myApp.onPageBeforeInit('index', function (page) {

	var indexHtmlElementPanel = '<p id="login" style="color:white;font-size: 17px;margin-left:-16px;margin-right:-19px;">'+
								'<i class="icon f7-icons" style="margin-left: 12px;margin-right: 10px;margin-top:-6px;">lock_fill</i>Masuk</p>';


	var sellerHtmlElementPanel = 
								// '<p id="profile_seller" style="color:white;font-size: 17px;margin-left:-16px;margin-right:-19px;">'+
								// '<i class="icon f7-icons" style="margin-left: 12px;margin-right: 10px;margin-top:-6px;">person_fill</i>Profil</p>'+
								// '<p id="location_seller" style="color:white;font-size: 17px;margin-left:-16px;margin-right:-19px;">'+
								// '<i class="icon f7-icons" style="margin-left: 12px;margin-right: 10px;margin-top:-6px;">compass_fill</i>Farm Location</p>'+
								// '<p id="comodity_seller" style="color:white;font-size: 17px;margin-left:-16px;margin-right:-19px;">'+
								// '<i class="icon f7-icons" style="margin-left: 12px;margin-right: 10px;margin-top:-6px;">layers_fill</i>Komoditas</p>'+
								// '<p id="notification_seller" style="color:white;font-size: 17px;margin-left:-16px;margin-right:-19px;">'+
								// '<i class="icon f7-icons" style="margin-left: 12px;margin-right: 10px;margin-top:-6px;">email_fill</i>Pesanan</p>'+
								// '<p id="check_status_seller" style="color:white;font-size: 17px;margin-left:-16px;margin-right:-19px;">'+
								// '<i class="icon f7-icons" style="margin-left: 12px;margin-right: 10px;margin-top:-6px;">check_round_fill</i>Status Order</p>'+
								'<p id="logout" style="color:white;font-size: 17px;margin-left:-16px;margin-right:-19px;">'+
								'<i class="icon f7-icons" style="margin-left: 12px;margin-right: 10px;margin-top:-6px;">logout_fill</i>Keluar</p>';


	var consumerHtmlElementPanel = 
								// '<p id="profile_consumer" style="color:white;font-size: 17px;margin-left:-16px;margin-right:-19px;">'+
								// '<i class="icon f7-icons" style="margin-left: 12px;margin-right: 10px;margin-top:-6px;">person_fill</i>Profile</p>'+
								// '<p id="check_status_consumer" style="color:white;font-size: 17px;margin-left:-16px;margin-right:-19px;">'+
								// '<i class="icon f7-icons" style="margin-left: 12px;margin-right: 10px;margin-top:-6px;">check_round_fill</i>Status Order</p>'+
								
								'<p id="logout" style="color:white;font-size: 17px;margin-left:-16px;margin-right:-19px;">'+
								'<i class="icon f7-icons" style="margin-left: 12px;margin-right: 10px;margin-top:-6px;">logout_fill</i>Keluar</p>';
	
	// var buttonHomeConsumer = '<div class="round-button" style="z-index: 99;position: fixed;top: 59%;left: 40%;">'+
	// 		                    '<a href="#" id="shop_buy_index_btn" onClick = "shopBuyButton();">'+
	// 		                        '<img src="img/shopping-bag.svg" />'+
	// 		                        '<div style="position: absolute;top: 34%;left: -3%;">'+
	// 		                          '<img src="img/belanja-text.png" alt="Home" />'+
	// 		                        '</div>'+
	// 		                    '</a>'+
	// 		                '</div>'

	var buttonHomeConsumer = '<div class="round-button" style="z-index: 99;position: fixed;top: 65%;left: 28%;    width: 41%;border-radius: 14px;height: 2%;">'+
                            '<a href="#" id="shop_buy_index_btn" onClick = "shopBuyButton();">'+
                                '<div style="position: absolute;top: -16%;left: 1%;width:100%;">'+
                                  '<img src="img/belanja-text.png" alt="Home" />'+
                                '</div> '+
	                            '</a>'+
	                        '</div>'

	// var buttonHomeSeller = '<div class="row">'+
	// 			              '<div class="col-auto">'+
	// 			                  '<div class="round-button" style="z-index: 99;position: fixed;top: 59%;left: 28%;">'+
	// 			                    '<a href="#" id="shop_buy_index_btn" onClick = "shopBuyButton();">'+
	// 			                        '<img src="img/shopping-bag.svg" />'+
	// 			                        '<div style="position: absolute;top: 34%;left: -3%;">'+
	// 			                          '<img src="img/belanja-text.png" alt="Home" />'+
	// 			                        '</div>'+
	// 			                    '</a>'+
	// 			                '</div>'+
	// 			              '</div>'+
	// 			              '<div class="col-auto">'+
	// 			                  '<div class="round-button" style="z-index: 99;position: fixed;top: 59%;left: 52%;">'+
	// 			                    '<a href="#" id="shop_sell_index_btn" onClick = "shopSellButton();">'+
	// 			                        '<img src="img/tag.svg"  />'+
	// 			                        '<div style="position: absolute;top: 34%;left: 31%;right: 11%;">'+
	// 			                          '<img src="img/jual-text.png" alt="Home" />'+
	// 			                        '</div>'+
	// 			                    '</a>'+
	// 			                '</div>'+
	// 			              '</div>'+

	// 			            '</div>'

	var buttonHomeSeller = '<div class="round-button" style="z-index: 99;position: fixed;top: 55%;left: 28%;    width: 41%;border-radius: 14px;height: 2%;">'+
                            '<a href="#" id="shop_buy_index_btn" onClick = "shopBuyButton();">'+
                                '<div style="position: absolute;top: -8%;left: 8%;width:81%;">'+
                                  '<img src="img/belanja-text.png" alt="Home" />'+
                                '</div> '+
	                            '</a>'+
	                        '</div>'+
	                         '<div class="round-button" style="z-index: 99;position: fixed;top: 65%;left: 28%;    width: 41%;border-radius: 14px;height: 2%;">'+
	                            '<a href="#" id="shop_buy_index_btn" onClick = "shopSellButton();">'+
	                                '<div style="position: absolute;top: 7%;left: 20%;width:52%;">'+
	                                  '<img src="img/jual-text.png" alt="Home" />'+
	                                '</div>   '+
	                            '</a>'+
	                        '</div>'


	var landingPageNotLogin = '<div class="row">'+
								'<div id="belanja" onClick = "shopBuyButton();" style="width: 100%;background-image:url(img/background-menu-shop.jpg);text-align:center;box-shadow:0 0px 20px 4px #212020;z-index: 2;">'+
								    '<img src="img/shopping-bag-icon.png" style="max-width:58%;margin-top: 30px;"/><div style="color:white;margin-top: -41px;font-size: 22px;">Belanja</div>'+
								   '</div>'+
                				'</div>'+
                				'<div class="row"><div id="jualan" onClick = "shopSellButton();" style="width: 100%;background-image:url(img/background-menu-sell.jpg);text-align:center;" ><img src="img/price-tag-icon.png" style="max-width:58%;margin-top: 35px;"/><div style="color:white;margin-top: -46px;font-size: 22px;">Jualan</div></div>'+
                			'</div>';

    var landingPageSeller = '<div class="row">'+
			                  '<div style="width:100%;height:100%;z-index:-1;position: absolute;"><img style="max-width: 200%;" src="img/background.jpg" /></div>'+ 
			                  '<div style="text-align:center;"><img src="img/user-background.png"/>'+
			                    '<div style="margin-top: -23%;font-weight: bold;color: gray;" id="seller_name_profile"></div><div style="color: gray;" id="seller_farm_profile"></div> <div style="text-align:right;margin-top: -3%;margin-right: 10px;"><i class="icon f7-icons" onClick="profileSeller();">gear_fill</i></div></div>'+
			                  
			                '</div>'+

			                 '<div class="row no-gutter" style="margin-top: 14%;">'+
			                    '<div class="col-50" style="text-align: center;" onClick = "pesananBtn();" ><img style="max-width: 50%;   margin-right: -33px;" src="img/pesanan.png" /><div><span class="badge bg-red notification-total" style="margin-top: -25%;position: absolute;z-index: 2;margin-left: 9%;font-size: 14px;">0</span></div></div>'+
			                    '<div class="col-50" style="text-align: center;" onClick = "notifikasiBtn();" ><img style="max-width: 50%;   margin-left: -33px;" src="img/notifikasi.png" /><div><span class="badge bg-red notification-comodity-total" style="margin-top: -25%;position: absolute;z-index: 2;margin-left: -3%;font-size: 14px;">0</span></div></div>'+
			                  '</div>'+

			                   '<div class="row no-gutter" style="margin-top: 27px;">'+
			                    '<div class="col-50" style="text-align: center;" onClick = "komoditasBtn();" ><img style="max-width: 50%;   margin-right: -33px;" src="img/komoditas.png" /></div>'+
			                    '<div class="col-50" style="text-align: center;"  onClick = "lokasiBtn();"><img style="max-width: 50%;   margin-left: -33px;" src="img/lokasi.png" /></div>'+
			                  '</div>';


	var landingPageConsumer = '<div class="row">'+
			                  '<div style="width:100%;height:100%;z-index:-1;position: absolute;"><img style="max-width: 200%;" src="img/background-consumer.jpg" /></div>'+ 
			                  '<div style="text-align:center;"><img src="img/user-background.png"/>'+
			                    '<div style="margin-top: -23%;font-weight: bold;color: gray;" id="consumer_name_profile"></div><div style="color: gray;" id="consumer_address_profile"></div> <div style="text-align:right;margin-top: -3%;margin-right: 10px;"><i class="icon f7-icons" onClick="profileConsumer();">gear_fill</i></div></div>'+
			                  
			                 '</div>'+

			                '<div class="row no-gutter" style="margin-top: 14%;">'+
			                    '<div class="col-50" style="text-align: center;" onClick = "shopBuyButton();"><img style="max-width: 50%;    margin-right: -33px;" src="img/belanja.png" /></div>'+
			                    '<div class="col-50" style="text-align: center;" onClick = "statusOrderBtn();"><img style="max-width: 50%;    margin-left: -33px;" src="img/pesanan-konsumen.png" /></div>'+
			                  '</div>'+

			                   '<div class="row no-gutter" style="margin-top: 27px;">'+
			                    '<div class="col-50" style="text-align: center;" onClick = "cartBtn();"><img style="max-width: 50%;    margin-right: -33px;" src="img/keranjang.png" /></div>'+
			                    '<div class="col-50" style="text-align: center;" onClick = "deliveryBtn();"><img style="max-width: 50%;    margin-left: -33px;" src="img/pengiriman.png" /></div>'+
			                  '</div>';
	

	//comodity option for coffee
  	$('#origin_comodity').change(function() {  

		console.log($("#origin_comodity option:selected").text());

		if($("#origin_comodity option:selected").text()=="lainnya"){
			$('#other_origin_comodity').css('display','block');
		}else{
			$('#other_origin_comodity').css('display','none');
			document.getElementById('other_origin_comodity').value = "";
		}

	})

	$('#process_comodity').change(function() {  

		if($("#process_comodity option:selected").text()=="lainnya"){
			$('#other_process_comodity').css('display','block');
		}else{
			$('#other_process_comodity').css('display','none');
			document.getElementById('other_process_comodity_input').value = "";
		}

	})

	function getCounterNotificationNonPriorityComodity(){
		startCronNonComodity();
		hideLoading();

		setTimeout(function() {

			console.log(Template7.global.arrComodityNonPriority.length);

			$$.each(Template7.global.arrComodityNonPriority, function (index, value) {

				if(value.cronFlag2){
					Template7.global.counterNonPriority++;
				}

			})

			console.log(Template7.global.counterNonPriority);
			$('.notification-comodity-total').html(Template7.global.counterNonPriority);

		}, 1000);
	}

	function runCronNonPriorityComodity(){

		require(["js/later.js"], function(cron){
			var cronSched =   later.parse.recur().every(1).hour();
            Template7.global.timerCronNonPriority = later.setInterval(logTime, cronSched);
            function logTime() {

				
				if(mainView.activePage.name=="comodity_notification_list"){

					mainView.router.reloadPage('view/seller/comodity_notification.html');
				}else{

					getCounterNotificationNonPriorityComodity();
					
				}
            }

		})
	}

	//UUID
	// myApp.alert(device.uuid,"notif");

	var cartNotificationInterval = 0;

	//CHECK SESSION
	getSession();

	showLoading();

	setTimeout(function() {

			//sending message FCM 

			// var dataSend = {
			// 	  "to" : "/test/send/fcm",
			// 	  "data" : {
			// 	   "message" : "tes123"
			// 	  }
			// 	}

			// $.ajax({
			// 	  method: "POST",
			// 	  dataType: 'json',
			// 	  headers: {'Content-Type': 'application/json', 'Authorization': 'key=AIzaSyCxX4Csq2T-RVkNqZkYtTXFaV0qcKI04uk'},
			// 	  url: "https://fcm.googleapis.com/fcm/send",
			// 	  data: JSON.stringify(
			// 	      {
			// 	        "notification":{
			// 	          "title":"Title",  //Any value
			// 	          "body": "Body",  //Any value
			// 	          "sound": "default", //If you want notification sound
			// 	          "click_action": "FCM_PLUGIN_ACTIVITY",  //Must be present for Android
			// 	          "icon": "fcm_push_icon"  //White icon Android resource
			// 	        },
			// 	        "data":{
			// 	          "param1":"value1",  //Any data to be retrieved in the notification callback
			// 	          "param2": "Prueba"
			// 	        },
			// 	        "to":"/topics/fcm", //Topic or single device
			// 	        "priority":"high", //If not set, notification won't be delivered on completely closed iOS app
			// 	        "restricted_package_name":"" //Optional. Set for application filtering
			// 	      }
			// 	    )
			// 	}).success(function(data){
			// 	  console.log(data);
			// 	}).error(function(data){
			// 	  alert("Error: " + JSON.stringify(data));
			// 	});

			// //FCM
			// document.addEventListener("deviceready", function () {

			// 	FCMPlugin.getToken(function(token){
			// 	    myApp.alert( token );
			// 	});

			// 	FCMPlugin.subscribeToTopic('/topics/fcm');

			// 	FCMPlugin.onNotification(function(data){
			// 	    if(data.wasTapped){
			// 	      //Notification was received on device tray and tapped by the user.
			// 	      alert( JSON.stringify(data) );
			// 	    }else{
			// 	      //Notification was received in foreground. Maybe the user needs to be notified.
			// 	      alert( JSON.stringify(data) );
			// 	    }
			// 	});

			// })

			// hideLoading();

			if(Template7.global.lengthSession==1){
				console.log(Template7.global.userdata);

				if(Template7.global.userdata.usertype=="seller"){

					
					$$('#panel_overlay').html(sellerHtmlElementPanel);

					$('#command-home-button').html(landingPageSeller);

					$("#seller_name_profile").text(Template7.global.userdata.fullname);
					$("#seller_farm_profile").text(Template7.global.userdata.farm_name);

					// $('#notification_seller_index').css('display','block');
					// $('#notification_seller_index').click(function(){
					// 	mainView.router.load({
					// 	  url: 'view/seller/notification_seller.html',
					// 	  animatePages: true
					// 	});
					// })

					// $('#notification_comodity_index').css('display','block');
					// $('#notification_comodity_index').click(function(){
					// 	mainView.router.load({
					// 	  url: 'view/seller/comodity_notification.html',
					// 	  animatePages: true
					// 	});
					// })

					setTimeout(function(){
						//CHECK PESANAN /NOTIFIKASI
						getCartItemByFarmNameAndUserId();

						setTimeout(function() {
							console.log('test');
							hideLoading();

							// watchWeatherPosition();

							// require(["js/later.js"], function(cron){
							// 	var cronSched =   later.parse.recur().on('09:00:00').time();
       //                          var timer = later.setInterval(logTime, cronSched);
       //                          function logTime() {

									startCronPerWeek();

       //                          }

							// })

							// pop up cron non priority comodity
							 myApp.modal({
                                title:  'Notifikasi',
                                text: '<div class="row" style="margin-top:12px;"><div class="col-30"><img src="img/hello.jpg" /></div><div class="col-70" style="margin-top:13px;"><text> Halo Jangan Lupa Update Komoditasmu</text></div></div>',
                                buttons: [
                                  {
                                    text: 'OK',
                                    onClick: function() {}
                                        
                                  }
                                ]
                              })

							
							// run init non comodity priority
							getCounterNotificationNonPriorityComodity();
							
							// CRON NOTIFICAITON NON COMODITY
							runCronNonPriorityComodity();

							
							

							if(Template7.global.arrDataCart.length > 0 ){
								$('.notification-total').html(Template7.global.arrDataCart.length);
							}else{
								$('.notification-total').html('0');
							}

						}, 1000);
					}, 400);

					

				}else{
					console.log('test');
					hideLoading();

					
					$$('#panel_overlay').html(consumerHtmlElementPanel);
					// $('#notification_seller_index').css('display','none');
					// $('#notification_comodity_index').css('display','none');

					$('#command-home-button').html(landingPageConsumer);

					$("#consumer_name_profile").text(Template7.global.userdata.fullname);
					$("#consumer_address_profile").text(Template7.global.userdata.address);

				}	

			}else{
				hideLoading();

				// //SET DEVICE ID 
				// Template7.global.deviceId = device.uuid;

				// console.log('DEVICE ID : '+Template7.global.deviceId);

				$('#notification_seller_index').css('display','none');
				$('#notification_comodity_index').css('display','none');
				console.log('null session');

				$('#command-home-button').html(landingPageNotLogin);

				heightScreen = $(window).height()/2;
				$('#belanja').css('height',heightScreen-20);
				$('#jualan').css('height',heightScreen);

				console.log($('#belanja').innerHeight());
				console.log($('#jualan').innerHeight());
			}

			

	}, 1000);

	function shopBuyButton(){

		mainView.router.load({
		  url: 'view/shop/shop_comodity.html',
		  animatePages: true
		});
	}

	function shopSellButton(){

		getSession();

		showLoading();

		setTimeout(function() {

			hideLoading();

			console.log(Template7.global.lengthSession);

			if(Template7.global.lengthSession==1){
				if(Template7.global.userdata.usertype=="seller"){
					mainView.router.loadPage('view/seller/comodity_init.html');
				}
				
			}else{
				 myApp.confirm('Anda harus login/register sebagai petani', 'Notifikasi', 
			      function () {
					myApp.popup('.popup-login');
				  },
			      function () {
			      }
			    );
				
			}
		}, 1000);

	}

	function profileSeller(){
		mainView.router.load({
		  url: 'view/seller/profile_seller.html',
		  animatePages: true
		});
	}

	function profileConsumer(){
		mainView.router.load({
		  url: 'view/consumer/profile_consumer.html',
		  animatePages: true
		});
	}

	function pesananBtn(){

		//notification
		
		mainView.router.load({
		  url: 'view/seller/notification_seller.html',
		  animatePages: true
		});

	
	}

	function statusOrderBtn(){
		mainView.router.load({
		  url: 'view/shop/check_status_order.html',
		  animatePages: true
		});
	}

	function cartBtn(){
		// mainView.router.load({
		//   url: 'view/shop/cart_shop.html',
		//   animatePages: true
		// });
	}

	function deliveryBtn(){
		// mainView.router.load({
		//   url: 'view/shop/delivery_shop.html',
		//   animatePages: true
		// });
	}

	function notifikasiBtn(){

		
		mainView.router.load({
		  url: 'view/seller/comodity_notification.html',
		  animatePages: true
		});
	}

	function komoditasBtn(){

		
		mainView.router.load({
		  url: 'view/seller/comodity_init.html',
		  animatePages: true
		});
	}

	function lokasiBtn(){

		
		mainView.router.load({
		  url: 'view/seller/farm_location.html',
		  animatePages: true
		});
	}

	//FIREBASE
	// Initialize Firebase
	  // var config = {
	  //   apiKey: "AIzaSyBjfbPqNN-lIqZ7i1aEaWdEUOIuaysDCCQ",
	  //   authDomain: "catatani-ef832.firebaseapp.com",
	  //   databaseURL: "https://catatani-ef832.firebaseio.com",
	  //   projectId: "catatani-ef832",
	  //   storageBucket: "catatani-ef832.appspot.com",
	  //   messagingSenderId: "464695542295"
	  // };
	  // firebase.initializeApp(config);


	$$('#panel_overlay').html(indexHtmlElementPanel);

	$('#close_popup_login').click(function(){
		$$('#tab_login').addClass('active');
		$$('#tab_login_list').addClass('active');
		$$('#tab_register').removeClass('active');
		$$('#tab_register_list').removeClass('active');
	})

	$('#daftar_btn').click(function(){

		myApp.closeModal('.popup-login');
		myApp.popup('.popup-register');
	})

	$('#daftar_pembeli').click(function(){
		myApp.closeModal('.popup-register');
		myApp.popup('.popup-register-pembeli');
	})

	$('#daftar_penjual').click(function(){
		myApp.closeModal('.popup-register');
		myApp.popup('.popup-register-penjual');
	})


	$('#login_btn').click(function(){

		var username = document.getElementById('username_login').value;
		var password = document.getElementById('password_login').value;

		checkLogin(username,password);

		//GET CART
        getAllCart();

		showLoading();

		setTimeout(function() {

			// hideLoading();

			if(Template7.global.lengthLogin == 0){
				hideLoading();
				myApp.alert("Username & password did not match", "notice");
			}else{
				myApp.closeModal('.popup-login');

				document.getElementById('name_farmer_register').value = "";
				document.getElementById('farm_name_register').value = "";
				document.getElementById('certificate_register').value = "";
				// document.getElementById('username_register').value = "";
				document.getElementById('password_farmer_register').value = "";
				document.getElementById('email_farmer_register').value = "";
				document.getElementById('address_farmer_register').value = "";
				document.getElementById('phone_farmer_register').value = "";
				document.getElementById('password_login').value = "";
				document.getElementById('username_login').value = "";
				document.getElementById('name_consumer_register').value = "";
				document.getElementById('password_consumer_register').value = "";
				document.getElementById('email_consumer_register').value = "";
				document.getElementById('address_consumer_register').value = "";
				document.getElementById('phone_consumer_register').value = "";
				$$('#tab_login').addClass('active');
				$$('#tab_login_list').addClass('active');
				$$('#tab_register').removeClass('active');
				$$('#tab_register_list').removeClass('active');
										
				myApp.alert("Success Login", "notice");
				if(Template7.global.userdata.usertype=="seller"){
					$$('#panel_overlay').html(sellerHtmlElementPanel);
					$('#command-home-button').html(landingPageSeller);

					$("#seller_name_profile").text(Template7.global.userdata.fullname);
					$("#seller_farm_profile").text(Template7.global.userdata.farm_name);

					// $('#notification_seller_index').css('display','block');
					// $('#notification_seller_index').click(function(){
					// 	mainView.router.load({
					// 	  url: 'view/seller/notification_seller.html',
					// 	  animatePages: true
					// 	});
					// })

					// $('#notification_comodity_index').css('display','block');
					// $('#notification_comodity_index').click(function(){
					// 	mainView.router.load({
					// 	  url: 'view/seller/comodity_notification.html',
					// 	  animatePages: true
					// 	});
					// })
					setTimeout(function(){
						//CHECK PESANAN /NOTIFIKASI
						getCartItemByFarmNameAndUserId();

						setTimeout(function() {
							console.log('test');
							hideLoading();

							// watchWeatherPosition();

							// require(["js/later.js"], function(cron){
							// 	var cronSched =   later.parse.recur().on('09:00:00').time();
       //                          var timer = later.setInterval(logTime, cronSched);
       //                          function logTime() {

									startCronPerWeek();

       //                          }

							// })

							// run init non comodity priority
							getCounterNotificationNonPriorityComodity();
							
							// CRON NOTIFICAITON NON COMODITY
							runCronNonPriorityComodity();

							if(Template7.global.arrDataCart.length > 0 ){
								$('.notification-total').html(Template7.global.arrDataCart.length);
							}else{
								$('.notification-total').html('0');
							}

						}, 1000);
					}, 500);

					

				}else{
					if(Template7.global.timerCronComodity!=undefined){

						Template7.global.timerCronComodity.clear();
					}
					hideLoading();
					$$('#panel_overlay').html(consumerHtmlElementPanel);
					// $('#notification_seller_index').css('display','none');
					// $('#notification_comodity_index').css('display','none');
					$('#command-home-button').html(landingPageConsumer);

					$("#consumer_name_profile").text(Template7.global.userdata.fullname);
					$("#consumer_address_profile").text(Template7.global.userdata.address);

				}

				console.log('test '+Template7.global.lengthCart);	

				//CHECK CART 
				if(Template7.global.lengthCart>0){

            		console.log('masuk update cart');
					updateCartFreeUser();
				}

				if(mainView.activePage.name=="cart_shop_list"){

					setTimeout(function(){
						console.log('MASUK TIMEOUT CART SHOP');
						mainView.router.reloadPage('view/shop/cart_shop.html');


					}, 1200);	

				}else if(mainView.activePage.name=="shop_comodity_list"){

					if(Template7.global.userdata.usertype=="seller"){

						myApp.alert("Anda Harus login/daftar sebagai Konsumen","Notifikasi");
					}else{
						myApp.popup('.popup-shop-comodity-item');
					}
				}

				hideLoading();

			}

		}, 1000);
		
	})

	// $('#farm_name_div').hide();
	// $(document).on("change","input[name=radio-register]",function(){
	// 	 var usertype = $('input[name=radio-register]:checked').val();
	// 	 console.log(usertype);

	// 	 if(usertype=="seller"){
	// 	 	$('#farm_name_div').show();
	// 	 }else{
	// 	 	$('#farm_name_div').hide();
	// 	 }
	// });

	


	$('#register_farmer_btn').click(function(){

		var name = document.getElementById('name_farmer_register').value;
		var farmName = document.getElementById('farm_name_register').value;
		// var username = document.getElementById('username_register').value;
		var password = document.getElementById('password_farmer_register').value;
		var comodityType = $( "#comodity_type_register option:selected" ).text();
		var certificate = document.getElementById('certificate_register').value;
		var email = document.getElementById('email_farmer_register').value;
		var address = document.getElementById('address_farmer_register').value;
		var phone = document.getElementById('phone_farmer_register').value;
		var usertype = "seller";
		// var usertype = $('input[name=radio-register]:checked').val();

		var userVal = name.split(" ");	
		console.log("userval "+userVal[0]);
		
		register(name,userVal[0],password,email,address,phone,usertype,farmName,comodityType,certificate);

		console.log(Template7.global.lengthRegister);	

		//GET CART
		getAllCart();
		
		showLoading();

		setTimeout(function() {

			// hideLoading();

			if(Template7.global.lengthRegister == 1){
				hideLoading();
				myApp.alert("Username already register", "notice");
			}else{
				myApp.closeModal('.popup-login');

				document.getElementById('name_farmer_register').value = "";
				document.getElementById('farm_name_register').value = "";
				document.getElementById('certificate_register').value = "";
				// document.getElementById('username_register').value = "";
				document.getElementById('password_farmer_register').value = "";
				document.getElementById('email_farmer_register').value = "";
				document.getElementById('address_farmer_register').value = "";
				document.getElementById('phone_farmer_register').value = "";
				document.getElementById('password_login').value = "";
				document.getElementById('username_login').value = "";
				document.getElementById('name_consumer_register').value = "";
				document.getElementById('password_consumer_register').value = "";
				document.getElementById('email_consumer_register').value = "";
				document.getElementById('address_consumer_register').value = "";
				document.getElementById('phone_consumer_register').value = "";
				$$('#tab_login').addClass('active');
				$$('#tab_login_list').addClass('active');
				$$('#tab_register').removeClass('active');
				$$('#tab_register_list').removeClass('active');
				
				myApp.alert("Success register", "notice");
				if(usertype=="seller"){
					$$('#panel_overlay').html(sellerHtmlElementPanel);
					$('#command-home-button').html(landingPageSeller);

					$("#seller_name_profile").text(Template7.global.userdata.fullname);
					$("#seller_farm_profile").text(Template7.global.userdata.farm_name);

					// $('#notification_seller_index').css('display','block');
					// $('#notification_seller_index').click(function(){
					// 	mainView.router.load({
					// 	  url: 'view/seller/notification_seller.html',
					// 	  animatePages: true
					// 	});
					// })

					// $('#notification_comodity_index').css('display','block');
					// $('#notification_comodity_index').click(function(){
					// 	mainView.router.load({
					// 	  url: 'view/seller/comodity_notification.html',
					// 	  animatePages: true
					// 	});
					// })

					setTimeout(function(){
						//CHECK PESANAN /NOTIFIKASI
						getCartItemByFarmNameAndUserId();

						setTimeout(function() {
							console.log('test');
							hideLoading();

							if(Template7.global.arrDataCart.length > 0 ){
								$('.notification-total').html(Template7.global.arrDataCart.length);
							}else{
								$('.notification-total').html('0');
							}

						}, 1000);
					}, 500);

					

				}else{
					hideLoading();
					$$('#panel_overlay').html(consumerHtmlElementPanel);
					// $('#notification_seller_index').css('display','none');
					// $('#notification_comodity_index').css('display','none');

					$('#command-home-button').html(landingPageConsumer);

					$("#consumer_name_profile").text(Template7.global.userdata.fullname);
					$("#consumer_address_profile").text(Template7.global.userdata.address);

				}

				//CHECK CART 
				if(Template7.global.lengthCart>0){
					updateCartFreeUser();
				}

				if(mainView.activePage.name=="cart_shop_list"){

					setTimeout(function(){
						mainView.router.reloadPage('view/shop/cart_shop.html');
					}, 1200);
					

				}else if(mainView.activePage.name=="index"){

					console.log(usertype);
					hideLoading();
					if(usertype=="seller"){
						console.log('commodity choose first');
						mainView.router.load({
							url : 'view/seller/comodity_register_first.html',
							force : true
						});
					}
					// else{
						// console.log('consumer profile');
						// mainView.router.load({
						// 	url : 'view/consumer/profile_consumer.html',
						// 	force : true
						// });
					// }
					

				}else if(mainView.activePage.name=="shop_comodity_list"){

					if(usertype=="seller"){

						myApp.alert("Anda Harus login/daftar sebagai Konsumen","Notifikasi");
					}else{
						myApp.popup('.popup-shop-comodity-item');
					}
				}


			}

		}, 1000);
		
		
	})

	$('#register_consumer_btn').click(function(){

		var name = document.getElementById('name_consumer_register').value;
		// var username = document.getElementById('username_register').value;
		var password = document.getElementById('password_consumer_register').value;
		var email = document.getElementById('email_consumer_register').value;
		var address = document.getElementById('address_consumer_register').value;
		var phone = document.getElementById('phone_consumer_register').value;
		var usertype = "consumer";
		// var usertype = $('input[name=radio-register]:checked').val();

		var userVal = name.split(" ");	
		console.log("userval "+userVal[0]);
		
		register(name,userVal[0],password,email,address,phone,usertype,"","","");

		console.log(Template7.global.lengthRegister);	

		//GET CART
		getAllCart();
		
		showLoading();

		setTimeout(function() {

			// hideLoading();

			if(Template7.global.lengthRegister == 1){
				hideLoading();
				myApp.alert("Username already register", "notice");
			}else{
				myApp.closeModal('.popup-login');

				document.getElementById('name_farmer_register').value = "";
				document.getElementById('farm_name_register').value = "";
				document.getElementById('certificate_register').value = "";
				// document.getElementById('username_register').value = "";
				document.getElementById('password_farmer_register').value = "";
				document.getElementById('email_farmer_register').value = "";
				document.getElementById('address_farmer_register').value = "";
				document.getElementById('phone_farmer_register').value = "";
				document.getElementById('password_login').value = "";
				document.getElementById('username_login').value = "";
				document.getElementById('name_consumer_register').value = "";
				document.getElementById('password_consumer_register').value = "";
				document.getElementById('email_consumer_register').value = "";
				document.getElementById('address_consumer_register').value = "";
				document.getElementById('phone_consumer_register').value = "";
				$$('#tab_login').addClass('active');
				$$('#tab_login_list').addClass('active');
				$$('#tab_register').removeClass('active');
				$$('#tab_register_list').removeClass('active');
				
				myApp.alert("Success register", "notice");
				if(usertype=="seller"){
					$$('#panel_overlay').html(sellerHtmlElementPanel);
					$('#command-home-button').html(landingPageSeller);

					$("#seller_name_profile").text(Template7.global.userdata.fullname);
					$("#seller_farm_profile").text(Template7.global.userdata.farm_name);

					// $('#notification_seller_index').css('display','block');
					// $('#notification_seller_index').click(function(){
					// 	mainView.router.load({
					// 	  url: 'view/seller/notification_seller.html',
					// 	  animatePages: true
					// 	});
					// })

					// $('#notification_comodity_index').css('display','block');
					// $('#notification_comodity_index').click(function(){
					// 	mainView.router.load({
					// 	  url: 'view/seller/comodity_notification.html',
					// 	  animatePages: true
					// 	});
					// })

					setTimeout(function(){
						//CHECK PESANAN /NOTIFIKASI
						getCartItemByFarmNameAndUserId();

						setTimeout(function() {
							console.log('test');
							hideLoading();

							if(Template7.global.arrDataCart.length > 0 ){
								$('.notification-total').html(Template7.global.arrDataCart.length);
							}else{
								$('.notification-total').html('0');
							}

						}, 1000);
					}, 500);

					

				}else{
					hideLoading();
					$$('#panel_overlay').html(consumerHtmlElementPanel);
					// $('#notification_seller_index').css('display','none');
					// $('#notification_comodity_index').css('display','none');

					$('#command-home-button').html(landingPageConsumer);

					$("#consumer_name_profile").text(Template7.global.userdata.fullname);
					$("#consumer_address_profile").text(Template7.global.userdata.address);

				}

				//CHECK CART 
				if(Template7.global.lengthCart>0){
					updateCartFreeUser();
				}

				if(mainView.activePage.name=="cart_shop_list"){

					setTimeout(function(){
						mainView.router.reloadPage('view/shop/cart_shop.html');
					}, 1200);
					

				}else if(mainView.activePage.name=="index"){

					console.log(usertype);
					hideLoading();
					if(usertype=="seller"){
						console.log('commodity choose first');
						mainView.router.load({
							url : 'view/seller/comodity_register_first.html',
							force : true
						});
					}
					// else{
						// console.log('consumer profile');
						// mainView.router.load({
						// 	url : 'view/consumer/profile_consumer.html',
						// 	force : true
						// });
					// }
					

				}else if(mainView.activePage.name=="shop_comodity_list"){

					if(usertype=="seller"){

						myApp.alert("Anda Harus login/daftar sebagai Konsumen","Notifikasi");
					}else{
						myApp.popup('.popup-shop-comodity-item');
					}
				}


			}

		}, 1000);
		
		
	})

	$('#panel_overlay').bind('click', function(event) {
	    if(event.target.id=="login"){
	    	$('#login').addClass("close-panel");
	    	myApp.popup('.popup-login');

	    }else if(event.target.id=="logout"){
	    	showLoading();
	    	$('#logout').addClass("close-panel");

	    	if(Template7.global.userdata.usertype=="seller"){
	    		console.log('off cron');
	    		Template7.global.timerCronNonPriority.clear();

	    		if (Template7.global.arrTimerCronComodity.length>0) {
	    			for (var i = 0; i < Template7.global.arrTimerCronComodity.length; i++) {
		    			Template7.global.arrTimerCronComodity[i].clear();
		    		}

		    		Template7.global.arrTimerCronComodity = [];
	    		}
	    		
	    	}

	    	Template7.global.userdata = {};
	    	Template7.global.lengthSession = 0;
	    	Template7.global.arrDataComodity = [];	
	    	$$('#panel_overlay').html(indexHtmlElementPanel);
	    	$('#notification_seller_index').css('display','none');
	    	$('#notification_comodity_index').css('display','none');
	    	deleteSession();
	    	$('#command-home-button').html(landingPageNotLogin);

	    	heightScreen = $(window).height()/2;
			$('#belanja').css('height',heightScreen-20);
			$('#jualan').css('height',heightScreen);

			console.log($('#belanja').innerHeight());
			console.log($('#jualan').innerHeight());

	    	setTimeout(function() {
	    		hideLoading();

	    	}, 1000);

	    //SELLER
	    }else if(event.target.id=="comodity_seller"){
	    	$('#comodity_seller').addClass("close-panel");
	    	mainView.router.load({
			  url: 'view/seller/comodity_init.html',
			  animatePages: false
			});
	    	console.log('comodity_seller');

	    	Template7.global.backToProfile = false;

	    }else if(event.target.id=="profile_seller"){
	    	$('#profile_seller').addClass("close-panel");
	    	mainView.router.load({
			  url: 'view/seller/profile_seller.html',
			  animatePages: false
			});
	    	console.log('profile_seller');

	    }else if(event.target.id=="check_status_seller"){
	    	$('#check_status_seller').addClass("close-panel");
	    	mainView.router.load({
			  url: 'view/shop/check_status_order.html',
			  animatePages: false
			});
	    	console.log('check_status');

	    }else if(event.target.id=="notification_seller"){
	    	$('#notification_seller').addClass("close-panel");
	    	mainView.router.load({
			  url: 'view/seller/notification_seller.html',
			  animatePages: false
			});
	    	console.log('notification_seller');

	    }else if(event.target.id=="location_seller"){
	    	$('#location_seller').addClass("close-panel");
	    	mainView.router.load({
			  url: 'view/seller/farm_location.html',
			  animatePages: false
			});
	    	console.log('location_seller');


	    //CONSUMER
	    }else if(event.target.id=="profile_consumer"){
	    	$('#profile_consumer').addClass("close-panel");
	    	mainView.router.load({
			  url: 'view/consumer/profile_consumer.html',
			  animatePages: false
			});
	    	console.log('profile_consumer');
	    }else if(event.target.id=="check_status_consumer"){
	    	$('#check_status_consumer').addClass("close-panel");
	    	mainView.router.load({
			  url: 'view/shop/check_status_order.html',
			  animatePages: false
			});
	    	console.log('check_status');

	    }


	 });


// })
