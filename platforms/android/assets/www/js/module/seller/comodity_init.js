myApp.onPageInit('comodity_confirm_list', function (page) {

	$('#fab').css("display","none");
	$('.add-new-comodity').css("display","block");

	var initEmptyPage = '<div class="content-block-inner">'+
							'<div class="list-block" style="margin-top: 50%;margin-bottom: 50%;color:gray;">'+
								'<div style="text-align: center;margin-bottom: 10px;font-weight: bold;">'+
									'Empty Comodity'+
								'</div>'+
								'<div id="add_init_comodity" style="text-align: center;">'+
									'<i class="icon f7-icons" style="font-size: 48px;color:darkslategray;">add_round_fill</i>'+
								'</div>'+
							'</div>'+
						'</div>';

	var initEmptyPageCategory = '<div class="content-block-inner">'+
							'<div class="list-block" style="margin-top: 50%;margin-bottom: 50%;color:gray;">'+
								'<div style="text-align: center;margin-bottom: 10px;font-weight: bold;">'+
									'Empty Comodity'+
								'</div>'+
							'</div>'+
						'</div>';		

	console.log(Template7.global.backToProfile);

	$('#tabbar_home').css("display","block");

	$('.back').click(function(){

		console.log(Template7.global.backToProfile);
		
		$('#tabbar_home').css("display","none");
		
			hideLoading();
			if(Template7.global.backToProfile){
				console.log('masuk true');
				
				mainView.router.back({url : 'view/seller/profile_seller.html',force:true});
				$('.add-new-comodity').css("display","none");
				Template7.global.arrDataComodity = [];

				
			}else{
				mainView.router.back({url : 'index.html'});
				$('.toolbar-inner-home').html('');
				Template7.global.arrDataComodity = [];
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
					}, 300);

				}else{
					// $('#notification_seller_index').css('display','none');
					// $('#notification_comodity_index').css('display','none');
				}
			}
		
	})

	//CHECK COMODITY
	getAllComodity();

	showLoading();
	setTimeout(function(){

		console.log(Template7.global.lengthComodity);
	
		if(Template7.global.lengthComodity==0){
			hideLoading();

			$('#comodity_confirm_grid_list').html(initEmptyPage);
			$('#add_init_comodity').click(function(){
				mainView.router.load({
				  url: 'view/seller/comodity_choose.html',
				  animatePages: true
				});
			})

			$('.toolbar-inner-home').html('');	
			$('#navbar_comodity_init').css('display','none');

		}else{

			$('.toolbar-inner-home').html('<a href="#" class="add-new-comodity" style="margin: 0 auto;"><i class="icon f7-icons" style="color: #143b41;">add_round_fill</i><span style="text-align:center;" class="tabbar-label">Tambah</span></a>');
			$('#navbar_comodity_init').css('display','block');
			console.log('NOT ZERO COMODITY');

			var arrComodity;
	
			getComodityByType("sembako");

			setTimeout(function() {
				hideLoading();
				arrComodity = Template7.global.arrDataComodity;
				console.log(arrComodity);

				if(Template7.global.lengthComodity>0){
				    loadWidgetComodityChoose(arrComodity);
				}else{
					$('#comodity_confirm_grid_list').html(initEmptyPageCategory);
				}

			}, 2000);


			$('#tab_sembako_comodity_init').click(function(){
				$('.tab-comodity-init-category').removeClass("active");
				$(this).addClass("active");
				document.getElementById('img_sembako_comodity_init').src="img/allbar-blue.png";
				document.getElementById('img_sayur_comodity_init').src="img/vegetablebar.png";
				document.getElementById('img_buah_comodity_init').src="img/fruitbar.png";
				document.getElementById('img_olahan_comodity_init').src="img/olahan.png";
				
				getComodityByType("sembako");

				showLoading();
				setTimeout(function() {

					hideLoading();
					arrComodity = Template7.global.arrDataComodity;
					if(Template7.global.lengthComodity>0){
						loadWidgetComodityChoose(arrComodity);
					}else{
						$('#comodity_confirm_grid_list').html(initEmptyPageCategory);
					}

				}, 2000);
			})

			$('#tab_sayur_comodity_init').click(function(){
				$('.tab-comodity-init-category').removeClass("active");
				$(this).addClass("active");
				document.getElementById('img_sembako_comodity_init').src="img/allbar.png";
				document.getElementById('img_sayur_comodity_init').src="img/vegetablebar-blue.png";
				document.getElementById('img_buah_comodity_init').src="img/fruitbar.png";
				document.getElementById('img_olahan_comodity_init').src="img/olahan.png";

				getComodityByType("sayuran");

				showLoading();
				setTimeout(function() {

					hideLoading();
					arrComodity = Template7.global.arrDataComodity;
					console.log(Template7.global.lengthComodity);
					if(Template7.global.lengthComodity>0){
						loadWidgetComodityChoose(arrComodity);
					}else{
						$('#comodity_confirm_grid_list').html(initEmptyPageCategory);
					}

				}, 2000);

			})

			$('#tab_buah_comodity_init').click(function(){
				$('.tab-comodity-init-category').removeClass("active");
				$(this).addClass("active");
				document.getElementById('img_sembako_comodity_init').src="img/allbar.png";
				document.getElementById('img_sayur_comodity_init').src="img/vegetablebar.png";
				document.getElementById('img_buah_comodity_init').src="img/fruitbar-blue.png";
				document.getElementById('img_olahan_comodity_init').src="img/olahan.png";
				
				getComodityByType("buah");

				showLoading();
				setTimeout(function() {

					hideLoading();
					arrComodity = Template7.global.arrDataComodity;
					if(Template7.global.lengthComodity>0){
						loadWidgetComodityChoose(arrComodity);
					}else{
						$('#comodity_confirm_grid_list').html(initEmptyPageCategory);
					}

				}, 2000);

			})

			$('#tab_olahan_comodity_init').click(function(){
				$('.tab-comodity-init-category').removeClass("active");
				$(this).addClass("active");
				document.getElementById('img_sembako_comodity_init').src="img/allbar.png";
				document.getElementById('img_sayur_comodity_init').src="img/vegetablebar.png";
				document.getElementById('img_buah_comodity_init').src="img/fruitbar.png";
				document.getElementById('img_olahan_comodity_init').src="img/olahan-blue.png";
				
				getComodityByType("olahan");

				showLoading();
				setTimeout(function() {

					hideLoading();
					arrComodity = Template7.global.arrDataComodity;
					if(Template7.global.lengthComodity>0){
						loadWidgetComodityChoose(arrComodity);
					}else{
						$('#comodity_confirm_grid_list').html(initEmptyPageCategory);
					}

				}, 2000);

			})


			$('.add-new-comodity').click(function(){
				console.log('add new');
				mainView.router.load({
				  url: 'view/seller/comodity_choose.html',
				  animatePages: true
				});
			})
		}


	}, 2000);


	function loadWidgetComodityChoose(arrComodity){


		$$.ajax({
		  	url: 'view/widget/comodity_item_init.html',
		  	statusCode: {
		    	404: function (xhr) { alert('page not found'); }
		  	},
		  	beforeSend : function(){   showLoading();  },
		  	success : function(data){

		  		var context = {data : arrComodity};

				console.log(context);

				var counter = 1;

				$$.each(context.data, function (index, value) {

		       		value.identifier = "cb"+counter;
		       		counter++;	

		       		if(parseInt(value.total)<2){
		       			value.limit_stock = true;
		       		}

		       })
				
				// var obj = JSON.parse(context);
				// console.log(obj);

		       	hideLoading();

		       	$$('#comodity_confirm_grid_list').html(data);
		       	var template = $$('#comodity-confirm-template').html();
		        // console.log(typeof template);
			    var compiledTemplate = Template7.compile(template);

			    var html = compiledTemplate(context);
			  	$$('#comodity_confirm_grid_list').html(html);

			  	var tablinks = document.getElementById('card-comodity-confirm').getElementsByClassName('card-comodity-init');

			  	// console.log(tablinks);

				for (var i = 0, j = tablinks.length; i < j; i++) {
				    tablinks[i].onclick = function(){
				    	var id = $(this).data('id');
				    	var name = $(this).data('name');
				    	var image = $(this).data('img');
				    	var harvestStartDate = $(this).data('start_harvest');
				    	var harvestFinishDate = $(this).data('finish_harvest');
				    	var planStartDate = $(this).data('start_plan');
				    	var planFinishDate = $(this).data('finish_plan');
				    	var total = $(this).data('total');
				    	var priceMin = $(this).data('price_min');
				    	var priceMax = $(this).data('price_max');
				    	var userid = $(this).data('userid');
				    	var comodityId = $(this).data('comodityid');
				    	var comodityType = $(this).data('comodity_type');
				    	var comodityHeight = $(this).data('height');
				    	var comodityWeight = $(this).data('weight');
				    	var desc = $(this).data('desc');
				    	var origin = $(this).data('origin');
				    	var process = $(this).data('process');

						console.log(id);

						$(this).addClass("close-panel");
						myApp.popup('.popup-comodity-item');

						$('#remove_comodity_btn').css('display','block');


						var splitOrigin = origin.split("/");

						console.log(splitOrigin);
						if(splitOrigin[1]== undefined || splitOrigin[1]==null){

							$("#origin_comodity").val(origin);
							document.getElementById('other_origin_comodity').value = "";
							$('#other_origin_comodity').css('display','none');
							
						}else{

							$("#origin_comodity").val(splitOrigin[0]);
							document.getElementById('other_origin_comodity').value = splitOrigin[1];
							$('#other_origin_comodity').css('display','block');
						}

						var splitProcess = process.split("/");
						console.log(splitProcess);
						if(splitProcess[1]== undefined || splitProcess[1]== null){

							$("#process_comodity").val(process);
							document.getElementById('other_process_comodity_input').value = "";
							$('#other_process_comodity').css('display','none');
							
						}else{
							
							console.log(splitProcess[1]);
							$("#process_comodity").val(splitProcess[0]);
							document.getElementById('other_process_comodity_input').value = splitProcess[1];
							$('#other_process_comodity').css('display','block');
						}

						//coffee option 
						if(name=="Kopi" && id=="100"){
							console.log('sama Kopi');

							$('#origin_comodity_grid_text').css('display','block');
							$('#origin_comodity_grid').css('display','block');
							$('#process_comodity_grid').css('display','block');
							
						}else{
							$('#origin_comodity_grid_text').css('display','none');
							$('#origin_comodity_grid').css('display','none');
							$('#process_comodity_grid').css('display','none');
						}

						$('.submit-comodity').unbind('click').click(function(){

							var totalval = document.getElementById('total_comodity').value;
							var priceMinVal = document.getElementById("min_price_comodity").value;
							var priceMaxVal = document.getElementById("max_price_comodity").value;
							var planVal = document.getElementById('plan_comodity').value;
							var harvestVal = document.getElementById('harvest_comodity').value;
							var comodityTypeVal = document.getElementById('type_comodity').value;
							var heightVal = document.getElementById('height_comodity').value;
							var weightVal = document.getElementById('weight_comodity').value;
							var descVal = document.getElementById('desc_comodity').value;

							var originVal = $("#origin_comodity option:selected").text();
							if(originVal == "lainnya"){
								originVal =  "lainnya/"+document.getElementById('other_origin_comodity').value;
							}

							var processVal = $("#process_comodity option:selected").text();
							if(processVal== "lainnya"){
								processVal = "lainnya/"+document.getElementById('other_process_comodity_input').value;
							}


							var dateHarvestVal = harvestVal.split('-');
							var datePlanVal = planVal.split('-');

							console.log(dateHarvestVal[0]);
							console.log(dateHarvestVal[1]);
							console.log(datePlanVal[0]);
							console.log(datePlanVal[1]);

					    	updateComodity(comodityId,totalval,priceMinVal,priceMaxVal,dateHarvestVal[0],dateHarvestVal[1],datePlanVal[0],datePlanVal[1],id,userid,comodityTypeVal,heightVal,weightVal,descVal,originVal,processVal);
					    	
							myApp.closeModal('.popup-comodity-item');

							showLoading();
							setTimeout(function(){
								hideLoading();
								mainView.router.reloadPage('view/seller/comodity_init.html');

							}, 1000);



							calendarInitHarvestRange.destroy();
							calendarInitPlanRange.destroy();
					    								
						})

						$('.cancel-comodity').unbind('click').click(function(){

							calendarInitHarvestRange.destroy();
							calendarInitPlanRange.destroy();


						})

						$('#remove_comodity_btn').unbind('click').click(function(){

							myApp.confirm('apakah anda yakin mau menghapus komoditas ini?', 
						      function () {

						        removeComodity(comodityId,id);

						        myApp.closeModal('.popup-comodity-item');

								showLoading();
								setTimeout(function(){
									hideLoading();
									mainView.router.reloadPage('view/seller/comodity_init.html');

								}, 1000);
						      },
						      function () {
						      }
						    );
						})


							  // myApp.modal({
								 //    title:  ''+name+'',
								 //    text: '<div class="list-block" style="margin-bottom: -5px;">'+
									// 	  '<ul>'+
									// 	  	'<li style="margin-top: -24px;">'+
									// 	  		'<img src="'+image+'" style="margin-top: 10px;border-radius: 11px;max-width:60%;">'+
									// 	  	'</li>'+
									// 	  	'<li>'+
									// 	  		'<div class="item-content" style="font-size: 15px;margin-top: -11px;margin-bottom: -17px;font-weight: bold;">Quantity'+
									// 	    	'</div>'+
									// 	  	'</li>'+
									// 	    '<li>'+
									// 	      '<div class="item-content">'+
									// 	        '<div class="item-media"><i class="icon f7-icons" style="font-size:24px;">layers_fill</i></div>'+
									// 	        '<div class="item-inner" style="margin-left: 5px;">'+
									// 	          '<div class="item-title label" style="font-size:15px;">Total</div>'+
									// 	          '<div class="item-input">'+
									// 	            '<input type="text" id="total_init" style="font-size:15px;">'+
									// 	          '</div>'+
									// 	        '</div>'+
									// 	      '</div>'+
									// 	    '</li>'+
									// 	    '<li>'+
									// 	    	'<div class="item-content">'+
									// 	        '<div class="item-media" ><i class="icon f7-icons" style="font-size:24px;">layers_fill</i></div>'+
									// 	        '<div class="item-inner" style="margin-left: 5px;">'+
									// 	          '<div class="item-title label" style="font-size:15px;">Unit</div>'+
									// 	          '<div class="item-input">'+
									// 	            '<select id="unit_init">'+
									// 	              '<option value="kg">Kg</option>'+
									// 	              '<option value="ton">Ton</option>'+
									// 	            '</select>'+
									// 	          '</div>'+
									// 	        '</div>'+
									// 	      '</div>'+
									// 	    '</li>'+
									// 	    '<li>'+
									// 	    	'<div class="item-content" style="margin-bottom: -13px;font-weight: bold;font-size: 15px;">Harvest Time'+
									// 	    	'</div>'+
									// 	    '</li>'+
									// 	    '<li>'+
									// 	      '<div class="item-content">'+
									// 	        '<div class="item-media" ><i class="icon f7-icons" style="font-size:24px;">calendar</i></div>'+
									// 	        '<div class="item-inner" style="margin-left: 5px;">'+
									// 	          '<div class="item-title label" style="font-size:15px;">Start</div>'+
									// 	          '<div class="item-input">'+
									// 	            '<input type="text" id="start_init" style="font-size:15px;">'+
									// 	          '</div>'+
									// 	        '</div>'+
									// 	      '</div>'+
									// 	    '</li>'+
									// 	    '<li>'+
									// 	      '<div class="item-content">'+
									// 	        '<div class="item-media"><i class="icon f7-icons" style="font-size:24px;">calendar</i></div>'+
									// 	        '<div class="item-inner" style="margin-left: 5px;">'+
									// 	          '<div class="item-title label" style="font-size:15px;">Finish</div>'+
									// 	          '<div class="item-input">'+
									// 	            '<input type="date" id="finish_init" style="font-size:15px;">'+
									// 	          '</div>'+
									// 	        '</div>'+
									// 	      '</div>'+
									// 	    '</li>'+
									// 	    '</ul>'+
									// 	   '</div>',
								 //    buttons: [
								 //      {
								 //        text: 'Cancel',
								 //        onClick: function() {
								 //        }
								 //      },
								 //      {
								 //        text: 'Update',
								 //        onClick: function() {

								 //        	var totalval = document.getElementById('total_init').value;
									// 		var unitTypeSelect = document.getElementById("unit_init");
									// 		var unitVal = unitTypeSelect.options[unitTypeSelect.selectedIndex].value;
									// 		var startVal = document.getElementById('start_init').value;
									// 		var finishVal = document.getElementById('finish_init').value;

								 //        	updateComodity(totalval,unitVal,startVal,finishVal,id,userid);
								 //        	showLoading();
								 //        	setTimeout(function() {

								 //        		hideLoading();
								 //        		mainView.router.reloadPage('view/seller/comodity_init.html');
								 //        	}, 1000);	
								 //        }
								 //      },
								 //    ]
								 //  })

						
						document.getElementById('title_comodity').innerHTML = name;
						document.getElementById('image_comodity').src = image;
						document.getElementById('total_comodity').value = total;
						document.getElementById('min_price_comodity').value = priceMin;
						document.getElementById('max_price_comodity').value = priceMax;
						document.getElementById('type_comodity').value = comodityType;
						document.getElementById('weight_comodity').value = comodityWeight;
						document.getElementById('height_comodity').value = comodityHeight;
						document.getElementById('desc_comodity').value = desc;

						//PLAN TIME
						planStartDate = planStartDate.replace(/\s/g, '');

						var startPlanSplit = planStartDate.split("/");
						var startPlanFormat = startPlanSplit[1]+"/"+startPlanSplit[0]+"/"+startPlanSplit[2];

						planFinishDate = planFinishDate.replace(/\s/g, '');

						var finishPlanSplit = planFinishDate.split("/");
						var finishPlanFormat = finishPlanSplit[1]+"/"+finishPlanSplit[0]+"/"+finishPlanSplit[2];

						var calendarInitPlanRange = myApp.calendar({
						    input: '#plan_comodity',
						    dateFormat: 'd/m/yyyy',
						    toolbarTemplate: '<div class="toolbar">' + '<div class="toolbar-inner">' + '{{monthPicker}}' + '{{yearPicker}}' + '<a href="#" class="link close-picker">{{closeText}}</a>' + '</div>' + '</div>',
						    rangePicker: true
						});

						var values = [startPlanFormat, finishPlanFormat];

						console.log(values);

						calendarInitPlanRange.setValue(values);


						//HARVEST TIME
						harvestStartDate = harvestStartDate.replace(/\s/g, '');

						var startHarvestSplit = harvestStartDate.split("/");
						var startHarvestFormat = startHarvestSplit[1]+"/"+startHarvestSplit[0]+"/"+startHarvestSplit[2];

						harvestFinishDate = harvestFinishDate.replace(/\s/g, '');

						var finishHarvestSplit = harvestFinishDate.split("/");
						var finishHarvestFormat = finishHarvestSplit[1]+"/"+finishHarvestSplit[0]+"/"+finishHarvestSplit[2];

						var calendarInitHarvestRange = myApp.calendar({
						    input: '#harvest_comodity',
						    dateFormat: 'd/m/yyyy',
						    toolbarTemplate: '<div class="toolbar">' + '<div class="toolbar-inner">' + '{{monthPicker}}' + '{{yearPicker}}' + '<a href="#" class="link close-picker">{{closeText}}</a>' + '</div>' + '</div>',
						    rangePicker: true
						});

						var values = [startHarvestFormat, finishHarvestFormat];

						console.log(values);

						calendarInitHarvestRange.setValue(values);

				    };
				}


		  	},
		  	error : function(){ alert('error');	}
		});

	}

	// Get all variables
	// var bannerImage = document.getElementById('bannerImg');
	// var result = document.getElementById('res');
	// var img = document.getElementById('tableBanner');

	// // Add a change listener to the file input to inspect the uploaded file.
	// bannerImage.addEventListener('change', function() {
	//     var file = this.files[0];
	//     // Basic type checking.
	//     if (file.type.indexOf('image') < 0) {
	//         res.innerHTML = 'invalid type';
	//         return;
	//     }

	//     // Create a file reader
	//     var fReader = new FileReader();

	//     // Add complete behavior
	//     fReader.onload = function() {
	//         // Show the uploaded image to banner.
	//         img.src = fReader.result;

	//         // Save it when data complete.
	//         // Use your function will ensure the format is png.
	//         localStorage.setItem("imgData", getBase64Image(img));
	//         // You can just use as its already a string.
	//         // localStorage.setItem("imgData", fReader.result);
	//     };

	//     // Read the file to DataURL format.
	//     fReader.readAsDataURL(file);
	// });

	// function getBase64Image(img) {
	//     var canvas = document.createElement("canvas");
	//     canvas.width = img.width;
	//     canvas.height = img.height;

	//     var ctx = canvas.getContext("2d");
	//     ctx.drawImage(img, 0, 0);

	//     var dataURL = canvas.toDataURL("image/png");

	//     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	// }

	// function fetchimage () {
	//     var dataImage = localStorage.getItem('imgData');
	//     img.src = "data:image/png;base64," + dataImage;
	//     // If you don't process the url with getBase64Image, you can just use
	//     // img.src = dataImage;
	//     // console.log(img.src);
	// }

	// // Call fetch to get image from localStorage.
	// // So each time you reload the page, the image in localstorage will be 
	// // put on tableBanner
	// fetchimage();

})