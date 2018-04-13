
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
    arrTimerCronComodity:[],
    backToMenuCart:false,
    backDataChooseVendor:[],
    backDataChooseComodity:[],
    summaryPurchase:{}
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
            

            }else if(mainView.activePage.name=="purchase_page"){

                $('.toolbar-inner-home').html('');
                
               mainView.router.back({
                    url:'index.html',
                    force:true
                });

                showLoading();

                setTimeout(function() {

                    hideLoading();
                    loadChartWeeklyTarget();
                    loadChartProgress();
                    $('.toolbar-inner-home').css('background','#ac312a');
                    $('.toolbar-inner-home').html('<a href="#" id="purchase_page" style="margin: 0 auto;"><i class="icon f7-icons" style="color: white;">layers_fill</i><span style="text-align:center;color:white;font-size: 12px;" class="tabbar-label">Pembelian</span></a>');
                
                    $('#purchase_page').click(function(){

                        mainView.router.load({
                          url: 'view/seller/purchase_page.html',
                          animatePages: true
                        });

                    })
                }, 1000);
                

            }else if(mainView.activePage.name=="purchase_back"){

                mainView.router.back({
                      url: 'view/seller/purchase_detail.html'
                });


            }else if(mainView.activePage.name=="purchase_menu"){

                mainView.router.back({
                    url : 'view/seller/purchase_page.html',
                    force : true,
                    reload : true
                });

             }else if(mainView.activePage.name=="purchase_comodity"){

                mainView.router.back({
                    url : 'view/seller/purchase_menu.html',
                    force : true,
                    reload : true
                });
                    

            }else if(mainView.activePage.name=="choose_vendor"){
                var location = Template7.global.backDataChooseComodity[0].location;

                mainView.router.back({
                    url : 'view/seller/purchase_comodity.html?location='+location,
                    force : true,
                    reload : true
                });
               

            }else if(mainView.activePage.name=="purchase_detail"){

                $('#tabbar_home').css('display','block');
        
                mainView.router.back({
                      url: 'view/seller/purchase_page.html',
                      force:true,
                      reload:true
                });
                
            }else if(mainView.activePage.name=="purchase"){

                var location = Template7.global.backDataChooseVendor[0].location;
                var productId = Template7.global.backDataChooseVendor[0].product_id;
                var productName = Template7.global.backDataChooseVendor[0].product_name;
                var productType = Template7.global.backDataChooseVendor[0].product_type;

                mainView.router.back({
                    url : 'view/seller/choose_vendor.html?name='+productType+'&product_name='+productName+'&product_id='+productId+'&vendor_location='+location,
                    force : true,
                    reload : true
                });
                  
            }else if(mainView.activePage.name=="purchase_coffee"){

                var location = Template7.global.backDataChooseVendor[0].location;
                var productId = Template7.global.backDataChooseVendor[0].product_id;
                var productName = Template7.global.backDataChooseVendor[0].product_name;
                var productType = Template7.global.backDataChooseVendor[0].product_type;

                mainView.router.back({
                    url : 'view/seller/choose_vendor.html?name='+productType+'&product_name='+productName+'&product_id='+productId+'&vendor_location='+location,
                    force : true,
                    reload : true
                });
                   

            }else if(mainView.activePage.name=="final_purchase"){

                mainView.router.back({
                    url : 'view/seller/purchase.html'
                });
                   

            }else if(mainView.activePage.name=="purchase_review"){

                mainView.router.back({
                    url : 'view/seller/purchase_coffee.html'
                });
                
            }else if(mainView.activePage.name=="payment"){

                
            }else if(mainView.activePage.name=="comodity_delivery"){

            }else if(mainView.activePage.name=="comodity_delivery_package"){

            }else if(mainView.activePage.name=="order_final_shop_list"){
               
                
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
