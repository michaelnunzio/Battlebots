$('document').ready(() => {

    $('.to-robots').on('click', function() {
        let userId = $(this).data('user-id');
        console.log(userId);

        window.location.href = '/users/' + userId;

        // $.get('/users/' + userId + '/' + robotId, function(data) {
        //     console.log(data);
        // });
    });

});