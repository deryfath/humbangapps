myApp.onPageInit('purchase_review', function (page) {


	var productType = page.query.product_type;
	var vendorName = page.query.vendor_name;
	var purchaseId = page.query.purchase_id;
	var purchaseLineId = page.query.purchase_line_id;
	var price = page.query.price;
	var quantity = page.query.quantity;
	var total = page.query.total;

	$('.back').click(function(){
		mainView.router.back({
			url : 'view/seller/purchase_coffee.html'
		});
	})

	$('.toolbar-inner-home').html('<a href="#" id="confirm_purchase_review_coffee" style="margin: 0 auto;"><i class="icon f7-icons" style="color: #cedcde;margin:1px;">check_round_fill</i><span class="tabbar-label" style="color: white;">KONFIRMASI</span></a>');

	$('#tabbar_home').css("display","block");

	document.getElementById('vendor_purchase_review_coffee').value = vendorName;
	document.getElementById('comodity_purchase_review_coffee').value = productType;
	document.getElementById('price_purchase_review_coffee').value = "Rp "+comma_digits(price);
	document.getElementById('quantity_purchase_review_coffee').value = quantity;
	document.getElementById('total_final_purchase_review_coffee').value = "Rp "+comma_digits(total);

	$('#confirm_purchase_review_coffee').click(function(){

		showLoading();
		setTimeout(function() {

			  var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);

		      var dataSend = {
                   purchase_line_id : purchaseLineId,
                   quality : ratingValue,
                   comment : document.getElementById('comment_purchase').value
              } 

	          console.log(dataSend);

	          $.ajax({
	                type: "POST",
	                url: "http://plantera.iotera.io/update_purchase_line.php",
	                data: dataSend,
	                dataType:"json",
	                success: function(data){

	                 console.log(data);

	                  $('.toolbar-inner-home').html('');

				      $('#tabbar_home').css("display","none");

	                  hideLoading();
					  mainView.router.load({
			            url : 'view/seller/payment.html?purchase_id='+purchaseId+'&purchase_line_id='+purchaseLineId
			          });

	                }
	            });


			

		}, 100);
	})

	//RATING
    var stars = $('#stars li').parent().children('li.star');

    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }

    ratingStarEvent();

   

})
