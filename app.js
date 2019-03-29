$(document).ready(function() {

    console.log('Document is ready.');

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
      }
    })
});
