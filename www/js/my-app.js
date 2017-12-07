
// Initialize your app
var myApp = new Framework7({
    preloadPreviousPage : false,
    tapHoldPreventClicks : false
});

// Export selectors engine
var $$ = Dom7;

Template7.global = { 
    lengthSession : 0,
    lengthLogin : 0,
    lengthRegister : 0,
    userData:{},
    arrDataComodity:[],
    lengthComodity : 0,
    arrDataLocation:[],
    lengthLocation:0,
    imageData : null,
    backToProfile: false,
    itemIdSelected:"",
    arrDataCart:[],
    lengthCart:0,
    totalCart:0,
    paymentMethod:"",
    arrFarmName:[],
    arrTransaction:[],
    arrCartTransaction:[],
    arrTotalComodityUser:[],
    farmName:"",
    deviceId:"",
    arrComodityNonPriority:[],
    timerCronNonPriority:0,
    counterNonPriority:0,
    arrTimerCronComodity:[]
}

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true

});

    document.addEventListener('deviceready',function(event) {
        document.addEventListener('backbutton', function(e) {
            // Logic to be executed on back button event

            // alert(mainView.activePage.name);

            //LANDING PAGE
            if(mainView.activePage.name=="index"){
                myApp.confirm('', 'Are you sure want to exit ?', function () { navigator.app.exitApp(); }, function () { } );
            
            // SELLER
            //PESANAN SELLER
            }else if(mainView.activePage.name=="notification_seller_list"){

                mainView.router.back({
                    url:'index.html',
                    force:true
                });
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
                        
                        if(Template7.global.arrDataCart.length > 0 ){

                            $('.notification-total').html(Template7.global.arrDataCart.length);
                        }

                        getCounterNotificationNonPriorityComodity();
                    }, 500);


                }

            //NOTIFIKASI SELLER
            }else if(mainView.activePage.name=="comodity_notification_list"){

                mainView.router.back({
                    url:'index.html',
                    force:true
                });

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
                            //  mainView.router.load({
                            //    url: 'view/seller/notification_seller.html',
                            //    animatePages: true
                            //  });
                            // })

                            // $('#notification_comodity_index').css('display','block');
                            // $('#notification_comodity_index').click(function(){
                            //  mainView.router.load({
                            //    url: 'view/seller/comodity_notification.html',
                            //    animatePages: true
                            //  });
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
            

            //KOMODITI INIT SELLER
            }else if(mainView.activePage.name=="comodity_confirm_list"){

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

            //KOMODITI CHOOSE SELLER
            }else if(mainView.activePage.name=="comodity_list"){

                    Template7.global.arrDataComodity = [];
                    mainView.router.back({
                        url:'view/seller/comodity_init.html',
                        reload : true,
                        force : true
                    });

            // LOKASI FARM
            }else if(mainView.activePage.name=="location_list"){

                    mainView.router.back({
                        url:'index.html',
                        force:true
                    });

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

                         
                            if(Template7.global.arrDataCart.length > 0 ){

                                $('.notification-total').html(Template7.global.arrDataCart.length);
                            }

                            getCounterNotificationNonPriorityComodity();

                        }, 300);

                    }

            //PROFILE SELLER        
            }else if(mainView.activePage.name=="profile_seller_list"){

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

                        
                            if(Template7.global.arrDataCart.length > 0 ){

                                $('.notification-total').html(Template7.global.arrDataCart.length);
                            }

                            getCounterNotificationNonPriorityComodity();

                        }, 300);

                    }

            // CONSUMER
            // PROFILE CONSUMER

            }else if(mainView.activePage.name=="profile_consumer_list"){

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

                  }, 1000);

                }

            //SHOP COMODITY 
            }else if(mainView.activePage.name=="shop_comodity_list"){

                 mainView.router.back({
                        url:'index.html',
                        force:true
                    });
                
                $('#fab').css("display","block");
                $('#fab').removeClass("speed-dial-opened");
        
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

                              
                                if(Template7.global.arrDataCart.length > 0 ){

                                    $('.notification-total').html(Template7.global.arrDataCart.length);
                                }

                                getCounterNotificationNonPriorityComodity();

                            }, 1000);

                        }else{
                            hideLoading();
                            $('#command-home-button').html(landingPageConsumer);

                            $("#consumer_name_profile").text(Template7.global.userdata.fullname);
                            $("#consumer_address_profile").text(Template7.global.userdata.address);

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
            

            //MAIN SHOP
            }else if(mainView.activePage.name=="main_shop_list"){
                mainView.router.back({
                    url : 'view/shop/shop_comodity.html',
                    force : true,
                    reload : true
                });

            //CART SHOP
            }else if(mainView.activePage.name=="cart_shop_list"){
                $('#tabbar_home').css("display","none");
                mainView.router.back({
                    url : 'view/shop/main_shop.html?itemId='+itemIdSearch+'&type='+typeSearch+'&grade='+gradeSearch+'&quantity='+quantitySearch+'&price='+priceSearch,
                    force : true,
                    reload : true
                });

            //DELIVERY SHOP
            }else if(mainView.activePage.name=="delivery_shop_list"){
                mainView.router.back({
                    url : 'view/shop/cart_shop.html',
                    force : true,
                    reload : true
                }); 

            //CHECK STATUS ORDER
            }else if(mainView.activePage.name=="check_status_order_page"){
                
                mainView.router.back({
                    url:'index.html',
                    force:true
                });

                $('#fab').css("display","block");
                $('#fab').removeClass("speed-dial-opened");
                Template7.global.arrCartTransaction = [];

                if(Template7.global.userdata.usertype=="seller"){
                    //CHECK PESANAN /NOTIFIKASI
                    getCartItemByFarmNameAndUserId();
                    showLoading();
                    setTimeout(function() {
                        hideLoading();
                        $('#command-home-button').html(landingPageSeller);

                        $("#seller_name_profile").text(Template7.global.userdata.fullname);
                        $("#seller_farm_profile").text(Template7.global.userdata.farm_name);


                        if(Template7.global.arrDataCart.length > 0 ){

                            $('.notification-total').html(Template7.global.arrDataCart.length);
                        }

                        getCounterNotificationNonPriorityComodity();
                    }, 300);

                }else{
                    showLoading();
                      setTimeout(function() {
                        hideLoading();
                        
                        $('#command-home-button').html(landingPageConsumer);

                        $("#consumer_name_profile").text(Template7.global.userdata.fullname);
                        $("#consumer_address_profile").text(Template7.global.userdata.address);

                      }, 1000);
                }

            //
            }else {
                mainView.router.back();
            }
            
        })
    }, false);

    var app = {
        // Application Constructor
        initialize: function() {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function() {
            app.receivedEvent('deviceready');
        },
        // Update DOM on a Received Event
        receivedEvent: function(id) {
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            console.log('Received Event: ' + id);
        }
    };

    app.initialize();


// Callbacks to run specific code for specific pages, for example for About page:
// myApp.onPageInit('about', function (page) {
//     // run createContentPage func after link was clicked
//     $$('.create-page').on('click', function () {
//         createContentPage();
//     });
// });
