myApp.onPageInit('comodity_list', function (page) {

		console.log(Template7.global.arrDataComodity);

		$('.toolbar-inner-home').html('<a href="#" class="next-choose" style="margin: 0 auto;"><i class="icon f7-icons" style="color: #143b41;">check_round_fill</i><span class="tabbar-label">Konfirmasi</span></a>');

		$('.back').click(function(){


			Template7.global.arrDataComodity = [];
			// mainView.router.reloadPreviousPage('view/seller/comodity_init.html');
			mainView.router.back({
  				url:'view/seller/comodity_init.html',
  				reload : true,
  				force : true
  			});
			
		})

		var arrItemId = [];

		var dataDummyJsonSembako = '{ "data": ['+

							'{"item_id":"1","item_name":"Beras Hitam","item_img":"img/buah-sayur/beras_hitam.jpg","item_type":"sembako"},'+
							'{"item_id":"2","item_name":"Beras Putih","item_img":"img/buah-sayur/beras_putih.jpg","item_type":"sembako"}'+
						
						']}';

		var dataDummyJsonSayuran = '{ "data": ['+

							'{"item_id":"3","item_name":"Brokoli","item_img":"img/buah-sayur/brokoli.jpg","item_type":"sayuran"},'+
							'{"item_id":"4","item_name":"Buncis","item_img":"img/buah-sayur/buncis.JPG","item_type":"sayuran"},'+
							'{"item_id":"5","item_name":"Cabai","item_img":"img/buah-sayur/cabai.JPG","item_type":"sayuran"},'+
							'{"item_id":"6","item_name":"Jagung","item_img":"img/buah-sayur/jagung.jpg","item_type":"sayuran"},'+
							'{"item_id":"7","item_name":"Kembang Kol","item_img":"img/buah-sayur/kembang_kol.jpg","item_type":"sayuran"},'+
							'{"item_id":"8","item_name":"Kentang","item_img":"img/buah-sayur/kentang.jpg","item_type":"sayuran"},'+
							'{"item_id":"9","item_name":"Sawi Putih","item_img":"img/buah-sayur/sawi_putih.jpg","item_type":"sayuran"},'+
							'{"item_id":"10","item_name":"Wortel","item_img":"img/buah-sayur/wortel.JPG","item_type":"sayuran"},'+
							'{"item_id":"11","item_name":"Ubi","item_img":"img/buah-sayur/ubi.jpg","item_type":"sayuran"},'+
							'{"item_id":"12","item_name":"Kacang Tanah","item_img":"img/buah-sayur/kacang_tanah.JPG","item_type":"sayuran"}'+

						']}';

		var dataDummyJsonBuah = '{ "data": ['+

							'{"item_id":"13","item_name":"Alpukat","item_img":"img/buah-sayur/alpukat.jpg","item_type":"buah"},'+
							'{"item_id":"14","item_name":"Durian","item_img":"img/buah-sayur/durian.jpg","item_type":"buah"},'+
							'{"item_id":"15","item_name":"Jambu Air","item_img":"img/buah-sayur/jambu_air.jpg","item_type":"buah"},'+
							'{"item_id":"16","item_name":"Jeruk","item_img":"img/buah-sayur/jeruk.jpg","item_type":"buah"},'+
							'{"item_id":"17","item_name":"Labu Kuning","item_img":"img/buah-sayur/labu_kuning.JPG","item_type":"buah"},'+
							'{"item_id":"18","item_name":"Nanas","item_img":"img/buah-sayur/nanas.jpg","item_type":"buah"},'+
							'{"item_id":"19","item_name":"Pisang","item_img":"img/buah-sayur/pisang.jpg","item_type":"buah"},'+
							'{"item_id":"20","item_name":"Raspberri","item_img":"img/buah-sayur/raspberri.jpg","item_type":"buah"},'+
							'{"item_id":"21","item_name":"Strwaberry","item_img":"img/buah-sayur/stroberi.jpg","item_type":"buah"},'+
							'{"item_id":"22","item_name":"Tomat","item_img":"img/buah-sayur/tomat.JPG","item_type":"buah"}'+

						']}';

		var dataDummyJsonOlahan = '{ "data": ['+

							'{"item_id":"23","item_name":"Bawang Merah","item_img":"img/buah-sayur/bawang_merah.JPG","item_type":"olahan"},'+
							'{"item_id":"24","item_name":"Bawang Putih","item_img":"img/buah-sayur/bawang_putih.JPG","item_type":"olahan"}'+
							

						']}';


		$('#tab_sembako_comodity').click(function(){
			$('.tab-comodity-category').removeClass("active");
			$(this).addClass("active");
			document.getElementById('img_sembako_comodity').src="img/allbar-blue.png";
			document.getElementById('img_sayur_comodity').src="img/vegetablebar.png";
			document.getElementById('img_buah_comodity').src="img/fruitbar.png";
			document.getElementById('img_olahan_comodity').src="img/olahan.png";
			// loadWidgetComodityChoose(dataDummyJsonSembako);
			// getItemList(4);
			 getItemList("item_sembako.json");
			 
		})

		$('#tab_sayur_comodity').click(function(){
			$('.tab-comodity-category').removeClass("active");
			$(this).addClass("active");
			document.getElementById('img_sembako_comodity').src="img/allbar.png";
			document.getElementById('img_sayur_comodity').src="img/vegetablebar-blue.png";
			document.getElementById('img_buah_comodity').src="img/fruitbar.png";
			document.getElementById('img_olahan_comodity').src="img/olahan.png";
			// loadWidgetComodityChoose(dataDummyJsonSayuran);
			// getItemList(1);
			getItemList("item_sayuran.json");
		})

		$('#tab_buah_comodity').click(function(){
			$('.tab-comodity-category').removeClass("active");
			$(this).addClass("active");
			document.getElementById('img_sembako_comodity').src="img/allbar.png";
			document.getElementById('img_sayur_comodity').src="img/vegetablebar.png";
			document.getElementById('img_buah_comodity').src="img/fruitbar-blue.png";
			document.getElementById('img_olahan_comodity').src="img/olahan.png";
			// loadWidgetComodityChoose(dataDummyJsonBuah);
			// getItemList(2);
			getItemList("item_buah.json");
		})

		$('#tab_olahan_comodity').click(function(){
			$('.tab-comodity-category').removeClass("active");
			$(this).addClass("active");
			document.getElementById('img_sembako_comodity').src="img/allbar.png";
			document.getElementById('img_sayur_comodity').src="img/vegetablebar.png";
			document.getElementById('img_buah_comodity').src="img/fruitbar.png";
			document.getElementById('img_olahan_comodity').src="img/olahan-blue.png";
			// loadWidgetComodityChoose(dataDummyJsonOlahan);
			// getItemList(3);
			getItemList("item_olahan.json");
		})

		// loadWidgetComodityChoose(dataDummyJsonSembako);

		// getItemList(4);
		getItemList("item_sembako.json");

		function getItemList(params){

			$$.ajax({
			  url: "https://catatani-ba229.firebaseio.com/"+params,
			  statusCode: {
			    404: function (xhr) {
			      alert('error request data');
			    },
			    500: function(xhr){
			    	alert('internal server error');
			    	hideLoading();
			    }
			  },
			  beforeSend : function(){
			     showLoading();
			  },
			  success : function(data){

			  	setTimeout(function(){
			  		var result = JSON.parse(data);
			  		hideLoading();

			  		console.log(result);

			  		loadWidgetComodityChoose(result,params);

			  	}, 500);
			  		

			  }
			});

		}

		function loadWidgetComodityChoose(dataObject,params){

		$$.ajax({
		  	url: 'view/widget/comodity_item_choose.html',
		  	statusCode: {
		    	404: function (xhr) { alert('page not found'); }
		  	},
		  	beforeSend : function(){   showLoading();  },
		  	success : function(data){

		  		if(params=="item_sembako.json"){
		  			getComodityByType("sembako");
		  		}else if(params=="item_sayuran.json"){
		  			getComodityByType("sayuran");
		  		}else if(params=="item_buah.json"){
		  			getComodityByType("buah");	
		  		}else if(params=="item_olahan.json"){
		  			getComodityByType("olahan");
		  		}
				
				setTimeout(function(){

				// dataObject = JSON.parse(dataObject);
				console.log(Template7.global.arrDataComodity);
				console.log(params);
		       	var counter = 1;

		       	// $$.each(dataObject.data, function (index, value) {

		       	// 	value.identifier = "cb"+counter;
		       	// 	counter++;	

		   //     		if(Template7.global.arrDataComodity.length>0){
					// 	var len = Template7.global.arrDataComodity.length;
					// 	for (i = 0; i < len; i++){
					// 		if(Template7.global.arrDataComodity[i].item_id==value.item_id.toString()){
					// 			// arrItemId.push(Template7.global.arrDataComodity[i].item_id);
					// 			value.checked = "checked";
					// 			value.comodity_id = Template7.global.arrDataComodity[i].id;
					// 			 break;
					// 		}else{
					// 			value.comodity_id = "";
					// 			value.checked = "";
					// 		}
					// 	}
					// }else{
					// 	value.comodity_id = "";
					// 	value.checked = "";
					// }

		       	// })

		       	console.log(dataObject);

		       	$$('#comodity_grid_list').html(data);
		       	var template = $$('#comodity-choose-template').html();
		        // console.log(typeof template);
			    var compiledTemplate = Template7.compile(template);

			    var html = compiledTemplate(dataObject);
			  	$$('#comodity_grid_list').html(html);

			  	hideLoading();

			  	var tablinks = document.getElementById('card-comodity-choose').getElementsByClassName('card-wrap-comodity');
			  	for (var i = 0, j = tablinks.length; i < j; i++) {
				    tablinks[i].onclick = function(){

					    name = $(this).data('name');
					    image = $(this).data('image');
					    item_id = $(this).data('id');
					    item_type = $(this).data('type');

					    $(this).addClass("close-panel");
						myApp.popup('.popup-comodity-item');

						var today = new Date();
						var yyyy = today.getFullYear().toString();
					  	var mm = (today.getMonth()+1).toString();
					  	var dd  = today.getDate().toString();

					  	 var mmChars = mm.split('');
  						 var ddChars = dd.split('');

  						 var todayDate = (ddChars[1]?dd:"0"+ddChars[0]) + '/' + (mmChars[1]?mm:"0"+mmChars[0]) + '/' + yyyy  ;

						var weekLater = new Date().setDate(today.getDate() + 7);
 

						document.getElementById('title_comodity').innerHTML = name;
						document.getElementById('image_comodity').src = image;
						document.getElementById('type_comodity').value = "";
						document.getElementById('total_comodity').value = "";
						document.getElementById('height_comodity').value = "";
						document.getElementById('weight_comodity').value = "";
						document.getElementById('min_price_comodity').value = "";
						document.getElementById('max_price_comodity').value = "";
						document.getElementById('plan_comodity').value = todayDate+"-"+todayDate;
						document.getElementById('harvest_comodity').value = todayDate+"-"+todayDate;
						document.getElementById('desc_comodity').value = "";

						//PLAN
						var calendarPlanRange = myApp.calendar({
						    input: '#plan_comodity',
						    dateFormat: 'd/m/yyyy',
						    toolbarTemplate: '<div class="toolbar">' + '<div class="toolbar-inner">' + '{{monthPicker}}' + '{{yearPicker}}' + '<a href="#" class="link close-picker">{{closeText}}</a>' + '</div>' + '</div>',
						    rangePicker: true
						  //   disabled: function (date) {
								// // console.log(document.getElementById('btn_inc_shop_'+id).value);

								// if (date.getFullYear() === today.getFullYear() && date.getMonth() >= today.getMonth() )  {
								// 	 	return false;
						            
						  //       }else {
						  //           return true;
						  //       }
								
							     
							        
							 //  }
						});

						var todayPlanSplit = todayDate.split("/");
						var todayPlanFormat = todayPlanSplit[1]+"/"+todayPlanSplit[0]+"/"+todayPlanSplit[2];

						var todayPlanArr = [todayPlanFormat,todayPlanFormat];

						calendarPlanRange.setValue(todayPlanArr);

						//COMODITY
						var calendarHarvestRange = myApp.calendar({
						    input: '#harvest_comodity',
						    dateFormat: 'd/m/yyyy',
						    toolbarTemplate: '<div class="toolbar">' + '<div class="toolbar-inner">' + '{{monthPicker}}' + '{{yearPicker}}' + '<a href="#" class="link close-picker">{{closeText}}</a>' + '</div>' + '</div>',
						    rangePicker: true
						  //   disabled: function (date) {
								// // console.log(document.getElementById('btn_inc_shop_'+id).value);

								// if (date.getFullYear() === today.getFullYear() && date.getMonth() >= today.getMonth() )  {
								// 	 	return false;
						            
						  //       }else {
						  //           return true;
						  //       }
								
							     
							        
							 //  }
						});

						var todayHarvestSplit = todayDate.split("/");
						var todayHarvestFormat = todayHarvestSplit[1]+"/"+todayHarvestSplit[0]+"/"+todayHarvestSplit[2];

						var todayHarvestArr = [todayHarvestFormat,todayHarvestFormat];

						calendarHarvestRange.setValue(todayHarvestArr);	

						$('#remove_comodity_btn').css('display','none');

						//coffee option 
						$("#origin_comodity").val("Sumatera - Dolok Sanggul");
						$('#other_origin_comodity').css('display','none');
						document.getElementById('other_origin_comodity').value = "";
						$("#process_comodity").val("Semi Wash");
						$('#other_process_comodity').css('display','none');
						document.getElementById('other_process_comodity_input').value = "";

						if(name=="Kopi" && item_id=="100"){
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

							var comodityType = document.getElementById('type_comodity').value;
							var total = document.getElementById('total_comodity').value;
							var comodityHeight = document.getElementById('height_comodity').value;
							var comodityWeight = document.getElementById('weight_comodity').value;
							var priceValMin = document.getElementById("min_price_comodity").value;
							var priceValMax = document.getElementById("max_price_comodity").value;
							var planVal = document.getElementById('plan_comodity').value;
							var harvestVal = document.getElementById('harvest_comodity').value;
							var descVal = document.getElementById('desc_comodity').value;
							var sameTypeComodity = false;
							var originVal = "";
							var processVal = "";

							if(name=="Kopi" && item_id=="100"){
								originVal = $("#origin_comodity option:selected").text();
								if(originVal == "lainnya"){
									originVal =  "lainnya/"+document.getElementById('other_origin_comodity').value;
								}

								processVal = $("#process_comodity option:selected").text();
								if(processVal== "lainnya"){
									processVal = "lainnya/"+document.getElementById('other_process_comodity_input').value;
								}
							}
							

							for (var i = 0; i < Template7.global.arrDataComodity.length; i++) {
								if (Template7.global.arrDataComodity[i].comodity_type == comodityType && Template7.global.arrDataComodity[i].name == name) {
									sameTypeComodity = true;
									break;
								}
							}


							var datePlanVal = planVal.split('-');
							var dateHarvestVal = harvestVal.split('-');

							console.log(dateHarvestVal[0]);
							console.log(dateHarvestVal[1]);
							console.log(datePlanVal[0]);
							console.log(datePlanVal[1]);
							console.log(item_type);

							//insert to database
							if(!sameTypeComodity){
								comodity(item_id,name,image,total,priceValMin,priceValMax,dateHarvestVal[0],dateHarvestVal[1],datePlanVal[0],datePlanVal[1],item_type,comodityType,comodityHeight,comodityWeight,descVal,originVal,processVal);	
								showLoading();
								myApp.closeModal('.popup-comodity-item');
								setTimeout(function(){

									hideLoading();

							   		// mainView.router.reloadPage('view/seller/comodity_choose.html');
							   		if(item_type=="sembako"){
							  			getItemList("item_sembako.json");
							  		}else if(item_type=="sayuran"){
							  			getItemList("item_sayuran.json");
							  		}else if(item_type=="buah"){
							  			getItemList("item_buah.json");	
							  		}else if(item_type=="olahan"){
							  			getItemList("item_olahan.json");
							  		}

							  		myApp.alert("komoditas berhasil ditambahkan","notifikasi");
									

								}, 1000)
								
							    calendarHarvestRange.destroy();
							    calendarPlanRange.destroy();
							}else{
								myApp.alert("jenis komoditas yang sama sudah ditambahkan sebelumnya","notifikasi");
							}
						   		

							

						   	// console.log(arrItemId);
					    								
						})

						$('.cancel-comodity').unbind('click').click(function(){

							 //   for(var i=0; i<arrItemId.length; i++){
								// 	if(item_id==arrItemId[i]){
								// 		arrItemId.splice($.inArray(arrItemId[i], arrItemId),1);
								// 	}
								// }	

							calendarPlanRange.destroy();
							calendarHarvestRange.destroy();

						})



				    }
				}

			  	$(".comodity-choose-checkbox").change(function() {

				    id = $(this).data('identifier');
				    comodityId = $(this).data('comodityid');
				    name = $(this).data('name');
				    image = $(this).data('image');
				    item_id = $(this).data('id');
				    item_type = $(this).data('type');

				    console.log("comodity ID"+comodityId);

					if(document.getElementById(id).checked) {

						// arrItemId.push(item_id);

						$(this).addClass("close-panel");
						myApp.popup('.popup-comodity-item');

						var today = new Date();
						var yyyy = today.getFullYear().toString();
					  	var mm = (today.getMonth()+1).toString();
					  	var dd  = today.getDate().toString();

					  	 var mmChars = mm.split('');
  						 var ddChars = dd.split('');

  						 var todayDate = (ddChars[1]?dd:"0"+ddChars[0]) + '/' + (mmChars[1]?mm:"0"+mmChars[0]) + '/' + yyyy  ;

						var weekLater = new Date().setDate(today.getDate() + 7);
 

						document.getElementById('title_comodity').innerHTML = name;
						document.getElementById('image_comodity').src = image;
						document.getElementById('total_comodity').value = "";
						document.getElementById('price_comodity').value = "";
						document.getElementById('plan_comodity').value = todayDate+"-"+todayDate;
						document.getElementById('harvest_comodity').value = todayDate+"-"+todayDate;

						//PLAN
						var calendarPlanRange = myApp.calendar({
						    input: '#plan_comodity',
						    dateFormat: 'd/m/yyyy',
						    toolbarTemplate: '<div class="toolbar">' + '<div class="toolbar-inner">' + '{{monthPicker}}' + '{{yearPicker}}' + '<a href="#" class="link close-picker">{{closeText}}</a>' + '</div>' + '</div>',
						    rangePicker: true
						  //   disabled: function (date) {
								// // console.log(document.getElementById('btn_inc_shop_'+id).value);

								// if (date.getFullYear() === today.getFullYear() && date.getMonth() >= today.getMonth() )  {
								// 	 	return false;
						            
						  //       }else {
						  //           return true;
						  //       }
								
							     
							        
							 //  }
						});

						var todayPlanSplit = todayDate.split("/");
						var todayPlanFormat = todayPlanSplit[1]+"/"+todayPlanSplit[0]+"/"+todayPlanSplit[2];

						var todayPlanArr = [todayPlanFormat,todayPlanFormat];

						calendarPlanRange.setValue(todayPlanArr);

						//COMODITY
						var calendarHarvestRange = myApp.calendar({
						    input: '#harvest_comodity',
						    dateFormat: 'd/m/yyyy',
						    toolbarTemplate: '<div class="toolbar">' + '<div class="toolbar-inner">' + '{{monthPicker}}' + '{{yearPicker}}' + '<a href="#" class="link close-picker">{{closeText}}</a>' + '</div>' + '</div>',
						    rangePicker: true
						  //   disabled: function (date) {
								// // console.log(document.getElementById('btn_inc_shop_'+id).value);

								// if (date.getFullYear() === today.getFullYear() && date.getMonth() >= today.getMonth() )  {
								// 	 	return false;
						            
						  //       }else {
						  //           return true;
						  //       }
								
							     
							        
							 //  }
						});

						var todayHarvestSplit = todayDate.split("/");
						var todayHarvestFormat = todayHarvestSplit[1]+"/"+todayHarvestSplit[0]+"/"+todayHarvestSplit[2];

						var todayHarvestArr = [todayHarvestFormat,todayHarvestFormat];

						calendarHarvestRange.setValue(todayHarvestArr);	


						$('.submit-comodity').unbind('click').click(function(){

							var total = document.getElementById('total_comodity').value;
							var priceVal = document.getElementById("price_comodity").value;
							var planVal = document.getElementById('plan_comodity').value;
							var harvestVal = document.getElementById('harvest_comodity').value;


							var datePlanVal = planVal.split('-');
							var dateHarvestVal = harvestVal.split('-');

							console.log(dateHarvestVal[0]);
							console.log(dateHarvestVal[1]);
							console.log(datePlanVal[0]);
							console.log(datePlanVal[1]);
							console.log(item_type);

							//insert to database
							comodity(item_id,name,image,total,priceVal,dateHarvestVal[0],dateHarvestVal[1],datePlanVal[0],datePlanVal[1],item_type);	
						   		

							showLoading();
							myApp.closeModal('.popup-comodity-item');
							setTimeout(function(){

								hideLoading();
								
						   		// mainView.router.reloadPage('view/seller/comodity_choose.html');
						   		if(item_type=="sembako"){
						  			getItemList("item_sembako.json");
						  		}else if(item_type=="sayuran"){
						  			getItemList("item_sayuran.json");
						  		}else if(item_type=="buah"){
						  			getItemList("item_buah.json");	
						  		}else if(item_type=="olahan"){
						  			getItemList("item_olahan.json");
						  		}

							}, 1000)

							
						    calendarHarvestRange.destroy();
						    calendarPlanRange.destroy();

						   	// console.log(arrItemId);
					    								
						})

						$('.cancel-comodity').unbind('click').click(function(){

							$('#'+id).prop('checked', false);	
							 //   for(var i=0; i<arrItemId.length; i++){
								// 	if(item_id==arrItemId[i]){
								// 		arrItemId.splice($.inArray(arrItemId[i], arrItemId),1);
								// 	}
								// }	

							calendarPlanRange.destroy();
							calendarHarvestRange.destroy();
						

						})

						// myApp.modal({
						// 		    title:  ''+name+'',
						// 		    text: '<div class="list-block" style="margin-bottom: -5px;">'+
						// 				  '<ul>'+
						// 				  	'<li style="margin-top: -24px;">'+
						// 				  		'<img src="'+image+'" style="margin-top: 10px;border-radius: 11px;max-width:60%;">'+
						// 				  	'</li>'+
						// 				  	'<li>'+
						// 				  		'<div class="item-content" style="font-size: 15px;margin-top: -11px;margin-bottom: -17px;font-weight: bold;">Quantity'+
						// 				    	'</div>'+
						// 				  	'</li>'+
						// 				    '<li>'+
						// 				      '<div class="item-content">'+
						// 				        '<div class="item-media"><i class="icon f7-icons" style="font-size:24px;">layers_fill</i></div>'+
						// 				        '<div class="item-inner" style="margin-left: 5px;">'+
						// 				          '<div class="item-title label" style="font-size:15px;">Total</div>'+
						// 				          '<div class="item-input">'+
						// 				            '<input type="text" id="total_harvest" style="font-size:15px;">'+
						// 				          '</div>'+
						// 				        '</div>'+
						// 				      '</div>'+
						// 				    '</li>'+
						// 				    '<li>'+
						// 				    	'<div class="item-content">'+
						// 				        '<div class="item-media" ><i class="icon f7-icons" style="font-size:24px;">layers_fill</i></div>'+
						// 				        '<div class="item-inner" style="margin-left: 5px;">'+
						// 				          '<div class="item-title label" style="font-size:15px;">Unit</div>'+
						// 				          '<div class="item-input">'+
						// 				          	'<select id="unit_harvest">'+
						// 				              '<option value="kg">Kg</option>'+
						// 				              '<option value="ton">Ton</option>'+
						// 				            '</select>'+
						// 				          '</div>'+
						// 				        '</div>'+
						// 				      '</div>'+
						// 				    '</li>'+
						// 				    '<li>'+
						// 				    	'<div class="item-content" style="margin-bottom: -13px;font-weight: bold;font-size: 15px;">Harvest Time'+
						// 				    	'</div>'+
						// 				    '</li>'+
						// 				    '<li>'+
						// 				      '<div class="item-content">'+
						// 				        '<div class="item-media" ><i class="icon f7-icons" style="font-size:24px;">calendar</i></div>'+
						// 				        '<div class="item-inner" style="margin-left: 5px;">'+
						// 				          '<div class="item-title label" style="font-size:15px;">Start</div>'+
						// 				          '<div class="item-input">'+
						// 				            '<input type="date" id="start_harvest" style="font-size:15px;" placeholder="Birth day" value="2014-04-30">'+
						// 				          '</div>'+
						// 				        '</div>'+
						// 				      '</div>'+
						// 				    '</li>'+
						// 				    '<li>'+
						// 				      '<div class="item-content">'+
						// 				        '<div class="item-media"><i class="icon f7-icons" style="font-size:24px;">calendar</i></div>'+
						// 				        '<div class="item-inner" style="margin-left: 5px;">'+
						// 				          '<div class="item-title label" style="font-size:15px;">Finish</div>'+
						// 				          '<div class="item-input">'+
						// 				            '<input type="date" id="finish_harvest" style="font-size:15px;" placeholder="Birth day" value="2014-04-30">'+
						// 				          '</div>'+
						// 				        '</div>'+
						// 				      '</div>'+
						// 				    '</li>'+
						// 				    '</ul>'+
						// 				   '</div>',
						// 		    buttons: [
						// 		      {
						// 		        text: 'Cancel',
						// 		        onClick: function() {
						// 				   $('#'+id).prop('checked', false);	
						// 				   for(var i=0; i<arrItemId.length; i++){
						// 						if(item_id==arrItemId[i]){
						// 							arrItemId.splice($.inArray(arrItemId[i], arrItemId),1);
						// 						}
						// 					}	
						// 				}
						// 		      },
						// 		      {
						// 		        text: 'Submit',
						// 		        onClick: function() {
						// 		        	var total = document.getElementById('total_harvest').value;
						// 					var unitTypeSelect = document.getElementById("unit_harvest");
						// 					var unit = unitTypeSelect.options[unitTypeSelect.selectedIndex].value;
						// 					var startHarvest = document.getElementById('start_harvest').value;
						// 					var finishHarvest = document.getElementById('finish_harvest').value;

						// 					//insert to database
										   
						// 				    comodity(item_id,name,image,total,unit,startHarvest,finishHarvest);	
										   	

						// 				   	console.log(arrItemId);


						// 		        }
						// 		      },
						// 		    ]
						// })
						

						
					}else{

						// for(var i=0; i<arrItemId.length; i++){
						// 	if(item_id==arrItemId[i]){
						// 		arrItemId.splice($.inArray(arrItemId[i], arrItemId),1);
								//remove from database
			       				removeComodity(comodityId,item_id);

			     //   				showLoading();
								// setTimeout(function(){
								// 	hideLoading();
									// mainView.router.reloadPage('view/seller/comodity_init.html');

								// }, 1000);

						// 	}
						// }		
						
			       		// console.log(arrItemId);

					}	


				});


			  	}, 1000);

		  	},
		  	error : function(){ alert('error');	}
		});
	}

	$('.next-choose').click(function(){
			  		console.log('next');
			  		
			  		getAllComodity();	

			  		showLoading();
			  		setTimeout(function(){

			  			if(Template7.global.lengthComodity==0){
			  				hideLoading();

				  			myApp.alert("Minimum 1 comodity",'Notice');
				  		}else{

				  			hideLoading();

				  			console.log('confirm');
				  			// mainView.router.reloadPreviousPage('view/seller/comodity_init.html');
				  			mainView.router.back({
				  				url:'view/seller/comodity_init.html',
				  				reload : true,
				  				force : true
				  			});
				  			Template7.global.arrDataComodity = [];

				  		}
			  		}, 1000);

			  		
			  		
			  	})


})
