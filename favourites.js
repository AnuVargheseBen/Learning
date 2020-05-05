jQuery.fn.middle = function () {
  this.css("bottom", "0px");
  this.css("left", "0px");
  this.css("bottom", Math.max(0, ((jQuery(window).height() - this.outerHeight()) / 2) + jQuery(window).scrollTop()) + "px");
  this.css("left", Math.max(0, ((jQuery(window).width() - this.outerWidth()) / 2) + jQuery(window).scrollLeft()) + "px");
  return this;
}



function closeCartPopUp() {
  jQuery("div.add_cart_popup").fadeOut(200);
  $("#messageCheckbox").prop("checked", false);
}

function showCartPopUp(qty_added, curr_total, total, subtotal, item_name, item_image, curr_total_left) {

  if (qty_added == 1) {
    jQuery("#pop-item-qty").html(qty_added + " item added to your cart");
  } else {
    jQuery("#pop-item-qty").html(qty_added + " items added to your cart");
  }
  jQuery("#pop-cart-qty").html(qty_added);
  jQuery("#pop-cart-total").html('$' + (parseFloat(subtotal)).toFixed(2));
  jQuery("#pop-cart-price").html(curr_total);
  jQuery("#pop-cart-price1").html(curr_total_left);
  jQuery("#pop-cart-name").html(item_name);
  jQuery("#pop-cart-image").html('<img src=' + item_image + '>');
  $("#messageCheckbox").prop("checked", false);
  jQuery("div.add_cart_popup").fadeIn(200);

}
jQuery("body").delegate('#pop-close,#btn-continue-shop', 'click', function () {
  // closeCartPopUp();
  deleteFromFavourite();
});

function eventAddCart(element) {

  var checkArray = new Array();
  $('input[type=checkbox]').each(function () {
    this.checked ? checkArray.push($(this).val()) : checkArray.push("0");
  });
  var count = 0;
  var quantity = 0;
  var qty_multiple = new Array();
  for (var i = 0; i < checkArray.length; i++) {
    if (checkArray[i] != 0) {
      $('#qty_' + checkArray[i]).each(function () {
        // qty_multiple.push(parseInt($(this).val()));

        quantity = quantity + parseInt($(this).val());

        count++;
      });

    }
    console.log('quantity', quantity);
    // console.log('quantity_multiple', qty_multiple);
  }

  if (count == 1) {
    var checkedValue = $('#messageCheckbox:checked').val();

    console.log('checkedValue', checkedValue);
    var internalid = $('#internalid_' + checkedValue).html();
    console.log('id', internalid);
    var customInternalID = $('#custominternalid_' + checkedValue).html();
    console.log('id', customInternalID);
    var item_name = $('#name_' + checkedValue).html();
    var item_image = $('#image_' + checkedValue).attr('src');
    var qty_added = $('#qty_' + checkedValue).val();
    console.log('qty_added', parseInt(qty_added));
    var curr_total = $('#total_' + checkedValue).html();
    var curr_total_left = $('#total_' + checkedValue).html();
    console.log('totu', curr_total);
    var pricebreak_ = $('#pricebreak_' + checkedValue).html();
    console.log('pricebreak_', pricebreak_);
    var testarray = new Array()
    testarray.push(pricebreak_);


    console.log(testarray[0]);
    abcarray = new Array();
    try {
      var price_break1 = $('#prices1_' + checkedValue).html()
      if (price_break1 != " ") {
        price_break_$ = price_break1.replace('$', "");
        // console.log('price_break_$',price_break_$);
        var a_pricebreak = price_break_$.replace(',', "")
        // console.log({a_pricebreak})
        var final_pricebreak = parseFloat(a_pricebreak);
      }

      if (final_pricebreak > 0) {
        abcarray.push('1');
      }
      console.log({ abcarray });
      console.log('price_break1', price_break1);
      var price_break2 = $('#prices2_' + checkedValue).html()
      var price_break3 = $('#prices3_' + checkedValue).html()

      var price_breakArray = new Array();
      price_breakArray.push(price_break1);
      price_breakArray.push(price_break2);
      price_breakArray.push(price_break3);
      console.log(price_breakArray);
    }
    catch (e) {
      console.log('No pricebreak');
    }


    var flag = 0;
    var button = jQuery(element);
    if (button) {
      var curr_total = $('#total_' + checkedValue).html();

      console.log('working', curr_total)
      console.log('soja', pricebreak_);
      var a = pricebreak_.replace('$', "");
      var b = parseFloat(a);
      var total;
      if (qty_added == 1) {
        total = b;
        console.log({ total });
      }


      if (parseInt(qty_added) != 0) {
        if (abcarray[0] == 1) {
          if (parseInt(qty_added) > 0 && parseInt(qty_added) < 6) {

            if (price_breakArray[2] == undefined) {
              if (parseInt(qty_added) > 0 && parseInt(qty_added) < 6) {
                curr_total = price_breakArray[0];
                console.log("total:", curr_total)
                addCart(internalid, qty_added, curr_total, item_name, item_image, curr_total_left);

              }
              if (parseInt(qty_added) >= 4 && parseInt(qty_added) >= 6) {
                curr_total = price_breakArray[1];
                console.log("total:", curr_total)
                addCart(internalid, qty_added, curr_total, item_name, item_image, curr_total_left);

              }

            }
            else {
              if (parseInt(qty_added) == 2) {
                curr_total = price_breakArray[1];
                console.log("total:", curr_total)
                addCart(internalid, qty_added, curr_total, item_name, item_image, curr_total_left);
              }
              else if (parseInt(qty_added) >= 3) {
                curr_total = price_breakArray[2];
                console.log("total:", curr_total)
                addCart(internalid, qty_added, curr_total, item_name, item_image, curr_total_left);
              }
              else {
                curr_total = price_breakArray[0];
                console.log("total:", curr_total)
                addCart(internalid, qty_added, curr_total, item_name, item_image, curr_total_left);
              }

            }

          }
        }

        else {
          console.log("total:", curr_total)
          addCart_Nobreak(internalid, qty_added, curr_total, item_name, item_image, curr_total_left);
        }


        if (abcarray[0] == 1) {
          if (parseInt(qty_added) > 4 && parseInt(qty_added) < 10) {
            curr_total = price_breakArray[1];
            console.log("total:", curr_total)
            addCart(internalid, qty_added, curr_total, item_name, item_image, curr_total_left);
          }
        }

        else {
          console.log("total:", curr_total)
          addCart_Nobreak(internalid, qty_added, curr_total, item_name, item_image, curr_total_left);
        }
        if (abcarray[0] == 1) {
          if (parseInt(qty_added) >= 10) {
            curr_total = price_breakArray[2];
            console.log("total:", curr_total)
            addCart(internalid, qty_added, curr_total, item_name, item_image, curr_total_left);
          }
        }

        else {
          console.log("total:", curr_total)
          addCart_Nobreak(internalid, qty_added, curr_total, item_name, item_image, curr_total_left);
        }
      }
      else {
        alert('Please enter a valid quantity value.');
      }

    }

  }
  else if (quantity > 0) {

    alert(quantity + " Items Added to Cart")
    // var checkItems = [];
    // let promises = [];
    $('input[type=checkbox]').each(function () {
      if (this.checked) {
        const id = $(this).val();
        const internalId = $(`#internalid_${id}`).html();
        const qty = $(`#qty_${id}`).val();
        console.log({ id, internalId, qty });
        //checkItems.push({ internalId, qty });
        jQuery.get(`/app/site/backend/additemtocart.nl?c=3569624&n=1&buyid=${internalId}&qty=${qty}`);
        // promises.push(request);
      }
    });

    var internalid = new Array();
    for (var i = 0; i < checkArray.length; i++) {
      if (checkArray[i] != 0) {
        $('#custominternalid_' + checkArray[i]).each(function () {

          internalid.push(parseInt($(this).html()));
        });

      }

    }

    console.log('internalid', internalid);




    var customerID = "<%=getCurrentAttribute('customer','internalid')%>";
    var u = "https://3569624-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=328&deploy=1&compid=3569624_SB1&h=20c8b25f67471a33f712&custid=" + customerID + "&internalid=" + internalid;
    var cb = 'removeFromListOfRecordAdd';
    console.log({ u });
    getJSONP(u + '&callback=' + cb);

    jQuery("#pop-cart-qty1").html(quantity);
    // jQuery("#myModal1").modal({ backdrop: false });
  }
  else {
    alert('Please select an item')
  }


}

function getRequest(url) {
  return new Promise((resolve, reject) => jQuery.get(url, (res) => { console.log('i am here'); resolve(res) }));
}

function incrimentCart(id) {


  var qty = $("#qty_" + id).val();
  if (qty == 1) {
    $(".decrement-quantity").attr("disabled", "disabled");
  }
  // remove disabled attribute on subtract
  if (qty >= 1) {
    $(".decrement-quantity").removeAttr("disabled");
  }

  var currentVal = parseInt(qty) + 1;
  $("#qty_" + id).val(currentVal);

}
function decrimentCart(id) {

  var qty = $("#qty_" + id).val();
  var currentVal = parseInt(qty) - 1;
  $("#qty_" + id).val(currentVal);

  if (qty <= 1) {
    $(".decrement-quantity").attr("disabled", "disabled");

  }
}
function addCart(internalid, qty_added, curr_total, item_name, item_image, curr_total_left) {

  console.log('beno', internalid);
  var curr_total_$ = curr_total.split('$')[1];
  console.log(curr_total_$);
  try {
    var test = curr_total_$.replace(',', '');
  }
  catch (e) {
    var test = curr_total_$;
  }
  jQuery('#items-qty').html(parseInt(jQuery('#items-qty').html()) + parseInt(qty_added));
  subtotal = (parseFloat(test) * parseFloat(qty_added)).toFixed(2);
  console.log('qty_added', qty_added);
  total = parseFloat(jQuery('#cart-total').html().replace('$', '').replace(',', '')).toFixed(2);
  console.log('internalid', internalid);
  jQuery('#cart-total').html('$' + (parseFloat(total) + parseFloat(subtotal)).toFixed(2));
  showCartPopUp(qty_added, curr_total, total, subtotal, item_name, item_image, curr_total_left);
  // jQuery.getScript('/app/site/backend/additemtocart.nl?c=3569624&n=1&buyid=' + internalid + '&qty=' + qty_added);
  jQuery.post('/app/site/backend/additemtocart.nl',
    { c: 3569624, n: 1, buyid: internalid, qty: qty_added },
    (data) => console.log({ callback: data }));
  jQuery("#myModal").modal({ backdrop: false });
  // $("#messageCheckbox").prop("checked", false);

}
function addCart_Nobreak(internalid, qty_added, curr_total, item_name, item_image, curr_total_left) {

  console.log('beno', internalid);
  // var curr_total_$= curr_total.split('$')[1];
  // console.log(curr_total_$);
  try {
    var test = curr_total.replace(',', '');
  }
  catch (e) {
    var test = curr_total;
  }
  jQuery('#items-qty').html(parseInt(jQuery('#items-qty').html()) + parseInt(qty_added));
  subtotal = (parseFloat(test) * parseFloat(qty_added)).toFixed(2);
  console.log('qty_added', qty_added);
  total = parseFloat(jQuery('#cart-total').html().replace('$', '').replace(',', '')).toFixed(2);
  console.log('internalid', internalid);
  jQuery('#cart-total').html('$' + (parseFloat(total) + parseFloat(subtotal)).toFixed(2));
  showCartPopUp(qty_added, curr_total, total, subtotal, item_name, item_image, curr_total_left);
  // jQuery.getScript('/app/site/backend/additemtocart.nl?c=3569624&n=1&buyid=' + internalid + '&qty=' + qty_added);
  jQuery.post('/app/site/backend/additemtocart.nl',
    { c: 3569624, n: 1, buyid: internalid, qty: qty_added },
    (data) => console.log({ callback: data }));
  jQuery("#myModal").modal({ backdrop: false });
  // $("#messageCheckbox").prop("checked", false);

}
function removeFromListOfRecordAdd(data) {
  try {
    // console.log({data});
    var myObj1 = JSON.parse(data);
    console.log('myObj1', myObj1)
    if (myObj1.result) {
      console.log("The items are deleted");
      window.location.reload();
    } else {
      console.log("Something went wrong");
    }

  } catch (err) {
    console.log(err);
  }

}
function deleteFromFavourite() {
  console.log('hii');
  var checkArray = new Array();
  $('input[type=checkbox]').each(function () {
    this.checked ? checkArray.push($(this).val()) : checkArray.push("0");
  });

  console.log({ checkArray });
  var internalid = new Array();
  for (var i = 0; i < checkArray.length; i++) {
    if (checkArray[i] != 0) {
      $('#custominternalid_' + checkArray[i]).each(function () {

        internalid.push(parseInt($(this).html()));
      });

    }

  }
  console.log('internalid', internalid);

  var customerID = "<%=getCurrentAttribute('customer','internalid')%>";
  var u = "https://3569624-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=328&deploy=1&compid=3569624_SB1&h=20c8b25f67471a33f712&custid=" + customerID + "&internalid=" + internalid;
  var cb = 'removeFromListOfRecordAdd';
  console.log({ u });
  getJSONP(u + '&callback=' + cb);

}


jQuery(document).ready(function ($) {
  jQuery("input[name=qty]").each(function () {
    jQuery(this).blur(function () {

      var qty = jQuery(this).val();
      var elem_i_pr = jQuery(this).closest('.item-addtocart').prev();
      console.log({ elem_i_pr });
      var def_price = jQuery(this).closest('.item-addtocart').prev().prev().html();

      if (def_price.match('table')) {
        var prices_list = jQuery(def_price).find('table');

        for (var x = 0; x < prices_list.find('tr').length; x++) {

          if (x > 0) {

            var o = jQuery(prices_list.find('tr')[x]);

            if (o.html().match(/\–/) != null) {

              i = jQuery.trim(o.children().eq(0).text().split('–')[0]);
              n = jQuery.trim(o.children().eq(0).text().split('–')[1]);

              if (parseInt(qty) >= parseInt(i) && parseInt(qty) <= parseInt(n)) {
                console.log(o.children().eq(1).html());
                elem_i_pr.html(o.children().eq(1).html());
              }

            }

            if (o.html().match(/\+/) != null) {

              i = jQuery.trim(o.children().eq(0).text().split('+')[0]);

              if (parseInt(qty) >= parseInt(i)) {
                console.log(o.children().eq(1).html());
                elem_i_pr.html(o.children().eq(1).html());
              }

            }
          }
        }

      } else {
        elem_i_pr.html(jQuery(def_price).html());
      }
    });
  });
});