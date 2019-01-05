$('document').ready(() => {

    $('.edit-robot').on('click', function() {
        let userId = $(this).data('user-id');
        let robotId = $(this).data('robot-id');
        console.log(userId, robotId);

        window.location.href = '/users/configuration/' + userId + '/' + robotId;

        // $.get('/users/' + userId + '/' + robotId, function(data) {
        //     console.log(data);
        // });
    });

    $(".create-bot").on('click', function(){
        console.log("working")
        let userId = $(this).data('user-id');
        window.location.href = '/users/createBot/' + userId
   

    });

});