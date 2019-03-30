$(document).ready(function() {

    console.log('Document is ready.');
    console.log('Storage before', window.localStorage);

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
        var newAddress = {};
        newAddress['addressee'] = getFieldValue('addressee');
        newAddress['attention'] = getFieldValue('attention');
        newAddress['residental'] = getCheckboxValue('residental');
        newAddress['addressOne'] = getFieldValue('addressOne');
        newAddress['addressTwo'] = getFieldValue('addressTwo');
        newAddress['city'] = getFieldValue('city');
        newAddress['state'] = getFieldValue('state');
        newAddress['phoneNumber'] = getFieldValue('phoneNumber');
        localStorage.setObject(newAddress);
      }
    });

    // Extending storage to store objects
    Storage.prototype.setObject = function(newAddress){
      localStorage.clear();
      var numOfAddressInStorage = localStorage.length;
      this.setItem(`address-${numOfAddressInStorage+1}`, JSON.stringify(newAddress));
      console.log('Storage after', window.localStorage);
    }

    Storage.prototype.getObject = function(key) {
      return JSON.parse(this.getItem(key));
    }

    function getCheckboxValue(fieldId) {
      var checkbox = $('.ui.form').find(`input#${fieldId}`);
      return checkbox[0].checked;
    }

    function getFieldValue(fieldId) { 
      // 'get field' is part of Semantics form behavior API
      return $('.ui.form').form('get field', fieldId).val();
    }
});
