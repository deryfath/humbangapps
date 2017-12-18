myApp.onPageInit('delivery_shop_list', function (page) {

	$('#tabbar_home').css("display","block");

	$('.toolbar-inner-home').css('background','white');

	$('.toolbar-inner-home').html('<a href="#" class="submit-delivery-shop" style="margin: 0 auto;"><i class="icon f7-icons" style="color: #143b41;">check_round_fill</i><span class="tabbar-label">Konfirmasi</span></a>');

	console.log(Template7.global.backToMenuCart);

	$('.back').click(function(){

		$('.toolbar-inner-home').html('');

		if (Template7.global.backToMenuCart) {
			mainView.router.back({
				url : 'view/shop/cart_shop_landing_page.html',
				force : true,
				reload : true
			});	
		}else{
			mainView.router.back({
				url : 'view/shop/cart_shop.html',
				force : true,
				reload : true
			});	
		}
		
		$('.toolbar-inner-home').css('background','#ac312a');

		$('.toolbar-inner-home').html('<div style="color:white;font-weight: bold;">Total :<b style="font-size: large;color: white;"> Rp <a id="price_total_cart" style="color:white;">'+comma_digits(priceTotal)+'</a> </b></div><div style="background: #0e344e;width: 22%;height: 100%;margin-right: -8px;"><a href="#" id="next_cart_btn" style="text-align: center;"><i class="icon f7-icons" style="color: #09a0cb;margin-top: 5px;">check_round_fill</i><span class="tabbar-label" style="font-weight: bolder;color: white;">CHECKOUT</span></a></div>')


	})

	showLoading();
	setTimeout(function(){

		hideLoading();
		
		console.log(Template7.global.userdata);
		console.log(Template7.global.totalCart);

		document.getElementById('name_delivery').value = Template7.global.userdata.fullname;
		document.getElementById('address_delivery').value = Template7.global.userdata.address;
		document.getElementById('phone_delivery').value = Template7.global.userdata.phone;
		document.getElementById('email_delivery').value = Template7.global.userdata.email;

	}, 1000);

	$('#update_delivery_address').unbind('click').click(function(){
		var nameVal = document.getElementById('name_delivery').value;
		var emailVal = document.getElementById('email_delivery').value;
		var addressVal = document.getElementById('address_delivery').value;
		var phoneVal = document.getElementById('phone_delivery').value;

		updateDeliveryAccount(nameVal,emailVal,addressVal,phoneVal);

		setTimeout(function(){
			mainView.router.reloadPage('view/shop/delivery_shop.html');

		}, 1000);
	})

	$('.submit-delivery-shop').unbind('click').click(function(){
		var paymentVal = $('input[name=my-radio-payment]:checked').val();
		Template7.global.paymentMethod = paymentVal;
		console.log(paymentVal);
		console.log(Template7.global.totalCart);
		console.log(Template7.global.arrDataCart);

		// Change to your service ID, or keep using the default service
		  var service_id = "gmail";
		  var template_id = "template_baQQBzp0";

		  var emailId = makeid();
		  var emailHtmlElement = "";

		  var styleRow = "";

		  $$.each(Template7.global.arrDataCart, function (index, value) {

		  		console.log(value.name);

		  		if (index%2==0) {
		  			styleRow = "background-color: #dddddd;";
		  		}else{
		  			styleRow = "background-color: #ffffff;";
		  		}

		  		emailHtmlElement +=  '<tr style="'+styleRow+'">'+
                    '<td>'+value.name+'</td>'+
                    '<td>'+value.total+'</td>'+
                    '<td>'+value.price_show+'</td>'+
                    '<td>Rp '+comma_digits(value.subtotal)+'</td>'+
                  '</tr>';

		  })

		  
           // console.log(emailHtmlElement);

		  console.log(emailId);

		  var emailTemplateHTML = '<html xmlns="http://www.w3.org/1999/xhtml">'+
'<head>'+
'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'+

'<meta name="viewport" content="width=device-width, initial-scale=1.0" />'+
'<title></title>'+
'<style type="text/css">'+
'* {'+
  '-webkit-font-smoothing: antialiased;'+
'}'+
'body {'+
  'Margin: 0;'+
  'padding: 0;'+
  'min-width: 100%;'+
  'font-family: Arial, sans-serif;'+
  '-webkit-font-smoothing: antialiased;'+
  'mso-line-height-rule: exactly;'+
'}'+

'img {'+
  'border: 0;'+
'}'+
'.wrapper {'+
  'width: 100%;'+
  'table-layout: fixed;'+
  '-webkit-text-size-adjust: 100%;'+
  '-ms-text-size-adjust: 100%;'+
'}'+
'.webkit {'+
  'max-width: 600px;'+
'}'+
'.outer {'+
  'Margin: 0 auto;'+
  'width: 100%;'+
  'max-width: 600px;'+
'}'+
'.full-width-image img {'+
  'width: 100%;'+
  'max-width: 600px;'+
  'height: auto;'+
'}'+
'.inner {'+
  'padding: 10px;'+
'}'+
'p {'+
  'Margin: 0;'+
  'padding-bottom: 10px;'+
'}'+
'.h1 {'+
  'font-size: 21px;'+
  'font-weight: bold;'+
  'Margin-top: 15px;'+
  'Margin-bottom: 5px;'+
  'font-family: Arial, sans-serif;'+
  '-webkit-font-smoothing: antialiased;'+
'}'+
'.h2 {'+
  'font-size: 18px;'+
  'font-weight: bold;'+
  'Margin-top: 10px;'+
  'Margin-bottom: 5px;'+
  'font-family: Arial, sans-serif;'+
  '-webkit-font-smoothing: antialiased;'+
'}'+
'.one-column .contents {'+
  'text-align: left;'+
  'font-family: Arial, sans-serif;'+
  '-webkit-font-smoothing: antialiased;'+
'}'+
'.one-column p {'+
  'font-size: 14px;'+
  'Margin-bottom: 10px;'+
  'font-family: Arial, sans-serif;'+
  '-webkit-font-smoothing: antialiased;'+
'}'+
'.two-column {'+
  'text-align: center;'+
  'font-size: 0;'+
'}'+
'.two-column .column {'+
  'width: 100%;'+
  'max-width: 300px;'+
  'display: inline-block;'+
  'vertical-align: top;'+
'}'+
'.contents {'+
  'width: 100%;'+
'}'+
'.two-column .contents {'+
  'font-size: 14px;'+
  'text-align: left;'+
'}'+
'.two-column img {'+
  'width: 100%;'+
  'max-width: 300px;'+
'}'+
'.two-column .text {'+
  'padding-top: 10px;'+
'}'+
'.three-column {'+
  'text-align: center;'+
  'font-size: 0;'+
  'padding-top: 10px;'+
  'padding-bottom: 10px;'+
'}'+
'.three-column .column {'+
  'width: 100%;'+
  'max-width: 200px;'+
  'display: inline-block;'+
  'vertical-align: top;'+
'}'+
'.three-column .contents {'+
  'font-size: 14px;'+
  'text-align: center;'+
'}'+
'.three-column img {'+
  'width: 100%;'+
  'max-width: 180px;'+
  'height: auto;'+
'}'+
'.three-column .text {'+
  'padding-top: 10px;'+
'}'+
'.img-align-vertical img {'+
  'display: inline-block;'+
  'vertical-align: middle;'+
'}'+
'.contents1 {'+
  'width: 100%;'+
'}'+

'table {'+
    'font-family: arial, sans-serif;'+
    'border-collapse: collapse;'+
    'width: 100%;'+
'}'+

'td, th {'+
    'border: 1px solid #6d666600;'+
    'text-align: left;'+
    'padding: 8px;'+
'}'+


'</style>'+

'</head>'+

'<body style="Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;background-color:#f3f2f0;">'+
'<center class="wrapper" style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#f3f2f0;">'+
  '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f2f0;" bgcolor="#f3f2f0;">'+
    '<tr>'+
      '<td width="100%"><div class="webkit" style="max-width:600px;Margin:0 auto;">'+ 
          
                
                // ======= start two column ======= 
                
                '<table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#FFFFFF"  style=" border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5">'+
                  '<tr>'+
                    '<td background="https://firebasestorage.googleapis.com/v0/b/catatani-ba229.appspot.com/o/background-email-template.jpg?alt=media&token=a545d028-0714-4e92-be25-a69366d6b691" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;text-align:center;font-size:0" class="two-column">'+
                      
                      '<div>'+
                        
                        '<div class="column" style="width:100%;max-width:299px;display:inline-block;vertical-align:top;">'+
                          '<table width="100%" style="border-spacing:0">'+
                            '<tr>'+
                              '<td class="inner" style="padding-top:20px;padding-bottom:10px; padding-right:10px;padding-left:30px;"><table class="contents1" style="border-spacing:0; width:100%">'+
                                  '<tr>'+
                                    '<td align="center" valign="middle" style="padding-top:20px; padding-right:30px"><p style="font-size:30px; text-decoration:none; color:#ffffff; text-align:left"><img src="https://firebasestorage.googleapis.com/v0/b/catatani-ba229.appspot.com/o/logo.png?alt=media&token=a7adfc0a-a11a-4a8a-b6af-e737e6d7739a" style="max-width:14%;">Green<strong>shop</strong></p>'+
                                      
                                      '</td>'+
                                  '</tr>'+
                                '</table></td>'+
                            '</tr>'+
                          '</table>'+
                        '</div>'+
                        
                    
                        
                        '<div class="column" style="width:100%;max-width:299px;display:inline-block;vertical-align:top;">'+
                          '<table width="100%" style="border-spacing:0">'+
                            '<tr>'+
                              
                            '</tr>'+
                          '</table>'+
                        '</div>'+
                        
                        '</div>'+
                      
                    '</td>'+
                  '</tr>'+
                '</table>'+
                
                // ======= end two column ======= 
                  // ======= start two column =======
                
                '<div style="padding: 30px;background: white;margin-bottom: -30px;">'+
                  '<div style="font-size:11px;">'+
                    '<p style="font-size: 16px;text-align: center;font-weight: bold;margin-bottom: 35px;">Detail Pembelian</p>'+
                    '<p>Nama&emsp;&emsp;&emsp;&emsp;: <strong>'+Template7.global.userdata.fullname+'</strong></p>'+
                    '<p>Pembayaran&emsp;: <strong>'+paymentVal+'</strong></p>'+
                    '<p>Alamat&emsp;&emsp;&emsp;&nbsp;&nbsp;: <strong>'+Template7.global.userdata.address+'</strong></p>'+

                  '</div>'+
                '</div>'+
                
                // ======= end two column ======= 
                // ======= start two column =======
                
                '<div style="padding:30px;background: white;">'+
                 '<table style="font-size: 11px;">'+
                    '<thead>'+
                       '<tr>'+
                          '<th>Nama Barang</th>'+
                          '<th>Kuantitas</th>'+
                          '<th>Harga</th>'+
                          '<th>Subtotal</th>'+
                        '</tr>'+
                    '</thead>'+
                    '<tfoot style="font-weight: bold;font-size: larger;">'+
                      '<tr>'+
                        '<td></td>'+
                        '<td></td>'+
                        '<td>Total</td>'+
                        '<td>Rp '+comma_digits(Template7.global.totalCart)+'</td>'+

                      '</tr>'+
                    '</tfoot>'+
                    '<tbody>'+emailHtmlElement+      
                      
                    '</tbody>'+
                    
                  '</table>'+
                '</div>'+
                
               // ======= end two column ======= 
                
                '<div style="background: white;text-align: center;padding: 10px;margin-top: -23px;">'+
                  
                  '<div>'+
                      '<p style="font-size:13px;"><strong>Sisa Waktu Pembayaran Anda</strong></p>'+
                      '<img src="http://i.cdngif.com/1l33e.gif?id='+emailId+'" alt="countdownmail.com">'+
                  '</div>'+

                '</div>'+

                //  '<div style="background: white;text-align: center;padding: 10px;margin-top: -23px;">'+
                  
                //   '<div>'+
                //      '<button onclick="window.open("catatani://", "_system")">Open the other app</button>'+
                //   '</div>'+

                // '</div>'+
                
                //======= start two column ======= 
                
                '<table cellpadding="0" cellspacing="0" border="0" width="100%">'+
                  '<tr>'+
                    '<td background="https://firebasestorage.googleapis.com/v0/b/catatani-ba229.appspot.com/o/background-email-template.jpg?alt=media&token=a545d028-0714-4e92-be25-a69366d6b691" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;text-align:left;" class="two-column">'+
                      
                      '<div>'+
                        
                        '<div class="column" style="text-align:left;width:100%;max-width:299px;display:inline-block;">'+
                          '<table width="100%" style="border-spacing:0">'+
                            '<tr>'+
                              '<td class="inner" style="padding-top:20px;padding-bottom:10px; padding-right:10px;padding-left:30px;"><table class="contents1" style="border-spacing:0; width:100%">'+
                                  '<tr>'+
                                    '<td   align="center" valign="middle" style="padding-top:20px; padding-right:30px">'+
                                      '<p style="color:#ffffff;font-size:10px; "><strong>Kontak Kami</strong></p>'+
                                      '<p style="color:#ffffff;font-size:10px; ">Email : iotera@gmail.com</p>'+
                                      '<p style="color:#ffffff;font-size:10px; ">Telp : 083737838372</p>'+
                                      '</td>'+
                                  '</tr>'+
                                '</table></td>'+
                            '</tr>'+
                          '</table>'+
                        '</div>'+
                        
                       
                        
                        '<div class="column" style="width:100%;max-width:299px;display:inline-block;vertical-align:top;">'+
                          
                        '</div>'+
                        
                        '</div>'+
                      
                     '</td>'+
                  '</tr>'+
                '</table>'+
                
                // ======= end two column =======
                
               
            '</tr>'+
          '</table>'+
          
        '</div></td>'+
    '</tr>'+
  '</table>'+
'</center>'+
'</body>'+
'</html>';


		  emailjs.send(service_id,template_id,{
			 text:	emailTemplateHTML, 
			 from:	"ioterateam2@gmail.com", 
			 to:		Template7.global.userdata.email,
			 subject:	"CATATANI - ORDER DETAIL",
			})
			.then(
			  function(response) {
			    console.log("SUCCESS", response);
			  }, 
			  function(error) {
			    console.log("FAILED", error);
			  }
			);

		

	  


		showLoading();
		setTimeout(function(){
			mainView.router.load({
				url : 'view/shop/order_final_shop.html'
			});

			
			hideLoading();
			insertTransaction(Template7.global.totalCart,paymentVal);

			

		}, 1000)


		
	})



	// $('#next_delivery_account').click(function(){
	// 	var paymentVal = $('input[name=my-radio]:checked').val();
	// 	Template7.global.paymentMethod = paymentVal;
	// 	console.log(paymentVal);
	// 	console.log(Template7.global.totalCart);

	// 	showLoading();
	// 	setTimeout(function(){
	// 		hideLoading();
	// 		mainView.router.load({
	// 			url : 'view/shop/order_final_shop.html'
	// 		});

	// 	}, 1000)

		

	// 	insertTransaction(Template7.global.totalCart,paymentVal)
	// })



	
})
