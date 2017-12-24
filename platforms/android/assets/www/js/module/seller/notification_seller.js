myApp.onPageInit('notification_seller_list', function (page) {

	$('#fab').css("display","none");

	$('.back').click(function(){
		mainView.router.back({
			url:'index.html',
			force:true
		});
		$('#fab').css("display","block");
		$('#fab').removeClass("speed-dial-opened");

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
			}, 500);


		}else{
			// $('#notification_seller_index').css('display','none');
			// $('#notification_comodity_index').css('display','none');
		}
	})

	var initEmptyNotification = '<div class="content-block-inner">'+
							'<div class="list-block" style="margin-top: 50%;margin-bottom: 50%;color:gray;">'+
								'<div style="text-align: center;margin-bottom: 10px;font-weight: bold;">'+
									'Empty Notification'+
								'</div>'+
							'</div>'+
						'</div>';	

	

	showLoading();

	setTimeout(function(){
		getCartItemByFarmNameAndUserId();

		setTimeout(function() {

			if(Template7.global.arrDataCart.length == 0 ){
				hideLoading();
				$('#notification_seller_grid').html(initEmptyNotification);
			}else{

				arrDataCart = Template7.global.arrDataCart;
				loadWidgetNotificationSeller(arrDataCart);
			}


		}, 900);

	}, 300);


	function loadWidgetNotificationSeller(arrDataCart){
		$$.ajax({
		  	url: 'view/widget/notification_seller_widget.html',
		  	statusCode: {
		    	404: function (xhr) { alert('page not found'); }
		  	},
		  	beforeSend : function(){     },
		  	success : function(data){

		  		var obj = {data : arrDataCart};

		  		console.log(obj);

		  		hideLoading();
		       	$$('#notification_seller_grid').html(data);
		       	var template = $$('#notification-seller-template').html();
		        // console.log(typeof template);
			    var compiledTemplate = Template7.compile(template);

			    var html = compiledTemplate(obj);
			  	$$('#notification_seller_grid').html(html);

			  	$('.confirm_notification').click(function(){

			  		myApp.popup('.popup-seller-notification-order');

			  		var id = $(this).data('id');
			  		var name = $(this).data('name');
			  		var image = $(this).data('image');
			  		var total = $(this).data('total');
			  		var delivery = $(this).data('delivery');
			  		var address = $(this).data('address');

			  		console.log(id);
			  		console.log(name);
			  		console.log(total);
			  		console.log(delivery);
			  		console.log(address);

			  		document.getElementById('title_notification_order').innerHTML = name;
			  		document.getElementById('image_notification_order').src = image;
			  		document.getElementById('date_notification_order').value = delivery;
			  		document.getElementById('total_notification_order').value = total;
			  		document.getElementById('address_notification_order').value = address;

			  		$('.submit-order-notification').unbind('click').click(function(){

			  			myApp.closeModal('.popup-seller-notification-order');

				  		showLoading();
				  		setTimeout(function(){
				  			hideLoading();
							mainView.router.reloadPage('view/seller/notification_seller.html');

						}, 1000);
						
						
						updateStatusCart("disetujui",id);
						showLoading();

			  		})

			  		$('.cancel-order-notification').unbind('click').click(function(){

			  			myApp.closeModal('.popup-seller-notification-order');

			  			myApp.modal({
						    title: 'Alasan Menolak Pesanan?',
						    afterText:  '<div class="list-block">'+
										  '<ul>'+
										    '<li>'+
										      '<label class="label-radio item-content">'+
										        '<input type="radio" name="radio-notification-order" value="Books" checked="checked">'+
										        '<div class="item-inner">'+
										          '<div class="item-title">Pengiriman Terlalu Jauh</div>'+
										        '</div>'+
										      '</label>'+
										    '</li>'+
										    '<li>'+
										      '<label class="label-radio item-content">'+
										        '<input type="radio" name="radio-notification-order" value="Movies">'+
										        '<div class="item-inner">'+
										          '<div class="item-title">Hasil Panen tidak cukup</div>'+
										        '</div>'+
										      '</label>'+
										    '</li>'+
										    '<li>'+
		                                          '<label class="label-radio item-content">'+
		                                            '<input type="radio" name="radio-notification-order" value="lainnya">'+
		                                            '<div class="item-inner">'+
		                                              '<div class="item-title">lainnya</div>'+
		                                              
		                                            '</div>'+
		                                          '</label>'+
		                                           '<div class="item-input notif-lain-order"  style="display:none;">'+
		                                            '<textarea id="cancel_order_other" type="text" name="name" style="box-shadow: 0 0 3px #1c1c1c;padding: 9px;    margin-left: 15px;width: 87%;"></textarea>'+ 
		                                        '</div>'+   
		                                        '</li>'+
										  '</ul>'+
										'</div>',
						    buttons: [{
						        text: 'konfirmasi!',
						        bold: true,
						        onClick: function () {
						          
							          myApp.alert('pesanan telah ditolak!!','Notifikasi');
							          showLoading();
								  		setTimeout(function(){
								  			hideLoading();
											mainView.router.reloadPage('view/seller/notification_seller.html');

										}, 1000);
										
										console.log(id);			
										updateStatusCart("ditolak",id);
										showLoading();

							        }
							     }]
							  })

							 $('input:radio[name="radio-notification-order"]').change(
                               function(){
                                    if (this.checked && this.value == 'lainnya') {
                                        console.log('test');
                                        $('.notif-lain-order').css('display','block');
                                        document.getElementById('cancel_order_other').value = "";
                                    }else{
                                    	document
                                        $('.notif-lain-order').css('display','none');
                                    }
                                });

			  		})


					

				})

		  	},
		  	error : function(){ alert('error');	}
		});
	}


})
