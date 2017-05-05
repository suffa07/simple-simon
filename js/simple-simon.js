/*
 * Created by DelMonroe on 5/1/17.
 */

$(document).ready(function () {
    "use strict";


        /* ======================== Global Variables ==================== */


        var sequence = [];
        var copy = [];
        var round = 0;
        var active = true;


        /* ======================== Button to Display Game ==================== */

        $("button").click(function () {
        $(".container").toggle("bounce", 1000);
    });


    $('.button').click(function () {
        $(this).effect("highlight", {}, 80);
    });


    /* ======================== Toggle the start button from green to red and start the counter ==================== */


    $('#start').click(function () {
        $(this).effect("highlight", {}, 100);
        $('.round-circle').toggleClass("stop");

    });



        /* ======================== Implement a clock/timer: future endeavor ==================== */


        // add a zero in front of numbers<10
        /* function checkTime(i) {
         if (i < 10) {
         i = "0" + i;
         }
         return i;
         }

         function startTime() {
         var today = new Date();
         var h = today.getHours();
         var m = today.getMinutes();
         var s = today.getSeconds();
         // Turn seconds into ticker just to test round count

         s = checkTime(s);
         $('#counter').html(s);
         mytime = setTimeout(function () {
         startTime();
         }, 500);
         }

         function stopTime() {
         clearTimeout(mytime);
         }*/


        /* =========== Sound: future endeavor==============*/



        /* ======================== Initialize the game to start ==================== */


        function init () {
            $('#counter').html("--");
            $('#start').click(function () {
                $('#counter').html('0');
                gameStart();
            });

        }



    /* ======================== Sets initial round and every subsequent one ==================== */

        function playround () {
            console.log("play round fired");
            $('#counter').html(++round);
            sequence.push(randomNum());
            copy = sequence.slice(0);
            console.log("Current sequence:" + sequence);
            pattern(sequence);
        }



    /* ======================== Generate the Panel Pattern ==================== */
        function pattern (sequence) {
            console.log("Pattern function fired");
            var i = 0;
            var interval = setInterval(function () {
                triggerPanel(sequence[i]);
                i++;
                if (i >= sequence.length) {
                    clearInterval(interval);
                    activeBoard();
                }
            }, 700);
        }




    /* ======================== Use JQuery UI hightlight effect to cause panels to blink ==================== */
        function triggerPanel (tile) {
                $('[data-panel=' + tile + ']').effect("highlight", {}, 80);
                window.setTimeout(function () {
                }, 300);
            }




    /* ======================== Initialize game variables  ==================== */
        function gameStart () {
            sequence = [];
            copy = [];
            round = 0;
            active = true;
            $('p[data-action="lose"]').hide();
            playround();
        }


    /* ======================== Checks to see if the user pattern matches the application pattern==================== */

        function checkUserpat(eID) {
            console.log("Check user pat fired");
            var appResponse = copy.shift();
            var userResponse = parseInt(eID);
            active = (appResponse === userResponse);
            checkLose();

        }

    /* ======================== Check to see if user will continue to the next round or end the game  ==================== */

        function checkLose() {
            console.log("Check lose fired");
            console.log(active);
            if (copy.length === 0 && active) {
                console.log("Check lose fired and next round condition");
                inactiveBoard();
                playround();

            } else if (!active) { // user lost
                inactiveBoard();
                endGame();
            }
        }

    /* ======================== Exit the game, set round to 0, and toggle green button to start ==================== */

        function endGame() {
            $('p[data-action=lose]').show();
            $($('[data-round]').get(0)).text('0');
            $('.round-circle').toggleClass("stop");
        }



        function activeBoard() {
            $('.button').click(function () {
                console.log("Click fired");
                var pid = $(this).attr('data-panel');
                checkUserpat(pid);
                $(this).addClass('active');
                $(this).removeClass('active');
                $(this).addClass('point');

            });

        }


    /* ======================== Generate random number to drive panel pattern ==================== */

        function randomNum() {
            // between 1 and 4
            return Math.floor((Math.random() * 4) + 1);
        }


        function inactiveBoard() {
            $('.button').click(function () {
                $(this).off('click');
                $(this).removeClass('point');

            });


        }

    /* ======================== Initialize Game ==================== */

        init();


});