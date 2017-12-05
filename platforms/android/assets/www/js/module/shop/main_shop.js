var counterCart;
var itemIdSearch;
var typeSearch;
var gradeSearch;
var quantitySearch;
var priceSearch;	

myApp.onPageInit('main_shop_list', function (page) {

	Template7.global.arrFarmName = [];

	var closeStatus = false;

	$('#fab').css("display","none");

	$('.back').click(function(){
		mainView.router.back({
			url : 'view/shop/shop_comodity.html',
			force : true,
			reload : true
		});
	})


	var initEmptyShopItem = '<div class="content-block-inner">'+
							'<div class="list-block" style="margin-top: 50%;margin-bottom: 50%;color:gray;">'+
								'<div style="text-align: center;margin-bottom: 10px;font-weight: bold;">'+
									'Empty Item'+
								'</div>'+
							'</div>'+
						'</div>';	 

	var dataDummyJsonAll = '{ "data": ['+

							'{"item_id" : "1","item_stock" : "10","item_name":"Alpukat","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/alpukat.jpg","ready_stock":true},'+
							'{"item_id" : "2","item_stock" : "10","item_name":"Bawang Merah","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/bawang_merah.JPG","ready_stock":false},'+
							'{"item_id" : "3","item_stock" : "10","item_name":"Bawang Putih","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/bawang_putih.JPG","ready_stock":false},'+
							'{"item_id" : "4","item_stock" : "10","item_name":"Beras Hitam","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/beras_hitam.jpg","ready_stock":true},'+
							'{"item_id" : "5","item_stock" : "10","item_name":"Beras Putih","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/brokoli.jpg","ready_stock":true},'+
							'{"item_id" : "6","item_stock" : "10","item_name":"Brokoli","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/buncis.JPG","ready_stock":false},'+
							'{"item_id" : "7","item_stock" : "10","item_name":"Buncis","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/cabai.JPG","ready_stock":true},'+
							'{"item_id" : "8","item_stock" : "10","item_name":"Cabai","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/daun_bawang.JPG","ready_stock":false},'+
							'{"item_id" : "9","item_stock" : "10","item_name":"Daun Bawang","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/durian.jpg","ready_stock":true},'+
							'{"item_id" : "11","item_stock" : "10","item_name":"Durian","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/jagung.jpg","ready_stock":true},'+
							'{"item_id" : "12","item_stock" : "10","item_name":"Jagung","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/jambu_air.jpg","ready_stock":true},'+
							'{"item_id" : "13","item_stock" : "10","item_name":"Jambu Air","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/jeruk.jpg","ready_stock":true},'+
							'{"item_id" : "14","item_stock" : "10","item_name":"Jeruk","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/kacang_tanah.JPG","ready_stock":true},'+
							'{"item_id" : "15","item_stock" : "10","item_name":"Kacang Tanah","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/kembang_kol.jpg","ready_stock":true},'+
							'{"item_id" : "16","item_stock" : "10","item_name":"Kembang Kol","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/kentang.jpg","ready_stock":true},'+
							'{"item_id" : "17","item_stock" : "10","item_name":"Kentang","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/labu_kuning.JPG","ready_stock":true},'+
							'{"item_id" : "18","item_stock" : "10","item_name":"Labu Kuning","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/nanas.jpg","ready_stock":true},'+
							'{"item_id" : "19","item_stock" : "10","item_name":"Nanas","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/pisang.jpg","ready_stock":true},'+
							'{"item_id" : "20","item_stock" : "10","item_name":"Pisang","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/raspberri.jpg","ready_stock":true},'+
							'{"item_id" : "21","item_stock" : "10","item_name":"raspberri","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/sawi_putih.jpg","ready_stock":true},'+
							'{"item_id" : "22","item_stock" : "10","item_name":"Sawi Putih","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/stroberi.jpg","ready_stock":true},'+
							'{"item_id" : "23","item_stock" : "10","item_name":"Strawberri","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/tomat.JPG","ready_stock":true},'+
							'{"item_id" : "24","item_stock" : "10","item_name":"Tomat","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/ubi.jpg","ready_stock":true},'+
							'{"item_id" : "25","item_stock" : "10","item_name":"Ubi","item_price":"10000","item_farm":"Green Farm","item_img":"img/buah-sayur/wortel.JPG","ready_stock":true}'+

						']}';

	var dataDummyJsonSayuran = '{ "data": ['+

							'{"item_id" : "1","item_stock" : "10","item_name":"Brokoli","item_price":"10000","item_farm":"Green Farm","item_img":"img/brokoli.jpg","ready_stock":true},'+
							'{"item_id" : "2","item_stock" : "10","item_name":"fresh carrot","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":false},'+
							'{"item_id" : "3","item_stock" : "10","item_name":"fresh lettuce","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":false},'+
							'{"item_id" : "4","item_stock" : "10","item_name":"fresh paprica","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":true},'+
							'{"item_id" : "5","item_stock" : "10","item_name":"big paprica","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":true},'+
							'{"item_id" : "6","item_stock" : "10","item_name":"big tomatoes","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":false},'+
							'{"item_id" : "7","item_stock" : "10","item_name":"big carrot","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":true},'+
							'{"item_id" : "8","item_stock" : "10","item_name":"big lettuce","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":false},'+
							'{"item_id" : "9","item_stock" : "10","item_name":"big paprica","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":true},'+
							'{"item_id" : "10","item_stock" : "10","item_name":"green paprica","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":true}'+

						']}';

	var dataDummyJsonBuah = '{ "data": ['+

							'{"item_id" : "1","item_stock" : "10","item_name":"Brokoli","item_price":"10000","item_farm":"Green Farm","item_img":"img/brokoli.jpg","ready_stock":true},'+
							'{"item_id" : "2","item_stock" : "10","item_name":"fresh carrot","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":false},'+
							'{"item_id" : "3","item_stock" : "10","item_name":"fresh lettuce","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":false},'+
							'{"item_id" : "4","item_stock" : "10","item_name":"fresh paprica","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":true},'+
							'{"item_id" : "5","item_stock" : "10","item_name":"big paprica","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":true},'+
							'{"item_id" : "6","item_stock" : "10","item_name":"big tomatoes","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":false},'+
							'{"item_id" : "7","item_stock" : "10","item_name":"big carrot","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":true},'+
							'{"item_id" : "8","item_stock" : "10","item_name":"big lettuce","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":false},'+
							'{"item_id" : "9","item_stock" : "10","item_name":"big paprica","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":true},'+
							'{"item_id" : "10","item_stock" : "10","item_name":"green paprica","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":true}'+

						']}';

	var dataDummyJsonPaket = '{ "data": ['+

							'{"item_id" : "1","item_stock" : "10","item_name":"Brokoli","item_price":"10000","item_farm":"Green Farm","item_img":"img/brokoli.jpg","ready_stock":true,"date" : "12/31/2017 09:34:00"},'+
							'{"item_id" : "1","item_stock" : "10","item_name":"Brokoli","item_price":"10000","item_farm":"Green Farm","item_img":"img/brokoli.jpg","ready_stock":true,"date" : "12/01/2017 09:34:00"},'+
							'{"item_id" : "2","item_stock" : "10","item_name":"fresh carrot","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":false,"date" : "01/12/2017 09:34:00"},'+
							'{"item_id" : "3","item_stock" : "10","item_name":"fresh lettuce","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":false,"date" : "09/12/2017 09:34:00"},'+
							'{"item_id" : "4","item_stock" : "10","item_name":"fresh paprica","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":true,"date" : "08/31/2017 09:34:00"},'+
							'{"item_id" : "4","item_stock" : "10","item_name":"fresh paprica","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":true,"date" : "08/08/2017 09:34:00"},'+
							'{"item_id" : "5","item_stock" : "10","item_name":"big paprica","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":true,"date" : "01/01/2017 09:34:00"},'+
							'{"item_id" : "6","item_stock" : "10","item_name":"big tomatoes","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":false,"date" : "03/12/2017 09:34:00"},'+
							'{"item_id" : "7","item_stock" : "10","item_name":"big carrot","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":true,"date" : "04/14/2017 09:34:00"},'+
							'{"item_id" : "8","item_stock" : "10","item_name":"big lettuce","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":false,"date" : "05/12/2017 09:34:00"},'+
							'{"item_id" : "9","item_stock" : "10","item_name":"big paprica","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":true,"date" : "03/03/2017 09:34:00"},'+
							'{"item_id" : "10","item_stock" : "10","item_name":"green paprica","item_price":"10000","item_farm":"Green Farm","item_img":"img/fruits-and-vegetables.jpg","ready_stock":true,"date" : "02/12/2017 09:34:00"}'+

						']}';

	// decDateSort = [];

	// var jsonData = JSON.parse(dataDummyJsonPaket);
	// console.log(jsonData);

	// for (var i = 0; i < jsonData.data.length; i++) {
	// 	splitDate = jsonData.data[i].date.split(" ");
	// 	decDateSort.push({date: splitDate[0], id: i});
	// }

	// console.log(decDateSort);

	// decDateSort.sort(function(a, b) {
	//      return new Date(b.date) - new Date(a.date);
	// });

	// console.log(decDateSort);

	// $('.toolbar-inner-home').html('<a href="#" class="tab-link tab-shop-category active" id="tab_all_item_shop">'+
	// 					           '<img src="img/allbar-blue.png" id="img_all_shop">'+
	// 					           '<span class="tabbar-label"><b>SEMUA</b></span>'+
	// 					        '</a>'+
	// 					        '<a href="#" class="tab-link tab-shop-category" id="tab_vegetable_shop">'+
	// 					            '<img src="img/vegetablebar.png" id="img_vegetable_shop">'+
	// 					             '<span class="tabbar-label"><b>SAYURAN</b></span>'+
	// 					        '</a>'+
	// 					        '<a href="#" class="tab-link tab-shop-category" id="tab_fruit_shop">'+
	// 					            '<img src="img/fruitbar.png" style="margin-top: 4px;" id="img_fruit_shop">'+
	// 					             '<span class="tabbar-label"><b>BUAH</b></span>'+
	// 					        '</a>'+
	// 					        '<a href="#" class="tab-link tab-shop-category" id="tab_sembako_shop">'+
	// 					            '<img src="img/sembako.png" id="img_sembako_shop">'+
	// 					             '<span class="tabbar-label"><b>SEMBAKO</b></span>'+
	// 					        '</a>'+
	// 					        '<a href="#" class="tab-link tab-shop-category" id="tab_olahan_shop">'+
	// 					            '<img src="img/olahan.png" id="img_olahan_shop">'+
	// 					             '<span class="tabbar-label"><b>OLAHAN</b></span>'+
	// 					        '</a>'+
	// 					        '<a href="#" class="tab-link tab-shop-category" id="tab_packet_shop" style="display:none;">'+
	// 					           '<img src="img/packet.png" style="margin-top: 7px;" id="img_packet_shop">'+
	// 					            '<span class="tabbar-label"><b>PAKET</b></span>'+
	// 					        '</a>');


	itemIdSearch = page.query.itemId;
	typeSearch = page.query.type;
	gradeSearch = page.query.grade;
	quantitySearch = page.query.quantity;
	priceSearch = page.query.price;

	console.log(itemIdSearch);

	getComoditySearch(itemIdSearch,typeSearch,gradeSearch,quantitySearch,priceSearch);

	// getAllComodityShop();

		// showLoading();

		setTimeout(function() {

			if(Template7.global.arrDataComodity.length==0){

				hideLoading();
				$('#main_shop_grid_list').html(initEmptyShopItem);
				$('#main_shop_grid_list_ext').html(initEmptyShopItem);
			}else{

				// myApp.addNotification({
			 //        title: 'Notifikasi',
			 //        message: 'Pengiriman dilakukan setiap hari senin, rabu dan sabtu'
			 //    });

				arrComodityShop = Template7.global.arrDataComodity;
				console.log(arrComodityShop.length);
				// var i = 0;
				// var stop = false;
				// var shopInterval = 0;
				// Template7.global.arrFarmName = [];

	  	// 		shopInterval = setInterval(function(){

		  // 			while(i<arrComodityShop.length && !stop){
		  // 				getFarmNameByUserId(arrComodityShop[i].user_id);
		  // 				i++;
		  // 			}

		  // 			console.log(arrComodityShop.length);
				// 	console.log(Template7.global.arrFarmName.length);

				// 	showLoading();

				// 	if(arrComodityShop.length==Template7.global.arrFarmName.length){
				// 		console.log('test');
				// 		stop = true;
				// 		clearInterval(shopInterval);
				// 		console.log(Template7.global.arrFarmName);
						loadWidgetItemGridList(arrComodityShop,Template7.global.arrFarmName);
				// 	}
					
					

				// }, 100)

			}

		}, 2000);


	$('#tab_all_item_shop').click(function(){
		$('.tab-shop-category').removeClass("active");
		$(this).addClass("active");
		document.getElementById('img_all_shop').src="img/allbar-blue.png";
		document.getElementById('img_vegetable_shop').src="img/vegetablebar.png";
		document.getElementById('img_fruit_shop').src="img/fruitbar.png";
		document.getElementById('img_sembako_shop').src="img/sembako.png";
		document.getElementById('img_olahan_shop').src="img/olahan.png";
		document.getElementById('img_packet_shop').src="img/packet.png";

		getAllComodityShop();

		showLoading();

		setTimeout(function() {

			if(Template7.global.lengthComodity==0){

				hideLoading();
				$('#main_shop_grid_list').html(initEmptyShopItem);
				$('#main_shop_grid_list_ext').html(initEmptyShopItem);
			}else{
				arrComodityShop = Template7.global.arrDataComodity;
				console.log(arrComodityShop.length);
				// var i = 0;
				// var stop = false;
				// var shopInterval = 0;
				// Template7.global.arrFarmName = [];

	  	// 		shopInterval = setInterval(function(){

		  // 			while(i<arrComodityShop.length && !stop){
		  // 				getFarmNameByUserId(arrComodityShop[i].user_id);
		  // 				i++;
		  // 			}

		  // 			console.log(arrComodityShop.length);
				// 	console.log(Template7.global.arrFarmName.length);

				// 	// showLoading();

				// 	if(arrComodityShop.length==Template7.global.arrFarmName.length){
				// 		console.log('test');
				// 		stop = true;
				// 		clearInterval(shopInterval);
				// 		console.log(Template7.global.arrFarmName);
						loadWidgetItemGridList(arrComodityShop,Template7.global.arrFarmName);
				// 	}
					
					

				// }, 100)

			}

		}, 2000);

	})

	$('#tab_vegetable_shop').click(function(){
			$('.tab-shop-category').removeClass("active");
			$(this).addClass("active");
			document.getElementById('img_all_shop').src="img/allbar.png";
			document.getElementById('img_vegetable_shop').src="img/vegetablebar-blue.png";
			document.getElementById('img_fruit_shop').src="img/fruitbar.png";
			document.getElementById('img_sembako_shop').src="img/sembako.png";
			document.getElementById('img_olahan_shop').src="img/olahan.png";
			document.getElementById('img_packet_shop').src="img/packet.png";
			
			getAllComodityShopByType("sayuran");

			showLoading();

			setTimeout(function() {

				if(Template7.global.lengthComodity==0){
					hideLoading();
					$('#main_shop_grid_list').html(initEmptyShopItem);
					$('#main_shop_grid_list_ext').html(initEmptyShopItem);
				}else{
					arrComodityShop = Template7.global.arrDataComodity;
					console.log(arrComodityShop.length);
					// var i = 0;
					// var stop = false;
					// var shopInterval = 0;
					// Template7.global.arrFarmName = [];

		  	// 		shopInterval = setInterval(function(){

			  // 			while(i<arrComodityShop.length && !stop){
			  // 				getFarmNameByUserId(arrComodityShop[i].user_id);
			  // 				i++;
			  // 			}

			  // 			console.log(arrComodityShop.length);
					// 	console.log(Template7.global.arrFarmName.length);

					// 	// showLoading();

					// 	if(arrComodityShop.length==Template7.global.arrFarmName.length){
					// 		console.log('test');
					// 		stop = true;
					// 		clearInterval(shopInterval);
					// 		console.log(Template7.global.arrFarmName);
							loadWidgetItemGridList(arrComodityShop,Template7.global.arrFarmName);
					// 	}
						
						

					// }, 100)

				}

			}, 2000);

	})

	$('#tab_fruit_shop').click(function(){
		$('.tab-shop-category').removeClass("active");
		$(this).addClass("active");
		document.getElementById('img_all_shop').src="img/allbar.png";
		document.getElementById('img_vegetable_shop').src="img/vegetablebar.png";
		document.getElementById('img_fruit_shop').src="img/fruitbar-blue.png";
		document.getElementById('img_sembako_shop').src="img/sembako.png";
			document.getElementById('img_olahan_shop').src="img/olahan.png";
		document.getElementById('img_packet_shop').src="img/packet.png";
		getAllComodityShopByType("buah");

			showLoading();

			setTimeout(function() {
				console.log(Template7.global.lengthComodity);
				
				if(Template7.global.lengthComodity==0){
					hideLoading();
					$('#main_shop_grid_list').html(initEmptyShopItem);
					$('#main_shop_grid_list_ext').html(initEmptyShopItem);
				}else{
					arrComodityShop = Template7.global.arrDataComodity;
					console.log(arrComodityShop.length);
					// var i = 0;
					// var stop = false;
					// var shopInterval = 0;
					// Template7.global.arrFarmName = [];

		  	// 		shopInterval = setInterval(function(){

			  // 			while(i<arrComodityShop.length && !stop){
			  // 				getFarmNameByUserId(arrComodityShop[i].user_id);
			  // 				i++;
			  // 			}

			  // 			console.log(arrComodityShop.length);
					// 	console.log(Template7.global.arrFarmName.length);

					// 	// showLoading();

					// 	if(arrComodityShop.length==Template7.global.arrFarmName.length){
					// 		console.log('test');
					// 		stop = true;
					// 		clearInterval(shopInterval);
					// 		console.log(Template7.global.arrFarmName);
							loadWidgetItemGridList(arrComodityShop,Template7.global.arrFarmName);
					// 	}
						
						

					// }, 100)

				}

			}, 2000);
	})

	$('#tab_sembako_shop').click(function(){
		$('.tab-shop-category').removeClass("active");
		$(this).addClass("active");
		document.getElementById('img_all_shop').src="img/allbar.png";
		document.getElementById('img_vegetable_shop').src="img/vegetablebar.png";
		document.getElementById('img_fruit_shop').src="img/fruitbar.png";
		document.getElementById('img_sembako_shop').src="img/sembako-blue.png";
			document.getElementById('img_olahan_shop').src="img/olahan.png";
		document.getElementById('img_packet_shop').src="img/packet.png";
		getAllComodityShopByType("sembako");

			showLoading();

			setTimeout(function() {

				if(Template7.global.lengthComodity==0){
					hideLoading();
					$('#main_shop_grid_list').html(initEmptyShopItem);
					$('#main_shop_grid_list_ext').html(initEmptyShopItem);
				}else{
					arrComodityShop = Template7.global.arrDataComodity;
					console.log(arrComodityShop.length);
					// var i = 0;
					// var stop = false;
					// var shopInterval = 0;
					// Template7.global.arrFarmName = [];

		  	// 		shopInterval = setInterval(function(){

			  // 			while(i<arrComodityShop.length && !stop){
			  // 				getFarmNameByUserId(arrComodityShop[i].user_id);
			  // 				i++;
			  // 			}

			  // 			console.log(arrComodityShop.length);
					// 	console.log(Template7.global.arrFarmName.length);

					// 	// showLoading();

					// 	if(arrComodityShop.length==Template7.global.arrFarmName.length){
					// 		console.log('test');
					// 		stop = true;
					// 		clearInterval(shopInterval);
					// 		console.log(Template7.global.arrFarmName);
							loadWidgetItemGridList(arrComodityShop,Template7.global.arrFarmName);

					// 	}
						
			

					// }, 100)

				}

			}, 2000);
	})

	$('#tab_olahan_shop').click(function(){
		$('.tab-shop-category').removeClass("active");
		$(this).addClass("active");
		document.getElementById('img_all_shop').src="img/allbar.png";
		document.getElementById('img_vegetable_shop').src="img/vegetablebar.png";
		document.getElementById('img_fruit_shop').src="img/fruitbar.png";
		document.getElementById('img_sembako_shop').src="img/sembako.png";
			document.getElementById('img_olahan_shop').src="img/olahan-blue.png";
		document.getElementById('img_packet_shop').src="img/packet.png";
		getAllComodityShopByType("olahan");

			showLoading();

			setTimeout(function() {

				if(Template7.global.lengthComodity==0){

					hideLoading();
					$('#main_shop_grid_list').html(initEmptyShopItem);
					$('#main_shop_grid_list_ext').html(initEmptyShopItem);
				}else{
					arrComodityShop = Template7.global.arrDataComodity;
					console.log(arrComodityShop.length);
					// var i = 0;
					// var stop = false;
					// var shopInterval = 0;
					// Template7.global.arrFarmName = [];

		  	// 		shopInterval = setInterval(function(){

			  // 			while(i<arrComodityShop.length && !stop){
			  // 				getFarmNameByUserId(arrComodityShop[i].user_id);
			  // 				i++;
			  // 			}

			  // 			console.log(arrComodityShop.length);
					// 	console.log(Template7.global.arrFarmName.length);

					// 	// showLoading();

					// 	if(arrComodityShop.length==Template7.global.arrFarmName.length){
					// 		console.log('test');
					// 		stop = true;
					// 		clearInterval(shopInterval);
					// 		console.log(Template7.global.arrFarmName);
							loadWidgetItemGridList(arrComodityShop,Template7.global.arrFarmName);
					// 	}
						
						

					// }, 100)

				}

			}, 2000);
	})

	$('#tab_packet_shop').click(function(){
		$('.tab-shop-category').removeClass("active");

		$(this).addClass("active");

		document.getElementById('img_all_shop').src="img/allbar.png";
		document.getElementById('img_vegetable_shop').src="img/vegetablebar.png";
		document.getElementById('img_fruit_shop').src="img/fruitbar.png";
		document.getElementById('img_sembako_shop').src="img/sembako.png";
		document.getElementById('img_olahan_shop').src="img/olahan.png";
		document.getElementById('img_packet_shop').src="img/packet-blue.png";
		getAllComodityShopByType("paket");

			showLoading();

			setTimeout(function() {

				
				if(Template7.global.lengthComodity==0){
					hideLoading();
					$('#main_shop_grid_list').html(initEmptyShopItem);
					$('#main_shop_grid_list_ext').html(initEmptyShopItem);
				}else{
					arrComodityShop = Template7.global.arrDataComodity;
					console.log(arrComodityShop.length);
					// var i = 0;
					// var stop = false;
					// var shopInterval = 0;
					// Template7.global.arrFarmName = [];

		  	// 		shopInterval = setInterval(function(){

			  // 			while(i<arrComodityShop.length && !stop){
			  // 				getFarmNameByUserId(arrComodityShop[i].user_id);
			  // 				i++;
			  // 			}

			  // 			console.log(arrComodityShop.length);
					// 	console.log(Template7.global.arrFarmName.length);

					// 	// showLoading();

					// 	if(arrComodityShop.length==Template7.global.arrFarmName.length){
					// 		console.log('test');
					// 		stop = true;
					// 		clearInterval(shopInterval);
					// 		console.log(Template7.global.arrFarmName);
							loadWidgetItemGridList(arrComodityShop,Template7.global.arrFarmName);

					// 	}
						
						
					// }, 100)

				}

			}, 2000);
	})

	var calendarDeliveryRange = null;

	getAllCart();

	showLoading();
	setTimeout(function(){
		hideLoading();
		console.log(Template7.global.lengthCart);
		if(Template7.global.lengthCart>0){
			$('.cart-total').html(Template7.global.lengthCart);
			counterCart = Template7.global.lengthCart;
			console.log(Template7.global.arrDataCart);
		}else{
			counterCart = 0;
		}

	}, 2000);

	$('#cart_shop').click(function(){

		if(calendarDeliveryRange!=null){
			calendarDeliveryRange.destroy();
		}
		mainView.router.load({
		  url: 'view/shop/cart_shop.html',
		  animatePages: true
		});
		
		
	})

	var specialRequest = 0;

	function loadWidgetItemGridList(dataObject,arrFarmName){


		$$.ajax({
		  	url: 'view/widget/item_grid.html',
		  	statusCode: {
		    	404: function (xhr) { alert('page not found'); }
		  	},
		  	beforeSend : function(){},
		  	success : function(data){

				var obj = {data : dataObject};
				console.log(obj);

				hideLoading();

				var dataPanen = [];
				var dataKirim = [];

	  			// var id = 1;

	  				// console.log(arrFarmName);

	  				$$.each(obj.data, function (index, value) {
				  		value.item_farm = value.farm_name;
				  		var curDateTime = getCurrentDate();
				  		arrCurDateTime = curDateTime.split(" ");
				  		curDate = arrCurDateTime[0];

				  		// value.id= id;
				  		// id++;

						var d1 = value.startHarvest.split("/");
						var d2 = value.finishHarvest.split("/");
						var c = curDate.split("/");

						var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
						var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
						var check = new Date(c[2], parseInt(c[1])-1, c[0]);

						console.log(check >= from && check <= to || check == from || check == to);

						value.ready_stock = check >= from && check <= to || check == from || check == to;

						if(value.item_type=="sembako"){
							value.quantity_kg = true;
							value.item_price_show = comma_digits(value.price_min);	
						}else{
							value.quantity_kg = false;
							value.item_price_show = comma_digits(value.price_min);	

						}

						//separate ready stock and not
						if(value.ready_stock){
							dataKirim.push({
								id: value.id,
		                        item_id: value.item_id,
		                        name: value.name,
		                        image: value.image,
		                        total: value.total,
		                        price: value.price_min,
		                        item_type: value.item_type,
		                        farm_name : value.farm_name,
		                        startHarvest: value.startHarvest,
		                        finishHarvest: value.finishHarvest,
		                        startPlan: value.startPlan,
		                        finishPlan: value.finishPlan,
		                        user_id: value.user_id,
		                        item_price_show : comma_digits(value.price_min),
				  				item_farm : value.farm_name,
				  				ready_stock : value.ready_stock,
				  				item_price_show : value.item_price_show,
				  				quantity_kg : value.quantity_kg,
				  				data_kirim : true,
				  				comodity_type : value.comodity_type
							})
						}else{
							dataPanen.push({
								id: value.id,
		                        item_id: value.item_id,
		                        name: value.name,
		                        image: value.image,
		                        total: value.total,
		                        price: value.price_min,
		                        item_type: value.item_type,
		                        farm_name : value.farm_name,
		                        startHarvest: value.startHarvest,
		                        finishHarvest: value.finishHarvest,
		                        startPlan: value.startPlan,
		                        finishPlan: value.finishPlan,
		                        user_id: value.user_id,
		                        item_price_show : comma_digits(value.price_min),	
				  				item_farm : value.farm_name,
				  				ready_stock : value.ready_stock,
				  				item_price_show : value.item_price_show,
				  				quantity_kg : value.quantity_kg,
				  				data_kirim : false,
				  				comodity_type : value.comodity_type
							})
						}

				  	})

					var objPanen = {data : dataPanen}; 
					var objKirim = {data : dataKirim}; 

					console.log(objPanen);
					console.log(objKirim);

			       	$$('#main_shop_grid_list').html(data);
			       	var template = $$('#item-grid-template').html();
			        // console.log(typeof template);
				    var compiledTemplate = Template7.compile(template);

				    var html = compiledTemplate(objKirim);
				  	$$('#main_shop_grid_list').html(html);

				  	//ext
				  	$$('#main_shop_grid_list_ext').html(data);
			       	var template2 = $$('#item-grid-template').html();
			        // console.log(typeof template);
				    var compiledTemplate2 = Template7.compile(template2);

				    var html2 = compiledTemplate2(objPanen);
				  	$$('#main_shop_grid_list_ext').html(html2);


				  	// $('.special-request').css("display", "none");

				  	// $('.special-request').on("change", function() {
				   //      var id = $(this).find('input[name=checkbox-special-request]').attr('id');
				   //      var checkboxId = $(this).find('input[name=checkbox-special-request]').val();
				   //      var startHarvest = $(this).data('startharvest');
				   //      var finishHarvest = $(this).data('finishharvest').replace(" ", "");
				   //     	console.log(startHarvest);
				   //     	console.log(finishHarvest);

				   //      if(document.getElementById(id).checked) {

				   //      	specialRequest = 1;

				   //      	myApp.alert('Masukan kuantitas barang dan tanggal pengiriman barang yang anda inginkan','Notifikasi');

				   //      	calendarDeliveryRange = myApp.calendar({
							//     input: '#delivery_time_shop_item_'+checkboxId,
							//     dateFormat: 'dd/mm/yyyy'
							// });

				   //      }else{

				   //      	specialRequest = 0;
				   //      	calendarDeliveryRange = myApp.calendar({
							//     input: '#delivery_time_shop_item_'+checkboxId,
							//     dateFormat: 'dd/mm/yyyy',
							//     disabled: function (date) {
								    
							// 	      // if(readyStock){

							// 	      // 	if ( (date.getDate() === today.getDate() && date.getDate() === today.getDate()+1 && date.getDate() === today.getDate()+2 ) &&  date.getFullYear() === today.getFullYear() && (date.getMonth() === today.getMonth() || date.getMonth() === oneMonthLater ))  {
							// 	      //       return false;
							// 	      //   }
							// 	      //   else {
							// 	      //       return true;
							// 	      //   }

							// 	      // }else{

							//       	if ( (date.getDate() >= 10 && date.getDate() <= 30) &&  date.getFullYear() === today.getFullYear() && (date.getMonth() === today.getMonth() || date.getMonth() === oneMonthLater ))  {
							//             return false;
							//         }
							//         else {
							//             return true;
							//         }

							// 	      // }
								        
							// 	    }
							// 	});
						
				        	
				   //      }

				   //  });


				  	$('.buy_btn').unbind('click').click(function(e){

				  		id = $(this).data('id');
				  		itemId = $(this).data('itemid');
				  		name = $(this).data('name');
				  		price = $(this).data('price');
				  		farm = $(this).data('farm');
				  		stock = $(this).data('stock');
				  		img = $(this).data('img');
				  		readyStock = $(this).data('ready');
				  		sellerId = $(this).data('sellerid');
				  		startHarvest = $(this).data('startharvest');
				  		finishHarvest = $(this).data('finishharvest');
				  		quantityKg = $(this).data('quantitylabel');

				  		console.log(stock);
				  		specialRequest = 0;

				  		$('#front_shop_'+id).css('position','absolute');

				  		//label quantity item (Kg, Gram)
				  		if(quantityKg){
				  			$('#quantity_label_'+id).css('margin-right','26%');
				  		}else{
				  			$('#quantity_label_'+id).css('margin-right','5%');
				  		}
				  		
				  		$('#back_shop_'+id).html(
				  			'<div class="card-footer" style="height: 0vh;padding:0px;">'+
	                               
	                            '<input class="item-title delivery-time-shop" id="delivery_time_'+id+'" type="text" placeholder="Delivery Date" style="width: 27vw;font-size: 13px;">'+
	                            '<a href="#" class="button button-small button-round close_quantity_shop_btn" data-id="'+id+'" >x</a>'+
	                            
	                          '</div>'+
	                          '<div class="card-footer" style="height: 0vh;padding:0px;">'+

	                          	'<input style="width:50%;margin-right: 4px;" id="total_'+id+'" type="text" value="0"> '+
	                            
	                            '<input style="display:none;" id="btn_inc_shop_'+id+'" value="'+specialRequest+'">'+
	                            	'<p class="buttons-row">'+
	                            	'<a class="button button-small button-round button-fill color-red btn-inc-shop-'+id+'" data-stock="'+stock+'" data-id="'+id+'" style="margin-left: 11px;">+</a>'+
									'<a class="button button-small button-round button-fill color-black btn-dec-shop" data-stock="'+stock+'" data-id="'+id+'">-</a>'+  
									'</p>'+   

	                          '</div>'+

	                          '<div class="card-footer" style="height: 0vh;padding:0px;">'+
	                            '<p style="width:100%;margin: 0 auto;">'+
	                              '<a href="#" class="button button-small button-fill color-green button-round add-to-cart-btn" data-id="'+id+'" data-quantitylabel="'+quantityKg+'" data-itemid="'+itemId+'" data-name="'+name+'" data-price="'+price+'" data-farm="'+farm+'" data-stock="'+stock+'" data-img="'+img+'" data-sellerid="'+sellerId+'" style="font-size:13px;"><span class="icon icon ion-ios-cart"></span> Tambahkan</a>'+
	                          	'</p>'+
	                          '</div>'

	                          );
						
						$('.flip-container-shop-'+id).toggleClass('flipped');

						var today = new Date();
						var weekLater = new Date().setDate(today.getDate() + 7);

						console.log(today.getMonth());
						var oneMonthLater = today.getMonth() + 1;

						calendarDeliveryRange = myApp.calendar({
							    input: '#delivery_time_'+id,
							    dateFormat: 'd/m/yyyy',
							    disabled: function (date) {
								// console.log(document.getElementById('btn_inc_shop_'+id).value);

								
								var d1 = startHarvest.split("/");
								var d2 = finishHarvest.split("/");

								var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
								var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
								var check = new Date(date.getFullYear(), parseInt(date.getMonth()), date.getDate());

								// console.log(check >= from && check <= to);

								if (document.getElementById('btn_inc_shop_'+id).value==0) {
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

						$('.delivery-time-shop').change(function(){
							// calendarDeliveryRange.destroy();
							myApp.closeModal('.picker-calendar');
						})

						addCartEvent();

						// $('.special-request').on("change", function() {
					 //        var id = $(this).find('input[name=checkbox-special-request]').attr('id');
					 //        var checkboxId = $(this).find('input[name=checkbox-special-request]').val();
					 //       	console.log(checkboxId);

					 //        if(document.getElementById(id).checked) {

					        	

					 //        }else{
							
					 //        	document.getElementById('total_'+id).value
					 //        }

					 //    });

						$('.btn-inc-shop-'+id).unbind('click').click(function(e){

							id = $(this).data('id');
							stock = $(this).data('stock');
							total = document.getElementById('total_'+id).value;
							specialRequest = document.getElementById('btn_inc_shop_'+id).value; 

							total++;

							console.log(quantityKg);

							// if(!quantityKg){
							// 	stock = stock * 4;
							// }

							// console.log(stock);
							// console.log(id);
							// console.log(document.getElementById('btn_inc_shop_'+id).value);

							// if(specialRequest==0){

							if(total > stock && specialRequest==0){
								myApp.confirm('Kuantitas telah mencapai batas, Apakah ingin memesan pesanan khusus?', 'Notifikasi', 
							    function () {
							        specialRequest = 1;
							       	document.getElementById('btn_inc_shop_'+id).value = specialRequest;
							       	document.getElementById('delivery_time_'+id).value = "";
							      },
							      function () {
							        specialRequest = 0;
							        document.getElementById('btn_inc_shop_'+id).value = specialRequest;
							      }
							    ); 

							    total = stock;
								document.getElementById('total_'+id).value = total;
						        
							}

							if(specialRequest==1){
								document.getElementById('btn_inc_shop_'+id).value = specialRequest;
							}else{
								document.getElementById('btn_inc_shop_'+id).value = specialRequest;
							}

							
							// }

							document.getElementById('total_'+id).value = total;

							e.stopPropagation();
					  		e.preventDefault();

						})

						$('.btn-dec-shop').unbind('click').click(function(e){

							id = $(this).data('id');
							stock = $(this).data('stock');
							total = document.getElementById('total_'+id).value;
							
							total--;
							if(total<0){
								total = 0;
							}

							if(total<=stock){
								document.getElementById('btn_inc_shop_'+id).value = 0;
							}else{
								document.getElementById('btn_inc_shop_'+id).value = 1;
								document.getElementById('delivery_time_'+id).value = "";
							}

							// console.log(stock);
							// console.log(id);
							// console.log(document.getElementById('btn_inc_shop_'+id).value);

							document.getElementById('total_'+id).value = total;

							e.stopPropagation();
					  		e.preventDefault();

						})

						$('.close_quantity_shop_btn').unbind('click').click(function(e){

							id = $(this).data('id');

							document.getElementById('btn_inc_shop_'+id).value = 0;

							calendarDeliveryRange.destroy();

							console.log(id);

							$('.flip-container-shop-'+id).toggleClass('flipped');
							$('#card_footer_btn_'+id).css('margin-right','12%');

					  		e.stopPropagation();
					  		e.preventDefault();
						})

				  	})


			  	


		  	},
		  	error : function(){ alert('error');	}
		});
	}

	function addCartEvent(){

				$('.add-to-cart-btn').unbind('click').click(function(e){
					showLoading();

					setTimeout(function(){
						hideLoading();
					   mainView.router.reloadPage('view/shop/main_shop.html?itemId='+itemIdSearch+'&type='+typeSearch+'&grade='+gradeSearch+'&quantity='+quantitySearch+'&price='+priceSearch);
				  	   
					}, 2000);

					calendarDeliveryRange.destroy();

					id = $(this).data('id');
					itemId = $(this).data('itemid');
					name = $(this).data('name');
			  		price = $(this).data('price');
			  		farm = $(this).data('farm');
			  		stock = $(this).data('stock');
			  		img = $(this).data('img');
			  		sellerId = $(this).data('sellerid');
			  		quantityKg = $(this).data('quantitylabel');
			  		total = document.getElementById('total_'+id).value;
			  		delivery_time = document.getElementById('delivery_time_'+id).value;
			  		specialRequest = document.getElementById('btn_inc_shop_'+id).value;

			  		console.log(total);
			  		console.log(delivery_time);
			  		console.log(name);
			  		console.log(price);
			  		console.log(farm);
			  		console.log(img);
			  		console.log(stock);
			  		console.log(specialRequest);
			  		console.log(quantityKg);

			  		var stockTmp = stock;

			  		// if(!quantityKg){
			  		// 	stock = stock * 4;
			  		// }

			  		if(specialRequest==0 && total > stock){
			  			myApp.alert("kuantitas melebihi batas, Apakah anda ingin melakukan pesanan khusus?","notifikasi");
			  			document.getElementById('total_'+id).value = 0;
			  		}else{

						//UPDATE STOK COMODITY SHOP
						if(specialRequest!=1){
							updateTotalComodityByUserId(id,total,"decrease",quantityKg);
						}

						var stockCal = 0;

						// if(!quantityKg){
						// 	stockTmp = stockTmp * 1000;
						// 	totalTmp = total * 250;
						// 	stockCal = (stockTmp - totalTmp)/1000;
						// }else{

							//update max stock item quantity
							stockCal = stock - total;
						// }
						
						
						//INSERT TO CART
				  		cartItem(id,name,sellerId,farm,img,price,total,stockCal,quantityKg,delivery_time,specialRequest);

						$('.flip-container-shop-'+id).toggleClass('flipped');

						$('#card_footer_btn_'+id).css('margin-right','12%');

				  		e.stopPropagation();
				  		e.preventDefault();

				  		console.log(name);
				  		
				  		var cart = $('.cart-total');

				        // var imgtodrag = [].slice.call(document.getElementById('card-grid-shop').getElementsByClassName('card-main-shop') );
				        // console.log($(this).parents().find('img'));
				        var imgtodrag = $(this).parents().find('img').closest('#img_shop_'+id);
				        var $flyerClone = $(imgtodrag).clone();

				        flyToElement($(imgtodrag), cart, id, $flyerClone, $(this),itemId);

				        if ($flyerClone.is(":animated")) {
						    console.log("animated");
						    $(this).off('click');
						 }

						
				        console.log(imgtodrag);

			  		}

			  		

			  	}).dblclick(function(e){

					  /**
					   * Prevent double-click in case of fast animation or sloppy browser.
					   */
					  console.log("double-clicked but did nothing");
					 
					  e.stopPropagation();
					  e.preventDefault();
					  return false;
					});
	}

	function flyToElement(flyer, flyingTo, id, flyerClone, obj, itemId) {
	    var $func = $(this);
	    var divider = 3;

	    $(flyerClone).css({position: 'absolute',width: '50%', top: $(flyer).offset().top + "px", left: $(flyer).offset().left + "px", opacity: 1, 'z-index': 1000});
	    $('.pages').append($(flyerClone));

	    var gotoX = $(flyingTo).offset().left + ($(flyingTo).width() / 2) - ($(flyer).width()/divider)/2;
	    var gotoY = $(flyingTo).offset().top + ($(flyingTo).height() / 2) - ($(flyer).height()/divider)/2;
	    
	    var ane = false;

	    $(flyerClone).velocity({
	        opacity: 0.4,
	        left: gotoX,
	        top: gotoY,
	        queue: false,
	        width: $(flyer).width()/divider,
	        height: $(flyer).height()/divider
	    }, 500,
	    function () {

	    	ane = true;
	        if(!$(this).is('animated')){

	        	$(flyerClone).remove();
	        	console.log('done animation');
	        	// counterCart++;

	        	getAllCart();

				setTimeout(function(){
					console.log(Template7.global.lengthCart);
					if(Template7.global.lengthCart>0){
						$('.cart-total').html(Template7.global.lengthCart);
						counterCart = Template7.global.lengthCart;
						console.log(Template7.global.arrDataCart);
					}else{
						counterCart = 0;
					}

				}, 300);
	        	flyingTo.html(counterCart);
	            obj.on('click',addCartEvent);
	        }

	        $(flyingTo).fadeOut('fast', function () {
	            $(flyingTo).fadeIn('fast', function () {
	                $(flyerClone).fadeOut('fast', function () {
	                    $(flyerClone).remove();
	                    console.log(flyerClone);

	                    
	                    
	                });
	            });
	        });
	        

	    });

	}


	function loadWidgetShopItem(dataObject,name,image,arrFarmName,id){
		$$.ajax({
		  	url: 'view/widget/popup_shop_item.html',
		  	statusCode: {
		    	404: function (xhr) { alert('page not found'); }
		  	},
		  	beforeSend : function(){   showLoading();  },
		  	success : function(data){

		  		console.log(id);

				var obj = {data : dataObject,name : name,image : image, id : id};
				console.log(obj);

				$$.each(obj.data, function (index, value) {
			  		value.item_price_show = "Rp "+comma_digits(value.price)+" /Kg";	
			  		value.farm_name = arrFarmName[index];

			  		var curDateTime = getCurrentDate();
			  		arrCurDateTime = curDateTime.split(" ");
			  		curDate = arrCurDateTime[0];


					var d1 = value.startHarvest.split("/");
					var d2 = value.finishHarvest.split("/");
					var c = curDate.split("/");

					var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
					var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
					var check = new Date(c[2], parseInt(c[1])-1, c[0]);

					console.log(check >= from && check <= to || check == from || check == to);

					value.ready_stock = check >= from && check <= to || check == from || check == to;

			  		if(index == 0){
			  			value.checked = true;
			  		}
			  	})
				
			    first_load = true;
		       	hideLoading();
		       	$$('#main_shop_item_list').html(data);
		       	var template = $$('#shop-item-template').html();
		        // console.log(typeof template);
			    var compiledTemplate = Template7.compile(template);

			    var html = compiledTemplate(obj);
			  	$$('#main_shop_item_list').html(html);


			  	var specialRequest = 0;

			  	var today = new Date();
				var weekLater = new Date().setDate(today.getDate() + 7);

				console.log(today.getMonth());
				var oneMonthLater = today.getMonth() + 1;

		      	var day = today.getDay();
		      	console.log(getDayName(day));

				calendarDeliveryRange = myApp.calendar({
				    input: '#delivery_time_shop_item_'+id,
				    dateFormat: 'dd/mm/yyyy',
				    disabled: function (date) {

					    
					      // if(readyStock){

					      // 	if ( (date.getDate() === today.getDate() && date.getDate() === today.getDate()+1 && date.getDate() === today.getDate()+2 ) &&  date.getFullYear() === today.getFullYear() && (date.getMonth() === today.getMonth() || date.getMonth() === oneMonthLater ))  {
					      //       return false;
					      //   }
					      //   else {
					      //       return true;
					      //   }

					      // }else{	

				      	if ( (date.getDate() >= 10 && date.getDate() <= 30) &&  date.getFullYear() === today.getFullYear() && (date.getMonth() === today.getMonth() || date.getMonth() === oneMonthLater ))  {
				            return false;
				        }
				        else {
				            return true;
				        }

					      // }
					        
					    }
					});

					$('.delivery-time-shop-item').change(function(){

						myApp.closeModal('.picker-calendar');
					})

					// addCartEvent();

					$('.inc-shop-item-qty').unbind('click').click(function(e){

							id = $(this).data('id');
							total = document.getElementById('total_shop_item_'+id).value;
							stringFarm = $('input[name=my-radio-shop-item]:checked').val();
							var arrStringFarm = stringFarm.split('_');
							totalMax = arrStringFarm[1];

							total++;

							if(total > totalMax){
								myApp.alert("kuantitas melebihi jumlah stock, pilih <b>Special Request</b> untuk kuantitas tanpa batas", 'Notifikasi');
								total = totalMax;
							}
							
							document.getElementById('total_shop_item_'+id).value = total;

							e.stopPropagation();
					  		e.preventDefault();

						})

					$('.dec-shop-item-qty').unbind('click').click(function(e){

						id = $(this).data('id');
						total = document.getElementById('total_shop_item_'+id).value;
						
						total--;
						if(total<0){
							total = 0;
						}
						document.getElementById('total_shop_item_'+id).value = total;

						e.stopPropagation();
				  		e.preventDefault();

					})


			  	$('.submit-shop-item').click(function(){

			  		id = $(this).data('id');
			  		name = $(this).data('name');
			  		image = $(this).data('image');

			  		myApp.closeModal('.popup-shop-item');
			  		console.log($('input[name=my-radio-shop-item]:checked').val());

					calendarDeliveryRange.destroy();

					var stringFarm = $('input[name=my-radio-shop-item]:checked').val();

					var arrStringFarm = stringFarm.split('_');

			  		price = arrStringFarm[2];
			  		farm = arrStringFarm[0];
			  		stock = arrStringFarm[1];
			  		sellerId = arrStringFarm[3];
			  		total = document.getElementById('total_shop_item_'+id).value;
			  		delivery_time = document.getElementById('delivery_time_shop_item_'+id).value;

			  		console.log(total);
			  		console.log(sellerId);
			  		console.log(delivery_time);
			  		console.log(name);
			  		console.log(price);
			  		console.log(farm);
			  		console.log(image);
			  		console.log(stock);
			  		console.log(id);

			  		console.log(specialRequest);

			  		//INSERT TO CART
			  		cartItem(id,name,sellerId,farm,image,price,total,stock,"Kg",delivery_time,specialRequest);

			  		mainView.router.reloadPage('view/shop/main_shop.html');

			  		Template7.global.arrFarmName = [];

			  		closeStatus = false;
			  		
			  	})


			  	$('.cancel-shop-item').click(function(){
			  		closeStatus = true;
			  		Template7.global.arrFarmName = [];
			  		calendarDeliveryRange.destroy();
			  	})


			  	 $('.special-request').on("change", function() {
			        var id = $(this).find('input[name=checkbox-special-request]').attr('id');
			        var checkboxId = $(this).find('input[name=checkbox-special-request]').val();
			       	console.log(checkboxId);

			        if(document.getElementById(id).checked) {

			        	specialRequest = 1;

			        	myApp.alert('Masukan kuantitas barang dan tanggal pengiriman barang yang anda inginkan','Notifikasi');
			        
			        	$('.inc-shop-item-qty').unbind('click').click(function(e){

							id = $(this).data('id');
							total = document.getElementById('total_shop_item_'+id).value;

							
							total++;

							// if(total > totalMax){
							// 	myApp.alert("kuantitas melebihi jumlah stock", 'Notifikasi');

							// 	total = totalMax;
							// }
							
							document.getElementById('total_shop_item_'+id).value = total;

							e.stopPropagation();
					  		e.preventDefault();

						})

			        	calendarDeliveryRange = myApp.calendar({
						    input: '#delivery_time_shop_item_'+checkboxId,
						    dateFormat: 'dd/mm/yyyy'
						});

			        }else{

			        	specialRequest = 0;

			        	calendarDeliveryRange = myApp.calendar({
					    input: '#delivery_time_shop_item_'+checkboxId,
					    dateFormat: 'dd/mm/yyyy',
					    disabled: function (date) {

						    
						      // if(readyStock){

						      // 	if ( (date.getDate() === today.getDate() && date.getDate() === today.getDate()+1 && date.getDate() === today.getDate()+2 ) &&  date.getFullYear() === today.getFullYear() && (date.getMonth() === today.getMonth() || date.getMonth() === oneMonthLater ))  {
						      //       return false;
						      //   }
						      //   else {
						      //       return true;
						      //   }

						      // }else{

					      	if ( (date.getDate() >= 10 && date.getDate() <= 30) &&  date.getFullYear() === today.getFullYear() && (date.getMonth() === today.getMonth() || date.getMonth() === oneMonthLater ))  {
					            return false;
					        }
					        else {
					            return true;
					        }

						      // }
						        
						    }
						});

						document.getElementById('total_shop_item_'+checkboxId).value = 0;

						$('.inc-shop-item-qty').unbind('click').click(function(e){

							id = $(this).data('id');
							total = document.getElementById('total_shop_item_'+id).value;
							stringFarm = $('input[name=my-radio-shop-item]:checked').val();
							var arrStringFarm = stringFarm.split('_');
							totalMax = arrStringFarm[1];
							
							total++;

							if(total > totalMax){
								myApp.alert("kuantitas melebihi jumlah stock, pilih <b>Special Request</b> untuk kuantitas tanpa batas", 'Notifikasi');

								total = totalMax;
							}
							
							document.getElementById('total_shop_item_'+id).value = total;

							e.stopPropagation();
					  		e.preventDefault();

						})

			        }

			    });

			 },
		  	error : function(){ alert('error');	}
		});
	}

});