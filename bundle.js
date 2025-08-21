//https://www.puravidabracelets.com/products/customize-your-bracelet
var count = 1;
var cstmarr = [];
$(".cstm_btn").on("click", function () {
  const prodimg = $(this).attr("prodimg");
  const prodid = $(this).attr("prodid");
   $(this).siblings(".cstm_btn_remove").css('display', 'block');
   $(this).hide();
  cstmarr.push(prodid);
  console.log(cstmarr);
  var selectedslot = '.bundle-slot-' + cstmarr.length;
  console.log(selectedslot);
  $(selectedslot).append(`<img src="${prodimg}" class="product-image"><span class="pro-cross" prodid="${prodid}" selectedslot="${selectedslot}">x</span>`);
 $(selectedslot).find('.lock-box').hide();

  // $(selectedslot).html(`<img src="${prodimg}" class="product-image"><span class="pro-cross" prodid="${prodid}">x</span>`);
  console.log("====================check count"+count);
  if(count == 4){
    $('.cstm_btn').prop('disabled', true);
  }
  if(count >= 2){
    $('.bundle-save-button').prop('disabled', false);
    $('.bundle-save-button').css('background-color', 'black');
  }else{
     $('.bundle-save-button').prop('disabled', true );
    $('.bundle-save-button').css('background-color', '#ddd');
  }
  count++;
}); 

$(document).on("click", ".pro-cross", function () {
   count--;
   console.log("====================pro-cross"+count);
  const prodid = $(this).attr("prodid");
  const selectedslot=$(this).attr("selectedslot");
  $.each(cstmarr, function(index, element) {
      //console.log("Index: " + index + ", Value: " + element);
    if(prodid == element){
      cstmarr.splice(index, 1);
      console.log(index);
    }
}); //Remove from array
    $.each($(".cstm_btn_remove"), function(index, element) {
  const prodidbtn = $(element).attr("prodid");
 //console.log("Index: " + index + ", Value: " + prodid);
        if(prodid == prodidbtn){
           $(this).siblings(".cstm_btn").css('display', 'block');
           $(this).hide();
    }
  }); 
  renderDrawer();
 
});
function renderDrawer() {
  // Reset count and slots
  // Clear all product slots first
  $(".bundle-slot").each(function(index, el) {
    $(el).find('.product-image').remove();
    $(el).find('.pro-cross').remove();
    $(el).find('.lock-box').show(); // Restore lock box
  });

  // Re-populate product slots based on cstmarr
  for (let i = 0; i < cstmarr.length; i++) {
    const prodid = cstmarr[i];
    const prodimg = $(`.cstm_btn[prodid="${prodid}"]`).attr("prodimg");
    const slotSelector = `.bundle-slot-${i + 1}`;
    
    $(slotSelector).append(`<img src="${prodimg}" class="product-image">
      <span class="pro-cross" prodid="${prodid}">x</span>`);
    $(slotSelector).find('.lock-box').hide();
  }

  // Update buttons and UI
  if (count >= 2) {
    $('.bundle-save-button').prop('disabled', false).css('background-color', 'black');
  } else {
    $('.bundle-save-button').prop('disabled', true).css('background-color', '#ddd');
  }
   if(count<=4){
    $('.cstm_btn').prop('disabled', false);
  }else{
    $('.cstm_btn').prop('disabled', true);
  }
}

$(document).on("click", ".cstm_btn_remove", function () {
  count--;
   console.log("====================cstm_btn_remove"+count);
  const prodid = $(this).attr("prodid");
 
  cstmarr = cstmarr.filter(id => id !== prodid);

 //console.log("After remove button click, cstmarr:", cstmarr);
  $(this).siblings(".cstm_btn").css('display', 'block');
  $(this).hide();

  // Re-render the entire drawer UI
  renderDrawer();
  
    
});

// $(document).on("click", ".cstm_btn_remove", function () {
//    count--;
//    if(count <= 4){
//     $('.cstm_btn').prop('disabled', false);
//   }
//   if(count <= 2){
//      $('.bundle-save-button').prop('disabled', true );
//     $('.bundle-save-button').css('background-color', '#ddd');
//   }
//   console.log("we remove from button");
//   const prodid = $(this).attr("prodid");
//   //Remove id from array 
//   $.each(cstmarr, function(index, element) {
//       //console.log("Index: " + index + ", Value: " + element);
//     if(prodid == element){
//       cstmarr.splice(index, 1);
//     }
// }); 
//   console.log(cstmarr);
//   //Remove from card drawer
//   $.each($(".pro-cross"), function(index, element) {
//   const prodidcross = $(element).attr("prodid");
//  // console.log("Index: " + index + ", Value: " + prodid);
//         if(prodid == prodidcross){
//         $(this).siblings('.lock-box').css('display', 'block');
//         $(this).siblings('.product-image').remove(); // Remove image
//         $(this).remove();
//     }
//   }); 
//   //Show add to cart and hide remove button
//    $(this).siblings(".cstm_btn").css('display', 'block');
//    $(this).hide();
 
//   });


  var items = [];
$(".bundle-save-button").on("click", function () {
  console.log(cstmarr);
  for (var i = 0; i < cstmarr.length; i++) {
          var item = {
              quantity:1,
              id: cstmarr[i],
              properties:{ "Someprop": "BUNDLE ITEM" } 
          };
      items.push(item);
  }

  console.log("we are here=========================");
  console.log(items);
   $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    dataType: 'json',
    contentType: 'application/json', // 👈 This is the fix
    data: JSON.stringify({ items }), 
    success: function(data) { 
      console.log("Added successfully", data);
       window.location.href = "/cart";
    },
    error: function (error) {
      console.log("Add to cart error:", error.responseText || error);
    }
  });
 

});
