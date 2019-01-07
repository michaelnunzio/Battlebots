$('document').ready(() => {
    $('.modal').modal();

    $('.to-robots').on('click', function() {
        let userId = $(this).data('user-id');
        console.log(userId);

        window.location.href = '/users/' + userId;
    });

    $('.replace-part-prompt').on('click', function() {
        let userId = $(this).data('user-id');
        let robotId = $(this).data('robot-id');
        let positionId = $(this).data('part-position');

        $.ajax({
            url: '/users/inventory/' + userId + '?robotId=' + robotId + '&positionId=' + positionId,
            type: 'GET'
        }).then(data => {
            $('.modal-content').html(data);
            $('#replace-part-modal').modal('open');
            $('.replace-part').on('click', updateRobotPart);
            $('.add-part').on('click', addRobotPart);
        });
    });

    $('.remove-part').on('click', function() {
        let robotId = $(this).data('robot-id');
        let positionId = $(this).data('part-position');
        let data = {position_id: positionId};

        console.log(robotId, positionId);
        $.ajax({
            url: '/users/robot/' + robotId,
            type: 'DELETE',
            data: data
        }).then(data => {
            console.log(data);
            window.location.reload();
        })
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
        url: '/users/robot/' + robotId,
        type: 'PUT',
        data: data
    }).then(data => {
        console.log(data);
        window.location.reload();
    });
}

function addRobotPart() {
    let partId = $(this).data('part-id');
    let robotId = $(this).data('robot-id');
    let userId = $(this).data('user-id');
    let positionId = $(this).data('position-id');
    let data = {
        userId: userId,
        partId: partId,
        positionId: positionId
    };

    console.log(robotId, partId, positionId, 'Create post request');
    $.ajax({
        url: '/users/robot/' + robotId,
        type: 'POST',
        data: data
    }).then(data => {
        console.log(data);
        window.location.reload();
    });
}