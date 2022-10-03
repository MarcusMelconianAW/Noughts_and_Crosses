/*
 * NOUGHTS & CROSSES MAIN
 */

// Core game variables
var board = [[null, null, null], [null, null, null], [null, null, null]]
var player = "nought";
var previous_player = "nought";
var counter = 0;
var gameover = false;

// Take the row and column number between 0 and 2 and update board
function takeTurn(row, column) {
    if (gameover) {
        return false;
    }
    console.log("takeTurn was called with row: "+row+", column:"+column);
    if (player == "nought" && board[row][column] == null) {
        board[row][column] = "nought";
        counter++;
        player = "cross";
    }
    else if (player == "cross" && board[row][column] == null) {
        board[row][column] = "cross";
        counter++;
        player = "nought";
    }
    else {
        return false;
    }
    console.log(board);
    console.log("COUNTER 1: " + counter);
    return true;
}

// Return either "noughts", "crosses" or "nobody" if the game is over and continue playing.
function checkWinner() {
    console.log("checkWinner was called");

    // All winning combinations
    var winning_combinations = [[1, 2, 3],[4, 5, 6],[7, 8, 9],[1, 4, 7],[2, 5, 8],[3, 6, 9],[1, 5, 9],[3, 5, 7]];

    if (counter < 5) {
        return null;
    }

    var winning_array = [];
    counter_2 = 0;

    for (i=0; i<board.length; i++) {
        for (j=0; j<board[i].length; j++) {
            counter_2++;
            console.log("COUNTER 2: " + counter_2);
            if (board[i][j] == previous_player) { 
                winning_array.push(counter_2);
            }
        }
    }

    console.log("Winning array: " + winning_array + " " + previous_player);

    for (combination of winning_combinations) {

        let checker = (arr, target) => target.every(v => arr.includes(v));
        var winner = checker(winning_array, combination);

        if (winner == true) {
            console.log('WINNER');
            if (previous_player == "nought") {
                gameover = true;
                return "noughts";
            }
            else if (previous_player == "cross") {
                gameover = true;
                return "crosses"
            }
        }
    }

    if (counter == 9 && !winner) {
        gameover = true;
        return "nobody";
    }

    if (previous_player == "nought") {
        previous_player = "cross";
    }
    else {
        previous_player = "nought";
    }
    
    return null;
}

// Set the game state back to its original state to play another game.
function resetGame() {
    console.log("resetGame was called");
    board = [[null, null, null], [null, null, null], [null, null, null]];
    player = "nought";
    previous_player = "nought";
    counter = 0;
    gameover = false;
}

// Return the current board state with either a "nought" or a "cross" in
function getBoard() {
    console.log("getBoard was called");
    return board;
}



















if (typeof exports === 'object') {
    console.log("Running in Node")
    module.exports = {
        takeTurn,
        checkWinner,
        resetGame,
        getBoard,
    }
} else {
    console.log("Running in Browser")
}
