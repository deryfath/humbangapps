myApp.onPageInit('delivery_shop_list', function (page) {

	$('#tabbar_home').css("display","block");

	$('.toolbar-inner-home').css('background','white');

	$('.toolbar-inner-home').html('<a href="#" class="submit-delivery-shop" style="margin: 0 auto;"><i class="icon f7-icons" style="color: #143b41;">check_round_fill</i><span class="tabbar-label">Konfirmasi</span></a>');

	console.log(Template7.global.backToMenuCart);

	$('.back').click(function(){

		$('.toolbar-inner-home').html('');

		if (Template7.global.backToMenuCart) {
			mainView.router.back({
				url : 'view/shop/cart_shop_landing_page.html',
				force : true,
				reload : true
			});	
		}else{
			mainView.router.back({
				url : 'view/shop/cart_shop.html',
				force : true,
				reload : true
			});	
		}
		
		$('.toolbar-inner-home').css('background','#ac312a');

		$('.toolbar-inner-home').html('<div style="color:white;font-weight: bold;">Total :<b style="font-size: large;color: white;"> Rp <a id="price_total_cart" style="color:white;">'+comma_digits(priceTotal)+'</a> </b></div><div style="background: #0e344e;width: 22%;height: 100%;margin-right: -8px;"><a href="#" id="next_cart_btn" style="text-align: center;"><i class="icon f7-icons" style="color: #09a0cb;margin-top: 5px;">check_round_fill</i><span class="tabbar-label" style="font-weight: bolder;color: white;">CHECKOUT</span></a></div>')


	})

	showLoading();
	setTimeout(function(){

		hideLoading();
		
		console.log(Template7.global.userdata);
		console.log(Template7.global.totalCart);

		document.getElementById('name_delivery').value = Template7.global.userdata.fullname;
		document.getElementById('address_delivery').value = Template7.global.userdata.address;
		document.getElementById('phone_delivery').value = Template7.global.userdata.phone;
		document.getElementById('email_delivery').value = Template7.global.userdata.email;

	}, 1000);

	$('#update_delivery_address').click(function(){
		var nameVal = document.getElementById('name_delivery').value;
		var emailVal = document.getElementById('email_delivery').value;
		var addressVal = document.getElementById('address_delivery').value;
		var phoneVal = document.getElementById('phone_delivery').value;

		updateDeliveryAccount(nameVal,emailVal,addressVal,phoneVal);

		setTimeout(function(){
			mainView.router.reloadPage('view/shop/delivery_shop.html');

		}, 1000);
	})

	$('.submit-delivery-shop').click(function(){
		var paymentVal = $('input[name=my-radio-payment]:checked').val();
		Template7.global.paymentMethod = paymentVal;
		console.log(paymentVal);
		console.log(Template7.global.totalCart);
		console.log(Template7.global.arrDataCart);

		showLoading();
		setTimeout(function(){
			mainView.router.load({
				url : 'view/shop/order_final_shop.html'
			});

			// for (var i = 0; i < Template7.global.arrDataCart.length; i++) {
			// 	if(Template7.global.arrDataCart[i].special!=1){
			// 		updateTotalComodityByUserId(Template7.global.arrDataCart[i].seller_id,Template7.global.arrDataCart[i].item_id,Template7.global.arrDataCart[i].name,Template7.global.arrDataCart[i].total)
			// 	}
			// }

			insertTransaction(Template7.global.totalCart,paymentVal);

		}, 1000)


		
	})



	// $('#next_delivery_account').click(function(){
	// 	var paymentVal = $('input[name=my-radio]:checked').val();
	// 	Template7.global.paymentMethod = paymentVal;
	// 	console.log(paymentVal);
	// 	console.log(Template7.global.totalCart);

	// 	showLoading();
	// 	setTimeout(function(){
	// 		hideLoading();
	// 		mainView.router.load({
	// 			url : 'view/shop/order_final_shop.html'
	// 		});

	// 	}, 1000)

		

	// 	insertTransaction(Template7.global.totalCart,paymentVal)
	// })



	
})
