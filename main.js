$(document).ready(initializeApp);
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var can_click_card = true;


var images = ['Image1.png','Image2.png','Image3.png','Image4.png','Image5.png','Image6.png','Image7.png','Image8.png','Image9.png']; //'Image3.png','Image4','Image5','Image6','Image7','Image8','Image9'
function initializeApp() {
    randomizeAndGenerateCards();
    $('.card').click(cardClicked);

}

function randomizeAndGenerateCards(){
    var doubleImages = images.concat(images);
    shuffle(doubleImages);

    for (var i =0; i < doubleImages.length;i++){
        var cardContainerArea = $('<div>').addClass('cardContainer');
        var container = $('<div>').addClass('container');
        var card = $('<div>').addClass('card');
        var frontOfCard = $('<div>').addClass('front');
        var backOfCard = $('<div>').addClass('back');
        var imageOfCard = $('<img>').addClass('imageFront').attr('src','images/'+doubleImages[i]);
        frontOfCard.append(imageOfCard);
        card.append(frontOfCard,backOfCard);
        container.append(card);
        cardContainerArea.append(container);
        $('.game-area-container').append(cardContainerArea);


    }



}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
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
        first_card_clicked.find('.back').addClass('hide');
    }else {
        second_card_clicked = $(this);
        second_card_clicked.find('.back').addClass('hide');
        var first_card_src =  first_card_clicked.find('.front img').attr('src');
        var second_card_src = second_card_clicked.find('.front img').attr('src');
        if(first_card_src === second_card_src){
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            if(match_counter === total_possible_matches){
                alert('You have won!');
            }

        }else{
            setTimeout(hideBothCards, 100);
            // can_click_card = false;
        }
    }
}
function hideBothCards(){
    first_card_clicked.find('.back').removeClass('hide');
    second_card_clicked.find('.back').removeClass('hide');
    first_card_clicked = null;
    second_card_clicked = null;
    can_click_card = true;
}




