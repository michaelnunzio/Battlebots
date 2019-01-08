$('document').ready(() => {
    $('.modal').modal();

    $('.easyBattle').on('click', function() {

            let name= $(this).data("name-id")
            console.log(name)
            let attack= $(this).data("attack-id")
            console.log(attack)
            let defense= $(this).data("defense-id")
            console.log(defense)
            var UserTotal= attack + defense;
            console.log(" user total: " + UserTotal)

            let enemyName= "Easy Bot"
            let enemyAtk= 7
            let enemyDef= 9
            let enemyTotal= enemyAtk + enemyDef;
            console.log("enemy:" + enemyTotal)


                if(enemyTotal > UserTotal){
                    var loser = "You Lose!!"
                    console.log(loser)
                    $("#modal-battle-end").html(loser)
                    $("#money-gainz").html("You Lost.. You'll Get Em' Next Time. You Earned: ") //add money- put to database
                }else if(UserTotal > enemyTotal){
                    var winner = "You Won!!"
                    console.log(winner)
                    $("#modal-battle-end").html(winner)
                    $("#money-gainz").html("Victory! You Earned: ") //add money- put to database
                }
                        //****MODAL****//
                        $("#arena-modal").modal("open");
                        // Get the button that opens the modal
                        // When the user clicks on the button-->
                        $("#modal-name").html("Person Battling: " + name + " VS " + " User Enemy: " + enemyName)
                        $("#modal-stats").html("User Stats: " + UserTotal + " | " + "Enemy Stats: " + enemyTotal)
                        //****MODAL****//

}); //easy end


    $('.to-robots').on('click', function() {
            console.log("working")
        let userId= $(this).data("user-id")
        console.log(userId)
        window.location.href= "/users/" + userId
       
    });


});

