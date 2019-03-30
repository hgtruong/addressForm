let addressesStorage = [];

$(document).ready(function() {



    console.log('Document is ready.');
    // console.log('Storage before', window.localStorage);
    renderAddresses();

    // Form Validation
    $('.ui.form').form({
      inline: true,
      fields: {
        addressee: {
          identifier: 'addressee',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter first and last name'
            },
            {
              type   : 'maxLength[30]',
              prompt : 'Only 30 characters are allowed'
            }
          ]
        },
        attention: {
          identifier: 'attention',
          rules: [
            {
              type   : 'maxLength[30]',
              prompt : 'Only 30 characters are allowed'
            }
          ]
        },
        addressOne: {
          // TODO: Use API to validate the address
          identifier: 'addressOne',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a valid street number and name'
            },
            {
              type   : 'maxLength[50]',
              prompt : 'Only 50 characters are allowed'
            }
          ]
        },
        addressTwo: {
          identifier: 'addressTwo',
          rules: [
            {
              type   : 'maxLength[50]',
              prompt : 'Only 50 characters are allowed'
            }
          ]
        },
        city: {
          identifier: 'city',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a valid city'
            },
            {
              type   : 'maxLength[30]',
              prompt : 'Only 30 characters are allowed'
            }
          ]
        },
        state: {
          identifier: 'state',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please select a state'
            }
          ]
        },
        phoneNumber: {
          identifier: 'phoneNumber',
          rules: [
            {
              type   : 'regExp',
              value  : '^[0-9]{3}-[0-9]{3}-[0-9]{4}$',
              prompt : 'Please use 123-456-7899 format'
            }
          ]
        },
      },
      onSuccess: function (event) {
        event.preventDefault();
        let newAddress = {};
        newAddress['addressee'] = getFieldValue('addressee');
        newAddress['attention'] = getFieldValue('attention');
        newAddress['residental'] = getCheckboxValue('residental');
        newAddress['addressOne'] = getFieldValue('addressOne');
        newAddress['addressTwo'] = getFieldValue('addressTwo');
        newAddress['city'] = getFieldValue('city');
        newAddress['state'] = getFieldValue('state');
        newAddress['phoneNumber'] = getFieldValue('phoneNumber');
        // console.log('newAddress Object', newAddress);

        // addToStorage(newAddress);
        addressesStorage.push(newAddress);
        renderAddresses();
        // Reset all fields when successful
        $(".ui.form")[0].reset();
      }
    });

    // function addToStorage (newAddress) {
    //   // localStorage.clear();
    //   var numOfAddressInStorage = localStorage.length;
    //   localStorage.setItem(`address-${numOfAddressInStorage+1}`, JSON.stringify(newAddress));
    // }

    function getCheckboxValue(fieldId) {
      var checkbox = $('.ui.form').find(`input#${fieldId}`);
      return checkbox[0].checked ? 'Yes' : "No";
    }

    function getFieldValue(fieldId) { 
      // 'get field' is part of Semantics form behavior API
      return $('.ui.form').form('get field', fieldId).val();
    }

    // Edit double clicked table row
    // $('#addressesTable').find('tr').dblclick( function(event){
    $(document).on('dblclick', '#addressesBody tr', function(event) {
      console.log('You clicked row '+ ($(this).index()));

      var numOfColumns = $(this).find("td").length;

      var clickedRowIndex = $(this).index();
      var fields = 
      [
        "#addressee",
        "#attention",
        "#residental",
        "#addressOne",
        "#addressTwo",
        "#city",
        "#state",
        "#phoneNumber"
      ]

      for(var i = 0; i < numOfColumns; i++) {
        var currentChild = $(this).find(`td:nth-child(${i+1})`).text();

        // Handle checkbox
        if (currentChild === "Yes" ) {
          $('#residental').prop('checked', true);
        }

        $(fields[i]).val(currentChild);
      }

      addressesStorage.splice(clickedRowIndex, 1);
      $(this).remove();
      renderAddresses();
    });

    // Should have warning dialog
    $('#clearBtn').click(function() {
      addressesStorage = [];
      renderAddresses();
    });
    
    function renderAddresses() {
      $("#addressesTable tbody").html("");
      console.log('storage', addressesStorage);

      for(var i = 0; i < addressesStorage.length; i++) {
        var newRowContent = `
        <tr>
          <td data-label="Name">${addressesStorage[i].addressee}</td>
          <td data-label="Attention">${addressesStorage[i].attention}</td>
          <td data-label="Residental">${addressesStorage[i].residental}</td>
          <td data-label="AddressOne">${addressesStorage[i].addressOne}</td>
          <td data-label="AddressTwo">${addressesStorage[i].addressTwo}</td>
          <td data-label="City">${addressesStorage[i].city}</td>
          <td data-label="State">${addressesStorage[i].state}</td>
          <td data-label="PhoneNumber">${addressesStorage[i].phoneNumber}</td>
        </tr>`

        $("#addressesTable tbody").append(newRowContent);
      }
    }
});
