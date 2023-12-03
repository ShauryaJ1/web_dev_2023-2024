
let game_state = {
    'win': False,
    'turn':1,
    'winner':null,
    'position_x_y':[], //would be slow to check position all the time
    //'tile_positions':[0,0,0,0,0,0,0,0,0],
    'tile_positions':[1,1,1,0,0,0,0,0,0],
    'winning_combos': [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ],
    'player_combo1':[1,1,1],
    'player_combo2':[2,2,2],
}
function player_move(player, position){
    // console.log("moved")
    console.log('moved')
    game_state["tile_positions"][position].push(player)
    console.log(game_state["tile_positions"])
    //Need to know where cursor is
    //Need to know the states of the tiles, e.g. is the tile filled or not?\
    //Set space to filled
}
function check_win(){
    console.log("check win")
    for (const combo of game_state['winning_combos']) {
        const [a, b, c] = combo;
        if (game_state['tile_positions'][a]==1 && game_state['tile_positions'][b]==1 && game_state['tile_positions'][c] == 1) {
            game_state['winner']=1
            game_state['win']=True
        }
        if (game_state['tile_positions'][a]==2 && game_state['tile_positions'][b]==2 && game_state['tile_positions'][c] == 2) {
            game_state['winner']=2
            game_state['win']=True
        }
    }
    

    ///check the diagonals,rows,columns
}
function reset(){
    
    //clear tile values, set to defaults
}