$('document').ready(() => {

    $('.easyBattle').on('click', function() {
        //test
      console.log("working")
        let enemyStr= "11";
        let roboStr= "16";

        if(enemyStr > roboStr){
            console.log("you lose!- return to store page")
        } else{
            console.log("you win!- but still return to store page")
        }

    })


    $('.to-robots').on('click', function() {
            console.log("working")
        let userId= $(this).data("user-id")
        window.location.href= "/users/" + userId


    });


});

