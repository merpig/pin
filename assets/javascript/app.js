
$(document).ready(function() {
    //$(".btn-primary").addClass("hidden");
    var randomSet = [0,1,2,3,4,5,6,7,8,9];

    /***********Borrowed from stack overflow solutions********/
    /**/    function shuffleArray(array) {
    /**/         for (let i = array.length - 1; i > 0; i--) {
    /**/             const j = Math.floor(Math.random() * (i + 1));
    /**/            [array[i], array[j]] = [array[j], array[i]];
    /**/        }
    /**/    }
    /*********************************************************/

    shuffleArray(randomSet);
    var newRandSet = [];
    var ringVal = 7;
    var inc = 0;
    while(newRandSet.length < 4){
        if(randomSet[inc]!=ringVal) newRandSet.push(randomSet[inc]);
        inc = inc + 1;
    }
    newRandSet.push(ringVal);
    shuffleArray(newRandSet);
    $(".container").text(newRandSet);

});