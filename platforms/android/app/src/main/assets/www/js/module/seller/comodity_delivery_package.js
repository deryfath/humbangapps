myApp.onPageInit('comodity_delivery_package', function (page) {

  var imageClick = false;
	$("#img_package").attr("src","img/photo-camera-package.png");

	$('#img_package').click(function(){

    imageClick = true;
    $('#continue_final').css('background','#3b8398');
    $('#text_upload_package').css('display','none');
		console.log('camera click');
		capturePhotoEdit("package");
	})

	var purchaseLineId = page.query.purchase_line_id;

	console.log(purchaseLineId);

	$('#continue_final').click(function(){

    showLoading();
		
		var imagePackageSrc = document.getElementById('img_package').src;

    if (!imageClick) {
        
        hideLoading();
        myApp.alert("Upload Foto Untuk Melanjutkan","Notifikasi")

     }else{

    	 	 var dataSend = {
               id : purchaseLineId,
               image : imagePackageSrc,
               image_type : "package"
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
      			        url : 'view/shop/order_final_shop.html'
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

    function onPhotoDataSuccessPackage(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);
      $('#img_package_li').html('');

       $('#img_package_li').html('<div style="text-align:center;">'+
                         '<img id="img_package" src="data:image/jpeg;base64,'+imageData+'" style="margin-top:40px;max-width:70%;">'+
                         '<span><i id="replace_image_package" class="icon f7-icons" style="color:#8fb7c9;font-size: 38px;margin-top: -40px;margin-left: -45px;">refresh_round_fill</i></span>'+

                       '</div>');

       $('#img_package').click(function(){
          console.log('camera click');
          $('#text_upload_package').css('display','none');
          capturePhotoEdit("package");
        })

       $('#replace_image_package').click(function(){
    			console.log('camera click');
          $('#text_upload_package').css('display','none');
    			capturePhotoEdit("package");
    		})

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
    function capturePhotoEdit(type) {

      		navigator.camera.getPicture(onPhotoDataSuccessPackage, onFail, { 
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
