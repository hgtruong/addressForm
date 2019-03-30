$(document).ready(function() {

    console.log('Document is ready.');
    console.log('Storage before', window.localStorage);
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
        // create UUID for key
        newAddress['addressee'] = getFieldValue('addressee');
        newAddress['attention'] = getFieldValue('attention');
        newAddress['residental'] = getCheckboxValue('residental');
        newAddress['addressOne'] = getFieldValue('addressOne');
        newAddress['addressTwo'] = getFieldValue('addressTwo');
        newAddress['city'] = getFieldValue('city');
        newAddress['state'] = getFieldValue('state');
        newAddress['phoneNumber'] = getFieldValue('phoneNumber');
        // console.log('newAddress Object', newAddress);

        addToStorage(newAddress);
        renderAddresses();
        // Reset all fields when successful
        $(".ui.form")[0].reset();
      }
    });

    function addToStorage (newAddress) {
      // localStorage.clear();
      var numOfAddressInStorage = localStorage.length;
      localStorage.setItem(`address-${numOfAddressInStorage+1}`, JSON.stringify(newAddress));
    }

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
      console.log('You clicked row '+ ($(this).index()+1) );

      var numOfColumns = $(this).find("td").length;
      var clickedRowIndex = $(this).index()+1;
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

      // Removed clicked row from storage
      console.log('event', `address-${clickedRowIndex}`);

      console.log('local before remove', localStorage);
      localStorage.removeItem(`address-${clickedRowIndex}`);

      console.log('local after remove', localStorage);
   
      // Reset the key count
      reorderStorage();
      $(this).remove();

      renderAddresses();
    });


    function reorderStorage() {
      var counter = 1;

    console.log('local before reorder', localStorage);
      for(key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          var tempAddressHolder = localStorage.getItem(key);
          localStorage.setItem(`address-${counter}`, tempAddressHolder);
          counter++;
        }
      }
      console.log('local after reorder', localStorage);
    }

    // Should have warning dialog
    $('#clearBtn').click(function() {
      localStorage.clear();
      renderAddresses();
    });
    
    function renderAddresses() {
      $("#addressesTable tbody").html("");

      for (key in localStorage) {
        if(localStorage.hasOwnProperty(key)) {
          var address = JSON.parse(localStorage.getItem(key));
          var newRowContent = `
          <tr>
            <td data-label="Name">${address.addressee}</td>
            <td data-label="Attention">${address.attention}</td>
            <td data-label="Residental">${address.residental}</td>
            <td data-label="AddressOne">${address.addressOne}</td>
            <td data-label="AddressTwo">${address.addressTwo}</td>
            <td data-label="City">${address.city}</td>
            <td data-label="State">${address.state}</td>
            <td data-label="PhoneNumber">${address.phoneNumber}</td>
          </tr>`

         $("#addressesTable tbody").append(newRowContent);
        }
      }
    }
});
