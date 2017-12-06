myApp.onPageInit('order_final_shop_list', function (page) {

	$('.toolbar-inner-home').html('');
	$('#tabbar_home').css("display","none");

	$('#continue_shopping_btn').click(function(){
		mainView.router.back({
				url : 'view/shop/shop_comodity.html',
				force :true
			});
	})

	$('#check_status_order_btn').click(function(){
		showLoading();
		setTimeout(function(){
			hideLoading();
			mainView.router.load({
					url : 'view/shop/check_status_order.html'
				});
		}, 1000)
	})

	// $('#reschedule_shooping_btn').click(function(){
		
			console.log(Template7.global.arrDataCart);
			console.log(Template7.global.totalCart);
			console.log(Template7.global.paymentMethod);
			console.log(Template7.global.userdata);

	// 		myApp.modal({
	// 		    title:  'Modal with 3 buttons',
	// 		    text: '<input type="text" placeholder="Your birth date" readonly id="calendar_reschedule">',
	// 		    buttons: [
	// 		      {
	// 		        text: 'Cancel',
	// 		        onClick: function() {
	// 		        }
	// 		      },
	// 		      {
	// 		        text: 'OK',
	// 		        onClick: function() {
	// 		        }
	// 		      }
	// 		    ]
	// 		  })

			// calendarReschedule = myApp.calendar({
			// 			    input: '#reschedule_shooping_btn',
			// 			    dateFormat: 'dd/mm/yyyy',
			// 			    toolbarTemplate: '<div class="toolbar">' + '<div class="toolbar-inner">' + '{{monthPicker}}' + '{{yearPicker}}' + '<a href="#" class="link close-picker">{{closeText}}</a>' + '</div>' + '</div>',
			// 			    disabled: function (date) {
			// 			        if ( (date.getDate() >= 10 && date.getDate() <= 30) &&  date.getFullYear() === 2017 && (date.getMonth() === 3 || date.getMonth() === 4) )  {
			// 			            return false;
			// 			        }
			// 			        else {
			// 			            return true;
			// 			        }
			// 			    },
			// 			    onClose:function(p){
			// 			    	console.log(Template7.global.arrDataCart);
			// 					console.log(Template7.global.totalCart);
			// 					console.log(Template7.global.paymentMethod);
			// 					console.log(Template7.global.userdata);

			// 					myApp.alert('Reschedule Succeed', 'Notification');						   
			// 				 }
			// 			});
	// })

})