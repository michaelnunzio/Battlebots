$('document').ready(() => {
    $('.modal').modal();

    $('.easyBattle').on('click', function() {

            let name= $(this).data("name-id")
            let attack= $(this).data("attack-id")
            let defense= $(this).data("defense-id")

            let user = {name: name, attack: attack, defense: defense};

            let enemyName= "Easy Bot"
            let enemyAtk= 40
            let enemyDef= 9

            let enemy = {name: enemyName, attack: enemyAtk, defense: enemyDef};

            fightBots(user, enemy);

            // if(enemyTotal > UserTotal){
            //     var loser = "You Lose!!"
            //     console.log(loser)
            //     $("#modal-battle-end").html(loser)
            //     $("#money-gainz").html("You Lost.. You'll Get Em' Next Time. You Earned: ") //add money- put to database
            // }else if(UserTotal > enemyTotal){
            //     var winner = "You Won!!"
            //     console.log(winner)
            //     $("#modal-battle-end").html(winner)
            //     $("#money-gainz").html("Victory! You Earned: ") //add money- put to database
            // }
            //****MODAL****//
            
            // Get the button that opens the modal
            // When the user clicks on the button-->
            
            //****MODAL****//

    }); //easy end


    $('.to-robots').on('click', function() {
            console.log("working")
        let userId= $(this).data("user-id")
        console.log(userId)
        window.location.href= "/users/" + userId
       
    });


});

function fightBots(user, enemy) {
    $("#modal-name").html("Person Battling: " + user.name + " VS " + " User Enemy: " + enemy.name)
    $("#arena-modal").modal("open");
    console.log(user, enemy);

    let botMatch = setInterval(() => {
        playRound(user, enemy, botMatch);
    }, 2400);

}

function playRound(user, enemy, interval) {
    let damageMultiplier;
    let combatLog = $('#modal-combat-log');

    damageMultiplier = Math.random() * (.8 - .2) + .2;
    let userAttack = user.attack * damageMultiplier;
    let userAttackMessage = $('<p>');
    userAttackMessage.text('User deals '+ userAttack.toFixed(2) + ' damage.');
    combatLog.append(userAttackMessage);

    enemy.defense -= userAttack;
    let enemyHealthMessage = $('<p>');
    enemyHealthMessage.text('Enemy has ' + enemy.defense.toFixed(2) + ' armor left.')
    combatLog.append(enemyHealthMessage);

    if(enemy.defense <= 0) {
        winCondition(user);
        clearInterval(interval);
        return;
    }

    damageMultiplier = Math.random() * (.8 - .2) + .2;
    let enemyAttack = enemy.attack * damageMultiplier;
    let enemyAttackMessage = $('<p>');
    enemyAttackMessage.text('Enemy deals ' + enemyAttack.toFixed(2) + ' damage.');
    combatLog.append(enemyAttackMessage);

    user.defense -= enemyAttack;
    let userHealthMessage = $('<p>');
    userHealthMessage.text(user.name + ' has ' + user.defense.toFixed(2) + ' armor left.');
    combatLog.append(userHealthMessage);

    if(user.defense <= 0) {
        loseCondition(user);
        clearInterval(interval);
        return;
    }

}

function winCondition(user) {
    let winMessage = $('<h3>');
    winMessage.text(user.name + ' wins!');
    $('#modal-battle-end').append(winMessage);
}

function loseCondition(user) {
    let loseMessage = $('<h3>');
    loseMessage.text(user.name + ' is defeated!');
    $('#modal-battle-end').append(loseMessage);
}