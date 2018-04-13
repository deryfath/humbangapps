myApp.onPageInit('purchase_coffee', function (page) {

	Template7.global.backDataChooseVendor = [];

	var location = page.query.location;
	var productId = page.query.product_id;
	var productName = page.query.product_name;
	var productType = page.query.product_type;
	var vendorId = page.query.vendor_id;
	var vendorName = page.query.vendor_name;
	var partner = page.query.partner;

	$('#title_purchase').text(productName);

	Template7.global.backDataChooseVendor.push({

		product_name : productName,
		product_id : productId,
		location : location,
		product_type : productType
	})
	
	$('.back').click(function(){

		mainView.router.back({
			url : 'view/seller/choose_vendor.html?name='+productType+'&product_name='+productName+'&product_id='+productId+'&vendor_location='+location,
			force : true,
			reload : true
		});
	})

	getSession();
	showLoading();

	setTimeout(function() {

		hideLoading();

		document.getElementById('vendor_purchase_coffee').value = vendorName;
		document.getElementById('comodity_purchase_coffee').value = productType;
		document.getElementById('total_final_purchase_coffee').value = "Rp 0";


		//setup before functions
		var typingTimer;                //timer identifier
		var doneTypingInterval = 100;  //time in ms, 5 second for example
		var $inputPrice = $('#price_purchase_coffee');
		var $inputQuantity = $('#quantity_purchase_coffee');

		$('#date_purchase_coffee').on('click',function(){

			$('.purchase-coffee-input').css('border-color','#a6a9b0');
			$('.purchase-coffee-input').css('border-width','medium');
			$(this).css('border-color','#2182c5');
			$(this).css('border-width','medium');
		})

		var now = new Date();

		document.getElementById('date_purchase_coffee').value = now.getDate()+"/"+(now.getMonth()+1)+"/"+now.getFullYear();

		var calendarPurchase = myApp.calendar({
		    input: '#date_purchase_coffee',
		    dateFormat: 'd/m/yyyy',
		    toolbarTemplate: '<div class="toolbar">' + '<div class="toolbar-inner">' + '{{monthPicker}}' + '{{yearPicker}}' + '<a href="#" class="link close-picker">{{closeText}}</a>' + '</div>' + '</div>',
		    rangePicker: false
		});

		$inputPrice.on('click',function(){

			$('.purchase-coffee-input').css('border-color','#a6a9b0');
			$('.purchase-coffee-input').css('border-width','medium');
			$(this).css('border-color','#2182c5');
			$(this).css('border-width','medium');
		})

		//on keyup, start the countdown
		$inputPrice.on('keyup', function () {
		  clearTimeout(typingTimer);
		  typingTimer = setTimeout(doneTyping, doneTypingInterval);
		});

		//on keydown, clear the countdown 
		$inputPrice.on('keydown', function () {
		  clearTimeout(typingTimer);
		});


		$inputQuantity.on('click',function(){

			$('.purchase-coffee-input').css('border-color','#a6a9b0');
			$('.purchase-coffee-input').css('border-width','medium');
			$(this).css('border-color','#2182c5');
			$(this).css('border-width','medium');
		})

		//on keyup, start the countdown
		$inputQuantity.on('keyup', function () {
		  clearTimeout(typingTimer);
		  typingTimer = setTimeout(doneTyping, doneTypingInterval);
		});

		//on keydown, clear the countdown 
		$inputQuantity.on('keydown', function () {
		  clearTimeout(typingTimer);
		});


		//user is "finished typing," do something
		function doneTyping () {
		  	
		  	quantity = parseInt(document.getElementById('quantity_purchase_coffee').value);
		  	price = parseInt(document.getElementById('price_purchase_coffee').value);

		  	totalPrice = price * quantity;

		  	console.log(totalPrice);

		  	document.getElementById('total_final_purchase_coffee').value = "Rp "+comma_digits(totalPrice);
		  
		}

		$('#confirm_purchase_coffee').unbind('click').click(function(){

			if(document.getElementById('quantity_purchase_coffee').value==""||document.getElementById('price_purchase_coffee').value==""){

				myApp.alert("Harga dan Kuantitas tidak boleh bernilai 0","Notifikasi");

			}else{

				calendarPurchase.destroy();


				showLoading();
		          setTimeout(function(){

		          	$('.purchase-coffee-input').css('border-color','#a6a9b0');
					$('.purchase-coffee-input').css('border-width','medium');

		          	quantity = parseInt(document.getElementById('quantity_purchase_coffee').value);
		          	price = parseInt(document.getElementById('price_purchase_coffee').value);

			  		totalPrice = price * quantity;

		            arrProduct = [];
		            arrProduct.push({
		              partner_id:parseInt(partner),
		              product_id:productId,
		              name:productName,
		              price:price,
		              quantity:document.getElementById('quantity_purchase_coffee').value,
		              vendor_name:vendorId+","+vendorName,
		              subtotal:totalPrice,
		              quality:1,
		              comment:"",
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

		                  //set global var summary
		                  Template7.global.summaryPurchase = {
			                vendor_name:vendorName,
			                product_name:productName+" "+productType,
			                price:price,
			                quantity:document.getElementById('quantity_purchase_coffee').value,
			                subtotal:totalPrice
			              }

		                 console.log(data[0]);
		                 console.log(data[1][0]);

		                  hideLoading();
		                  mainView.router.load({
		                    url : 'view/seller/purchase_review.html?purchase_id='+data[0]+'&purchase_line_id='+data[1][0]+'&vendor_name='+vendorName+'&product_type='+productType+'&price='+price+'&quantity='+quantity+'&total='+totalPrice
		                  });


		                }
		            });

		          }, 1000)

			}

			
		})

	}, 1000);

	

})