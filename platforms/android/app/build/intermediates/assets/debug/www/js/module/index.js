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
								'<div id="belanja" onClick = "shopBuyButton();" style="width: 100%;background-image:url(img/background-menu-shop.jpg);text-align:center;z-index: 2;">'+
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
			                    '<div class="col-50" style="text-align: center;" onClick = "cartBtn();"><img style="max-width: 50%;    margin-right: -33px;" src="img/keranjang.png" /><div><span class="badge bg-red cart-landing-total" style="margin-top: -28%;position: absolute;z-index: 2;margin-left: 9%;font-size: 14px;">0</span></div></div>'+
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




	
	// var mySearchbar = myApp.searchbar('.searchbar', {
	//     searchList: '.list-block-search',
	//     searchIn: '.item-title,.item-subtitle'
	// }); 
				
	// loadIndexPage();

	getSession();

	showLoading();

	setTimeout(function() {

		if (Template7.global.lengthSession==1) {
			$$('#panel_overlay').html(sellerHtmlElementPanel);
		}else{
			$$('#panel_overlay').html(indexHtmlElementPanel);
		}

		hideLoading();
		loadChartWeeklyTarget();
		loadChartProgress();

		$('#tabbar_home').css('display','block');
		$('.toolbar-inner-home').css('background','#ac312a');

		$('.toolbar-inner-home').html('<a href="#" id="purchase_page" style="margin: 0 auto;"><i class="icon f7-icons" style="color: white;">layers_fill</i><span style="text-align:center;color:white;font-size: 12px;" class="tabbar-label">PEMBELIAN</span></a>');
		
		$('#purchase_page').click(function(){

			getSession();

			showLoading();

			setTimeout(function() {

				hideLoading();

				console.log(Template7.global.lengthSession);

				if(Template7.global.lengthSession==1){

					mainView.router.load({
					  url: 'view/seller/purchase_page.html',
					  animatePages: true
					});

				}else{

					myApp.confirm('Anda harus login Untuk Melanjutkan', 'Notifikasi', 
				      function () {
						myApp.popup('.popup-login');
					  },
				      function () {
				      }
				    );


				}
			
			},1000) 	
			

		})
	}, 1000);

	
	function loadChartWeeklyTarget(){

		Highcharts.SVGRenderer.prototype.symbols['c-rect'] = function (x, y, w, h) {
	        return ['M', x, y + h / 2, 'L', x + w, y + h / 2];
	    };

	    var chart = Highcharts.chart('container_chart_weekly', {
	        chart: {
	            type: 'column'
	        },
	        title: {
		        text: 'Target Pencapaian Per Minggu'
		    },
	        xAxis: {
	            categories: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
	        },
	         yAxis: {
		        min: 0,
		        title: {
		            text: 'Pembelian Komoditas (Kg)'
		        }
		    },
	        series: [{
	        	name: 'Current',
	            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
	        }, {
	          marker: {
	            symbol: 'c-rect',
	            lineWidth:3,
	            lineColor: Highcharts.getOptions().colors[1],
	            radius: 10
	          },
	          type: 'scatter',
	          data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6].reverse(),
	          name: 'Target'
	        }]
	    });
	}

	function loadChartProgress(){


		Highcharts.SVGRenderer.prototype.symbols['c-rect'] = function (x, y, w, h) {
	        return ['M', x, y + h / 2, 'L', x + w, y + h / 2];
	    };

	    var chart = Highcharts.chart('container_chart_progress', {
	        chart: {
	            type: 'column'
	        },
	        title: {
		        text: 'Target Pencapaian Daerah'
		    },
	        xAxis: {
	            categories: ['Medan', 'Kalimantan', 'Sulawesi', 'Jawa Barat', 'Bali']
	        },
	         yAxis: {
		        min: 0,
		        title: {
		            text: 'Pembelian Komoditas (Kg)'
		        }
		    },
	        series: [{
	        	name: 'Current',
	            data: [29.9, 71.5, 106.4, 129.2, 144.0]
	        }, {
	          marker: {
	            symbol: 'c-rect',
	            lineWidth:3,
	            lineColor: Highcharts.getOptions().colors[1],
	            radius: 10
	          },
	          type: 'scatter',
	          data: [29.9, 71.5, 106.4, 129.2, 144.0].reverse(),
	          name: 'Target'
	        }]
	    });
	}

	

	$('#close_popup_login').click(function(){
		$$('#tab_login').addClass('active');
		$$('#tab_login_list').addClass('active');
		$$('#tab_register').removeClass('active');
		$$('#tab_register_list').removeClass('active');
	})

	$('#register_btn').click(function(){

		document.getElementById('username_login').value = "";
		document.getElementById('password_login').value = "";

		myApp.closeModal('.popup-login');
		myApp.popup('.popup-register-pembeli');

	})

	$('#register_consumer_btn').click(function(){

		  var dataSend = {
               agent_name : document.getElementById('name_consumer_register').value,
               agent_username : document.getElementById('username_consumer_register').value,
               agent_password : document.getElementById('password_consumer_register').value
          } 

          console.log(dataSend);

          showLoading();

		  setTimeout(function() {
         
	          $.ajax({
	                type: "POST",
	                url: "http://plantera.iotera.io/registration_agent.php",
	                data: dataSend,
	                success: function(data){

	                   console.log(data);

	                   if(data==-1){

	                   	   hideLoading();
	                   	   myApp.alert("Akun sudah digunakan","Notifikasi");

	                   }else{

	                   	   username = document.getElementById('username_consumer_register').value;

		                   insertSession(username,data);
		                   document.getElementById('name_consumer_register').value = "";
		                   document.getElementById('username_consumer_register').value = "";
		              	   document.getElementById('password_consumer_register').value = "";

		              	   $$('#panel_overlay').html(sellerHtmlElementPanel);

							mainView.router.load({	
							  url: 'view/seller/purchase_page.html',
							  animatePages: true
							});

							myApp.closeModal('.popup-register-pembeli');

							myApp.alert("Registrasi Sukses","notifikasi");

	                   }

	                   
	                }
	            });

	        }, 1000);
	})

	

	$('#login_btn').click(function(){

		var username = document.getElementById('username_login').value;
		var password = document.getElementById('password_login').value;

		var dataSend = {
           agent_username : username,
           agent_password : password
        } 
		
		console.log('login');
		showLoading();

		setTimeout(function() {

			if(username=="" || password==""){

				myApp.alert('Harap Lengkapi Isian form','Notifikasi');

				hideLoading();

			}else{

				$.ajax({
	                type: "POST",
	                url: "http://plantera.iotera.io/login_agent.php",
	                data: dataSend,
	                success: function(data){

	                   
	                   var data = JSON.parse(data);

	                   console.log(data);

	                   if(data.length==0){
	                   	
	                   	   myApp.alert('Username atau Password Salah','Notifikasi');

						   hideLoading();

	                   }else{

	                   	    insertSession(data[0].x_username,data[0].id);

							document.getElementById('username_login').value = "";
							document.getElementById('password_login').value = "";

							
							$$('#panel_overlay').html(sellerHtmlElementPanel);

							mainView.router.load({	
							  url: 'view/seller/purchase_page.html',
							  animatePages: true
							});

							myApp.closeModal('.popup-login');

							myApp.alert("Login Sukses","notifikasi");


	                   }

	                   
	                }
	            });


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
