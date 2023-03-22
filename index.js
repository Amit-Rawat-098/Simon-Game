var userClickedPattern=[];
var buttonsColours=["red","blue","green","yellow"];
var gamePattern=[];

var level=0;

var flag=0;

$("body").keypress(function(event){
    if(event.key==="a" && flag===0){
        flag=1;
        nextSequence();
    }
});

    $(".btn").click(function(){
        if(flag===1){
        var userChoosenColour=this.id;
        userClickedPattern.push(userChoosenColour);
        checkAnswer(userClickedPattern.length);
        playSound(userChoosenColour);
        animatePress(userChoosenColour);}
    });






function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+ level);
    var randomNumber=Math.random();
    randomNumber=randomNumber*4;
    randomNumber=Math.floor(randomNumber);
    playSound(buttonsColours[randomNumber]);
    var chosenColour=buttonsColours[randomNumber];
    gamePattern.push(chosenColour);
    $("#" + chosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(chosenColour);
};



function checkAnswer(currentLevel){
   
    if(userClickedPattern[currentLevel-1]===gamePattern[currentLevel-1]){
        if(userClickedPattern.length===gamePattern.length){
           setTimeout(function(){ nextSequence();},500);
        }
    }else{
        $("h1").text("Game Over, Press A key to restart");
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
        
    }
}






function playSound(name){
var audio=new Audio("sounds/"+ name+ ".mp3");
audio.play();
};




function animatePress(currentColour){
$("#"+currentColour).addClass("pressed");
setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");  
},100);
}


function startOver(){
    level=0;
    gamePattern.length=0;
    flag=0;
}
