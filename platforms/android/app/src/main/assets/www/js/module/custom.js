function ConvertSpecialChar(mystring){
    return mystring.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}
function trimWords(string){
    var maxLength = 255 // maximum number of characters to extract
    //trim the string to the maximum length
    var trimmedString = string.substr(0, maxLength);

    //re-trim if we are in the middle of a word
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
    return trimmedString;
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function imgError(image) {
    image.onerror = "";
    image.src = "img/nonews.png";
    // image.width = '524';
    // image.height = '295';
    // $(image).removeClass('img-responsive');
    return true;
}

function imgLoad(image,src) {
    if(image.src==""){
        image.src = "img/loading-img.png";
    }else{
        image.src = src;
    }
    
    
    // image.width = '524';
    // image.height = '295';
    // $(image).removeClass('img-responsive');
    return true;
}


function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true && JSON.stringify(obj) === JSON.stringify({});
}

function comma_digits(text_number){ 
    if(typeof text_number == 'number'){
        text_number = text_number.toString();
    }    
    return  text_number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"); 
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRainbowColor(index){
    var rainbow = [
                    '#d81b60',
                    '#8e24aa',
                    '#5e35b1',
                    '#1e88e5',
                    '#00acc1',
                    '#00897b',
                    '#43a047',
                    '#7cb342',
                    "#c0ca33",
                    "#fdd835",
                    '#fd971f'
                ];
    return rainbow[index];
}

function customConvertDate(date){
    var index  = date.indexOf('.');
    var strOut = date.substr(index);
    var date = date.replace(strOut,"");
    // var date = date.replace("T"," ");
    return date
}
function customConvertDate2(date){
    var date = date.replace('Z',"");
    var date = date.replace("T"," ");
    return date
}
function customConvertDate3(date){
    var date = date.replace('Z',"");
    // var date = date.replace("T"," ");
    return date
}

function imgErrorPerson(image) {
    image.onerror = "";
    image.src = "img/nouser.png";
    // image.width = '524';
    // image.height = '295';
    // $(image).removeClass('img-responsive');
    return true;
}

function imgErrorMedia(image) {
    image.onerror = "";
    image.src = "img/nomedia.png";
    // image.width = '524';
    // image.height = '295';
    // $(image).removeClass('img-responsive');
    return true;
}

function getDayName(index){
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return days[index];
}

function getMonthName(index){
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return months[index];
}

function showLoading(){
    $$('body').append('<div class="modal-overlay modal-overlay-visible"></div>');
    myApp.showIndicator();
}

function hideLoading(){
    myApp.hideIndicator();
    $$('body').find('.modal-overlay-visible').remove();
}

function getCurrentDate(){
    var d = new Date();
    var dd = d.getDate();
    var mm = d.getMonth()+1; //January is 0!
    var yyyy = d.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    if(d.getMinutes() < 10){
        var getMinutes = '0'+d.getMinutes();
    }else{
        var getMinutes = d.getMinutes();
    }
    if(d.getHours() < 10){
        var getHours = '0'+d.getHours();
    }else{
        var getHours = d.getHours();
    }

    if(d.getSeconds() < 10){
        var getSeconds = '0'+d.getSeconds();
    }else{
        var getSeconds = d.getSeconds();
    }

    return today = dd+'/'+mm+'/'+yyyy+' '+getHours+':'+getMinutes+':'+getSeconds;
}

function register(name,username,password,email,address,phone,usertype,farmName,comodityType,certificate){

    var postDataRegister = {
            name : name,
            username : username,
            password : password,
            email : email,
            address : address,
            phone : phone,
            usertype : usertype,
            farm_name : farmName,
            comodityType : comodityType,
            certificate : certificate
    };

    console.log(postDataRegister);
    insertRegister(postDataRegister);
}

function comodity(item_id,name,image,total,priceMin,priceMax,start_harvest,finish_harvest,start_plan,finish_plan,itemType,comodityType,comodityHeight,comodityWeight,desc,origin,process){

    var postDataComodity = {
            item_id : item_id,
            name : name,
            image : image,
            total : total,
            priceMin : priceMin,
            priceMax : priceMax,
            item_type : itemType,
            start_harvest : start_harvest,
            finish_harvest : finish_harvest,
            start_plan : start_plan,
            finish_plan : finish_plan,
            comodityType : comodityType,
            comodityHeight : comodityHeight,
            comodityWeight : comodityWeight,
            desc : desc,
            origin : origin,
            process : process
    };

    console.log(postDataComodity);
    insertComodity(postDataComodity);
}

function cartItem(item_id,name,seller_id,farm,image,price,total,totalMax,unit,delivery_time,special,cartTotal,addressUser){
    var postDataCart = {
            item_id : item_id,
            name : name,
            seller_id : seller_id,
            farm : farm,
            image : image,
            price : price,
            total : total,
            totalMax : totalMax,
            unit : unit,
            delivery_time : delivery_time,
            special : special,
            cart_total : cartTotal,
            address : addressUser
    };

    console.log(postDataCart);
    insertCart(postDataCart);
}

 function ratingStarEvent(){
        /* 1. Visualizing things on Hover - See next part for action on click */
      $('#stars li').on('mouseover', function(){
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
       
        // Now highlight all the stars that's not after the current hovered star
        $(this).parent().children('li.star').each(function(e){
          if (e < onStar) {
            $(this).addClass('hover');
          }
          else {
            $(this).removeClass('hover');
          }
        });
        
      }).on('mouseout', function(){
        $(this).parent().children('li.star').each(function(e){
          $(this).removeClass('hover');
        });
      });
      
      
      /* 2. Action to perform on click */
      $('#stars li').on('click', function(){
        var onStar = parseInt($(this).data('value'), 10); // The star currently selected
        var stars = $(this).parent().children('li.star');
        
        for (i = 0; i < stars.length; i++) {
          $(stars[i]).removeClass('selected');
        }
        
        for (i = 0; i < onStar; i++) {
          $(stars[i]).addClass('selected');
        }
        
        // JUST RESPONSE (Not needed)
        var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);

        console.log(ratingValue);
        var msg = "";
        if (ratingValue > 1) {
            msg = "Thanks! You rated this " + ratingValue + " stars.";
        }
        else {
            msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
        }
        
      });
    }

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 20; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

//GET WEATHER
function watchWeatherPosition() {

    // myApp.alert('masuk weather');

    return navigator.geolocation.watchPosition
    (onWeatherWatchSuccess, onWeatherError, { enableHighAccuracy: true });
}

// Success callback for watching your changing position

function onWeatherWatchSuccess(position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    // myApp.alert('LAT : '+updatedLatitude);
    // myApp.alert('LON : '+updatedLongitude);

    // if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

    //     Latitude = updatedLatitude;
    //     Longitude = updatedLongitude;

        // Calls function we defined earlier.
        getWeather(updatedLatitude, updatedLongitude);
    // }
}

function getWeather(latitude,longitude) {


    // Get a free key at http://openweathermap.org/. Replace the "Your_Key_Here" string with that key.
    var OpenWeatherAppKey = "8158926a9abf962b99d2d7a2974e3076";
    // var latitude = "-6.899239";
    // var longitude = "107.609489";

    $$.ajax({
        // url: "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+ "&lon=" + longitude + "&appid=" + OpenWeatherAppKey + "&units=metric",
        url : "https://api.darksky.net/forecast/2a6bef3c3eb01e7d7f8f8446244ca5dd/"+latitude+","+longitude+"?exclude=hourly,flags&lang=id&units=si",
        statusCode: {
          404: function (xhr) {
            alert('error request data');
          },
          500: function(xhr){
            alert('internal server error');
            hideLoading();
          }
        },
        beforeSend : function(){
           showLoading();
        },
        success : function(data){

            hideLoading();

            var result = JSON.parse(data);

            // console.log(result.currently);

            var temp = result.currently.temperature;

            document.getElementById("temp_test").innerHTML = temp;


            // myApp.alert("temp : "+temp);

        }

    })

}

// Error callback

function onWeatherError(error) {
    myApp.alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

var notif_id = 101;

function FCMSubscribeEvent(){

    //FCM subscribe
    document.addEventListener("deviceready", function () {

        FCMPlugin.subscribeToTopic('/topics/fcm');

        FCMPlugin.onNotification(function(data){
            if(data.wasTapped){
              //Notification was received on device tray and tapped by the user.
              myApp.alert( JSON.stringify(data) );
              myApp.alert( "TAPPED" );
              
            }else{
                //Notification was received in foreground. Maybe the user needs to be notified.
                 
                 var dateFcm = new Date();

                  myApp.modal({
                                title:  'Notifikasi',
                                text: 'Selamat, ada pesanan yang masuk...',
                                
                                buttons: [
                                  {
                                    text: 'Cek sekarang',
                                    close:true,
                                    onClick: function() {
                                            mainView.router.loadPage('view/seller/notification_seller.html');
                                            notif_id++;
                                    }
                                  }
                                ]
                              })
                  
                  cordova.plugins.notification.local.schedule({
                        id: notif_id,
                        title: 'Catatani',
                        text: 'fcm notification',
                        at: dateFcm,
                        badge: 1
                    });
                  

            }
        });

    })
}

function startCronNonComodity(){

    getAllComodity();
    var cronFlag2 = false;
    var cronFlag5 = false;
    Template7.global.arrComodityNonPriority = [];
    Template7.global.counterNonPriority = 0;
    
    setTimeout(function() {

        console.log(Template7.global.arrDataComodity);

        $$.each(Template7.global.arrDataComodity, function (index, value) {

            //cek stok komoditas 
            if(parseInt(value.total)<2 ){
                if(mainView.activePage.name=="index"){
                    myApp.modal({
                        title:  'Perhatian',
                        text: 'Stok '+value.name+' jenis '+value.comodity_type+' akan segera habis' ,
                        buttons: [
                          {
                            text: 'cek komoditas',
                            onClick: function() {
                              mainView.router.load({
                                  url: 'view/seller/comodity_init.html',
                                  animatePages: true
                              });
                            }
                          }
                        ]
                      })
                }
            }

            //cek non prioritas
            if(!value.is_priority){

                        var dateSplit = value.startPlan.replace(" ","");    
                         dateSplit = dateSplit.split("/");

                         var newDate2week = new Date(dateSplit[1]+"/"+dateSplit[0]+"/"+dateSplit[2]);
                         newDate2week.setDate(newDate2week.getDate() + 6);
                         newMonth2week = newDate2week.getMonth()+1;
                         newDate2week.setHours(0,0,0,0);

                         var newDate5week = new Date(dateSplit[1]+"/"+dateSplit[0]+"/"+dateSplit[2]);
                         newDate5week.setDate(newDate5week.getDate() + 30);
                         newMonth5week = newDate5week.getMonth()+1;
                         newDate5week.setHours(0,0,0,0);

                         var dateNow = new Date();
                         dateNow.setHours(0, 0, 0, 0);

                         console.log(newDate2week);
                         console.log(newDate5week);
                         console.log(dateNow);

                         if(dateNow===newDate2week){
                            cronFlag2 = true;

                         }

                         if(dateNow===newDate5week){
                            cronFlag5 = true;  
                         }

                         Template7.global.arrComodityNonPriority.push({
                                id: value.id,
                                item_id: value.item_id,
                                name: value.name,
                                image: value.image,
                                total: value.total,
                                item_type: value.item_type,
                                farm_name : value.farm_name,
                                startHarvest: value.startHarvest,
                                finishHarvest: value.finishHarvest,
                                startPlan: value.startPlan,
                                finishPlan: value.finishPlan,
                                user_id:value.user_id,
                                is_notif : value.is_notif,
                                price_min : value.price_min,
                                price_max : value.price_max,
                                comodity_type : value.comodity_type,
                                comodity_height : value.comodity_height,
                                comodity_weight : value.comodity_weight,
                                desc : value.desc,
                                is_priority : value.is_priority,
                                grade : value.grade,
                                sort_date : value.sort_date,
                                cronFlag2 : cronFlag2,
                                cronFlag5 : cronFlag5,
                                harvest_total : value.harvest_total,
                                harvest_estimate_total : value.harvest_estimate_total,
                                damage_after_total : value.damage_after_total,
                                damage_total : value.damage_total
                            })

                    console.log(Template7.global.arrComodityNonPriority);

            }


        })

        
    }, 1000);

    
}

//NOTIFICATION LOCAL SCHEDULE
function startCronPerWeek(){

    getAllComodity();

    setTimeout(function(){

        hideLoading();
        console.log(Template7.global.arrDataComodity);

                // var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
                document.addEventListener("deviceready", function () {

                   $$.each(Template7.global.arrDataComodity, function (index, value) {

                    if(!value.is_notif){
                         var dateSplit = value.startPlan.replace(" ","");    
                         dateSplit = dateSplit.split("/");
                         var newDate = new Date(dateSplit[1]+"/"+dateSplit[0]+"/"+dateSplit[2]);
                         newDate.setDate(newDate.getDate() + 6);
                         newMonth = newDate.getMonth()+1;
                         newDate.setHours(0,0,0,0);

                         var dateNow = new Date();
                         dateNow.setHours(0,0,0,0);

                         console.log(newDate);
                         console.log(dateNow);

                         if(dateNow != newDate){// ===
                            console.log('masuk if date');
                            require(["js/later.js"], function(cron){

                                var counter = 0;

                                var _dayOfTheWeek = later.dayOfWeek.val(newDate);

                                var checkboxValTmp = [];
                                var cronSched =   later.parse.recur().every(1).minute();
                                // var cronSched =   later.parse.recur().on(_dayOfTheWeek).dayOfWeek(); //every week

                                //print check next schedule
                                // var occurrences = later.schedule(cronSched).next(5, newDate);
                                // var enddate = new Date(2018, 0, 1);
                                // var textDates = "";

                                // for (var i = 0; i < 5; i++) {
                                //     curDate = occurrences[i];
                                //     //alert(curDate);         
                                //     if (enddate > curDate) textDates += moment(curDate).format("MM/DD/YY") + " - ";
                                //     //moment library is used for date formatting only 
                                //     console.log(textDates);
                                // }
   
                                var timer = later.setInterval(logTime, cronSched);
                                Template7.global.arrTimerCronComodity.push(timer);
                                function logTime() {
                                    var date = new Date();

                                    counter++;
                                    //notif per week
                                    if(counter==1){
                                        cordova.plugins.notification.local.schedule({
                                            id: 1,
                                            title: 'Catatani',
                                            text: 'comodity notification',
                                            // sound: sound,
                                            at : date,
                                            badge: 1
                                        });

                                        cordova.plugins.notification.local.on('click', function (notification) {
                                            // myApp.alert("notification read : "+notification.id, "notif");

                                            if(notification.id==1){

                                                myApp.modal({
                                                title:  'Notifikasi',
                                                text: '<div class="row" style="margin-top:12px;"><div class="col-30"><img src="img/hello.jpg" /></div><div class="col-70" style="margin-top:13px;"><text> Halo bagaimana tanaman '+value.name+'?</text></div></div>',
                                                buttons: [
                                                  {
                                                    text: 'Tumbuh',
                                                    onClick: function() {
                                                        
                                                        myApp.modal({
                                                            title:  'Berapa Jumlah benih yang tumbuh?',
                                                            text: '<div class="list-block">'+
                                                                      '<ul>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron-notif1" value="75-150 benih" checked="checked">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">75-150 benih</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron-notif1" value="151-250 benih">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">151-250 benih</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron-notif1" value="251-350 benih">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">251-350 benih</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron-notif1" value="351-450 benih">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">351-450 benih</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron-notif1" value="451-550 benih">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">451-550 benih</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron-notif1" value="551-650 benih">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">551-650 benih</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron-notif1" value="651-750 benih">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">651-750 benih</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                      '</ul>'+
                                                                    '</div>',
                                                            buttons: [
                                                              {
                                                                text: 'Ok, got it',
                                                                bold: true,
                                                                onClick: function(){
                                                                    console.log($('input[name=my-radio-cron-notif1]:checked').val()); 
                                                                    var tmpCheck = $('input[name=my-radio-cron-notif1]:checked').val();
                                                                    checkboxValTmp.push(tmpCheck);
                                                                }
                                                              },
                                                            ]
                                                          })


                                                    }
                                                  },
                                                  {
                                                    text: 'Mati',
                                                    onClick: function() {
                                                      
                                                    }
                                                  }
                                                ]
                                              })
                                            }
                                            

                                        }, this);


                                        
                                    }else if(counter==2){

                                        cordova.plugins.notification.local.schedule({
                                            id: 2,
                                            title: 'Catatani',
                                            text: 'comodity notification',
                                            // sound: sound,
                                            at : date,
                                            badge: 1
                                        });
                                        
                                        cordova.plugins.notification.local.on('click', function (notification) {
                                            // myApp.alert("notification read : "+notification.id, "notif");
                                            // console.log(checkboxValTmp);

                                        var statement = "";

                                        if(checkboxValTmp[0]==undefined){
                                            statement = "tanaman "+value.name+" mu yang mati";
                                        }else{
                                            statement = "tanaman "+value.name+" mu yang "+checkboxValTmp[0];
                                        }
                                        
                                            if(notification.id==2){
                                                myApp.modal({
                                                title:  'Notifikasi',
                                                text: 'Halo bagaimana kondisi '+statement+' ?',
                                                buttons: [
                                                  {
                                                    text: 'Sehat',
                                                    onClick: function() {
                                                        
                                                        myApp.modal({
                                                            title:  'Berapa benih tumbuhan yang sehat?',
                                                            text: '<div class="list-block">'+
                                                                      '<ul>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron" value="Books" checked="checked">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">75-150 benih</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron" value="Movies">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">151-250 benih</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron" value="Movies">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">251-350 benih</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron" value="Movies">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">351-450 benih</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron" value="Movies">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">451-550 benih</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron" value="Movies">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">551-650 benih</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron" value="Movies">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">651-750 benih</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                      '</ul>'+
                                                                    '</div>',
                                                            buttons: [
                                                              {
                                                                text: 'Ok, got it',
                                                                bold: true
                                                              },
                                                            ]
                                                          })


                                                    }
                                                  },
                                                  {
                                                    text: 'Kena Hama',
                                                    onClick: function() {
                                                            
                                                          myApp.modal({
                                                            title:  'Berapa tanamanmu yang terkena hama?',
                                                            text: '<div class="list-block">'+
                                                                      '<ul>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron" value="Books" checked="checked">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">25 - 50 pohon</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron" value="Movies">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">50 - 75 pohon</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron" value="Movies">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">75 - 100 pohon</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron" value="Movies">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">100 - 125 pohon</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                      '</ul>'+
                                                                    '</div>',
                                                            buttons: [
                                                              {
                                                                text: 'Ok, got it',
                                                                bold: true
                                                              },
                                                            ]
                                                          })

                                                    }
                                                  }
                                                ]
                                              })
                                            }
                                            
                                        }, this);

                                        
                                    }else if(counter==3){

                                        cordova.plugins.notification.local.schedule({
                                            id: 3,
                                            title: 'Catatani',
                                            text: 'comodity notification',
                                            // sound: sound,
                                            at : date,
                                            badge: 1
                                        });

                                        cordova.plugins.notification.local.on('click', function (notification) {
                                            // myApp.alert("notification read : "+notification.id, "notif");

                                            if(notification.id==3){
                                                 myApp.modal({
                                                title:  'Notifikasi',
                                                text: 'Halo bagaimana tanamanmu yang terkena hama?',
                                                buttons: [
                                                  {
                                                    text: 'Sudah sehat',
                                                    onClick: function() {
                                                        
                                                        myApp.modal({
                                                            title:  'Berapa Jumlah tanamanmu sekarang?',
                                                            text: '<div class="list-block">'+
                                                                      '<ul>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron" value="Books" checked="checked">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">25 - 50 pohon</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron" value="Movies">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">50 - 75 pohon</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron" value="Movies">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">75 - 100 pohon</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                        '<li>'+
                                                                          '<label class="label-radio item-content">'+
                                                                            '<input type="radio" name="my-radio-cron" value="Movies">'+
                                                                            '<div class="item-inner">'+
                                                                              '<div class="item-title">100 - 125 pohon</div>'+
                                                                            '</div>'+
                                                                          '</label>'+
                                                                        '</li>'+
                                                                      '</ul>'+
                                                                    '</div>',
                                                            buttons: [
                                                              {
                                                                text: 'Ok, got it',
                                                                onClick: function() {



                                                                    myApp.modal({
                                                                    title:  'Notifikasi',
                                                                    text: 'Produk yang kamu hasilkan hanya 80% dari pesanan konsumen A sisanya akan dipenuhi petani B yang berlokasi dekat kebunmu, pengiriman tanamanmu bisa dilakukan bersama?',
                                                                    buttons: [
                                                                      {
                                                                        text: 'Ya',
                                                                        onClick: function() {
                                                                            
                                                                            myApp.modal({
                                                                                title:  'Peralatan apa saja yang kamu distribusi?',
                                                                                text: '<div class="list-block notif3">'+
                                                                                          '<ul>'+
                                                                                            '<li>'+
                                                                                              '<label class="label-radio item-content label-radio-notif3">'+
                                                                                                '<input type="radio" class="radio-notif3" name="my-radio-cron-notif3" value="Books" checked="checked">'+
                                                                                                '<div class="item-inner">'+
                                                                                                  '<div class="item-title">Dus</div>'+
                                                                                                '</div>'+
                                                                                              '</label>'+
                                                                                            '</li>'+
                                                                                            '<li>'+
                                                                                              '<label class="label-radio item-content label-radio-notif3">'+
                                                                                                '<input type="radio" class="radio-notif3" name="my-radio-cron-notif3" value="Movies">'+
                                                                                                '<div class="item-inner">'+
                                                                                                  '<div class="item-title">Plastik</div>'+
                                                                                                '</div>'+
                                                                                              '</label>'+
                                                                                            '</li>'+
                                                                                            '<li>'+
                                                                                              '<label class="label-radio item-content label-radio-notif3">'+
                                                                                                '<input type="radio" class="radio-notif3" name="my-radio-cron-notif3" value="lainnya">'+
                                                                                                '<div class="item-inner">'+
                                                                                                  '<div class="item-title">lainnya</div>'+
                                                                                                  
                                                                                                '</div>'+
                                                                                              '</label>'+
                                                                                               '<div class="item-input notif-lain"  style="display:none;">'+
                                                                                                '<input type="text" name="name" style="box-shadow: 0 0 3px #1c1c1c;padding: 9px;    margin-left: 15px;width: 87%;">'+ 
                                                                                            '</div>'+   
                                                                                            '</li>'+
                                                                                          '</ul>'+
                                                                                        '</div>',
                                                                                buttons: [
                                                                                  {
                                                                                    text: 'Ok, got it',
                                                                                    onClick: function() {
                                                                                        
                                                                                    }
                                                                                  },
                                                                                ]
                                                                              })
                                                                        
                                                                            $('input:radio[name="my-radio-cron-notif3"]').change(
                                                                               function(){
                                                                                    if (this.checked && this.value == 'lainnya') {
                                                                                        console.log('test');
                                                                                        $('.notif-lain').css('display','block');

                                                                                    }else{
                                                                                        $('.notif-lain').css('display','none');
                                                                                    }
                                                                                });

                                                                        }
                                                                      },
                                                                      {
                                                                        text: 'tidak',
                                                                        onClick: function() {
                                                                          myApp.alert('Jangan lupa siapkan plastik dan label sayur untuk pengiriman pesanan A','notifikasi');
                                                                        }
                                                                      }
                                                                    ]
                                                                  })
                                                                }
                                                              },
                                                            ]
                                                          })

                                                        
                                                    }
                                                  },
                                                  {
                                                    text: 'Mati',
                                                    onClick: function() {
                                                      
                                                    }
                                                  }
                                                ]
                                              })
                                            }
                                           
                                        }, this);
                                      
                                                                            
                                    }else if(counter==4){

                                        cordova.plugins.notification.local.schedule({
                                            id: 4,
                                            title: 'Catatani',
                                            text: 'comodity notification',
                                            // sound: sound,
                                            at : date,
                                            badge: 1
                                        });

                                        cordova.plugins.notification.local.on('click', function (notification) {
                                            // myApp.alert("notification read : "+notification.id, "notif");

                                            if(notification.id==4){
                                                myApp.modal({
                                                title:  'Notifikasi',
                                                text: 'Halo bagaimana proses distribusi? apakah sudah ada perjanjian dengan petani B?',
                                                buttons: [
                                                  {
                                                    text: 'Ya',
                                                    onClick: function() {

                                                    }
                                                  },
                                                  {
                                                    text: 'Tidak',
                                                    onClick: function() {
                                                      
                                                    }
                                                  }
                                                ]
                                              })
                                            }
                                            
                                        }, this);

                                        
                                    }else if(counter==5){

                                        cordova.plugins.notification.local.schedule({
                                            id: 5,
                                            title: 'Catatani',
                                            text: 'comodity notification',
                                            // sound: sound,
                                            at : date,
                                            badge: 1
                                        });

                                        cordova.plugins.notification.local.on('click', function (notification) {
                                            // myApp.alert("notification read : "+notification.id, "notif");

                                            if(notification.id==5){
                                                myApp.alert('<div class="row" style="margin-top:12px;"><div class="col-30"><img src="img/truck.jpg" /></div><div class="col-70"><text>Hore produk minggu ini sudah siap kirim..</text></div></div>','Notifikasi');

                                            }

                                        }, this);

                                    }
                                     

                                    // console.log(new Date());
                                    if(counter==6){
                                        console.log('cron die');
                                          timer.clear();

                                        // cordova.plugins.notification.local.clear(1, function() {
                                        //     // alert("done");
                                        // });

                                        //UPDATE is_notif = true;
                                    }
                                    
                                }

                            });



                         }


                    }

                          

                })


                    app.initialize();

                 }, true);        


    }, 1000);
}

function getWeekNumber() {
    // Copy date so don't modify original
    dateInput = new Date("2017-3-21");
    dateInput.setHours(0,0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    dateInput.setDate(dateInput.getDate() + 4 - (dateInput.getDay()||7));
    // Get first day of year
    var yearStart = new Date(dateInput.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (dateInput - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    // return [dateInput.getFullYear(), weekNo];
    console.log("WEEK NO : "+weekNo);
}


function bookmark(element,title,desc,media,datetime,link,filename,type){
    var id_news = $$(element).attr('id');
    var icon_bookmark = $$(element).find('i');
    var id_statement = $$(element).attr('data-idstatment');
    console.log('ID STATEMENT : '+id_statement);

    var postData = {
            id : id_news,
            title  : title,
            desc : desc,
            media : media,
            file_name : filename,
            datetime : datetime,
            link : link,
            type: type,
            statement_id : id_statement,
            createdTime : ""
        };

    console.log(postData);

    //set bookmark
    if(icon_bookmark.hasClass('ion-ios-star-outline')){
        icon_bookmark.removeClass('ion-ios-star-outline');
        icon_bookmark.addClass('ion-ios-star');
        icon_bookmark.addClass('color-yellow');

        //save bookmark to local storage
        insertBookmark(postData);

        //Add bookmark in favorite for statement
        // if(id_statement == null && postData.type == "news_statement" || id_statement == null && postData.type == "newspaper_statement" ){
        //     insertBookmarkAPIFavoriteStatement(postData);

        //general menu    
        // }else{
            insertBookmarkAPI(postData);
        // }
        

    }else{
        icon_bookmark.removeClass('ion-ios-star');
        icon_bookmark.removeClass('color-yellow');
        icon_bookmark.addClass('ion-ios-star-outline');
        removeBookmark(postData);
        removeBookmarkAPI(postData);
    }

}

function openFB(link,id){
    window.open = cordova.InAppBrowser.open;
    
    // var scheme = 'fb://'
    appAvailability.checkBool(
    'fb://',       // URI Scheme or Package Name
    function() {  // Success callback
        // link = 'fb://post/'+id;
        window.open(link, '_system',{});
    },
    function() {  // Error callback
        window.open(link, '_system',{});
    }
    );
}

function open_link(link){
    if(link !=''){
        window.open = cordova.InAppBrowser.open;
        window.open(link,'_system',{});
    }
}

function isBookmarks(arrIDBookmark,id){
    var icon_bookmark = "";
    if(arrIDBookmark.length > 0){
        for(var j=0; j<arrIDBookmark.length; j++){
            if(id == arrIDBookmark[j]){
                icon_bookmark = "ion-ios-star color-yellow";
                break;
            }else{
                icon_bookmark = "ion-ios-star-outline";
            }
        }
    }else{
        icon_bookmark = "ion-ios-star-outline";
    }

    return icon_bookmark;
}

function insertBookmarkAPI(postData){

    var userData = Template7.global.userdata;
    var dataSend = {};

    if(postData.statement_id != undefined && postData.statement_id != ""){

        var dataSendStatement = {
                                    user_id : userData.id,
                                    id  : postData.statement_id,
                                    type : postData.type
                                }
        dataSend = dataSendStatement;
        
    }else{

        var dataSendNoStatement = {
                                    user_id : userData.id,
                                    id  : postData.id,
                                    type : postData.type
                                  }
        dataSend = dataSendNoStatement;

    }

        console.log(dataSend);

        $.ajax({
              method: "POST",
              url: Template7.global.api_url+'/favorite/add',
              data: dataSend,
              // contentType: "application/json; charset=UTF-8;",
              // dataType: "json",
              statusCode: {
                404: function (xhr) {
                  alert('error request data');
                },
                500: function(xhr){
                    alert('internal server error');
                    hideLoading();
                }
              },
              beforeSend : function(){
                 showLoading();
              },
              success : function(data){
              // var result = JSON.parse(data);
              hideLoading();
              console.log(data.message);
              }
            
        });
    

}

function removeBookmarkAPI(postData){

    var userData = Template7.global.userdata;
    var dataSend;
    console.log(postData);

    if(postData.statement_id != undefined && postData.statement_id != ""){
        console.log('masuk statement_id');
        var dataSendStatement = {
                        user_id : userData.id,
                        id  : postData.statement_id,
                        type : postData.type
                   }
        dataSend = dataSendStatement;
    }else{
        var dataSendNoStatement = {
                        user_id : userData.id,
                        id  : postData.id,
                        type : postData.type
                   }
        dataSend = dataSendNoStatement;
    }

    console.log(dataSend);

    $.ajax({
              method: "POST",
              url: Template7.global.api_url+'/favorite/delete',
              data: dataSend,
              // contentType: "application/json; charset=UTF-8;",
              // dataType: "json",
              statusCode: {
                404: function (xhr) {
                  alert('error request data');
                },
                500: function(xhr){
                    alert('internal server error');
                    hideLoading();
                }
              },
              beforeSend : function(){
                 showLoading();
              },
              success : function(data){
              // var result = JSON.parse(data);
              hideLoading();
              console.log(data.message);
              }
            
        });
}

function getAllBookmarkAPI(){
    var userData = Template7.global.userdata;
    var totalRow;

    $.ajax({
              url: Template7.global.api_url+'/favorite/get?user_id='+userData.id,
              statusCode: {
                404: function (xhr) {
                  alert('error request data');
                },
                500: function(xhr){
                    alert('internal server error');
                    hideLoading();
                }
              },
              beforeSend : function(){
                 showLoading();
              },
              success : function(data){
              // var result = JSON.parse(data);
              hideLoading();

              total = data.data.total;

                if(data.status==true){
                    restoreData(total);
                }
            }
    });   

}

function restoreData(total){
    var userData = Template7.global.userdata;

    $.ajax({
              url: Template7.global.api_url+'/favorite/get?user_id='+userData.id+'&start=0&row='+total,
              statusCode: {
                404: function (xhr) {
                  alert('error request data');
                },
                500: function(xhr){
                    alert('internal server error');
                    hideLoading();
                }
              },
              beforeSend : function(){
                 showLoading();
              },
              success : function(data){
              // var result = JSON.parse(data);
              hideLoading();

              var id = "";
              var staticLinkDetail = "view/home/timeline/news_detail.html?id="
              var title = "";
              var desc = "";
              var media = "";
              var filename = "";

                if(data.status==true){
                    console.log(data);
                    topicFirstLoad();  
                    $$.each(data.data.favorite, function (index, value) {
                        
                        //NON STATEMENT
                        //ONLINE NEWS
                        if(value.type == "news"){

                            var postDataNews = {
                                id : value.id,
                                title  : "",
                                desc : "",
                                media : value.data_news.media,
                                file_name : value.data_news.image,
                                datetime : value.data_news.pubDate,
                                link : staticLinkDetail+value.id+"&source=news",
                                type: value.type,
                                createdTime: value.fav_date,
                                statement_id : ""
                            };

                            insertBookmark(postDataNews);
                            Template7.global.arrIDBookmark.push(postDataNews.id);

                        //TWITTER
                        }else if(value.type == "tweet"){

                            var postDataTwitter = {
                                id : value.id,
                                title  : "",
                                desc : "",
                                media : value.data_tweet.person_username,
                                file_name : value.data_tweet.person_image,
                                datetime : value.data_tweet.pubDate,
                                link : staticLinkDetail+value.id+"&source=twitter",
                                type: value.type,
                                createdTime: value.fav_date,
                                statement_id : ""
                            };

                            insertBookmark(postDataTwitter);
                            Template7.global.arrIDBookmark.push(postDataTwitter.id);

                        //FACEBOOK
                        }else if(value.type == "post"){
                            
                            var postDataFacebook = {
                                id : value.id,
                                title  : "",
                                desc : "",
                                media : value.data_post.message_type,
                                file_name : value.data_post.fb_profile,
                                datetime : value.data_post.date_created,
                                link : staticLinkDetail+value.id+"&source=facebook",
                                type: value.type,
                                createdTime: value.fav_date,
                                statement_id : ""
                            };

                            insertBookmark(postDataFacebook);
                            Template7.global.arrIDBookmark.push(postDataFacebook.id);


                        //TV
                        }else if(value.type == "tvnews"){

                            var postDataTv = {
                                id : value.id,
                                title  : "",
                                desc : "",
                                media : value.data_tvnews.media,
                                file_name : value.data_tvnews.thumbnail,
                                datetime : value.data_tvnews.pubDate,
                                link : staticLinkDetail+value.id+"&source=tv",
                                type: value.type,
                                createdTime: value.fav_date,
                                statement_id : ""
                            };

                            insertBookmark(postDataTv);
                            Template7.global.arrIDBookmark.push(postDataTv.id);


                        //PRINTED NEWS
                        }else if(value.type == "newspaper"){
                            
                            var postDataNewspaper = {
                                id : value.id,
                                title  : "",
                                desc : "",
                                media : value.data_newspaper.media,
                                file_name : value.data_newspaper.image_scan,
                                datetime : value.data_newspaper.pubDate,
                                link : staticLinkDetail+value.id+"&source=printed",
                                type: value.type,
                                createdTime: value.fav_date,
                                statement_id : ""
                            };

                            insertBookmark(postDataNewspaper);
                            Template7.global.arrIDBookmark.push(postDataNewspaper.id);


                        //STATEMENT
                        //ONLINE NEWS
                        }else if(value.type == "news_statement"){
                            
                            var postDataNewsStatement = {
                                id : value.news_id,
                                title  : "",
                                desc : "",
                                media : value.data_news_statement.media_name,
                                file_name : value.data_news_statement.person_image,
                                datetime : value.data_news_statement.pubDate,
                                link : staticLinkDetail+value.news_id+"&source=news",
                                type: value.type,
                                createdTime: value.fav_date,
                                statement_id : value.id
                            };

                            insertBookmark(postDataNewsStatement);
                            Template7.global.arrIDBookmark.push(postDataNewsStatement.statement_id);


                        //PRINTED NEWS
                        }else if(value.type == "newspaper_statement"){
                            
                            var postDataNewsPaperStatement = {
                                id : value.news_id,
                                title  : "",
                                desc : "",
                                media : value.data_newspaper_statement.media_name,
                                file_name : value.data_newspaper_statement.person_image,
                                datetime : value.data_newspaper_statement.pubDate,
                                link : staticLinkDetail+value.news_id+"&source=printed",
                                type: value.type,
                                createdTime: value.fav_date,
                                statement_id : value.id
                            };

                            insertBookmark(postDataNewsPaperStatement);
                            Template7.global.arrIDBookmark.push(postDataNewsPaperStatement.statement_id);

                        }


                    });
                     dashboard();

                }else{
                    alert('Error : '+result.message);
                }
                      
            }
            
        });
}


function topicFirstLoad() {
    $$.ajax({
        url: Template7.global.api_url+'/topic?row=20&mytopic=1&user_id='+Template7.global.userdata.id,
        method : 'GET',
        statusCode: {
            404: function (xhr) { alert('page not found'); },
            500: function(xhr){ alert('internal server error'); hideLoading(); }
        },
        beforeSend : function(){ showLoading(); },
        error : function(xhr){
            hideLoading();
        },
        success : function(result){
            hideLoading();
            var json_result = JSON.parse(result);
            for (var i = 0; i < json_result.data.topic.length; i++) {
                insertDatabase(json_result.data.topic[i].id,json_result.data.topic[i].display_name);
            };
            viewDatabase();
        }
    });
}

function detail_tweet(element){
    var li_tweet = "";
    li_tweet = $$(element);
    var tweet = li_tweet.find('.item-news');
    
    var elem_photo = li_tweet.find('.item-media').find('img');
    var photo = elem_photo.attr('src');
    var username =  li_tweet.find('.item-title').text();
    var text_tweet = tweet.text();
    var pubDate = li_tweet.find('.item-source').text();
    var clickedLink = tweet[0];
    var popoverHTML = '<div class="popover">'+
                      '<div class="popover-inner">'+
                        '<div class="content-block">'+
                            '<div class="row">'+
                                '<div class="col-20 item-media">'+
                                    '<img src="'+photo+'">'+
                                '</div>'+
                                '<div class="col-80 item-content">'+
                                    '<div>'+
                                        username+'<br> <span> '+pubDate+' </span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                          '<p>'+text_tweet+'</p>'+
                        '</div>'+
                      '</div>'+
                    '</div>';
    if($$('.popover').length==1){
        myApp.closeModal();
    }else{
        myApp.popover(popoverHTML, clickedLink);
    }

    $$('.modal-overlay').on('click',function(){
        myApp.closeModal();
    })

}