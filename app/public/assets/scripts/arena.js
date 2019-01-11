$('document').ready(() => {
    $('.modal').modal();

    $('.easyBattle').on('click', function() {

            let id = $(this).data('userid');
            let name = $(this).data('username');
            let attack = $(this).data("useratk");
            let defense = $(this).data("userdef");

            let user = {user_id: id, name: name, attack: attack, defense: defense};

            let enemyName= $(this).data('enemyname');
            let enemyAtk= $(this).data('enemyatk');
            let enemyDef= $(this).data('enemydef');

            let enemy = {name: enemyName, attack: enemyAtk, defense: enemyDef};

            fightBots(user, enemy);

    }); //easy end


    $('.to-robots').on('click', function() {
        let userId= $(this).data("user-id")
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
    $.ajax({
        url: '/users/arena/' + user.user_id,
        method: 'POST',
        data: {victory: true, winnings: 20}
    }).then(data => {
        console.log(data);
    });
}

function loseCondition(user) {
    let loseMessage = $('<h3>');
    loseMessage.text(user.name + ' is defeated!');
    $('#modal-battle-end').append(loseMessage);
    $.ajax({
        url: '/users/arena/' + user.user_id,
        method: 'POST',
        data: {victory: false, winnings: 5}
    }).then(data => {
        console.log(data);
    });
}

var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=x8yAyu1xp1MRX1C3aQjtJahAr5047i7j&q=gundam-fight";
        

        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response)
          var botDiv = $("<div class='gundam'>");

          // Retrieving the URL for the image
        //   for(var i=1; i < 10; i++ ){
          var imgURL = response.data[4].images.fixed_height.url;
          
        // }

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          botDiv.append(image);
              
          // Putting the entire animal above the previous animals
          $(".video-container").prepend(botDiv);

        });

        //giphy api