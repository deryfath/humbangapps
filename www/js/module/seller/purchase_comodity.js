myApp.onPageInit('purchase_comodity', function (page) {


	$('.back').click(function(){

		mainView.router.back({
			url:'view/seller/purchase_menu.html',
			reload : true,
			force : true
		});

	})

	var location = page.query.location;

	console.log(location);

	$('#tabbar_home').css('display','none');
	$('.toolbar-inner-home').html('');

	var mySearchbar = myApp.searchbar('.searchbar-comodity', {
	    searchList: '.list-block-search',
	    searchIn: '.comodity-title,.comodity-type'
	}); 

	$(document).ready(function(){
	   $('#search_comodity').keyup(function(){

			var elem = $('#card-product-vendor > .card-product-vendor-init').find('.item-content');
			// console.log(elem.text());

			elem.each(function(){
				if($(this).hasClass('hidden-by-searchbar')){
					$(this).parentsUntil('.card-product-vendor-init').hide();
				}else{
					$(this).parentsUntil('.card-product-vendor-init').show();
				}
			})
		});
	});
	

	$('.search-bar-clear-comodity').click(function(){

		var elem = $('#card-product-vendor > .card-product-vendor-init').find('.item-content');

		elem.each(function(){

			$(this).parentsUntil('.card-product-vendor-init').show();
		  

		});

	})

	$('.search-bar-cancel').click(function(){

		var elem = $('#card-product-vendor > .card-product-vendor-init').find('.item-content');

		elem.each(function(){

			$(this).parentsUntil('.card-product-vendor-init').show();

		});

	})

    var initEmptyPageComodity = '<div class="content-block-inner">'+
                            '<div class="list-block" style="margin-top: 50%;margin-bottom: 50%;color:gray;">'+
                                '<div style="text-align: center;margin-bottom: 10px;font-weight: bold;">'+
                                    'Komoditas Baru'+
                                '</div>'+
                                '<div id="add_init_comodity" style="text-align: center;">'+
                                    '<i class="icon f7-icons" style="font-size: 48px;color:darkslategray;">add_round_fill</i>'+
                                '</div>'+
                            '</div>'+
                        '</div>';



	showLoading();

    setTimeout(function() {

            var imageClick = false;

            $('#comodity_img_create_li').html('');

            $('#comodity_img_create_li').html('<div style="text-align:center;">'+
                                   '<img id="comodity_img_create" src="img/photo-camera-comodity.png" style="margin-top: 40px;border-width: 2px;border-radius: 14%;border-style: dashed;padding: 42px;border-color: #47938d;"><span style="margin-top: 10px;position: absolute;top: 82%;left: 0;width: 100%;font-weight: bold;">Tap Untuk Upload</span>'+
                                 '</div>');

            document.getElementById('comodity_name_create').value = "";

            $('#comodity_type_create').val('kopi');
            $('#comodity_category_create').val('cherry');
            $('#other_type_create').css('display','none');
            $('#other_category_create').css('display','none');
                                                 

            $('#comodity_img_create').click(function(){
                imageClick = true;
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

            
            function capturePhotoEdit() {

                    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { 
                    quality: 100,
                    correctOrientation: true,
                    allowEdit: false,
                    targetWidth: 600,
                    targetHeight: 600,
                    destinationType: destinationType.DATA_URL });
                 
                  
            }

            function onPhotoDataSuccess(imageData) {
               
               $('#comodity_img_create_li').html('');

                $('#comodity_img_create_li').html('<div style="text-align:center;">'+
                                   '<img id="comodity_img_create" src="data:image/jpeg;base64,'+imageData+'" style="margin-top:40px;max-width:70%;">'+
                                 '<span><i id="replace_image_comodity" class="icon f7-icons" style="color:#8fb7c9;font-size: 38px;margin-top: -40px;margin-left: -45px;">refresh_round_fill</i></span>'+

                                 '</div>');

               $('#comodity_img_create').click(function(){
                    capturePhotoEdit();
               })

               $('#replace_image_comodity').click(function(){
                    capturePhotoEdit();
                })

            }

            function onFail(message) {
              alert('Failed because: ' + message);
            }

        var dataSend = {
            product : true
        }

        $.ajax({
            url: 'http://plantera.iotera.io/product.php',
            type: "POST",
            dataType: 'json',
            data: dataSend,
            success: function (data) {
                // this is executed when ajax call finished well
                
                hideLoading();

                if(data.length>0){

                    var newData = {data : data}

                    console.log(newData.data);

                    loadWidgetProductVendor(newData.data)
                
                }else{


                    $('#card_product_vendor').html(initEmptyPageComodity);

                    $('#add_init_comodity').click(function(){

                        popupAddComodity();
                    })

                }

                
                

            },
            error: function (xhr, status, error) {
                // executed if something went wrong during call
                hideLoading();
                myApp.alert('got error: ' + error,'Notifikasi'); // status 0 - when load is interrupted
            }
        });
    
        function loadWidgetProductVendor(vendordata){

                $$.ajax({
                    url: 'view/widget/card_product_vendor.html',
                    statusCode: {
                        404: function (xhr) { alert('page not found'); }
                    },
                    beforeSend : function(){  },
                    success : function(data){   

                        vendordata.splice(0, 0, {add_first : true});

                        var context = {data : vendordata};                        
                        
                        $$.each(context.data, function (index, value) {

                            if (index==0) {
                               value.add_first = true;
                            }else{
                               value.add_first = false;
                            }
                            value.image_display = "data:image/jpeg;base64,"+value.image_medium;

                        })
                        
                        console.log(context);


                        $$('#card_product_vendor').html(data);
                        var template = $$('#card-product-vendor-template').html();
                        // console.log(typeof template);
                        var compiledTemplate = Template7.compile(template);

                        var html = compiledTemplate(context);
                        $$('#card_product_vendor').html(html);

                        $('.card-product-vendor-init').click(function(){

                            var productId = $(this).data('productid');
                            var productName = $(this).data('productname');
                            var name = "";

                            if (productName=="jagung") {
                                name = $(this).data('kategori');
                            }else{
                                name = $(this).data('name');
                            }

                            mainView.router.load({
                                url : 'view/seller/choose_vendor.html?name='+name+'&product_name='+productName+'&product_id='+productId+'&vendor_location='+location
                            });
                        })

                       
                        $('.add-new-comodity').click(function(){
                  
                            popupAddComodity();

                        })

                    }
                }) 

        }


        function popupAddComodity(){
             myApp.popup('.popup-comodity-item');

            $('#comodity_type_create').change(function() {
                var selectedValue = $(this).val();

                if(selectedValue  === 'lainnya') {
                    $('#other_type_create').css('display','block');    
                }else{
                    $('#other_type_create').css('display','none');
                } 
            });

            $('#comodity_category_create').change(function() {
                var selectedValue = $(this).val();

                if(selectedValue  === 'lainnya') {
                    $('#other_category_create').css('display','block');    
                }else{
                    $('#other_category_create').css('display','none');
                } 
            });

           

            $('.submit-add-comodity').unbind('click').click(function(){

                showLoading();

                var imageSrc = document.getElementById('comodity_img_create').src;

                 if (!imageClick) {
                    
                    hideLoading();
                    myApp.alert("Upload Foto Untuk Melanjutkan","Notifikasi")

                 }else{

                     var dataSend = {
                       product_name : document.getElementById('comodity_name_create').value,
                       other_category : document.getElementById('other_category_create').value,
                       product_category : $('#comodity_category_create').val(),
                       other_type : document.getElementById('other_type_create').value,
                       product_type : $('#comodity_type_create').val(),
                       product_image : imageSrc
                     } 

                      console.log(dataSend);

                 
                  $.ajax({
                        type: "POST",
                        url: "http://plantera.iotera.io/create_new_product.php",
                        data: dataSend,
                        success: function(data){

                         console.log(data);
                         $('#comodity_img_create_li').html('');

                         $('#comodity_img_create_li').html('<div style="text-align:center;">'+
                                               '<img id="comodity_img_create" src="img/photo-camera-comodity.png" style="margin-top: 40px;border-width: 2px;border-radius: 14%;border-style: dashed;padding: 42px;border-color: #47938d;"><span style="margin-top: 10px;position: absolute;top: 82%;left: 0;width: 100%;font-weight: bold;">Tap Untuk Upload</span>'+
                                             '</div>');


                         var prodName = document.getElementById('comodity_name_create').value;

                         myApp.closeModal('.popup-comodity-item',true);
                         
                         var productId = data;
                         var productName = $('#comodity_type_create').val();
                         var name = "";

                         if (productName=="jagung") {
                            if($('#comodity_category_create').val()!="lainnya"){
                                
                                name = $('#comodity_category_create').val()
                            }else{
                                name = document.getElementById('other_category_create').value
                            }

                         }else{

                            name = prodName;
                         }

                            mainView.router.load({
                                url : 'view/seller/choose_vendor.html?name='+name+'&product_name='+productName+'&product_id='+productId+'&vendor_location='+location
                            });  
                      

                        }
                    });
                }
            })
        }

    }, 1000);


})