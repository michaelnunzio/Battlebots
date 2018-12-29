$('document').ready(() => {

    $('#login-button').on('click', function() {
        let username = $('#username').val().trim();
        let password = $('#password').val().trim();
        $('#password-validation').addClass('hidden');

        if(!validateForm()) return;

        let user = {
            username: username,
            password: password,
            action: 'login'
        }

        $.ajax({
            url: '/users',
            type: 'POST',
            data: user
        }).then(data => {
            console.log(data);
            if(data.error) {
                $('#password-validation').removeClass('hidden');
                $('#password-validation').text(data.message);
            } else if (data.redirect){
                window.location.href = data.url;
            }
        });
    });

    $('#create-account').on('click', function() {
        let username = $('#username').val().trim();
        let password = $('#password').val().trim();
        $('#password-validation').addClass('hidden');

        if(!validateForm()) return;

        let user = {
            username: username,
            password: password,
            action: 'create-account'
        }

        $.ajax({
            url: '/users',
            type: 'POST',
            data: user
        }).then(data => {
            console.log(data);
            if(data.error) {
                $('#password-validation').removeClass('hidden');
                $('#password-validation').text(data.message);
            }
            else {
                console.log(data);
                $('#password-validation').removeClass('hidden');
                $('#password-validation').text('Account created!');
            }
        });

     });

 

    function validateForm() {
        let validated = true;
        $('#username-validation').addClass('hidden');
        $('#password-validation').addClass('hidden');

        if(!$('#username').val().trim()) {
            $('#username-validation').removeClass('hidden');
            $('#username-validation').text('Must enter a username');
            validated = false;
        }

        if(!$('#password').val().trim()) {
            $('#password-validation').removeClass('hidden');
            $('#password-validation').text('Must enter a password');
            validated = false;
        }

        return validated;
    }   
});
