myApp.onPageInit('location_list', function (page) {

	// $('.toolbar-inner-home').html('<a href="#" class="button button-fill color-green save-location" style="margin: 0 auto;">Save</a>');

	$('#fab').css("display","none");

	// $('.toolbar-inner-home').html('<a href="#" class="submit-location" style="margin: 0 auto;"><i class="icon f7-icons" style="color: #143b41;">check_round_fill</i><span class="tabbar-label">CONFIRM</span></a>');

	// $('#tabbar_home').css("display","block");

	getAllLocation();

	$('.back').click(function(){
		$('#tabbar_home').css("display","none");
		$('#fab').css("display","block");
		$('#fab').removeClass("speed-dial-opened");
		Template7.global.arrDataLocation = [];
		arrMarkers = {};

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

	var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(-6.9034443, 107.5731165),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var arrMarkers = {};

	showLoading();
	setTimeout(function(){

		hideLoading();

		if(Template7.global.lengthLocation>0){

		    getMarkerFromDb();

		}


	}, 1000);

	function getMarkerFromDb(){
		var marker1, i;
	    var markerId;
	    for (i = 0; i < Template7.global.lengthLocation; i++) {  
	      markerId = Template7.global.arrDataLocation[i].location_id;
	      marker1 = new google.maps.Marker({
	        position: new google.maps.LatLng(Template7.global.arrDataLocation[i].latitude, Template7.global.arrDataLocation[i].longitude),
	        map: map,
	        id: 'marker_' + Template7.global.arrDataLocation[i].location_id
	      });
		  arrMarkers[markerId] = marker1;
		  bindMarkerEvents(marker1,Template7.global.arrDataLocation[i].location_id);   
	    }
	}

	var bindMarkerEvents = function(marker,locationId) {
	    google.maps.event.addListener(marker, "click", function (point) {
	        var markerId = locationId // get marker id by using clicked point's coordinate
	        var marker = arrMarkers[markerId]; // find marker
	        console.log(arrMarkers);
	        marker.setMap(null); // set markers setMap to null to remove it from map
	    	delete arrMarkers[markerId]; // delete marker instance from markers object

	        //remove DB
		   	removeLocation(locationId);
	    });
	};


	//setup before functions
	var typingTimer;                //timer identifier
	var doneTypingInterval = 1000;  //time in ms, 5 second for example
	var $input = $('#location_input');

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
	  //do something
	  var locationVal = document.getElementById('location_input').value;
	  console.log(locationVal);
	  if(locationVal!=""){
	  	var replaced = locationVal.split(' ').join('+');
	  	getLatLngByAddress(replaced);

	  	//remove keyboard android
	  	var field = document.createElement('input');
		field.setAttribute('type', 'text');
		document.body.appendChild(field);

		setTimeout(function() {
		    field.focus();
		    setTimeout(function() {
		        field.setAttribute('style', 'display:none;');
		    }, 30);
		}, 30);
	  }
	  
	}			

    markerClickEvent();

    function markerClickEvent(){
    	google.maps.event.addListener(map, 'click', function(event) {
	  	   
	  	   var locationId = makeid();

		   var lat = event.latLng.lat();
		   var lng = event.latLng.lng();
		   
		   getAddressByLatLang(locationId,lat,lng);

		   var markers = [];
		   var marker = new google.maps.Marker({
		        position: event.latLng,
		        map: map,
		        draggable: true
		    });
		    markers.push(marker);

		    myApp.alert("Lokasi berhasil disimpan","notifikasi");

		    google.maps.event.addListener(marker, 'click', function() {
		        marker.setMap(null);
		        for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
		        markers.splice(i, 1);

		    	//remove DB
		    	removeLocation(locationId);

		    	myApp.alert("Lokasi berhasil dihapus","notifikasi");

		    });
		    google.maps.event.addListener(marker, 'dragend', function() {
		    });
		    

		});
    }

    

  	function getAddressByLatLang(locationId,lat,lng){

		$$.ajax({
		  	url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyC_Wkun7HEb1LxrGSGoxcloqrASp0UMlIM',
		  	statusCode: {
		    	404: function (xhr) { alert('page not found'); }
		  	},
		  	beforeSend : function(){   showLoading();  },
		  	success : function(data){
				
		       	hideLoading();

				var obj = JSON.parse(data);

				console.log(obj);

				//insert DB
				insertLocation(locationId,obj.results[0].formatted_address,lat,lng);
		  	},
		  	error : function(){ alert('error');	}
		});

	}

	function getLatLngByAddress(address){

		$$.ajax({
		  	url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyC_Wkun7HEb1LxrGSGoxcloqrASp0UMlIM',
		  	statusCode: {
		    	404: function (xhr) { alert('page not found'); }
		  	},
		  	beforeSend : function(){   showLoading();  },
		  	success : function(data){
				
		       	hideLoading();

				var obj = JSON.parse(data);
				console.log(obj);

				map = new google.maps.Map(document.getElementById('map'), {
			      zoom: 15,
			      center: new google.maps.LatLng(obj.results[0].geometry.location.lat, obj.results[0].geometry.location.lng),
			      mapTypeId: google.maps.MapTypeId.ROADMAP
			    });

			    markerClickEvent();

			    if(Template7.global.lengthLocation>0){
			    	getMarkerFromDb();
			    }

		  	},
		  	error : function(){ alert('error');	}
		});
	}


	$('.submit-location').click(function(){

		$('.toolbar-inner-home').html('');
		console.log('confirm');
		// mainView.router.reloadPreviousPage('view/seller/comodity_init.html');
		mainView.router.load({
			url:'view/seller/profile_seller.html'
		});
	})



})
