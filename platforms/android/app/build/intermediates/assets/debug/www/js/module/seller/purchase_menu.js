myApp.onPageInit('purchase_menu', function (page) {

	$('.back').click(function(){

		mainView.router.back({
			url:'view/seller/purchase_page.html',
			reload : true,
			force : true
		});

	})


	$('#tabbar_home').css('display','none');
	$('.toolbar-inner-home').html('');

	showLoading();

    setTimeout(function() {

    		

			$('#tabbar_home').css('display','block');
			$('.toolbar-inner-home').css('background','#ac312a');

			$('.toolbar-inner-home').html('<a href="#" id="comodity_list" style="margin: 0 auto;"><i class="icon f7-icons" style="color: white;margin:1px;font-size:30px;">arrow_right_fill</i></a>');
			
			$('#comodity_list').click(function(){

				if (document.getElementById('vendor_location').value=="") {
					myApp.alert("Lokasi pembelian Harus diisi","Notifikasi");
				}else{
					mainView.router.load({
					  url: 'view/seller/purchase_comodity.html?location='+document.getElementById('vendor_location').value,
					  animatePages: true
					});
				}
				

			})

			$('#location_choose').click(function(){

				mainView.router.load({
					url : 'view/seller/farm_location.html'
				})

			})

			
			document.addEventListener("deviceready", function () {
				getLocation();

			})

			//current lat long
			function getLocation() {
			    if (navigator.geolocation) {
			        navigator.geolocation.getCurrentPosition(showPosition);
			    } else { 
			        myApp.alert("Geolocation is not supported by this browser.","Notifikasi");
			    }
			}

			function showPosition(position) {
			    console.log(position.coords.latitude); 
			    console.log(position.coords.longitude);
			    initialize(position.coords.latitude,position.coords.longitude)
			    
			}

			function initialize(lat,long) {
			  var pyrmont = new google.maps.LatLng(lat,long);

			  var map = new google.maps.Map(document.getElementById('map_vendor'), {
			      center: pyrmont,
			      zoom: 15
			    });

			  var request = {
			    location: pyrmont,
			    radius: '500',
			    type: ['grocery_or_supermarket']
			  };

			  var service = new google.maps.places.PlacesService(map);
			  service.nearbySearch(request, callback);
			}

			function callback(results, status) {
			  if (status == google.maps.places.PlacesServiceStatus.OK) {

			  	 hideLoading();
			     console.log(results);

			     $$.ajax({
                    url: 'view/widget/place_list.html',
                    statusCode: {
                        404: function (xhr) { alert('page not found'); }
                    },
                    beforeSend : function(){  },
                    success : function(data){ 

                    	var context = {data : results}  

                        $$('#transaction_place_list').html(data);
                        var template = $$('#place_list_template').html();
                        // console.log(typeof template);
                        var compiledTemplate = Template7.compile(template);

                        var html = compiledTemplate(context);
                        $$('#transaction_place_list').html(html);

                        $('.place-list-btn').click(function(){

                            var title = $(this).data('title');
                            var address = $(this).data('address');

                            document.getElementById('vendor_location').value = title+" - "+address
                        })

                    }
                }) 
			  }
			}

	},1000)


})
