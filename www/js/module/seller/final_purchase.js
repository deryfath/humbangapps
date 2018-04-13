myApp.onPageInit('final_purchase', function (page) {


	var location = page.query.vendor_location;
	var productId = page.query.product_id;
	var productName = page.query.product_name;
	var productType = page.query.product_type;
	var vendorId = page.query.vendor_id;
	var vendorName = page.query.vendor_name;
	var partner = page.query.partner;
	var avWater = page.query.av_water;
	var damageComodity = page.query.damage_comodity;
	var price = page.query.price;

	console.log(avWater);

	$('.back').click(function(){

		$('#tabbar_home').css("display","none");

		mainView.router.back({
			url : 'view/seller/purchase.html'
		});
	})

	$('.toolbar-inner-home').html('<a href="#" id="confirm_purchase" style="margin: 0 auto;"><i class="icon f7-icons" style="color: #cedcde;margin:1px;">check_round_fill</i><span class="tabbar-label" style="color: white;">KONFIRMASI</span></a>');

	$('#tabbar_home').css("display","block");

	getSession();
	showLoading();
	setTimeout(function() {

		hideLoading();

		//RATING
	    var stars = $('#stars li').parent().children('li.star');

	    for (i = 0; i < stars.length; i++) {
	      $(stars[i]).removeClass('selected');
	    }

	    ratingStarEvent();

		document.getElementById('vendor_final_purchase').value = vendorName;
		document.getElementById('comodity_final_purchase').value = productName+" "+productType;
		document.getElementById('average_final_purchase').value = parseFloat(avWater).toFixed(2) +"%";
		document.getElementById('damage_final_purchase').value = damageComodity+"%";
		document.getElementById('price_final_purchase').value = "Rp "+comma_digits(price);
		document.getElementById('total_final_purchase').value = "Rp 0";

		//setup before functions
		var typingTimer;                //timer identifier
		var doneTypingInterval = 100;  //time in ms, 5 second for example
		var $input = $('#quantity_final_purchase');

		$input.on('click',function(){

			$(this).css('border-color','#2182c5');
			$(this).css('border-width','medium');
		})

		//on keyup, start the countdown
		$input.on('keyup', function () {
		  clearTimeout(typingTimer);
		  typingTimer = setTimeout(doneTyping, doneTypingInterval);
		});

		//on keydown, clear the countdown 
		$input.on('keydown', function () {
		  clearTimeout(typingTimer);
		});

		//user is "finished typing," do something
		function doneTyping () {
		  	
		  	quantity = parseInt(document.getElementById('quantity_final_purchase').value);

		  	totalPrice = price * quantity;

		  	console.log(totalPrice);

		  	document.getElementById('total_final_purchase').value = "Rp "+comma_digits(totalPrice);
		  
		}

		$('#confirm_purchase').unbind('click').click(function(){

			  if (document.getElementById('quantity_final_purchase').value=="") {
			  	 
			  	 myApp.alert("Kuantitas Tidak boleh Kosong","Notifikasi");

			  }else{

			  	 showLoading();
		          setTimeout(function(){

		          	$('#quantity_final_purchase').css('border-color','#a6a9b0');
					$('#quantity_final_purchase').css('border-width','medium');

		          	quantity = parseInt(document.getElementById('quantity_final_purchase').value);
		          	var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
		          	var comment = document.getElementById('comment_purchase').value;

			  		totalPrice = price * quantity;

		            arrProduct = [];
		            arrProduct.push({
		              partner_id:parseInt(partner),
		              product_id:productId,
		              name:productName,
		              price:price,
		              quantity:document.getElementById('quantity_final_purchase').value,
		              vendor_name:vendorId+","+vendorName,
		              subtotal:totalPrice,
		              quality:ratingValue,
		              comment:comment,
		              agent:Template7.global.userdata.id,
		              barcode:null,
		              location:location
		            })

		            console.log(arrProduct);

		            var newDateTimeOrder = new Date();
		            var newDateTimePayment = new Date();

		            console.log(newDateTimeOrder);

		            arrDataExt = [];
		            arrDataExt.push({
		              barcode : null,
		              location : location
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
		                dataType:"json",
		                success: function(data){

		                 console.log(data);

		                 //set global var summary
		                  Template7.global.summaryPurchase = {
			                vendor_name:vendorName,
			                product_name:productName+" "+productType,
			                price:price,
			                quantity:document.getElementById('quantity_final_purchase').value,
			                subtotal:totalPrice
			              }

		                 $('.toolbar-inner-home').html('');

						 $('#tabbar_home').css("display","none");	

		                  hideLoading();
		                  mainView.router.load({
		                    url : 'view/seller/payment.html?purchase_id='+data[0]+'&purchase_line_id='+data[1][0]
		                  });

		                  

		                }
		            });

		           

		            

		            

		          }, 1000)

			  }
	         


	          
	    })	

	}, 1000);

	

})
