$(document).ready(function(){
    $('select').formSelect();

    $('.to-robots').on('click', function() {
        let userId = $(this).data('user-id');
        console.log(userId);

        window.location.href = '/users/' + userId;
    });

    $('.purchase-part').on('click', function() {
        $('#wallet-validation').addClass('hidden');
        let userId = $(this).data('user-id');
        let partId = $(this).data('part-id');
        let cost = $(this).data('part-cost');
        let quantity = parseInt($('#part-quantity-' + partId).children("option:selected").val());
        if(quantity === 0) return;
        let data = {
            part_id: partId,
            cost: cost,
            quantity: quantity
        };

        console.log(userId, partId, quantity);
        $.ajax({
            url: '/store/' + userId,
            method: 'POST',
            data: data
        }).then(data => {
            console.log(data);
            if(data.error) {
                $('#wallet-validation').removeClass('hidden');
                $('#wallet-validation').text(data.message);
            } else {
               window.location.reload(); 
            }
            
        });
    });
});