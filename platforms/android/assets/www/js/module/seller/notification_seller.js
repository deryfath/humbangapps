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

			  		showLoading();
			  		setTimeout(function(){
			  			hideLoading();
						mainView.router.reloadPage('view/seller/notification_seller.html');

					}, 1000);
					
					var id = $(this).data('id');
					console.log(id);
					
					updateStatusCart("disetujui",id);
					showLoading();

					

				})

		  	},
		  	error : function(){ alert('error');	}
		});
	}


})
