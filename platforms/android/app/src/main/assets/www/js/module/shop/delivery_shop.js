myApp.onPageInit('delivery_shop_list', function (page) {

	$('#tabbar_home').css("display","block");

	$('.toolbar-inner-home').html('<a href="#" class="submit-delivery-shop" style="margin: 0 auto;"><i class="icon f7-icons" style="color: #143b41;">check_round_fill</i><span class="tabbar-label" style="font-size: small;font-weight: bold;">Konfirmasi</span></a>');


	$('.back').click(function(){

		mainView.router.back({url : 'index.html'});
    $('.toolbar-inner-home').html('');
	})

	showLoading();
	setTimeout(function(){

		hideLoading();

    var dataSplitArr = page.query.vendorId.split("-")
    var partnerId = dataSplitArr[1];
    var vendorId = dataSplitArr[0];
    var vendorName = page.query.vendorName;
    var quant = page.query.quant;
    var water = page.query.water;
    var cpi = page.query.cpi;
    console.log(vendorId);

    $('#vendor_comodity_review').text("Vendor : "+vendorName);
		$('#water_comodity_review').text("Kadar Air : "+water+"%");
		$('#cpi_comodity_review').text("CPI : "+cpi+"%");
		$('#quantity_comodity_review').text(quant);
		

    var price = priceCalculation(water,cpi);

    $('#price_comodity_review').text("Harga : Rp "+comma_digits(price.toString()));

    var total = price*parseInt(quant);
    $('#total_price_comodity').text("Rp "+comma_digits(total.toString()));

    console.log(price);


    $('.submit-delivery-shop').unbind('click').click(function(){

          showLoading();
          setTimeout(function(){

            arrProduct = [];
            arrProduct.push({
              partner_id:parseInt(partnerId),
              product_id:9,
              name:"Jagung",
              price:price,
              quantity:$('#quantity_comodity_review').text(),
              vendor_name:vendorId+","+page.query.vendorName,
              subtotal:total,
              quality:1,
              barcode:null,
              location:null
            })

            console.log(arrProduct);

            var newDateTimeOrder = new Date();
            var newDateTimePayment = new Date();

            console.log(newDateTimeOrder);

            arrDataExt = [];
            arrDataExt.push({
              barcode : null,
              location : null
            })

            var dataSend = {
                   arr_product : arrProduct,
                   date_order : newDateTimeOrder,
                   date_payment : newDateTimePayment,
                   arr_product_ext : arrDataExt
              } 

              console.log(dataSend);

          $.ajax({
                type: "POST",
                url: "http://plantera.iotera.io/purchase.php",
                data: dataSend,
                success: function(data){

                 console.log(data);

                  hideLoading();
                  mainView.router.load({
                    url : 'view/shop/order_final_shop.html'
                  });
                }
            });

           

            

            

          }, 1000)


          
        })

	}, 1000);

  function comma_digits(text_number){ 
    if(typeof text_number == 'number'){
        text_number = text_number.toString();
    }    
    return  text_number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"); 
}

  function priceCalculation(water,cpi){

    water = parseFloat(water);

    if (cpi!=null) {
      cpi = parseFloat(cpi);
    }else{
      cpi = 0;
    }
    

    price = 0;

     if (water <=15.00 && cpi==0) {
       price = 3100;
     }else if( (water>=15.01 && water <=15.50) && cpi==0.80 ){
       price = 3075;
     }else if( (water>=15.51 && water <=16.00) && cpi==1.60 ){
       price = 3050;
     }else if( (water>=16.01 && water <=16.50) && cpi==2.40 ){
       price = 3025;
     }else if( (water>=16.51 && water <=17.00) && cpi==3.20 ){
       price = 3000;
     }else if( (water>=17.01 && water <=17.50) && cpi==4.00 ){
       price = 2975;
     }else if( (water>=17.51 && water <=18.00) && cpi==4.80 ){
       price = 2950;
     }else if( (water>=18.01 && water <=18.50) && cpi==5.60 ){
       price = 2925;
     }else if( (water>=18.51 && water <=19.00) && cpi==6.40 ){
       price = 2900;
     }else if( (water>=19.01 && water <=19.50) && cpi==7.20 ){
       price = 2875;
     }else if( (water>=19.51 && water <=20.00) && cpi==8.00 ){
       price = 2850;
     }else if( (water>=20.01 && water <=20.50) && cpi==8.80 ){
       price = 2825;
     }else if( (water>=20.51 && water <=21.00) && cpi==9.60 ){
       price = 2800;
     }else if( (water>=21.01 && water <=21.50) && cpi==10.40 ){
       price = 2775;
     }else if( (water>=21.51 && water <=22.00) && cpi==11.20 ){
       price = 2750;
     }else if( (water>=22.01 && water <=22.50) && cpi==12.00 ){
       price = 2725;
     }else if( (water>=22.51 && water <=23.00) && cpi==12.80 ){
       price = 2700;
     }else if( (water>=23.01 && water <=23.50) && cpi==13.60 ){
       price = 2675;
     }else if( (water>=23.51 && water <=24.00) && cpi==14.40 ){
       price = 2650;
     }else if( (water>=24.01 && water <=24.50) && cpi==15.20 ){
       price = 2625;
     }else if( (water>=24.51 && water <=25.00) && cpi==16.00 ){
       price = 2600;
     }else if( (water>=25.01 && water <=25.50) && cpi==16.80 ){
       price = 2575;
     }else if( (water>=25.51 && water <=26.00) && cpi==17.60 ){
       price = 2550;
     }else if( (water>=26.01 && water <=26.50) && cpi==18.40 ){
       price = 2525;
     }else if( (water>=26.51 && water <=27.00) && cpi==19.20 ){
       price = 2500;
     }else if( (water>=27.01 && water <=27.50) && cpi==20.00 ){
       price = 2475;
     }else if( (water>=27.51 && water <=28.00) && cpi==20.80 ){
       price = 2450;
     }else{
       price = 3100;
     }

     return price;

  }
	


	
})
