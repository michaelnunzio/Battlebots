$('document').ready(() => {

    $('.edit-robot').on('click', function() {
        let userId = $(this).data('user-id');
        let robotId = $(this).data('robot-id');

        window.location.href = '/users/configuration/' + userId + '/' + robotId;

        // $.get('/users/' + userId + '/' + robotId, function(data) {
        //     console.log(data);
        // });
    });

    $(".create-bot").on('click', function(){
        let userId = $(this).data('user-id');
        window.location.href = '/users/createBot/' + userId
    });

    $('.to-store').on('click', function() {
        let userId = $(this).data('user-id');
        
        window.location.href = '/store/' + userId;
    });

});