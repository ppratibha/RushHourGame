/**
 * Created by ppatil on 05/05/2018.
 */
/*
* The Game object corresponds to the entire view object of the game
* It acts as a direct placeholder for the board object */
var Game = function Game(board, $container) {
    this.$container = $container;
    this.board = board;
    var game = this;
    this.refresh();
    $(document).keydown(function (e) {
        e.preventDefault();
        game.eventHandler(e);
    });
}

/*
* This function does the rendering part for the game like drawing everything in the browser.
* It first draws the board and then it draws the car */
Game.prototype.refresh = function(){
    this.$container.empty();
    $(".win-phrase").removeClass("show");
    this.setUpBoard();
    this.board.setUpCars();
    if (this.board.selectedCar) {
        $('.' + this.board.selectedCar.color).addClass("selected");
    }
}

/* This function generates the board depending on grid length. In this case its a 6x6 board.
 */
Game.prototype.setUpBoard = function(){
          for (var i = 0; i < this.board.grid.length; i++) {
            var $row = $("<ul>");
            for (var j = 0; j < this.board.grid.length; j++) {
                var $square = $("<li>");
                $square.data("pos", [i, j]);
                $row.append($square);
            }
            $row.data("row", i);
            this.$container.append($row);
          }
}


/* This function on successful completion of the game shows "Great job !" banner.
 */
Game.prototype.showWin = function(){
    $(window).off("keydown");
    $('.'+ this.board.selectedCar.color).removeClass("selected");
    $(".win-phrase").addClass("show");
}


/* This function catches the mouse key down pressed event and calls move method from the car to do the movement
 */
Game.prototype.eventHandler = function(event){

        if (this.board.selectedCar) {

            switch (event.keyCode){

                case 38:
                    this.board.selectedCar.move("up");
                    this.refresh();
                    break;

                case 40:
                    this.board.selectedCar.move("down");
                    this.refresh();
                    break;

                case 37:
                    this.board.selectedCar.move("left");
                    this.refresh();
                    break;

                case 39:
                    this.board.selectedCar.move("right");
                    this.refresh();
                    if (this.board.selectedCar.color === "red" && this.board.isWon()) {
                        this.showWin();
                    }
                    break;

            }

        }

}


/* This function is the entry point of the Game. It first creates a Board object and then it starts the game.
 */
function setUpRushHourGame(cars, container){
    var board = new Board(cars);
    return new Game(board, container);
}