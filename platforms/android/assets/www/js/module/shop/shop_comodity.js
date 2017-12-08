myApp.onPageInit('shop_comodity_list', function (page) {

	$('.back').click(function(){
		$('#fab').css("display","block");
		$('#fab').removeClass("speed-dial-opened");
		

		getSession();

		showLoading();

		setTimeout(function() {

			console.log(Template7.global.lengthSession);

			if(Template7.global.lengthSession==1){
				if(Template7.global.userdata.usertype=="seller"){
				//CHECK PESANAN /NOTIFIKASI
				getCartItemByFarmNameAndUserId();
		
				setTimeout(function() {
					hideLoading();
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
					if(Template7.global.arrDataCart.length > 0 ){

						$('.notification-total').html(Template7.global.arrDataCart.length);
					}

					getCounterNotificationNonPriorityComodity();

				}, 1000);

				}else{
					hideLoading();
					// $('#notification_seller_index').css('display','none');
					// $('#notification_comodity_index').css('display','none');
					$('#command-home-button').html(landingPageConsumer);

					$("#consumer_name_profile").text(Template7.global.userdata.fullname);
					$("#consumer_address_profile").text(Template7.global.userdata.address);

					getAllCart();

					setTimeout(function(){
						hideLoading();

						$('.cart-landing-total').html(Template7.global.arrDataCart.length);

					}, 1000);
				}

			}else{
				hideLoading();
				$('#command-home-button').html(landingPageNotLogin);

				heightScreen = $(window).height()/2;
				$('#belanja').css('height',heightScreen-20);
				$('#jualan').css('height',heightScreen);

				console.log($('#belanja').innerHeight());
				console.log($('#jualan').innerHeight());

			}

		}, 300);

		
	})

	$('#tab_sembako_shop_comodity').click(function(){
		$('.tab-shop-comodity-category').removeClass("active");
		$(this).addClass("active");
		document.getElementById('img_sembako_shop_comodity').src="img/allbar-blue.png";
		document.getElementById('img_sayur_shop_comodity').src="img/vegetablebar.png";
		document.getElementById('img_buah_shop_comodity').src="img/fruitbar.png";
		document.getElementById('img_olahan_shop_comodity').src="img/olahan.png";
		// loadWidgetComodityChoose(dataDummyJsonSembako);
		// getItemList(4);
		 getItemList("item_sembako.json");
		 
	})

	$('#tab_sayur_shop_comodity').click(function(){
		$('.tab-shop-comodity-category').removeClass("active");
		$(this).addClass("active");
		document.getElementById('img_sembako_shop_comodity').src="img/allbar.png";
		document.getElementById('img_sayur_shop_comodity').src="img/vegetablebar-blue.png";
		document.getElementById('img_buah_shop_comodity').src="img/fruitbar.png";
		document.getElementById('img_olahan_shop_comodity').src="img/olahan.png";
		// loadWidgetComodityChoose(dataDummyJsonSayuran);
		// getItemList(1);
		getItemList("item_sayuran.json");
	})

	$('#tab_buah_shop_comodity').click(function(){
		$('.tab-shop-comodity-category').removeClass("active");
		$(this).addClass("active");
		document.getElementById('img_sembako_shop_comodity').src="img/allbar.png";
		document.getElementById('img_sayur_shop_comodity').src="img/vegetablebar.png";
		document.getElementById('img_buah_shop_comodity').src="img/fruitbar-blue.png";
		document.getElementById('img_olahan_shop_comodity').src="img/olahan.png";
		// loadWidgetComodityChoose(dataDummyJsonBuah);
		// getItemList(2);
		getItemList("item_buah.json");
	})

	$('#tab_olahan_shop_comodity').click(function(){
		$('.tab-shop-comodity-category').removeClass("active");
		$(this).addClass("active");
		document.getElementById('img_sembako_shop_comodity').src="img/allbar.png";
		document.getElementById('img_sayur_shop_comodity').src="img/vegetablebar.png";
		document.getElementById('img_buah_shop_comodity').src="img/fruitbar.png";
		document.getElementById('img_olahan_shop_comodity').src="img/olahan-blue.png";
		// loadWidgetComodityChoose(dataDummyJsonOlahan);
		// getItemList(3);
		getItemList("item_olahan.json");
	})

	getItemList("item_sembako.json");

	var myInterval;

		function getItemList(params){

			$$.ajax({
			  url: "https://catatani-ba229.firebaseio.com/"+params,
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

			  	setTimeout(function(){
			  		var result = JSON.parse(data);

			  		console.log(result);

			  		var i = 0;
					stop = false;
					Template7.global.arrDataComodity = [];

	  				myInterval = setInterval(function(){

		  				while (i < result.data.length && !stop) {
		  				
			  				getTotalComodityByItemId(result.data[i].item_id);
			  				 i++;
		  				}

		  				if(Template7.global.arrDataComodity.length==result.data.length){
							stop = true;
							clearInterval(myInterval);
							// hideLoading();

							console.log(Template7.global.arrDataComodity);

							loadWidgetComodityChoose(Template7.global.arrDataComodity,result);
						}

	  				}, 100)

			  	}, 500);
			  		

			  }
			});

		}


	function loadWidgetComodityChoose(dataTotal,dataObject){

		$$.ajax({
		  	url: 'view/widget/shop_comodity_list.html',
		  	statusCode: {
		    	404: function (xhr) { alert('page not found'); }
		  	},
		  	beforeSend : function(){  },
		  	success : function(data){		  				

		  				setTimeout(function(){

		  					console.log(dataTotal);

		  					// dataObject = JSON.parse(dataObject);

		  					for (var i = 0; i < dataObject.data.length; i++) {
		  					  for (var j = 0; j < dataTotal.length; j++) {
		  					  	if(dataTotal[j].item_id==dataObject.data[i].item_id){
									dataObject.data[i].total = dataTotal[j].total;
									// console.log('same item id');
								}
		  					  }
		  						
		  					}

							console.log(dataObject);

					       	$$('#shop_comodity_grid_list').html(data);
					       	var template = $$('#shop-comodity-template').html();
					        // console.log(typeof template);
						    var compiledTemplate = Template7.compile(template);

						    var html = compiledTemplate(dataObject);
						  	$$('#shop_comodity_grid_list').html(html);

						  	hideLoading();

						  	var tablinks = document.getElementById('card-comodity-shop-choose').getElementsByClassName('card-wrap-comodity');
					  		for (var i = 0, j = tablinks.length; i < j; i++) {
								tablinks[i].onclick = function(){

									var itemId = $(this).data('id');
									var name = $(this).data('name');
									var image = $(this).data('image');
									var totalMax = $(this).data('total');

									console.log(totalMax);


									document.getElementById('shop_comodity_quantity').value = 0;
									document.getElementById('shop_comodity_price').value = "";

									document.getElementById('title_shop_comodity').innerHTML = name;
									document.getElementById('image_shop_comodity').src = image;
									document.getElementById('shop_comodity_max').innerHTML = totalMax;

									$('.inc-shop-comodity-qty').unbind('click').click(function(e){

										total = document.getElementById('shop_comodity_quantity').value;
										
										total++;

										if(total > totalMax){
											myApp.alert("kuantitas melebihi maksimum", 'Notifikasi');
											total = totalMax;
										}
										
										document.getElementById('shop_comodity_quantity').value = total;

										e.stopPropagation();
								  		e.preventDefault();

									})

									$('.dec-shop-comodity-qty').unbind('click').click(function(e){

										total = document.getElementById('shop_comodity_quantity').value;
										
										total--;
										if(total<0){
											total = 0;
										}
										document.getElementById('shop_comodity_quantity').value = total;

										e.stopPropagation();
								  		e.preventDefault();

									})

									$('.submit-shop-comodity').unbind('click').click(function(e){

										console.log(itemId);

										var comodityType = $( "#shop_comodity_type option:selected" ).text();
										var comodityGrade = $( "#shop_comodity_grade option:selected" ).text();
										var comodityQuantity = document.getElementById('shop_comodity_quantity').value;
										var comodityPrice = document.getElementById('shop_comodity_price').value;

										
										showLoading();
										myApp.closeModal('.popup-shop-comodity-item');

										setTimeout(function() {

											mainView.router.load({
											  url: 'view/shop/main_shop.html?itemId='+itemId+'&type='+comodityType+'&grade='+comodityGrade+'&quantity='+comodityQuantity+'&price='+comodityPrice,
											  animatePages: true
											});

										}, 1000);


									})

									getSession();

									showLoading();

									setTimeout(function() {
										
										console.log(Template7.global.lengthSession);

										if(Template7.global.lengthSession==1){
											if(Template7.global.userdata.usertype=="consumer"){
												myApp.popup('.popup-shop-comodity-item');
												



											}else{
												myApp.confirm('Anda Harus Login/Register sebagai konsumen untuk melanjutkan', 'Notifikasi',
													function () {
														showLoading();

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
												    	deleteSession();
												    	$('#command-home-button').html(landingPageNotLogin);

												    	heightScreen = $(window).height()/2;
														$('#belanja').css('height',heightScreen-20);
														$('#jualan').css('height',heightScreen);

														console.log($('#belanja').innerHeight());
														console.log($('#jualan').innerHeight());



												    	setTimeout(function() {
												    		hideLoading();
												    		$$('#tab_consumer').addClass('active');
															$$('#tab_consumer_register').addClass('active');
															$$('#tab_farmer_register').removeClass('active');
															$$('#tab_farmer').removeClass('active');
															myApp.popup('.popup-login');

												    	}, 1000);
													},
													function () {

													}

												);
											}
											

										}else{
											 myApp.confirm('Anda Harus Login/Register sebagai konsumen', 'Notifikasi', 
										      function () {
										      	$$('#tab_consumer').addClass('active');
												$$('#tab_consumer_register').addClass('active');
												$$('#tab_farmer_register').removeClass('active');
												$$('#tab_farmer').removeClass('active');
												myApp.popup('.popup-login');
											  },
										      function () {
										      }
										    );
											
										}

										hideLoading();

								   },1000);

								}
				    		}
														

							


		  				},1000)


		  			
				
						



		    }


		})

	}



})