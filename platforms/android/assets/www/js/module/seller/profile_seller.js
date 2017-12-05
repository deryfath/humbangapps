myApp.onPageInit('profile_seller_list', function (page) {

	$('#fab').css("display","none");

	$('.back').click(function(){
		mainView.router.back({
  				url:'index.html',
  				force:true
  			});
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
				// 	$('#notification_seller_index').click(function(){
				// 		mainView.router.load({
				// 		  url: 'view/seller/notification_seller.html',
				// 		  animatePages: true
				// 		});
				// 	})

				// 	$('#notification_comodity_index').css('display','block');
				// 	$('#notification_comodity_index').click(function(){
				// 		mainView.router.load({
				// 		  url: 'view/seller/comodity_notification.html',
				// 		  animatePages: true
				// 		});
				// 	})
				if(Template7.global.arrDataCart.length > 0 ){

					$('.notification-total').html(Template7.global.arrDataCart.length);
				}

				getCounterNotificationNonPriorityComodity();

			}, 300);

		}else{
			// $('#notification_seller_index').css('display','none');
			// $('#notification_comodity_index').css('display','none');
		}

	})


	//COMODITY PROFILE

    var initEmptyComodityPage = '<div class="content-block-inner">'+
							'<div class="list-block" style="margin-top: 20%;margin-bottom: 20%;color:gray;">'+
								'<div style="text-align: center;margin-bottom: 10px;font-weight: bold;">'+
									'Empty Comodity'+
								'</div>'+
								'<div id="add_init_comodity_profile" style="text-align: center;">'+
									'<i class="icon f7-icons" style="font-size: 48px;color:darkslategray;">add_round_fill</i>'+
								'</div>'+
							'</div>'+
						'</div>';

   
	//CHECK COMODITY
	getAllComodity();
						
	showLoading();
	setTimeout(function(){

		hideLoading();

			console.log(Template7.global.lengthComodity);


		if(Template7.global.lengthComodity==0){
			$('#comodity_profile_list').html(initEmptyComodityPage);
			Template7.global.backToProfile = true;
			$('#add_init_comodity_profile').click(function(){
				mainView.router.load({
				  url: 'view/seller/comodity_choose.html',
				  animatePages: true
				});
			})

			$('.toolbar-inner-home').html('');

		}else{
			$('#list_comodity_profile_exist').css("display","block");

			var arrComodity = Template7.global.arrDataComodity;
			console.log(arrComodity);

			loadWidgetComodityProfileChoose(arrComodity);

			$('#edit_profile_comodity').click(function(){
				console.log('add new');
				Template7.global.backToProfile = true;
				Template7.global.arrDataComodity = [];
				mainView.router.load({
				  url: 'view/seller/comodity_init.html',
				  animatePages: true,
				  reload:true
				});
			})
		}


	}, 1000);


	function loadWidgetComodityProfileChoose(arrComodity){


		$$.ajax({
		  	url: 'view/widget/comodity_item_init.html',
		  	statusCode: {
		    	404: function (xhr) { alert('page not found'); }
		  	},
		  	beforeSend : function(){   showLoading();  },
		  	success : function(data){

		  		var context = {data : arrComodity};

				console.log(context);
				
				// var obj = JSON.parse(context);
				// console.log(obj);

		       	hideLoading();

		       	$$('#comodity_profile_list').html(data);
		       	var template = $$('#comodity-confirm-template').html();
		        // console.log(typeof template);
			    var compiledTemplate = Template7.compile(template);

			    var html = compiledTemplate(context);
			  	$$('#comodity_profile_list').html(html);
				


		  	},
		  	error : function(){ alert('error');	}
		});

	}


	var userType;

	getSession();

	showLoading();
	setTimeout(function(){

		hideLoading();

		console.log(Template7.global.userdata);

		document.getElementById('name_profile_seller').value = Template7.global.userdata.fullname;
		document.getElementById('username_profile_seller').value = Template7.global.userdata.username;
		document.getElementById('email_profile_seller').value = Template7.global.userdata.email;
		document.getElementById('address_profile_seller').value = Template7.global.userdata.address;
		document.getElementById('phone_profile_seller').value = Template7.global.userdata.phone;
		document.getElementById('farm_name_profile').value = Template7.global.userdata.farm_name;
		document.getElementById('comodity_type_profile_seller').value = Template7.global.userdata.comodity_type;
		document.getElementById('certificate_profile_seller').value = Template7.global.userdata.certificate;

		if(Template7.global.userdata.image!=""){
			// if(Template7.global.userdata.gender=="male"){
				// $("#gender_profile_seller").val("male");
				$("#img_profile_seller").attr("src","data:image/jpeg;base64,"+Template7.global.userdata.image);
			// }else{
			// 	$("#gender_profile_seller").val("female");
			// 	$("#img_profile_seller").attr("src","data:image/jpeg;base64,"+Template7.global.imageData);

			// }	
		}else{
			// if(Template7.global.userdata.gender=="male"){
				// $("#gender_profile_seller").val("male");
				$("#img_profile_seller").attr("src","img/user-male.jpg");
			// }else{
			// 	$("#gender_profile_seller").val("female");
			// 	$("#img_profile_seller").attr("src","img/user-female.jpg");

			// }	
		}

		

		userType = Template7.global.userdata.usertype;

	}, 1000);


	$('#update_profile_btn').click(function(){

		var nameVal = document.getElementById('name_profile_seller').value;
		var userVal = document.getElementById('username_profile_seller').value;
		var passwordVal = document.getElementById('password_profile_seller').value;
		var emailVal = document.getElementById('email_profile_seller').value;
		var addressVal = document.getElementById('address_profile_seller').value;
		var phoneVal = document.getElementById('phone_profile_seller').value;
		var farmName = document.getElementById('farm_name_profile').value;
		var comodityType = $( "#comodity_type_profile_seller option:selected" ).text();
		var certificate = document.getElementById('certificate_profile_seller').value;

		console.log('test');

		updateProfile(nameVal,userVal,passwordVal,emailVal,addressVal,phoneVal,userType,farmName,comodityType,certificate,Template7.global.userdata.image);

		setTimeout(function(){

			mainView.router.reloadPage('view/seller/profile_seller.html');

		}, 1000);

	})

	//CAPTURE PHOTO
	$('#img_profile_seller').click(function(){
		console.log('camera click');
		capturePhotoEdit();
	})

	var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);
      $('#img_profile_li').html('');

       $('#img_profile_li').html('<div style="text-align:center;">'+
                         '<img id="img_profile_seller" src="data:image/jpeg;base64,'+imageData+'" style="border-radius: 50%;margin-top:20px;">'+
                       '</div>');
       Template7.global.imageData = imageData;

       //update image user session
       updateSessionImage(imageData,Template7.global.userdata.id);
       setTimeout(function(){

			mainView.router.reloadPage('view/seller/profile_seller.html');

		}, 1000);
      // Get image handle
      //
      // var smallImage = document.getElementById('img_profile_seller');

      // // Unhide image elements
      // //
      // smallImage.style.display = 'block';

      // // Show the captured photo
      // // The in-line CSS rules are used to resize the image
      // //
      // smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('img_profile_seller');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {

      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { 
      		quality: 50,
      		allowEdit: true,
      		targetWidth: 250,
            targetHeight: 250,
        	destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }


    //LOCATION PROFILE
 //   	getAllLocation();

 //   	var map = new google.maps.Map(document.getElementById('map_profile'), {
 //      zoom: 10,
 //      center: new google.maps.LatLng(-6.9034443, 107.5731165),
 //      mapTypeId: google.maps.MapTypeId.ROADMAP
 //    });

 //    var arrMarkers = {};

	// showLoading();
	// setTimeout(function(){

	// 	hideLoading();

	// 	if(Template7.global.lengthLocation>0){

	// 	    getMarkerFromDb();

	// 	}


	// }, 1000);

	// function getMarkerFromDb(){
	// 	var marker1, i;
	//     var markerId;

	//     for (i = 0; i < Template7.global.lengthLocation; i++) {  
	//       markerId = Template7.global.arrDataLocation[i].location_id;
	//       marker1 = new google.maps.Marker({
	//         position: new google.maps.LatLng(Template7.global.arrDataLocation[i].latitude, Template7.global.arrDataLocation[i].longitude),
	//         map: map,
	//         id: 'marker_' + Template7.global.arrDataLocation[i].location_id
	//       });
	// 	  arrMarkers[markerId] = marker1;
	// 	  bindMarkerEvents(marker1,Template7.global.arrDataLocation[i].location_id);   
	//     }
	// }

	// var bindMarkerEvents = function(marker,locationId) {
	//     google.maps.event.addListener(marker, "click", function (point) {
	//         var markerId = locationId // get marker id by using clicked point's coordinate
	//         var marker = arrMarkers[markerId]; // find marker
	//         console.log(arrMarkers);
	//         marker.setMap(null); // set markers setMap to null to remove it from map
	//     	delete arrMarkers[markerId]; // delete marker instance from markers object

	//         //remove DB
	// 	   	removeLocation(locationId);
	//     });
	// };


	// //setup before functions
	// var typingTimer;                //timer identifier
	// var doneTypingInterval = 1000;  //time in ms, 5 second for example
	// var $input = $('#location_input_profile');

	// //on keyup, start the countdown
	// $input.on('keyup', function () {
	//   clearTimeout(typingTimer);
	//   typingTimer = setTimeout(doneTyping, doneTypingInterval);
	// });

	// //on keydown, clear the countdown 
	// $input.on('keydown', function () {
	//   clearTimeout(typingTimer);
	// });

	// //user is "finished typing," do something
	// function doneTyping () {
	//   //do something
	//   var locationVal = document.getElementById('location_input_profile').value;
	//   console.log(locationVal);
	//   if(locationVal!=""){
	//   	var replaced = locationVal.split(' ').join('+');
	//   	getLatLngByAddress(replaced);

	//   	//remove keyboard android
	//   	var field = document.createElement('input');
	// 	field.setAttribute('type', 'text');
	// 	document.body.appendChild(field);

	// 	setTimeout(function() {
	// 	    field.focus();
	// 	    setTimeout(function() {
	// 	        field.setAttribute('style', 'display:none;');
	// 	    }, 30);
	// 	}, 30);
	//   }
	  
	// }		

 //    markerClickEvent();

 //    function markerClickEvent(){
 //    	google.maps.event.addListener(map, 'click', function(event) {
	  	   
	//   	   var locationId = makeid();

	// 	   var lat = event.latLng.lat();
	// 	   var lng = event.latLng.lng();
		   
	// 	   getAddressByLatLang(locationId,lat,lng);

	// 	   var markers = [];
	// 	   var marker = new google.maps.Marker({
	// 	        position: event.latLng,
	// 	        map: map,
	// 	        draggable: true
	// 	    });
	// 	    markers.push(marker);
	// 	    google.maps.event.addListener(marker, 'click', function() {
	// 	        marker.setMap(null);
	// 	        for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
	// 	        markers.splice(i, 1);

	// 	    	//remove DB
	// 	    	removeLocation(locationId);
	// 	    });
	// 	    google.maps.event.addListener(marker, 'dragend', function() {
	// 	    });
		    

	// 	});
 //    }

    
 //  	function getAddressByLatLang(locationId,lat,lng){

	// 	$$.ajax({
	// 	  	url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyC_Wkun7HEb1LxrGSGoxcloqrASp0UMlIM',
	// 	  	statusCode: {
	// 	    	404: function (xhr) { alert('page not found'); }
	// 	  	},
	// 	  	beforeSend : function(){   showLoading();  },
	// 	  	success : function(data){
				
	// 	       	hideLoading();

	// 			var obj = JSON.parse(data);

	// 			console.log(obj);

	// 			var farmNameVal = document.getElementById("farm_name_profile").value;
	// 			console.log(farmNameVal);
	// 			//insert DB
	// 			insertLocation(locationId,obj.results[0].formatted_address,lat,lng);
	// 	  	},
	// 	  	error : function(){ alert('error');	}
	// 	});

	// }

	// function getLatLngByAddress(address){

	// 	$$.ajax({
	// 	  	url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyC_Wkun7HEb1LxrGSGoxcloqrASp0UMlIM',
	// 	  	statusCode: {
	// 	    	404: function (xhr) { alert('page not found'); }
	// 	  	},
	// 	  	beforeSend : function(){   showLoading();  },
	// 	  	success : function(data){
				
	// 	       	hideLoading();

	// 			var obj = JSON.parse(data);
	// 			console.log(obj);

	// 			map = new google.maps.Map(document.getElementById('map_profile'), {
	// 		      zoom: 15,
	// 		      center: new google.maps.LatLng(obj.results[0].geometry.location.lat, obj.results[0].geometry.location.lng),
	// 		      mapTypeId: google.maps.MapTypeId.ROADMAP
	// 		    });

	// 		    markerClickEvent();

	// 		    if(Template7.global.lengthLocation>0){
	// 		    	getMarkerFromDb();
	// 		    }

	// 	  	},
	// 	  	error : function(){ alert('error');	}
	// 	});
	// }

    


})
