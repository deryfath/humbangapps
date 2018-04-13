myApp.onPageInit('comodity_notification_list', function (page) {

	var initEmptyPage = '<div class="content-block-inner">'+
							'<div class="list-block" style="margin-top: 50%;margin-bottom: 50%;color:gray;">'+
								'<div style="text-align: center;margin-bottom: 10px;font-weight: bold;">'+
									'Empty Comodity'+
								'</div>'+
								
							'</div>'+
						'</div>';

	$('.back').click(function(){
		console.log('test');

		Template7.global.arrComodityNonPriority = [];

		getSession();

		showLoading();

		setTimeout(function() {

			console.log(Template7.global.lengthSession);

			if(Template7.global.lengthSession==1){
				if(Template7.global.userdata.usertype=="seller"){
				//CHECK PESANAN /NOTIFIKASI
				getCartItemByFarmNameAndUserId();
		
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

				}, 1000);

				}else{
					hideLoading();
					// $('#notification_seller_index').css('display','none');
					// $('#notification_comodity_index').css('display','none');
					$('#command-home-button').html(landingPageConsumer);
				}

			}else{
				hideLoading();
				$('#command-home-button').html(landingPageNotLogin);

				heightScreen = $(window).height()/2;
				$('#belanja').css('height',heightScreen-20);
				$('#jualan').css('height',heightScreen);

				console.log($('#belanja').innerHeight());
				console.log($('#jualan').innerHeight());

			}

		}, 300);
	})

	var cronFlag = false;

	// Template7.global.arrComodityNonPriority = [];
	
	// startCronNonComodity();

	showLoading();
	setTimeout(function() {

		hideLoading();
		// console.log(Template7.global.arrComodityNonPriority);

		if(Template7.global.arrComodityNonPriority.length>0){
			loadNotificationComodity(Template7.global.arrComodityNonPriority);
		}else{
			$('#comodity_notification_grid').html(initEmptyPage);
		}

		
			

	}, 1000);


	function loadNotificationComodity(dataObject){

		$$.ajax({
		  	url: 'view/widget/notification_comodity_widget.html',
		  	statusCode: {
		    	404: function (xhr) { alert('page not found'); }
		  	},
		  	beforeSend : function(){showLoading(); },
		  	success : function(data){

		  		hideLoading();

		  		//SORTING
		  		dataObject.sort(function(a, b) {
                   return new Date(b.sort_date) - new Date(a.sort_date);
              	});

              	console.log(dataObject);

		  		var result = {data : dataObject};

		  		$$('#comodity_notification_grid').html(data);
		       	var template = $$('#notification-comodity-template').html();
		        // console.log(typeof template);
			    var compiledTemplate = Template7.compile(template);

			    var html = compiledTemplate(result);
			  	$$('#comodity_notification_grid').html(html);

			  	var tablinks = document.getElementById('comodity-notification-grid-list').getElementsByClassName('comodity-notification-item');
				for (var i = 0, j = tablinks.length; i < j; i++) {
					tablinks[i].onclick = function(){

						var id = $(this).data('id');
						var weight = $(this).data('weight');
						var height = $(this).data('height');
						var type = $(this).data('type');
						var desc = $(this).data('desc');
						var farm = $(this).data('farm');
						var finishHarvest = $(this).data('finishharvest');
						var startHarvest = $(this).data('startharvest');
						var startPlan = $(this).data('startplan');
						var finishPlan = $(this).data('finishplan');
						var grade = $(this).data('grade');
						var image = $(this).data('image');
						var isNotif = $(this).data('isnotif');
						var isPriority = $(this).data('ispriority');
						var itemId = $(this).data('itemid');
						var itemType = $(this).data('itemtype');
						var name = $(this).data('name');
						var priceMin = $(this).data('pricemin');
						var priceMax = $(this).data('pricemax');
						var total = $(this).data('total');
						var userid = $(this).data('userid');
						var cron2 = $(this).data('cron2');
						var cron5 = $(this).data('cron5');
						var harvestTotal = $(this).data('harvesttotal');
						var estimate = $(this).data('estimate');
						var damageTotal = $(this).data('damagetotal');
						var damageAfter = $(this).data('damageafter');

						console.log(cron2);

						 document.getElementById('non_priority_comodity_title').innerHTML=name;
						 document.getElementById('non_priority_comodity_image').src=image;
						 document.getElementById('non_priority_comodity_type').innerHTML=type;
						 document.getElementById('non_priority_comodity_quantity').value = total;
						 document.getElementById('non_priority_comodity_estimate').value = estimate;
						 document.getElementById('non_priority_comodity_damage').value = damageTotal;
						 document.getElementById('non_priority_comodity_harvest_quantity').value = harvestTotal;
						 document.getElementById('non_priority_comodity_quantity_after_damage').value = damageAfter;

						 //CHECK ENABLE CLICK CRON FLAG
						 if(cron2){
						 	myApp.popup('.popup-comodity-non-priority-item');

						 }else{
						 	myApp.alert("maaf belum ada notifikasi untuk komoditas ini","notifikasi");
						 }

						 //PLAN TIME
						startPlan = startPlan.replace(/\s/g, '');

						var startPlanSplit = startPlan.split("/");
						var startPlanFormat = startPlanSplit[1]+"/"+startPlanSplit[0]+"/"+startPlanSplit[2];

						finishPlan = finishPlan.replace(/\s/g, '');

						var finishPlanSplit = finishPlan.split("/");
						var finishPlanFormat = finishPlanSplit[1]+"/"+finishPlanSplit[0]+"/"+finishPlanSplit[2];

						var calendarNonComodityPlanRange = myApp.calendar({
						    input: '#non_priority_comodity_plan',
						    dateFormat: 'd/m/yyyy',
						    toolbarTemplate: '<div class="toolbar">' + '<div class="toolbar-inner">' + '{{monthPicker}}' + '{{yearPicker}}' + '<a href="#" class="link close-picker">{{closeText}}</a>' + '</div>' + '</div>',
						    rangePicker: true
						});

						var values = [startPlanFormat, finishPlanFormat];

						console.log(values);

						calendarNonComodityPlanRange.setValue(values);


						//HARVEST TIME
						startHarvest = startHarvest.replace(/\s/g, '');

						var startHarvestSplit = startHarvest.split("/");
						var startHarvestFormat = startHarvestSplit[1]+"/"+startHarvestSplit[0]+"/"+startHarvestSplit[2];

						finishHarvest = finishHarvest.replace(/\s/g, '');

						var finishHarvestSplit = finishHarvest.split("/");
						var finishHarvestFormat = finishHarvestSplit[1]+"/"+finishHarvestSplit[0]+"/"+finishHarvestSplit[2];

						var calendarNonComodityHarvestRange = myApp.calendar({
						    input: '#non_priority_comodity_harvest',
						    dateFormat: 'd/m/yyyy',
						    toolbarTemplate: '<div class="toolbar">' + '<div class="toolbar-inner">' + '{{monthPicker}}' + '{{yearPicker}}' + '<a href="#" class="link close-picker">{{closeText}}</a>' + '</div>' + '</div>',
						    rangePicker: true
						});

						var values = [startHarvestFormat, finishHarvestFormat];

						console.log(values);

						calendarNonComodityHarvestRange.setValue(values);

						$('.inc-non-comodity-priority-qty').unbind('click').click(function(e){

							total = document.getElementById('non_priority_comodity_quantity').value;
							
							total++;
							
							document.getElementById('non_priority_comodity_quantity').value = total;

							e.stopPropagation();
					  		e.preventDefault();

						})

						$('.dec-non-comodity-priority-qty').unbind('click').click(function(e){

							total = document.getElementById('non_priority_comodity_quantity').value;
							
							total--;
							if(total<0){
								total = 0;
							}
							document.getElementById('non_priority_comodity_quantity').value = total;

							e.stopPropagation();
					  		e.preventDefault();

						})

						$('.inc-non-comodity-priority-estimate').unbind('click').click(function(e){

							total = document.getElementById('non_priority_comodity_estimate').value;
						
							total++;
							
							document.getElementById('non_priority_comodity_estimate').value = total;

							
							
							e.stopPropagation();
					  		e.preventDefault();

						})

						$('.dec-non-comodity-priority-estimate').unbind('click').click(function(e){

							total = document.getElementById('non_priority_comodity_estimate').value;
							
							total--;
							if(total<0){
								total = 0;
							}
							document.getElementById('non_priority_comodity_estimate').value = total;

							e.stopPropagation();
					  		e.preventDefault();

						})

						$('.inc-non-comodity-priority-damage').unbind('click').click(function(e){

							total = document.getElementById('non_priority_comodity_damage').value;
							
							total++;
							
							document.getElementById('non_priority_comodity_damage').value = total;

							e.stopPropagation();
					  		e.preventDefault();

						})

						$('.dec-non-comodity-priority-damage').unbind('click').click(function(e){

							total = document.getElementById('non_priority_comodity_damage').value;
							
							total--;
							if(total<0){
								total = 0;
							}
							document.getElementById('non_priority_comodity_damage').value = total;

							e.stopPropagation();
					  		e.preventDefault();

						})

						$('.inc-non-comodity-priority-harvest-qty').unbind('click').click(function(e){

							
							if(cron5){
								total = document.getElementById('non_priority_comodity_harvest_quantity').value;
							
								total++;
								
								document.getElementById('non_priority_comodity_harvest_quantity').value = total;

							}else{

								myApp.alert("Hanya bisa diisi pada saat minggu ke 5 setelah masa tanam","notifikasi")

							}

							
							e.stopPropagation();
					  		e.preventDefault();

						})

						$('.dec-non-comodity-priority-harvest-qty').unbind('click').click(function(e){

							if(cron5){
								total = document.getElementById('non_priority_comodity_harvest_quantity').value;
							
								total--;
								if(total<0){
									total = 0;
								}
								document.getElementById('non_priority_comodity_harvest_quantity').value = total;

							}else{
								myApp.alert("Hanya bisa diisi pada saat minggu ke 5 setelah masa tanam","notifikasi")

							}

							
							e.stopPropagation();
					  		e.preventDefault();

						})

						$('.inc-non-comodity-priority-qty-after-damage').unbind('click').click(function(e){

							if(cron5){
								total = document.getElementById('non_priority_comodity_quantity_after_damage').value;
							
								total++;
								
								document.getElementById('non_priority_comodity_quantity_after_damage').value = total;

							}else{
								myApp.alert("Hanya bisa diisi pada saat minggu ke 5 setelah masa tanam","notifikasi")

							}
							
							e.stopPropagation();
					  		e.preventDefault();

						})

						$('.dec-non-comodity-priority-qty-after-damage').unbind('click').click(function(e){

							if(cron5){
								total = document.getElementById('non_priority_comodity_quantity_after_damage').value;
							
								total--;
								if(total<0){
									total = 0;
								}
								document.getElementById('non_priority_comodity_quantity_after_damage').value = total;

							}else{
								myApp.alert("Hanya bisa diisi pada saat minggu ke 5 setelah masa tanam","notifikasi")

							}

							
							e.stopPropagation();
					  		e.preventDefault();

						})

						$('.cancel-non-comodity-priority').click(function(){
							calendarNonComodityPlanRange.destroy();
							calendarNonComodityHarvestRange.destroy();
						})

						$('.submit-non-comodity-priority').unbind('click').click(function(e){
							
							//add new field on comodity

							var harvestEstimateTotalVal = document.getElementById('non_priority_comodity_estimate').value;
							var damageTotalVal = document.getElementById('non_priority_comodity_damage').value;
							var harvestTotalVal = document.getElementById('non_priority_comodity_harvest_quantity').value;
							var damageAfterTotalVal = document.getElementById('non_priority_comodity_quantity_after_damage').value;
						
							insertAddFieldComodityNonParse(id,"harvest_estimate_total",harvestEstimateTotalVal);
							insertAddFieldComodityNonParse(id,"damage_total",damageTotalVal);
							insertAddFieldComodityNonParse(id,"harvest_total",harvestTotalVal);
							insertAddFieldComodityNonParse(id,"damage_after_total",damageAfterTotalVal);

							showLoading();

							myApp.closeModal('.popup-comodity-non-priority-item');

							setTimeout(function() {				
								hideLoading();
								mainView.router.reloadPage('view/seller/comodity_notification.html');
								myApp.alert("data berhasil disimpan","notifikasi");

							}, 1000);

							

							e.stopPropagation();
					  		e.preventDefault();

							
						})


					}
	  			}

		  	}

		 })

	}
	
})
