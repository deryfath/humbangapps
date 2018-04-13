myApp.onPageInit('purchase', function (page) {

	Template7.global.backDataChooseVendor = [];

	var location = page.query.location;
	var productId = page.query.product_id;
	var productName = page.query.product_name;
	var productType = page.query.product_type;
	var vendorId = page.query.vendor_id;
	var vendorName = page.query.vendor_name;
	var partner = page.query.partner;

	document.getElementById('vendor_purchase').value = vendorName;
	document.getElementById('comodity_purchase').value = productName+" "+productType;

	console.log(location);
	console.log(productId);
	console.log(productName);
	console.log(vendorId);
	console.log(vendorName);
	console.log(partner);

	Template7.global.backDataChooseVendor.push({

		product_name : productName,
		product_id : productId,
		location : location,
		product_type : productType

	})

	console.log(Template7.global.backDataChooseVendor);


	$('.back').click(function(){

		mainView.router.back({
			url : 'view/seller/choose_vendor.html?name='+productType+'&product_name='+productName+'&product_id='+productId+'&vendor_location='+location,
			force : true,
			reload : true
		});
	})

	$('#water_av1').keyup(function(){

		$('#div_watAv1').css('display','block');


	})

	$('#water_av2').keyup(function(){

		$('#div_watAv2').css('display','block');

	})

	$('#water_av3').keyup(function(){

		$('#div_watAv3').css('display','block');

	})

	$('#water_av1').click(function(){

		$('.water-input').css('border-color','#a6a9b0');
		$('.water-input').css('border-width','medium');
		$(this).css('border-color','#2182c5');
		$(this).css('border-width','medium');
	})

	$('#water_av2').click(function(){

		$('.water-input').css('border-color','#a6a9b0');
		$('.water-input').css('border-width','medium');
		$(this).css('border-color','#2182c5');
		$(this).css('border-width','medium');
	})

	$('#water_av3').click(function(){

		$('.water-input').css('border-color','#a6a9b0');
		$('.water-input').css('border-width','medium');
		$(this).css('border-color','#2182c5');
		$(this).css('border-width','medium');
	})

	$('#count_price').click(function(){

		$('.water-input').css('border-color','#a6a9b0');
		$('.water-input').css('border-width','medium');

		var watAv1 = document.getElementById('water_av1').value;
		var watAv2 = document.getElementById('water_av2').value;
		var watAv3 = document.getElementById('water_av3').value;

		if(watAv1=="" || watAv2=="" || watAv3==""){
			myApp.alert("field tidak boleh kosong", "notifikasi");
		}else{
			var totalAv = (parseFloat(watAv1) + parseFloat(watAv2) + parseFloat(watAv3))/3;

			if (totalAv > 30) {
				
				myApp.alert("Rata-rata kadar air tidak boleh melebihi 30%","notifikasi");
				$('#count_result_div').css('display','none');
			}else{

				var price = priceCalculation(totalAv.toFixed(2));
				$('#count_result_div').css('display','block');
				document.getElementById('average_water').value = totalAv.toFixed(2)+" %";
				document.getElementById('price_product').value = "Rp "+ comma_digits(price.toString());
				document.getElementById('price_product_discount').value = "Rp "+ comma_digits(price.toString());
				document.getElementById('damage_comodity').value = 0;

			}


			
		}

		

	})

	$('.inc-comodity-qty').click(function(){
		var count = parseInt(document.getElementById('damage_comodity').value);

		count++;

		if(count>5){
			myApp.alert("Kerusakan Tidak Boleh Melebihi 5%","Notifikasi");
			count = 5;
		}

		priceString = document.getElementById('price_product').value.replace(",","").split(" ");
		var realPrice = parseInt(priceString[1]);

		var discPrice = (count/100)*realPrice;

		priceTotal = realPrice - parseInt(discPrice);

		document.getElementById('price_product_discount').value = "Rp "+comma_digits(priceTotal);  

		document.getElementById('damage_comodity').value = count;



	})

	$('.dec-comodity-qty').click(function(){

		var count = parseInt(document.getElementById('damage_comodity').value);

		count--;

		if(count<0){
			count = 0;
		}

		priceString = document.getElementById('price_product').value.replace(",","").split(" ");
		var realPrice = parseInt(priceString[1]);

		var discPrice = (count/100)*realPrice;

		priceTotal = realPrice - parseInt(discPrice);

		document.getElementById('price_product_discount').value = "Rp "+comma_digits(priceTotal);

		document.getElementById('damage_comodity').value = count;



	})

	$('#continue_purchase').click(function(){

		avWater = parseFloat(document.getElementById('average_water').value);

		if(avWater > 30){
			myApp.alert("Rata-rata kadar air tidak boleh melebihi 30%","notifikasi");
		}else{

			damageComodity = document.getElementById('damage_comodity').value;
			discPrice = document.getElementById('price_product_discount').value.replace(",","").split(" ");

			mainView.router.load({
				url : 'view/seller/final_purchase.html?price='+discPrice[1]+'&damage_comodity='+damageComodity+'&av_water='+avWater+'&vendor_id='+vendorId+'&vendor_name='+vendorName+'&partner='+partner+'&product_name='+productName+'&product_id='+productId+'&vendor_location='+location+'&product_type='+productType,
				animatePages: true
			});
		}

	})

	function priceCalculation(water){
	    
	    price = 0;

	     if (water <=15.00) {
	       price = 3100;
	     }else if( water>=15.01 && water <=15.50){
	       price = 3075;
	     }else if( water>=15.51 && water <=16.00){
	       price = 3050;
	     }else if( water>=16.01 && water <=16.50){
	       price = 3025;
	     }else if( water>=16.51 && water <=17.00){
	       price = 3000;
	     }else if( water>=17.01 && water <=17.50){
	       price = 2975;
	     }else if( water>=17.51 && water <=18.00){
	       price = 2950;
	     }else if( water>=18.01 && water <=18.50 ){
	       price = 2925;
	     }else if( water>=18.51 && water <=19.00 ){
	       price = 2900;
	     }else if( water>=19.01 && water <=19.50 ){
	       price = 2875;
	     }else if( water>=19.51 && water <=20.00 ){
	       price = 2850;
	     }else if( water>=20.01 && water <=20.50){
	       price = 2825;
	     }else if( water>=20.51 && water <=21.00 ){
	       price = 2800;
	     }else if( water>=21.01 && water <=21.50){
	       price = 2775;
	     }else if( water>=21.51 && water <=22.00 ){
	       price = 2750;
	     }else if( water>=22.01 && water <=22.50 ){
	       price = 2725;
	     }else if( water>=22.51 && water <=23.00 ){
	       price = 2700;
	     }else if( water>=23.01 && water <=23.50){
	       price = 2675;
	     }else if( water>=23.51 && water <=24.00 ){
	       price = 2650;
	     }else if( water>=24.01 && water <=24.50 ){
	       price = 2625;
	     }else if( water>=24.51 && water <=25.00 ){
	       price = 2600;
	     }else if( water>=25.01 && water <=25.50 ){
	       price = 2575;
	     }else if( water>=25.51 && water <=26.00 ){
	       price = 2550;
	     }else if( water>=26.01 && water <=26.50 ){
	       price = 2525;
	     }else if( water>=26.51 && water <=27.00 ){
	       price = 2500;
	     }else if( water>=27.01 && water <=27.50 ){
	       price = 2475;
	     }else if( water>=27.51 && water <=28.00 ){
	       price = 2450;
	     }else{
	       price = 3100;
	     }

	     return price;

  	}



})