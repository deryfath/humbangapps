myApp.onPageInit('check_status_order_page', function (page) {

	Template7.global.arrCartTransaction = [];

	$('#fab').css("display","none");
	$('.back').click(function(){
		mainView.router.back({
			url:'index.html',
			force:true
		});
		$('#fab').css("display","block");
		$('#fab').removeClass("speed-dial-opened");
		Template7.global.arrCartTransaction = [];
		clearInterval(myInterval);

		if(Template7.global.userdata.usertype=="seller"){
			//CHECK PESANAN /NOTIFIKASI
			getCartItemByFarmNameAndUserId();
			showLoading();
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
			}, 300);

		}else{
			showLoading();
		      setTimeout(function() {
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
				
		      }, 1000);
		}

	})

	var initEmptyOrderStatus = '<div class="content-block-inner">'+
							'<div class="list-block" style="margin-top: 50%;margin-bottom: 50%;color:gray;">'+
								'<div style="text-align: center;margin-bottom: 10px;font-weight: bold;">'+
									'Empty Transaction'+
								'</div>'+
							'</div>'+
						'</div>';	 

	var myInterval;

	getAllTransactionByUserId();

	setTimeout(function() {

		if(Template7.global.arrTransaction.length==0){
			hideLoading();
			$('#check_status_order_list').html(initEmptyOrderStatus);
		}else{

			var i = 0;
			stop = false;

			myInterval = setInterval(function(){

	  			while(i<Template7.global.arrTransaction.length && !stop){
	  				getCartByTrxId(Template7.global.arrTransaction[i].trx_id);
	  				i++;
	  			}

	  			console.log(Template7.global.arrCartTransaction.length);
				console.log(Template7.global.arrTransaction.length);

				if(Template7.global.arrCartTransaction.length==Template7.global.arrTransaction.length){
					hideLoading();
					stop = true;
					clearInterval(myInterval);
					console.log('test');
					console.log(Template7.global.arrCartTransaction);
					loadWidgetCheckStatusOrder(Template7.global.arrTransaction,Template7.global.arrCartTransaction);

				}
				
				
			}, 100)
		

		}

	}, 1000);

	
	function loadWidgetCheckStatusOrder(arrTransaction,arrCartTransaction){
		$$.ajax({
		  	url: 'view/widget/check_status_order_grid.html',
		  	statusCode: {
		    	404: function (xhr) { alert('page not found'); }
		  	},
		  	beforeSend : function(){  },
		  	success : function(data){

		  		// var obj = {data_transaction : arrTransaction, data_cart : arrCartTransaction};

		  		var groups ='{ "data": [';

		  		for (var i = 0; i < arrTransaction.length; i++) {

		  		  if(i != arrTransaction.length-1){
		  			if(i==0){

		  			 	groups = groups + '{"trx_id" : "'+arrTransaction[i].trx_id+'" , "created_time": "'+arrTransaction[i].created_time+'", "transaction_total": "Rp '+comma_digits(arrTransaction[i].total)+'","payment_method" : "'+arrTransaction[i].payment_method+'", "expanded": "accordion-item-expanded", "data_cart": [ '

		  			 	

		  			 	groups = groups + ']},';

		  			}else{

		  			    groups = groups + '{"trx_id" : "'+arrTransaction[i].trx_id+'" , "created_time": "'+arrTransaction[i].created_time+'", "transaction_total": "Rp '+comma_digits(arrTransaction[i].total)+'", "payment_method" : "'+arrTransaction[i].payment_method+'", "expanded": "", "data_cart": ['

		  			  

		  			 	groups = groups + ']},';

		  			}


		  		   }else{

		  		   	 if(i==0){

		  			 	groups = groups + '{"trx_id" : "'+arrTransaction[i].trx_id+'" , "created_time": "'+arrTransaction[i].created_time+'", "transaction_total": "Rp '+comma_digits(arrTransaction[i].total)+'", "payment_method" : "'+arrTransaction[i].payment_method+'", "expanded": "accordion-item-expanded", "data_cart": ['

		  			 	

		  			 	groups = groups + ']}';

		  			}else{

		  			    groups = groups + '{"trx_id" : "'+arrTransaction[i].trx_id+'" , "created_time": "'+arrTransaction[i].created_time+'", "transaction_total": "Rp '+comma_digits(arrTransaction[i].total)+'", "payment_method" : "'+arrTransaction[i].payment_method+'", "expanded": "", "data_cart": ['

		  			  

		  			 	groups = groups + ']}';

		  			}

		  		   }

		  		}

		  		groups = groups + "]}";

		  		// console.log(groups);

		  		var dataObject = JSON.parse(groups);
		  		
		  		$$.each(dataObject.data, function (index, value) {
			  		for (var i = index; i < arrCartTransaction.length; i++) {
			  		  
			  			for (var j = 0; j < arrCartTransaction[i].length; j++) {
			  				console.log(arrCartTransaction[i][j]);
			  				arrCartTransaction[i][j].price_show = 'Rp '+comma_digits(arrCartTransaction[i][j].price);
			  				
					  		value.data_cart.push(arrCartTransaction[i][j]);

			  			}
			  			if(i == index){
			  				break;
			  			}
					  		
			  		}

	  			 })
		  		

		  		// console.log(arrCartTransaction);

		  		// $$.each(obj.data_cart, function (index, value) {
		  		// 	value.cart_price = "Rp "+comma_digits(value.price);

		  		// })

		  		console.log(dataObject);

		  		$$('#check_status_order_list').html(data);
		       	var template = $$('#check-status-order-template').html();
		        // console.log(typeof template);
			    var compiledTemplate = Template7.compile(template);

			    var html = compiledTemplate(dataObject);
			  	$$('#check_status_order_list').html(html);


			  	$(".accordion-btn").click(function(){
			  		var id = $(this).data('id');
		  			console.log(id);
		  		})

		  	},
		  	error : function(){ alert('error');	}
		});

	}


})