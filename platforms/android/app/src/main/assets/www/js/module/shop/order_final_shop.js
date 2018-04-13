myApp.onPageInit('order_final_shop_list', function (page) {

	$('.toolbar-inner-home').html('');
	$('#tabbar_home').css("display","none");

	$('#continue_shopping_btn').click(function(){

		Template7.global.summaryPurchase = {};

		mainView.router.back({
			url : 'view/seller/purchase_menu.html',
			force : true,
			reload : true
		});
	})

	$('#back_home_btn').click(function(){

		Template7.global.summaryPurchase = {};

		mainView.router.back({
			url : 'index.html',
			force :true,
			reload : true
		});

		$('#tabbar_home').css("display","block");

		$('.toolbar-inner-home').html('');
		
		showLoading();

		setTimeout(function() {

			hideLoading();
			loadChartWeeklyTarget();
			loadChartProgress();
			$('.toolbar-inner-home').css('background','#ac312a');
			$('.toolbar-inner-home').html('<a href="#" id="purchase_page" style="margin: 0 auto;"><i class="icon f7-icons" style="color: white;">layers_fill</i><span style="text-align:center;color:white;font-size: 12px;" class="tabbar-label">Pembelian</span></a>');
		
			$('#purchase_page').click(function(){

				mainView.router.load({
				  url: 'view/seller/purchase_page.html',
				  animatePages: true
				});

			})
		}, 1000);

	})

	showLoading();

	setTimeout(function() {

		hideLoading();
		console.log(Template7.global.summaryPurchase);

		$('#vendor_name_final').text(Template7.global.summaryPurchase.vendor_name);
		$('#comodity_name_final').text(Template7.global.summaryPurchase.product_name);
		$('#price_final').text("Rp "+comma_digits(Template7.global.summaryPurchase.price));
		$('#quantity_final').text(Template7.global.summaryPurchase.quantity+" Kg");
		$('#total_final').text("Rp "+comma_digits(Template7.global.summaryPurchase.subtotal));

	}, 1000);
		
	

	

})