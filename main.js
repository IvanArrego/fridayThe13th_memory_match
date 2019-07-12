$(document).ready(initializeApp);
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 7;
var match_counter = 0;
var can_click_card = true;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var images = ['Image1.png','Image2.png','Image3.png','Image4.png','Image5.png','Image6.png','Image7.png','Image8.png','Image9.png'];
var jasonImage1 = 'images/Image6.png';
var jasonImage2 = 'images/Image7.png';
function initializeApp() {
    randomizeAndGenerateCards();
    display_stats();
    $('.card').click(cardClicked);
    startAudio();
    rulesModal();
}
function randomizeAndGenerateCards(){
    var doubleImages = images.concat(images);
    shuffle(doubleImages);
    for (var i =0; i < doubleImages.length;i++){
        var container = $('<div>').addClass('container');
        var card = $('<div>').addClass('card');
        var frontOfCard = $('<div>').addClass('front');
        var backOfCard = $('<div>').addClass('back');
        var imageOfCard = $('<img>').addClass('image-front').attr('src','images/'+doubleImages[i]);
        frontOfCard.append(imageOfCard);
        card.append(frontOfCard,backOfCard);
        container.append(card);
        $('.card-area').append(container);
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function cardClicked(){
    if(can_click_card === false) {
        return;
    }
    if (first_card_clicked === null) {
        first_card_clicked = $(this);
        first_card_clicked.parent().addClass('click');
    }else {
        second_card_clicked = $(this);
        second_card_clicked.parent().addClass('click');
        var first_card_src =  first_card_clicked.find('.front img').attr('src');
        var second_card_src = second_card_clicked.find('.front img').attr('src');
        if(first_card_src === jasonImage1 || second_card_src === jasonImage1 || first_card_src === jasonImage2 || second_card_src === jasonImage2){
            playSound();
        }
        if(first_card_src === second_card_src){
            if(first_card_src === jasonImage1 && second_card_src === jasonImage1 || first_card_src === jasonImage2 && second_card_src === jasonImage2){
                loseModal();
                return null;
            }
            console.log('pre' , matches);
            match_counter++;
            matches++;
            console.log('post' , matches);
            attempts++;
            accuracy = matches/attempts;
            display_stats();
            first_card_clicked = null;
            second_card_clicked = null;
            if(matches === total_possible_matches){
                winModal();
            }
        }else{
            can_click_card = false;
            setTimeout(hideBothCards, 1000);
            attempts++;
            accuracy = matches/attempts;
            display_stats();
        }
    }
}
function hideBothCards(){
    can_click_card = false;
    first_card_clicked.parent().removeClass('click');
    second_card_clicked.parent().removeClass('click');
    first_card_clicked = null;
    second_card_clicked = null;
    can_click_card = true;
}
function display_stats(){
    var games_played_stats = $('<div>').addClass('games-played');
    $('.time-played').append(games_played_stats).html('Games played:' + ' ' + games_played);
    $('.times-tried').html('Attempts this game:' + ' ' + attempts);
    var formattedAccuracy = accuracy.toFixed(2) + '%';
    $('.accuracy').html('Chance of survival: ' + '' + formattedAccuracy);
}
function reset_stats(){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
    games_played++;
    $('.container').parent().removeClass('hide');
}
function resetGame(){
    reset_stats();
    display_stats();
    $('.card-area').empty();
    initializeApp();
}
function startAudio() {
    $('.card-area').on("load",playSound);
}
function playSound() {
    var player = new Audio('./audio/1chchch1.wav');
    player.volume = .7;
    player.play();
}
function rulesModal(){
    var rulesButton = $('.rules-btn');
    var rulesContent = $('.rules-content');
    rulesButton.on('click', function(){
        $('.rules').addClass('active')});
    rulesContent.on("click", function(){
        $(".rules, .rules-content").removeClass("active")});
}
function winModal(){
    var winModal = $('.win-message');
    $('.win-modal, .win-message').addClass('active');
    winModal.on('click', function(){
        $('.win-modal, .win-message').removeClass('active');
})
};
function loseModal(){
    var loserModal = $('.lose-message');
    $('.lose-modal, .lose-message').addClass('active');
    loserModal.on('click', function(){
        $('.lose-modal, .lose-message').removeClass('active');
})
};
