myApp.onPageInit('payment', function (page) {

  var imageClick = false;

	$("#img_memo_payment").attr("src","img/photo-camera-memo.png");

	$('#img_memo_payment').click(function(){

    $('#continue_payment').css('background','#3b8398');
    $('#text_upload_memo').css('display','none');

    imageClick = true;
		console.log('camera click');
		capturePhotoEdit();
	})

  var purchaseId = page.query.purchase_id;
	var purchaseLineId = page.query.purchase_line_id;

	console.log(purchaseId);

	$('#continue_payment').click(function(){

		 var imageSrc = document.getElementById('img_memo_payment').src;

     showLoading();

     if (!imageClick) {
        
        hideLoading();
        myApp.alert("Upload Foto Untuk Melanjutkan","Notifikasi")

     }else{

          var dataSend = {
                 id : purchaseId,
                 image : imageSrc,
                 image_type : "payment"
            } 

            console.log(dataSend);

          $.ajax({
              type: "POST",
              url: "http://plantera.iotera.io/update_image.php",
              data: dataSend,
              success: function(data){

               console.log(data);


                hideLoading();
                mainView.router.load({
                  url : 'view/seller/comodity_delivery.html?purchase_line_id='+purchaseLineId
                });



              }
          });

     }

		 
          

          

		
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
      $('#img_payment_li').html('');

       $('#img_payment_li').html('<div style="text-align:center;">'+
                         '<img id="img_memo_payment" src="data:image/jpeg;base64,'+imageData+'" style="margin-top:40px;max-width:70%;">'+
                         '<span><i id="replace_image_memo" class="icon f7-icons" style="color:#8fb7c9;font-size: 38px;margin-top: -40px;margin-left: -45px;">refresh_round_fill</i></span>'+
                       '</div>');

      $('#img_memo_payment').click(function(){

        $('#text_upload_memo').css('display','none');
  			console.log('camera click');
  			capturePhotoEdit();
  		})

      $('#replace_image_memo').click(function(){
        $('#text_upload_memo').css('display','none');
        capturePhotoEdit();
      })

       

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
      var largeImage = document.getElementById('img_memo_payment');

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
      		quality: 100,
          correctOrientation: true,
      		allowEdit: false,
      		targetWidth: 500,
          targetHeight: 500,
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