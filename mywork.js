
/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 * @Description
 *  Customer Details List on Customer center
 */
/*******************************************************************************
 * 
 * ***********SSR-24************
 * 
 * 
 * AUTHOR:JOBIN AND JISMI IT SERVICES LLP
 * 
 * CREATED ON :16/04/2020
 * 
 * 
 * REVISION HISTORY
 *  
 * Revision 1.0 $ 16/04/2020 Anu Varghese: Create
 * 
 ******************************************************************************/
define(['N/runtime', 'N/error', 'N/record', 'N/search', 'N/ui/serverWidget'],
  function (runtime, error, record, search, serverWidget) {
    return {
      onRequest: function getCustomerDetails(context) {
        var savedSearchResult, savedSearchResultOfCustomer;
        try {

          var customerObj = runtime.getCurrentUser();
          var id = customerObj.id;
          log.debug('customerObj', customerObj);
          savedSearchResultOfCustomer = savedSearchOfCustomers(id, search);
          log.debug('result2', savedSearchResultOfCustomer);

          savedSearchResult = savedSearchOfSubCustomers(id, search)
          log.debug('result', savedSearchResult);
          var form = serverWidget.createForm({
            title: 'View Related Accounts'
          });
          form.clientScriptFileId = 9179;

          var sublist = form.addSublist({
            id: 'sublist',
            type: serverWidget.SublistType.LIST,
            label: 'Customer List'
          });


          var CustomerNameField = sublist.addField({
            id: 'sublist_name',
            type: serverWidget.FieldType.TEXT,
            label: 'Name'
          });

          var subCustomerAddressField = sublist.addField({
            id: 'sublist_shippingaddress',
            type: serverWidget.FieldType.TEXT,
            label: 'Shipping Address'
          });
          var subCustomerPhoneField = sublist.addField({
            id: 'sublist_phonenumber',
            type: serverWidget.FieldType.TEXT,
            label: 'Phone Number'
          });

          if (savedSearchResult.length == 1) {

            for (var i = 0; i < savedSearchResultOfCustomer.length; i++) {
              try {
                var customerNameForReplacing = savedSearchResultOfCustomer[i].customerName;
                var customerNameReplaced = customerNameForReplacing.replace(/.*:/, '');

              }
              catch (e) {
                var customerNameReplaced = savedSearchResultOfCustomer[i].customerName;
              }
              sublist.setSublistValue({
                id: 'sublist_name',
                line: i,
                value: customerNameReplaced
              });
              sublist.setSublistValue({
                id: 'sublist_shippingaddress',
                line: i,
                value: savedSearchResultOfCustomer[i].customerAddress
              });
              sublist.setSublistValue({
                id: 'sublist_phonenumber',
                line: i,
                value: savedSearchResultOfCustomer[i].phoneNumber
              });

            }

          }
          else {
            for (var i = 0; i < savedSearchResultOfCustomer.length; i++) {
              sublist.setSublistValue({
                id: 'sublist_name',
                line: i,
                value: savedSearchResultOfCustomer[i].customerName
              });
              sublist.setSublistValue({
                id: 'sublist_shippingaddress',
                line: i,
                value: savedSearchResultOfCustomer[i].customerAddress
              });
              sublist.setSublistValue({
                id: 'sublist_phonenumber',
                line: i,
                value: savedSearchResultOfCustomer[i].phoneNumber
              });

            }
            var k = 1;
            for (var j = 0; j < savedSearchResult.length; j++, k++) {

              sublist.setSublistValue({
                id: 'sublist_name',
                line: k,
                value: '<p style="margin-left:15%">' + savedSearchResult[j].childSubcustomerName + '</p>'
              });
              sublist.setSublistValue({
                id: 'sublist_shippingaddress',
                line: k,
                value: savedSearchResult[j].shippingAddress
              });
              sublist.setSublistValue({
                id: 'sublist_phonenumber',
                line: k,
                value: savedSearchResult[j].phoneNumber
              });

            }

          }
          var backButton = form.addButton({
            id: 'cust_button_back',
            label: 'Back',
            functionName: 'backbutton'
          });
          context.response.writePage(form);
        } catch (e) {
          log.debug('error', e);
          result = false;
          var strJson = JSON.stringify({ result: result })
          context.response.write(strJson);

        }

      }
    };

  });
function savedSearchOfCustomers(id, search) {
  var customerSearchArray = [];
  var customerSearchObj = search.create({
    type: "customer",
    filters:
      [
        ["internalid", "anyof", id]
      ],
    columns:
      [
        search.createColumn({ name: "internalid", label: "Internal ID" }),
        search.createColumn({ name: "altname", label: "Name" }),
        search.createColumn({ name: "shipaddress", label: "Shipping Address" }),
        search.createColumn({ name: "phone", label: "Phone" })
      ]
  });
  customerSearchObj.run().each(function (result) {
    var customerObj = {};
    customerObj.customerName = result.getValue({ name: "altname", label: "Name" }) || ' ';
    customerObj.customerAddress = result.getValue({ name: "shipaddress", label: "Shipping Address" }) || ' ';
    customerObj.phoneNumber = result.getValue({ name: "phone", label: "Phone" }) || ' ';
    customerSearchArray.push(customerObj);
    return true;
  });

  return customerSearchArray;
}
function savedSearchOfSubCustomers(id, search) {
  var searchArray = [];
  try {
    log.debug('id', id);

    var customerSearchObj = search.create({
      type: "customer",
      filters:
        [
          ["internalid", "anyof", id],

        ],
      columns:
        [
          search.createColumn({
            name: "internalid",
            join: "subCustomer",
            label: "Internal ID"
          }),
          search.createColumn({
            name: "altname",
            join: "subCustomer",
            label: "Name"
          }),
          search.createColumn({
            name: "phone",
            join: "subCustomer",
            label: "Phone"
          }),
          search.createColumn({
            name: "shipaddress",
            join: "subCustomer",
            label: "Shipping Address"
          }),
          search.createColumn({
            name: "formulatext",
            formula: "SUBSTR({subcustomer.altname},INSTR({subcustomer.altname},':')+2)",
            label: "Formula (Text)"
          })

        ]
    });

    customerSearchObj.run().each(function (result) {
      var subCustomerObj = {};
      subCustomerObj.internalId = result.getValue({ name: "internalid", join: "subCustomer", label: "Internal ID" }) || ' ';
      subCustomerObj.subCustomerName = result.getValue({ name: "altname", join: "subCustomer", label: "Name" }) || ' ';//space is given for validation
      subCustomerObj.shippingAddress = result.getValue({ name: "shipaddress", join: "subCustomer", label: "Shipping Address" }) || ' ';
      subCustomerObj.phoneNumber = result.getValue({ name: "phone", join: "subCustomer", label: "Phone" }) || ' ';
      subCustomerObj.childSubcustomerName = result.getValue({
        name: "formulatext", formula: "SUBSTR({subcustomer.altname},INSTR({subcustomer.altname},':')+2)",
        label: "Formula (Text)"
      }) || ' ';

      searchArray.push(subCustomerObj);
      return true;
    });
    return searchArray;
  } catch (e) {
    log.debug('error', e);
    result = false;
    var strJson = JSON.stringify({ result: result })
    context.response.write(strJson);

  }

}