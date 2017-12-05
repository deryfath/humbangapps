
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
            if(mainView.activePage.name=="index"){
                myApp.confirm('', 'Are you sure want to exit ?', function () { navigator.app.exitApp(); }, function () { } );
                
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
