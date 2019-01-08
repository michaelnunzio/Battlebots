

$('document').ready(() => {

    $('#create-bot').on('click', function() {
        let userid= $(this).data("user-id")
        let robotName= $("#name").val().trim()
        
        // **post ajax***/
        let data= {name: robotName}
        $.ajax({
            url:'/users/createBot/' + userid,
            type: "POST",
            data: data
        }).then(data => {
            window.location.href= "/users/" + userid
        });

    });

    $('.to-robots').on('click', function() {
        let userid= $(this).data("user-id")
        window.location.href= "/users/" + userid
    });

});