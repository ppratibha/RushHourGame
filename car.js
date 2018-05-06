/**
 * Created by ppatil on 05/05/2018.
 */

/*
* This file corresponds to the basic Car object
* Each car can be described by it's  length, color, startPos, orientation
* Each car has few associated methods to move, to set up it's own body, and to map the directions
*/
var Car = function (length, color, startPos, orientation) {
    this.length = length;
    this.color = color;
    this.startPos = startPos;
    this.orientation = orientation;
    this.segments = [startPos];

    this.setUpCarBody();
}

Car.prototype = {
    // This function draws the segments of the car
    setUpCarBody : function () {
         var oppositeOrientation = [this.directionMapping()[0] * -1, this.directionMapping()[1] * -1];
         for (var i = 0; i < this.length - 1; i++) {
            var bodyPart = [this.segments[i][0] + oppositeOrientation[0], this.segments[i][1] + oppositeOrientation[1]];
            this.segments.push(bodyPart);
         }

    },

    /*
     * This function translates the keyboard arrow moves by incrementing or decrementing the co-ordinates of the car in the board.
     * pos[0] corresponds to vertical co-ordinate
     * pos[1] corresponds to vertical co-ordinate
     */
    directionMapping : function (dir) {
         var code, pos;
         if (dir) {
            code = dir;
         } else {
           code = this.orientation;
         }

         switch (code) {
            case "down":
                pos = [1, 0];
                break;
            case "right":
                pos = [0, 1];
                break;
            case "up":
                pos = [-1, 0];
                break;
            case "left":
               pos = [0, -1];
               break;
        }

        return pos;
    },

    /*
     * This function does the actual movement of the car
     */
    move : function (direction) {
          var dir = this.directionMapping(direction);
          var oldHead, newHead;

          if (direction === this.orientation) {
              oldHead = this.segments[0];
              newHead = [oldHead[0] + dir[0], oldHead[1] + dir[1]];
              if (this.color !== "red" && (newHead[0] > 5 || newHead[1] > 5)) {
                  return;
              }

              if (!$('li').eq(newHead[0] * 6 + newHead[1]).hasClass("car")) {
                 this.segments.unshift(newHead);
                 this.segments.pop();
              }

         } else if (dir[0] === this.directionMapping()[0] * -1 && dir[1] === this.directionMapping()[1] * -1) {
              oldHead = this.segments[this.length - 1];
              newHead = [oldHead[0] + dir[0], oldHead[1] + dir[1]];
              if (newHead[0] < 0 || newHead[1] < 0) {
                 return;
              }
              if (!$('li').eq(newHead[0] * 6 + newHead[1]).hasClass("car")) {
                  this.segments.push(newHead);
                  this.segments.shift();
              }

    }

  }

}

var easyCars = [
    new Car(2, "red", [2, 1], "right"),
    new Car(3, "yellow", [2, 3], "down"),
    new Car(2, "green", [5, 1], "down"),
    new Car(2, "orange", [5, 3], "right"),
    new Car(2, "blue", [5, 5], "right")
];

var mediumCars = [
    new Car(2, "red", [2, 3], "right"),
    new Car(3, "yellow", [3, 4], "down"),
    new Car(2, "green", [2, 1], "down"),
    new Car(2, "orange", [5, 3], "down"),
    new Car(2, "blue", [4, 5], "right"),
    new Car(2, "purple", [5, 5], "right")
];

const hardCars = [
    new Car(2, "red", [2, 1], "right"),
    new Car(3, "yellow", [3, 2], "down"),
    new Car(2, "green", [3, 4], "right"),
    new Car(2, "orange", [5, 4], "down"),
    new Car(3, "blue", [4, 2], "right"),
    new Car(3, "purple", [5, 5], "down")
];

