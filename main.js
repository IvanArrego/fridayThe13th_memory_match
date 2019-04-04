$(document).ready(initializeApp);
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
function initializeApp() {
    $('.card').on('click', '.back', function(event) {
        if (first_card_clicked === null) {
            first_card_clicked = event.currentTarget;
            $(this).hide('.back');
            return first_card_clicked;
        } else {
            second_card_clicked = event.currentTarget;
            if(first_card_clicked === second_card_clicked){
                match_counter++;
                first_card_clicked = null;
                second_card_clicked = null;
                if(match_counter === total_possible_matches){
                    alert('You have won!');
                }else{
                    return 'click';
                }
            // }else{
            //     $(this.)setTimeout()
            // }
        }
    }
});

