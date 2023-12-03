function makeCircleOrCrossVisible(elem){
    if(game_state["turn"]==1){
    console.log("circle")
    document.getElementById(elem+"-circle").style.visibility = "visible";
    }
    else{
        console.log("cross")
        document.getElementById(elem+"-cross").style.visibility = "visible";
    }
}
let game_state = {
'win': false,
'turn':1,
'winner':null,
'position_x_y':[], //would be slow to check position all the time
'tile_positions':[0,0,0,0,0,0,0,0,0],
//'tile_positions':[2,2,2,0,0,0,0,0,0],
'winning_combos': [
[0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
[0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
[0, 4, 8], [2, 4, 6]             // Diagonals
],
'player_combo1':[1,1,1],
'player_combo2':[2,2,2],
}
const player_move_func = function(player, position){
// console.log("moved")
console.log('moved')
game_state["tile_positions"][position]=player
console.log(game_state["tile_positions"])
console.log(game_state['turn'])
check_win()
game_state['turn']=3-game_state['turn']
//Need to know where cursor is
//Need to know the states of the tiles, e.g. is the tile filled or not?\
//Set space to filled
}
const check_win = function(){
console.log("check win")
for (const combo of game_state['winning_combos']) {
    const [a, b, c] = combo;
    if (game_state['tile_positions'][a]==1 && game_state['tile_positions'][b]==1 && game_state['tile_positions'][c] == 1) {
        game_state['winner']=1
        game_state['win']=true
        document.getElementById("winner_heading").innerHTML = "PLAYER 1 WINS!";
        document.getElementById("winner_heading").style.color = "green";
    }
    if (game_state['tile_positions'][a]==2 && game_state['tile_positions'][b]==2 && game_state['tile_positions'][c] == 2) {
        game_state['winner']=2
        game_state['win']=true
        document.getElementById("winner_heading").innerHTML = "PLAYER 2 WINS!";
        document.getElementById("winner_heading").style.color = "red";
    }
    if(game_state['tile_positions'].every(function(element){return element!==0}) && game_state['win']==false){
        game_state['win']="draw"
        game_state['winner']=0
        document.getElementById("winner_heading").innerHTML = "DRAW!";
        document.getElementById("winner_heading").style.color = "black";
    }
}
console.log(game_state['win'])
console.log(game_state['tile_positions'])
console.log(game_state['winner'])


///check the diagonals,rows,columns
}

const reset = function(){
game_state['win']=false
game_state['turn']=1
game_state['winner']=null
game_state['position_x_y']=[]
game_state['tile_positions']=[0,0,0,0,0,0,0,0,0]
//clear tile values, set to defaults
console.log("reset")
console.log(game_state['win'])
console.log(game_state['tile_positions'])
console.log(game_state['winner'])

}
const reset_interface = function(){
document.getElementById("top-left-circle").style.visibility = "hidden";
document.getElementById("top-left-cross").style.visibility = "hidden";
document.getElementById("top-middle-circle").style.visibility = "hidden";
document.getElementById("top-middle-cross").style.visibility = "hidden";
document.getElementById("top-right-circle").style.visibility = "hidden";
document.getElementById("top-right-cross").style.visibility = "hidden";
document.getElementById("middle-left-circle").style.visibility = "hidden";
document.getElementById("middle-left-cross").style.visibility = "hidden";
document.getElementById("middle-middle-circle").style.visibility = "hidden";
document.getElementById("middle-middle-cross").style.visibility = "hidden";
document.getElementById("middle-right-circle").style.visibility = "hidden";
document.getElementById("middle-right-cross").style.visibility = "hidden";
document.getElementById("bottom-left-circle").style.visibility = "hidden";
document.getElementById("bottom-left-cross").style.visibility = "hidden";
document.getElementById("bottom-middle-circle").style.visibility = "hidden";
document.getElementById("bottom-middle-cross").style.visibility = "hidden";
document.getElementById("bottom-right-circle").style.visibility = "hidden";
document.getElementById("bottom-right-cross").style.visibility = "hidden";
document.getElementById("winner_heading").style.color = "black";
document.getElementById("winner_heading").innerHTML = "";
}


document.getElementById("top-left").addEventListener("click", function() {
makeCircleOrCrossVisible("top-left");
player_move_func(game_state['turn'],0)
});

document.getElementById("top-middle").addEventListener("click", function() {
makeCircleOrCrossVisible("top-middle");
player_move_func(game_state['turn'],1)
});

document.getElementById("top-right").addEventListener("click", function() {
makeCircleOrCrossVisible("top-right");
player_move_func(game_state['turn'],2)
});

document.getElementById("middle-left").addEventListener("click", function() {
makeCircleOrCrossVisible("middle-left");
player_move_func(game_state['turn'],3)
});

document.getElementById("middle-middle").addEventListener("click", function() {
makeCircleOrCrossVisible("middle-middle");
player_move_func(game_state['turn'],4)
});

document.getElementById("middle-right").addEventListener("click", function() {
makeCircleOrCrossVisible("middle-right");
player_move_func(game_state['turn'],5)
});

document.getElementById("bottom-left").addEventListener("click", function() {
makeCircleOrCrossVisible("bottom-left");
player_move_func(game_state['turn'],6)
});

document.getElementById("bottom-middle").addEventListener("click", function() {
makeCircleOrCrossVisible("bottom-middle");
player_move_func(game_state['turn'],7)
});

document.getElementById("bottom-right").addEventListener("click", function() {
makeCircleOrCrossVisible("bottom-right");
player_move_func(game_state['turn'],8)
});
document.getElementById("reset_button").addEventListener("click", function() {
reset();
reset_interface();
});





