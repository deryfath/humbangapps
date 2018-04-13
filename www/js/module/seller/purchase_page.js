myApp.onPageInit('purchase_page', function (page) {


	$('.back').click(function(){

		mainView.router.back({
			url:'index.html',
			force:true
		});

		$('.toolbar-inner-home').html('');

		getSession();
		
		showLoading();

		setTimeout(function() {

			if (Template7.global.lengthSession==1) {
				$$('#panel_overlay').html(sellerHtmlElementPanel);
			}else{
				$$('#panel_overlay').html(indexHtmlElementPanel);
			}

			hideLoading();
			loadChartWeeklyTarget();
			loadChartProgress();

			$('#tabbar_home').css('display','block');
			$('.toolbar-inner-home').css('background','#ac312a');

			$('.toolbar-inner-home').html('<a href="#" id="purchase_page" style="margin: 0 auto;"><i class="icon f7-icons" style="color: white;">layers_fill</i><span style="text-align:center;color:white;font-size: 12px;" class="tabbar-label">PEMBELIAN</span></a>');
			
			$('#purchase_page').click(function(){

				getSession();

				showLoading();

				setTimeout(function() {

					hideLoading();

					console.log(Template7.global.lengthSession);

					if(Template7.global.lengthSession==1){

						mainView.router.load({
						  url: 'view/seller/purchase_page.html',
						  animatePages: true
						});

					}else{

						myApp.confirm('Anda harus login Untuk Melanjutkan', 'Notifikasi', 
					      function () {
							myApp.popup('.popup-login');
						  },
					      function () {
					      }
					    );


					}
				
				},1000) 	
				

			})
		}, 1000);
	})

	var loading = false;
	var total_data = 0;
	var limit = 10;
	var offset = 0;

	var mySearchbar = myApp.searchbar('.search-purchase', {
	    searchList: '.list-block-search',
	    searchIn: '.item-title,.item-subtitle,.item-text,.item-after'
	}); 

	var initEmptyPage = '<div class="content-block-inner">'+
							'<div class="list-block" style="margin-top: 50%;margin-bottom: 50%;color:gray;">'+
								'<div style="text-align: center;margin-bottom: 10px;font-weight: bold;">'+
									'Pembelian Baru'+
								'</div>'+
								'<div id="add_init_purchase" style="text-align: center;">'+
									'<i class="icon f7-icons" style="font-size: 48px;color:darkslategray;">add_round_fill</i>'+
								'</div>'+
							'</div>'+
						'</div>';


	$('.toolbar-inner-home').html('');

	getSession();

	showLoading();

	setTimeout(function() {

		getDataPurchase(offset,limit);

	}, 1000);

	function getDataPurchase(offset,limit){

		var dataSend = {
			offset : offset,
			limit : limit,
			agent : parseInt(Template7.global.userdata.id)
		}

		console.log(dataSend);

		$.ajax({
		    url: 'http://plantera.iotera.io/purchase_list.php',
		    type: "POST",
		    data: dataSend,
		    success: function (data) {
		        
		        var newData = {data : JSON.parse(data)};

		        console.log(newData.data.length);

		        if (newData.data.length>0) {

		        	$('#tabbar_home').css('display','block');
					$('.toolbar-inner-home').css('background','#ac312a');

					$('.toolbar-inner-home').html('<a href="#" id="purchase_menu" style="margin: 0 auto;"><i class="icon f7-icons" style="color: white;font-size:30px;margin: 1px;">add_round</i></a>');
					
					$('#purchase_menu').click(function(){

						mainView.router.load({
						  url: 'view/seller/purchase_menu.html',
						  animatePages: true
						});

					})

		        	loadWidgetPurchaseList(newData.data);

		        }else{

		        	$('.search-purchase').css('display','none');
		        	$('#tabbar_home').css('display','none');
		        	hideLoading();
		        	$('#list_purchase').html(initEmptyPage);

		        	$('#add_init_purchase').click(function(){

						mainView.router.load({
						  url: 'view/seller/purchase_menu.html',
						  animatePages: true
						});

					})
		        }

		        
		        

		    },
		    error: function (xhr, status, error) {
		        // executed if something went wrong during call
		        hideLoading();
		        myApp.alert('got error: ' + error,'Notifikasi'); // status 0 - when load is interrupted
		    }
		});
	}


	function loadWidgetPurchaseList(vendordata){

                $$.ajax({
                    url: 'view/widget/purchase_list.html',
                    statusCode: {
                        404: function (xhr) { alert('page not found'); }
                    },
                    beforeSend : function(){  },
                    success : function(data){  

                    	hideLoading(); 

                        var context = {data : vendordata};
                        
                        $$.each(context.data, function (index, value) {
                            value.price_display = "Rp "+ comma_digits(value.amount_untaxed.toString());
                        	
                        })
                        
                        console.log(context);

                        total_data = context.length;


                        $$('#list_purchase').html(data);
                        var template = $$('#purchase_list_template').html();
                        // console.log(typeof template);
                        var compiledTemplate = Template7.compile(template);

                        var html = compiledTemplate(context);
                        $$('#list_purchase').html(html);

                        

                    }
                }) 

        }

     $$('.infinite-purchase-list').on('infinite', function (event) {
		  if (loading) return;
			loading = true;
			showLoading();
			lastIndex = $$('#purchase_ul li').length;
			setTimeout(function () {
			    if (lastIndex >= total_data) {
			      loading = false;

			      $$('.infinite-scroll-preloader').remove();
			      return;
			    }
			   		    
				loadPurchaseListItem(lastIndex,limit);				
			    lastIndex = $$('#purchase_ul li').length;
		  }, 1000);
		});


     function loadPurchaseListItem(offset,limit){

     	$$.ajax({
		  	url: 'view/widget/purchase_list_item.html',
		  	statusCode: { 404: function (xhr) { alert('page not found'); } },
		  	beforeSend : function(){  },
		  	success : function(data){
			    first_load = true;
			       
		       	$$('#item_purchase').html(data);
		       	var template = $$('#purchase_list_item_template').html();
			    var compiledTemplate = Template7.compile(template);	    
			    var getData = getDataPurchaseItem(offset,limit,compiledTemplate);	         
		  	},
		  	error : function(){ alert('error'); }
		});
     }


    function getDataPurchaseItem(offset,limit,template){

    	var dataSend = {
			offset : offset,
			limit : limit,
			agent : parseInt(Template7.global.userdata.id)
		}

		$.ajax({
		    url: 'http://plantera.iotera.io/purchase_list.php',
		    type: "POST",
		    data: dataSend,
		    success: function (data) {

		    	hideLoading();
		        
		        var newData = {data : JSON.parse(data)};

		        $$.each(newData.data, function (index, value) {
                    value.price_display = "Rp "+ comma_digits(value.amount_untaxed.toString());

                })

		        var html = template(newData);
			  	$$('#purchase_ul').append(html);
		  		loading = false;
		        

		    },
		    error: function (xhr, status, error) {
		        // executed if something went wrong during call
		        hideLoading();
		        myApp.alert('got error: ' + error,'Notifikasi'); // status 0 - when load is interrupted
		    }
		});
    }





})

myApp.onPageInit('purchase_detail', function (page) {


	$('#tabbar_home').css('display','none');

	var title = page.query.title;
	var total = page.query.total;
	var id = page.query.id;
	var purchase_detail_id = page.query.purchase_order_line;
	var date = page.query.create_date;
	var vendorName = page.query.vendor_name;

	console.log(purchase_detail_id);

	$('.back').click(function(){

		$('#tabbar_home').css('display','block');
		
		mainView.router.back({
			  url: 'view/seller/purchase_page.html',
			  force:true,
			  reload:true
		});
	})

	$("#purchase_title").text(title+" - "+vendorName);
	$("#purchase_total").text("Harga Total : "+total);

	showLoading();

	setTimeout(function() {

		hideLoading();

		var dataSend = {
			purchase_line_id : purchase_detail_id
		}
		$.ajax({
		    url: 'http://plantera.iotera.io/purchase_detail.php',
		    type: "POST",
		    data: dataSend,
		    success: function (data) {

		    	hideLoading();
		        
		        console.log(JSON.parse(data));
		        
		        loadDetailPurchaseData(JSON.parse(data));

		    },
		    error: function (xhr, status, error) {
		        // executed if something went wrong during call
		        hideLoading();
		        myApp.alert('got error: ' + error,'Notifikasi'); // status 0 - when load is interrupted
		    }
		});

	}, 100);

	function loadDetailPurchaseData(purchaseData){

		$$.ajax({
                    url: 'view/widget/purchase_detail_template.html',
                    statusCode: {
                        404: function (xhr) { alert('page not found'); }
                    },
                    beforeSend : function(){  },
                    success : function(data){  

                    	hideLoading(); 

                        var context = {data : purchaseData};

                        arrProduct = [];
                        arrDataExt = [];

                        
                        $$.each(context.data, function (index, value) {
                            value.price_display = "Rp "+ comma_digits(value.price_total.toString());
                        	value.product_name = value.product_id[1];
                        	value.price_unit_display = "Rp "+ comma_digits(value.price_unit.toString());
                        
                        	 arrProduct.push({
					              partner_id:parseInt(value.vendor[0].id),
					              product_id:value.product_id[0],
					              name:value.product_id[1],
					              price:value.price_unit,
					              quantity:value.product_qty,
					              vendor_name:value.partner_id[0]+","+value.partner_id[1],
					              subtotal:value.price_subtotal,
					              quality:value.x_quality_product,
					              comment:value.x_comment,
					              barcode:null,
					              location:value.x_location
					        })

                        	 arrDataExt.push({
					              barcode : null,
					              location : value.x_location
					            })
                        })
                        
                        console.log(context);


			            var newDateTimeOrder = new Date();
			            var newDateTimePayment = new Date();

			            var dataSend = {
			                   arr_product : arrProduct,
			                   date_order : newDateTimeOrder,
			                   date_payment : newDateTimePayment,
			                   arr_product_ext : arrDataExt
			            } 



                        $$('#detail_purchase_div').html(data);
                        var template = $$('#purchase_detail_template').html();
                        // console.log(typeof template);
                        var compiledTemplate = Template7.compile(template);

                        var html = compiledTemplate(context);
                        $$('#detail_purchase_div').html(html);

				        var stars = $('#stars li').parent().children('li.star');
				        
				        for (i = 0; i < stars.length; i++) {
				          $(stars[i]).removeClass('selected');
				        }
				        
				        for (i = 0; i < parseInt(context.data[0].x_quality_product); i++) {
				          $(stars[i]).addClass('selected');
				        }

                        $('#repurchase_btn').click(function(){


                        	console.log(dataSend);
                        	mainView.router.load({
			                    url : 'view/seller/purchase_back.html?data='+JSON.stringify(dataSend)
			                  });


                        })

                        

                    }
                }) 


	}


})


myApp.onPageInit('purchase_back', function (page) {

	var data = page.query.data;

	data = JSON.parse(data);

	$('.back').click(function(){
		
		mainView.router.back({
			  url: 'view/seller/purchase_detail.html'
		});
	})


	vendorName = data.arr_product[0].vendor_name.split(",");

	document.getElementById('vendor_purchase_back').value = vendorName[1];
	document.getElementById('comodity_purchase_back').value = data.arr_product[0].name;
	document.getElementById('comodity_purchase_back').value = data.arr_product[0].name;
	document.getElementById('price_purchase_back').value = "Rp "+comma_digits(data.arr_product[0].price);
	document.getElementById('quantity_purchase_back').value = data.arr_product[0].quantity;
	document.getElementById('total_purchase_back').value = "Rp "+comma_digits(data.arr_product[0].subtotal);

	//setup before functions
	var typingTimer;                //timer identifier
	var doneTypingInterval = 100;  //time in ms, 5 second for example
	var $input = $('#quantity_purchase_back');

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
	  	
	  	quantity = parseInt(document.getElementById('quantity_purchase_back').value);
	  	price = data.arr_product[0].price;

	  	totalPrice = price * quantity;

	  	console.log(totalPrice);

	  	document.getElementById('total_purchase_back').value = "Rp "+comma_digits(totalPrice);
	  
	}

	$('#confirm_purchase_back').unbind('click').click(function(){

		  if (document.getElementById('quantity_purchase_back').value=="0") {
		  	 
		  	 myApp.alert("Kuantitas Tidak boleh Kosong","Notifikasi");

		  }else{

		  	 getSession();
		  	 showLoading();
	          setTimeout(function(){

	          	$('#quantity_purchase_back').css('border-color','#a6a9b0');
				$('#quantity_purchase_back').css('border-width','medium');

	          	quantity = parseInt(document.getElementById('quantity_purchase_back').value);
	          	price = data.arr_product[0].price;
		  		totalPrice = price * quantity;

	            arrProduct = [];
	            arrProduct.push({
	              partner_id:parseInt(data.arr_product[0].partner_id),
	              product_id:data.arr_product[0].product_id,
	              name:data.arr_product[0].name,
	              price:price,
	              quantity:document.getElementById('quantity_purchase_back').value,
	              vendor_name:data.arr_product[0].vendor_name,
	              subtotal:totalPrice,
	              quality:data.arr_product[0].quality,
	              comment:data.arr_product[0].comment,
		          agent:Template7.global.userdata.id,
	              barcode:null,
	              location:data.arr_product[0].location
	            })

	            console.log(arrProduct);

	            var newDateTimeOrder = new Date();
	            var newDateTimePayment = new Date();

	            console.log(newDateTimeOrder);

	            arrDataExt = [];
	            arrDataExt.push({
	              barcode : null,
	              location : data.arr_product[0].location
	            })

	            var dataSend = {
	                   arr_product : arrProduct,
	                   date_order : newDateTimeOrder,
	                   date_payment : newDateTimePayment,
	                   arr_product_ext : arrDataExt
	            } 

	              console.log(dataSend);

	            var vendorName = data.arr_product[0].vendor_name.split(",");
	            var productName = data.arr_product[0].name;


	            $.ajax({
	                type: "POST",
	                url: "http://plantera.iotera.io/purchase.php",
	                data: dataSend,
	                dataType:"json",
	                success: function(data){

	                 console.log(data);

	                 
	                 //set global var summary
	                  Template7.global.summaryPurchase = {
		                vendor_name:vendorName[1],
		                product_name:productName,
		                price:price,
		                quantity:document.getElementById('quantity_purchase_back').value,
		                subtotal:totalPrice
		              }

	                  hideLoading();
	                  mainView.router.load({
	                    url : 'view/seller/payment.html?purchase_id='+data[0]+'&purchase_line_id='+data[1][0]
	                  });


	                }
	            });

	           

	            

	            

	          }, 1000)

		  }
         


          
    })	

})