myApp.onPageInit('profile_consumer_list', function (page) {

	$('#fab').css("display","none");

	$('.back').click(function(){
		mainView.router.back({
  				url:'index.html',
  				force:true
  			});
		$('#fab').css("display","block");
		$('#fab').removeClass("speed-dial-opened");

    if(Template7.global.userdata.usertype=="consumer"){
      showLoading();
      setTimeout(function() {
        hideLoading();
        $('#notification_seller_index').css('display','none');
        $('#command-home-button').html(landingPageConsumer);

        $("#consumer_name_profile").text(Template7.global.userdata.fullname);
        $("#consumer_address_profile").text(Template7.global.userdata.address);

        getAllCart();

          setTimeout(function(){
            hideLoading();

            $('.cart-landing-total').html(Template7.global.arrDataCart.length);

          }, 1000);
        
      }, 1000);

    }

	})

  getSession();

	showLoading();
	setTimeout(function(){

		hideLoading();

		console.log(Template7.global.userdata);

		document.getElementById('name_profile_consumer').value = Template7.global.userdata.fullname;
		document.getElementById('username_profile_consumer').value = Template7.global.userdata.username;
		document.getElementById('email_profile_consumer').value = Template7.global.userdata.email;
		document.getElementById('address_profile_consumer').value = Template7.global.userdata.address;
		document.getElementById('phone_profile_consumer').value = Template7.global.userdata.phone;

		if(Template7.global.userdata.image!=""){
			// if(Template7.global.userdata.gender=="male"){
				// $("#gender_profile_consumer").val("male");
        console.log(Template7.global.userdata.image);
				$("#img_profile_consumer").attr("src","data:image/jpeg;base64,"+Template7.global.userdata.image);
			// }else{
			// 	$("#gender_profile_consumer").val("female");
			// 	$("#img_profile_consumer").attr("src","data:image/jpeg;base64,"+Template7.global.imageData);

			// }	
		}else{
			// if(Template7.global.userdata.gender=="male"){
				// $("#gender_profile_consumer").val("male");
				$("#img_profile_consumer").attr("src","img/user-male.jpg");
			// }else{
			// 	$("#gender_profile_consumer").val("female");
			// 	$("#img_profile_consumer").attr("src","img/user-female.jpg");

			// }	
		}

		

		userType = Template7.global.userdata.usertype;

	}, 1000);

	$('#update_profile_consumer_btn').click(function(){

		var nameVal = document.getElementById('name_profile_consumer').value;
		var userVal = document.getElementById('username_profile_consumer').value;
		var passwordVal = document.getElementById('password_profile_consumer').value;
		var emailVal = document.getElementById('email_profile_consumer').value;
		var addressVal = document.getElementById('address_profile_consumer').value;
		var phoneVal = document.getElementById('phone_profile_consumer').value;
		var userGenderSelect = document.getElementById("gender_profile_consumer");
		// var genderVal = userGenderSelect.options[userGenderSelect.selectedIndex].value;

		updateProfile(nameVal,userVal,passwordVal,emailVal,addressVal,phoneVal,userType,"","","",Template7.global.userdata.image);

    setTimeout(function(){
          mainView.router.reloadPage('view/consumer/profile_consumer.html');
    }, 1000);

	})

	//CAPTURE PHOTO
	$('#img_profile_consumer').click(function(){
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
      $('#img_profile_li_consumer').html('');

       $('#img_profile_li_consumer').html('<div style="text-align:center;">'+
                         '<img id="img_profile_consumer" src="data:image/jpeg;base64,'+imageData+'" style="border-radius: 50%;margin-top:20px;">'+
                       '</div>');
       Template7.global.imageData = imageData;

       //update image user session
       updateSessionImage(imageData,Template7.global.userdata.id);
       setTimeout(function(){
          mainView.router.reloadPage('view/consumer/profile_consumer.html');
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
      var largeImage = document.getElementById('img_profile_consumer');

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

})
