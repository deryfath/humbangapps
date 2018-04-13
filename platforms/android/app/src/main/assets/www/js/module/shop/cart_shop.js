myApp.onPageInit('cart_shop_list', function (page) {

	$('#tabbar_home').css("display","block");

	console.log(itemIdSearch);
	console.log(typeSearch);
	console.log(gradeSearch);
	console.log(quantitySearch);
	console.log(priceSearchMin);
	console.log(priceSearchMax);
	
	$('.back-cart').click(function(){
		$('#tabbar_home').css("display","none");
		mainView.router.back({
			url : 'view/shop/main_shop.html?itemId='+itemIdSearch+'&type='+typeSearch+'&grade='+gradeSearch+'&quantity='+quantitySearch+'&priceMin='+priceSearchMin+'&priceMax='+priceSearchMax,
			force : true,
			reload : true
		});

	})

	var cartInitEmpty = '<div class="content-block-inner">'+
							'<div class="list-block" style="margin-top: 58%;margin-bottom: 50%;color:gray;">'+
								'<div style="text-align: center;margin-bottom: -14px;font-weight: bold;font-size: 17px;">'+
									'Empty Cart'+
								'</div>'+
								'<div style="text-align: center;">'+
									'<i class="icon ion-ios-cart" style="font-size: 76px;color:darkslategray;"></i>'+
								'</div>'+
							'</div>'+
						'</div>';

	var calendarDeliveryCartRange = null;
	var priceTotal = 0;

	getAllCart();

	showLoading();
	setTimeout(function(){
		hideLoading();
		if(Template7.global.lengthCart==0){

			$('#cart_grid_list').html(cartInitEmpty);
			$('.toolbar-inner-home').html('');
			$('#tabbar_home').css("display","none");


		}else{

			var arrCartItem = Template7.global.arrDataCart;
			console.log(arrCartItem);

			var i = 0;
			var stop = false;
			var cartInterval = 0;
			Template7.global.arrTotalComodityUser = [];

  			cartInterval = setInterval(function(){

	  			while(i<arrCartItem.length && !stop){
	  				getAllComodityShopBySellerIdAndItemId(arrCartItem[i].seller_id,arrCartItem[i].item_id);
	  				i++;
	  			}

	  			console.log(arrCartItem.length);
				console.log(Template7.global.arrTotalComodityUser.length);

				// showLoading();

				if(arrCartItem.length==Template7.global.arrTotalComodityUser.length){
					console.log('test');
					stop = true;
					clearInterval(cartInterval);
					console.log(Template7.global.arrTotalComodityUser);
					loadWidgetCartItem(arrCartItem);

				}
				
				
			}, 100)

		}


	}, 1000);

	function loadWidgetCartItem(arrCartItem){
		$$.ajax({
		  	url: 'view/widget/cart_item_grid.html',
		  	statusCode: {
		    	404: function (xhr) { alert('page not found'); }
		  	},
		  	beforeSend : function(){   //showLoading();  
		  	},
		  	success : function(data){

		  		var context = {data : arrCartItem};

				
				// var obj = JSON.parse(context);
				// console.log(obj);

				// Template7.global.arrTotalComodityUser = [];

		  //      	//get max stock update from comodity
		  //      	for (var i = 0; i < arrCartItem.length; i++) {
		  //      		getAllComodityShopBySellerIdAndItemId(arrCartItem[i].seller_id,arrCartItem[i].item_id);
		  //      	}

		       	// setTimeout(function(){

		       		console.log(Template7.global.arrTotalComodityUser);


		       		hideLoading();
			       	$$.each(context.data, function (index, value) {

				  		if(value.special==0){
							value.no_special_flag = true;
						}else{
							value.no_special_flag = false;
						}

						value.subtotal = parseInt(value.price) * parseInt(value.total);

						// if(value.unit_kg){
							value.price_subtotal_show = "Rp "+comma_digits(value.subtotal);	
							value.price_show = "Rp "+comma_digits(value.price);	
						// }else{
						// 	value.price_show = "Rp "+comma_digits(value.price/4);	
						// }
                       

                       for (var i = 0; i < Template7.global.arrTotalComodityUser.length; i++) {

                       		if(value.item_id==Template7.global.arrTotalComodityUser[i].id){

								console.log('cocok');
								value.max_stock = Template7.global.arrTotalComodityUser[i].total;
								value.comodity_id = Template7.global.arrTotalComodityUser[i].id;
								break;
							}
                       }
						
						
						
				  	})

				  	console.log(context);

			       	$$('#cart_grid_list').html(data);
			       	var template = $$('#cart-item-grid-template').html();
			        // console.log(typeof template);
				    var compiledTemplate = Template7.compile(template);

				    var html = compiledTemplate(context);
				  	$$('#cart_grid_list').html(html);


				  	$( ".delivery-time-cart" ).change(function() {
						var id = $(this).data('id');
						cartUid = $(this).data('cartuid');
						var comodityId = $(this).data('comodityid');
						var delivery = $(this).data('delivery');
						var itemId = $(this).data('itemid');
						var sellerId = $(this).data('sellerid');
						var special = $(this).data('special');
						var deliveryTimeUpdate = $("#delivery_time_cart_"+id).val();
						myApp.closeModal('.picker-calendar');

						calendarDeliveryCartRange.destroy();

						//UPDATE CART
						updateDeliveryTimeCart(cartUid,deliveryTimeUpdate);

						showLoading();
						setTimeout(function(){
							hideLoading();
							mainView.router.reloadPage('view/shop/cart_shop.html');

						}, 1000);	
					})

					

					$('.inc-cart-qty').unbind('click').click(function(e){

						id = $(this).data('id');
						cartUid = $(this).data('cartuid');
						comodityId = $(this).data('comodityid');
						itemId = $(this).data('itemid');
						sellerId = $(this).data('sellerid');
						name = $(this).data('name');
						delivery = $(this).data('delivery');
						max = $(this).data('max');
						special = $(this).data('special');
						quantityKg = $(this).data('unitkg');
						total = document.getElementById('total_cart_'+id).value;
						totalTmp = total;

						total++;

						var maxAcc = 0;

						// if(!quantityKg){

						// 	maxTmp = max * 4; 
						// 	maxAcc = maxTmp + totalTmp;

						// }else{

							maxAcc = max + totalTmp;
						// }
							
						
						
						if(special==0){

							if(total > maxAcc){
								myApp.alert("kuantitas melebihi jumlah stock, pilih <b>Special Request</b> untuk kuantitas tanpa batas", 'Notifikasi');

								total = totalTmp;

							}else{
								
									updateTotalComodityByUserId(comodityId,"1","decrease",quantityKg);

									//UPDATE CART
									updateCartById(cartUid,delivery,max,"increase");
									document.getElementById('total_cart_'+id).value = total;

									setTimeout(function(){
										
										console.log(cartUid);
										
										mainView.router.reloadPage('view/shop/cart_shop.html');


									}, 1000);

								
								//get max stock update from comodity
								// getAllComodityShopBySellerIdAndItemId(sellerId,itemId);

							}
		
						}else{

									//UPDATE CART
									updateCartById(cartUid,delivery,max,"increase");
									document.getElementById('total_cart_'+id).value = total;

									setTimeout(function(){
										
										mainView.router.reloadPage('view/shop/cart_shop.html');

									}, 1000);

						}


						e.stopPropagation();
				  		e.preventDefault();

					})

					$('.dec-cart-qty').unbind('click').click(function(e){

						id = $(this).data('id');
						cartUid = $(this).data('cartuid');
						comodityId = $(this).data('comodityid');
						itemId = $(this).data('itemid');
						sellerId = $(this).data('sellerid');
						max = $(this).data('max');
						name = $(this).data('name');
						delivery = $(this).data('delivery');
						special = $(this).data('special');
						quantityKg = $(this).data('unitkg');
						total = document.getElementById('total_cart_'+id).value;
						totalTmp = total;
						total--;
						

						if(special==0){

							if(total<0){
								total = 0;

							}else{

								updateTotalComodityByUserId(comodityId,"1","increase",quantityKg);
								
								//UPDATE CART
								updateCartById(cartUid,delivery,max,"decrease");
								document.getElementById('total_cart_'+id).value = total;

								
								setTimeout(function(){
									
									mainView.router.reloadPage('view/shop/cart_shop.html');

								}, 1000);

								//get max stock update from comodity
								// getAllComodityShopBySellerIdAndItemId(sellerId,itemId);

							}

							
							

						}else{

							if(total<0){
								total = 0;

							}else{

								
								//UPDATE CART
								updateCartById(cartUid,delivery,max,"decrease");
								document.getElementById('total_cart_'+id).value = total;

								setTimeout(function(){
									
									mainView.router.reloadPage('view/shop/cart_shop.html');

								}, 1000);


							}

							
						}
			

						e.stopPropagation();
				  		e.preventDefault();

					})

					$('.remove_item_cart').unbind('click').click(function(e){
						var id = $(this).data('id');
						cartUid = $(this).data('cartuid');
						comodityId = $(this).data('comodityid');
						itemId = $(this).data('itemid');
						sellerId = $(this).data('sellerid');
						name = $(this).data('name');
						special = $(this).data('special');
						delivery = $(this).data('delivery');
						quantityKg = $(this).data('unitkg');
						total = document.getElementById('total_cart_'+id).value;

						if(special==0){

							showLoading();

							updateTotalComodityByUserId(comodityId,total,"increase",quantityKg);
							//DELETE CART BY ID
							removeCartById(cartUid);
							
							setTimeout(function(){
								mainView.router.reloadPage('view/shop/cart_shop.html');
							}, 1000);


							//get max stock update from comodity
							// getAllComodityShopBySellerIdAndItemId(sellerId,itemId);

						}else{

							showLoading();

							//DELETE CART BY ID
							removeCartById(cartUid);

							setTimeout(function(){

								mainView.router.reloadPage('view/shop/cart_shop.html');
							}, 1000);

						}

						
							

						e.stopPropagation();
				  		e.preventDefault();
					})

				  	var today = new Date();
					var weekLater = new Date().setDate(today.getDate() + 7);
					
					for (var i = 0; i < arrCartItem.length; i++) {
						var numPrice;

						// if(arrCartItem[i].unit_kg){

							numPrice = Number(arrCartItem[i].price)*Number(arrCartItem[i].total);

						// }else{

						// 	numPrice = (Number(arrCartItem[i].price)/4)*Number(arrCartItem[i].total);

						// }
						priceTotal = priceTotal + numPrice;
						var id = arrCartItem[i].cart_id;
						var total = arrCartItem[i].total;
						var delivery = arrCartItem[i].delivery_time;
						var startHarvest = Template7.global.arrTotalComodityUser[i].start_harvest;
						var finishHarvest = Template7.global.arrTotalComodityUser[i].finish_harvest;
						var special = arrCartItem[i].special;

						calendarDeliveryCartRange = myApp.calendar({
						    input: '#delivery_time_cart_'+id,
						    dateFormat: 'dd/mm/yyyy',
						    disabled: function (date) {
						    	// console.log(startHarvest);

						        var d1 = startHarvest.split("/");
								var d2 = finishHarvest.split("/");

								var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
								var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
								var check = new Date(date.getFullYear(), parseInt(date.getMonth()), date.getDate());

								if (special==0) {
									if ( check >= from && check <= to || check == from || check == to)  {
							            if(date.getDay() === 1 || date.getDay() === 3 || date.getDay() == 6 ){
							            	return false;
							            }else{
							            	return true;
							            }
							            
							        }
							        else {
							            return true;
							        }
								}else{

						            if(date.getDay() === 1 || date.getDay() === 3 || date.getDay() == 6 ){
						            	return false;
						            }else{
						            	return true;
						            }	            
							       
								}
						    }
						});

					}


					
					console.log(priceTotal);

					Template7.global.totalCart = priceTotal;

					$('.toolbar-inner-home').css('background','#ac312a');

					$('.toolbar-inner-home').html('<div style="color:white;font-weight: bold;">Total :<b style="font-size: large;color: white;"> Rp <a id="price_total_cart" style="color:white;">'+comma_digits(priceTotal)+'</a> </b></div><div style="background: #0e344e;width: 22%;height: 100%;margin-right: -8px;"><a href="#" id="next_cart_btn" style="text-align: center;"><i class="icon f7-icons" style="color: #09a0cb;margin-top: 5px;">check_round_fill</i><span class="tabbar-label" style="font-weight: bolder;color: white;">CHECKOUT</span></a></div>')

					$('#next_cart_btn').click(function(){

						getSession();

						showLoading();

						Template7.global.backToMenuCart = false;

						setTimeout(function() {
								console.log(Template7.global.lengthSession);	
								hideLoading();
								if(Template7.global.lengthSession==1){
									console.log('test');
									mainView.router.loadPage('view/shop/delivery_shop.html');
								}else{
									 myApp.confirm('Anda harus login/register terlebih dahulu untuk melanjutkan', 'Notifikasi', 
								      function () {
										myApp.popup('.popup-login');					      
									  },
								      function () {
								      }
								    );
									
								}
						},1000)

						

					})



				// }, 1000);



			},
		  	error : function(){ alert('error');	}
		});
	}


})