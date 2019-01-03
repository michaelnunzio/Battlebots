$('document').ready(() => {

    $('.to-robots').on('click', function() {
        let userId = $(this).data('user-id');
        console.log(userId);

        window.location.href = '/users/' + userId;

        // $.get('/users/' + userId + '/' + robotId, function(data) {
        //     console.log(data);
        // });
    });

    $('.replace-part').on('click', function() {
        $('.modal').modal();
        $('#replace-part-modal').modal('open');
        let userId = $(this).data('user-id');
        console.log('/users/inventory/' + userId);
        console.log(userId);
        $.ajax({
            url: '/users/inventory/' + userId,
            type: 'GET'
        }).then(data => {
            console.log(data);
        });
    })

});