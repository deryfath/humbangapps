myApp.onPageInit('choose_vendor', function (page) {

	var location = page.query.vendor_location;
	var productId = page.query.product_id;
	var productName = page.query.product_name;
	var comodityName = page.query.name;

	Template7.global.backDataChooseComodity.push({

		location : location,
		
	})

	$('.back').click(function(){
		mainView.router.back({
			url : 'view/seller/purchase_comodity.html?location='+location,
			force : true,
			reload : true
		});
	})

	console.log(comodityName);

	var searchstring = "";
	var mySearchbar = myApp.searchbar('.searchbar-vendor', {
	    searchList: '.list-block-search',
	    searchIn: '.item-title,.vendor-phone'
	}); 

  	$(document).ready(function(){
	   $('#search_vendor').keyup(function(){

			var elem = $('#card-comodity-purchase-vendor > .vendor-purchase').find('.item-content');
			// console.log(elem.text());

			elem.each(function(){
				if($(this).hasClass('hidden-by-searchbar')){
					$(this).parentsUntil('.vendor-purchase').hide();
				}else{
					$(this).parentsUntil('.vendor-purchase').show();
				}
			})
		});
	});
	

	$('.searchbar-clear').click(function(){

		var elem = $('#card-comodity-purchase-vendor > .vendor-purchase').find('.item-content');

		elem.each(function(){

			$(this).parentsUntil('.vendor-purchase').show();
		  

		});

	})

	$('.searchbar-cancel').click(function(){

		var elem = $('#card-comodity-purchase-vendor > .vendor-purchase').find('.item-content');

		elem.each(function(){

			$(this).parentsUntil('.vendor-purchase').show();

		});

	})

	
			
	showLoading();

	setTimeout(function() {

		var dataSend = {
			product_id : productId
		}

		$.ajax({
		    url: 'http://plantera.iotera.io/client.php',
		    type: "POST",
		    data: dataSend,
		    success: function (data) {
		        // this is executed when ajax call finished well
		        
		        hideLoading();

		        var newData = {data : data}

		        data = JSON.parse(data);

		        if (data.length>0) {
		        	loadWidgetPurchaseVendor(newData.data);

		        }else{
		        	loadWidgetEmptyVendor();
		        }

		        
		        

		    },
		    error: function (xhr, status, error) {
		        // executed if something went wrong during call
		        hideLoading();
		        myApp.alert('got error: ' + error,'Notifikasi'); // status 0 - when load is interrupted
		    }
		});

		function loadWidgetEmptyVendor(){

			var initEmptyPage = '<div class="content-block-inner">'+
							'<div class="list-block" style="margin-top: 50%;margin-bottom: 50%;color:gray;">'+
								'<div style="text-align: center;margin-bottom: 10px;font-weight: bold;">'+
									'Tambah Penjual Baru'+
								'</div>'+
								'<div id="add_init_vendor" style="text-align: center;">'+
									'<i class="icon f7-icons" style="font-size: 48px;color:darkslategray;">add_round_fill</i>'+
								'</div>'+
							'</div>'+
						'</div>';

			$('#card_purchase_vendor').html(initEmptyPage);
			$('.searchbar-init').css('display','none');

			$('#add_init_vendor').click(function(){

				document.getElementById('name_vendor_purchase_add').value = "";
		  		document.getElementById('hp_vendor_purchase_add').value = "";

		  		myApp.popup('.popup-vendor-purchase');

		  		changeFieldAtrribute(productName);

			})

		}
	
		function loadWidgetPurchaseVendor(vendordata){

				$$.ajax({
				  	url: 'view/widget/home_card.html',
				  	statusCode: {
				    	404: function (xhr) { alert('page not found'); }
				  	},
				  	beforeSend : function(){  },
				  	success : function(data){	

				  		vendordataDisp = JSON.parse(vendordata);
				  		vendordataDisp.splice(0, 0, {add_first : true});
				  		var context = {data : vendordataDisp};
				  		
				  		for (var i = 0; i < context.data.length; i++) {
				  			if (i==0) {
				  				context.data[i].add_first = true;
				  			}else{
				  				context.data[i].add_first = false;
				  			}

				  			if(context.data[i].partner!=undefined){
				  				context.data[i].phone = context.data[i].partner[0].phone;
				  				context.data[i].name_view = context.data[i].name[1];
				  			}
				  			
				  		};

				  		console.log(context);


				  		$$('#card_purchase_vendor').html(data);
				       	var template = $$('#card-vendor-purchase-template').html();
				        // console.log(typeof template);
					    var compiledTemplate = Template7.compile(template);

					    var html = compiledTemplate(context);
					  	$$('#card_purchase_vendor').html(html);
					  	
					    var elem = $('#card-comodity-purchase-vendor > .vendor-purchase').find('.client-stars');
					    var rateIndex = 0;
					    rateVendor = JSON.parse(vendordata);
						elem.each(function(){

							var onStar = rateVendor[rateIndex].rating; // The star currently selected
						    var stars = $(this).find('li.star');
						    
						    for (i = 0; i < stars.length; i++) {
						      $(stars[i]).removeClass('selected');
						    }

					    	for (i = 0; i < onStar; i++) {
						      $(stars[i]).addClass('selected');
						    }

						    rateIndex++;

						});
					    

					  	$('.add-new-vendor-purchase').click(function(){

					  		document.getElementById('name_vendor_purchase_add').value = "";
					  		document.getElementById('hp_vendor_purchase_add').value = "";

					  		myApp.popup('.popup-vendor-purchase');

					  		changeFieldAtrribute(productName);
					  	})

					  	$('.vendor-purchase').click(function(){

					  		showLoading();

					  		var vendorData = $(this).data('vendor');
					  		var partner = $(this).data('partner');

					  		console.log(vendorData);

					  		vendor = vendorData.split(",");
					  		vendorId = vendor[0];
					  		vendorName = vendor[1];
					  		productType = comodityName;

					  		setTimeout(function() {

					  			hideLoading();

					  			loadPurchaseCoffee(productName,partner,productId,productType,productName,location,vendorId,vendorName);

					  			
					  		}, 100);
					  		
					  	})

					  	


				  	}
				}) 

		}


			$('#category_vegetables_add').change(function() {
		        var selectedValue = $(this).val();

		        if(selectedValue  === 'lainnya') {
		            $('#other_type').css('display','block');    
		        }else{
		        	$('#other_type').css('display','none');
		        } 
		    });

			$('.submit-add-vendor-purchase').unbind('click').click(function(){

		  		var productType = "";
		  		var vendorGroup = "";

		  		if(productName.toLowerCase()=="kopi"){
				    productType = $('#category_comodity_purchase_add').val();
				    vendorGroup = $( "#category_vendor_purchase_add" ).val()+" Kopi "+$('#category_comodity_purchase_add').val();
				}else{
					vendorGroup = $( "#category_vendor_purchase_add" ).val();
				}
		  		
		  		var dataSend = {
					vendor_name : document.getElementById('name_vendor_purchase_add').value,
					vendor_phone : document.getElementById('hp_vendor_purchase_add').value,
					vendor_group : vendorGroup,
					product_id : productId
				}

				showLoading();

				setTimeout(function() {
					$.ajax({
				    url: 'http://plantera.iotera.io/registration_vendor.php',
				    type: "POST",
				    data: dataSend,
				    success: function (data) {

				    	var data = JSON.parse(data);
				    	console.log(data);

				    	var vendorName = document.getElementById('name_vendor_purchase_add').value;
				    	var vendorId = data[0];
				    	var partner = data[1];
				    	var productType = comodityName;

				    	console.log(vendorId);

				    	hideLoading();

				    	loadPurchaseCoffee(productName,partner,productId,productType,productName,location,vendorId,vendorName);
				    	
						myApp.closeModal('.popup-vendor-purchase',true);


				    }
				})


				}, 100);

		    })

			function changeFieldAtrribute(productName){

				if(productName.toLowerCase()=="kopi"){
		  			$('#coffee_new_field').css('display','block');
		  			$('#vegetable_new_field_type').css('display','none');
		  			$('#vegetable_new_field_desc').css('display','none');
		  			$('#title_new_seller').text(productName);
		  		}else if(productName.toLowerCase()=="jagung"){
		  			$('#coffee_new_field').css('display','none');
		  			$('#vegetable_new_field_type').css('display','none');
		  			$('#vegetable_new_field_desc').css('display','none');
		  			$('#title_new_seller').text(productName);
		  		}else if(productName.toLowerCase()=="sayuran"){
		  			$('#coffee_new_field').css('display','none');
		  			$('#vegetable_new_field_type').css('display','block');
		  			$('#vegetable_new_field_desc').css('display','block');
						$('#title_new_seller').text(productName);
		  		}else{
		  			$('#coffee_new_field').css('display','block');
		  			$('#vegetable_new_field_type').css('display','none');
		  			$('#vegetable_new_field_desc').css('display','none');
		  			$('#title_new_seller').text(productName);
		  		}

			}
			
			function loadPurchaseCoffee(productName,partner,productId,productType,productName,location,vendorId,vendorName){

				if(productName.toLowerCase()=="kopi"){
					  				
	  				mainView.router.load({
					  url: 'view/seller/purchase_coffee.html?partner='+partner+'&product_id='+productId+'&product_type='+productType+'&product_name='+productName+'&location='+location+'&vendor_id='+vendorId+'&vendor_name='+vendorName,
					  animatePages: true
					});

	  			}else if(productName.toLowerCase()=="jagung"){
	  				mainView.router.load({
					  url: 'view/seller/purchase.html?product_type='+productType+'&partner='+partner+'&product_id='+productId+'&product_name='+productName+'&location='+location+'&vendor_id='+vendorId+'&vendor_name='+vendorName,
					  animatePages: true
					});

	  			}else if (productName.toLowerCase()=="sayuran") {
	  				mainView.router.load({
					  url: 'view/seller/purchase_coffee.html?partner='+partner+'&product_id='+productId+'&product_type='+productType+'&product_name='+productName+'&location='+location+'&vendor_id='+vendorId+'&vendor_name='+vendorName,
					  animatePages: true
					});
	  			}else{
	  				mainView.router.load({
					  url: 'view/seller/purchase_coffee.html?partner='+partner+'&product_id='+productId+'&product_type='+productType+'&product_name='+productName+'&location='+location+'&vendor_id='+vendorId+'&vendor_name='+vendorName,
					  animatePages: true
					});
	  			}

			}




	}, 1000);




})
