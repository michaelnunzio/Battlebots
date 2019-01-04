$('document').ready(() => {
    $('.modal').modal();

    $('.to-robots').on('click', function() {
        let userId = $(this).data('user-id');
        console.log(userId);

        window.location.href = '/users/' + userId;

        // $.get('/users/' + userId + '/' + robotId, function(data) {
        //     console.log(data);
        // });
    });

    $('.replace-part').on('click', function() {
        let userId = $(this).data('user-id');
        let robotId = $(this).data('robot-id');
        let positionId = $(this).data('part-position');

        $.ajax({
            url: '/users/inventory/' + userId + '?robotId=' + robotId + '&positionId=' + positionId,
            type: 'GET'
        }).then(data => {
            $('.modal-content').html(data);
            $('#replace-part-modal').modal('open');
            $('.pick-part').on('click', updateRobotPart);
        });
    });

    

});

function updateRobotPart() {
    let partId = $(this).data('part-id');
    let robotId = $(this).data('robot-id');
    let positionId = $(this).data('position-id');
    let data = {
        partId: partId,
        positionId: positionId
    };

    console.log(robotId, partId, positionId, 'Create put request');
    $.ajax({
        url: '/users/robot/' + robotId + '?partId=' + partId + '&positionId=' + positionId,
        type: 'PUT',
        data: data
    }).then(data => {
        console.log(data);
        window.location.reload();
    });
}