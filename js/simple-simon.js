/*
 * Created by DelMonroe on 5/1/17.
 */

$(document).ready(function () {
    "use strict";

    /* ======================== Global Variables ==================== */

    var panelPatternCounter = 0;
    var gamemode = false;
    var level = 1;
    var gamePanel = [];
    var pressedBtn;
    var mytime;
    var panelSelect;




    /* ======================== Button to Open Game ==================== */

    $( "button" ).click(function() {
        $( "#container" ).toggle( "bounce", 1000 );
    });


    $('.button').click(function () {
        $(this).effect("highlight", {}, 80);
    });

    /*pressedBtn = $('.button').click(function (event) {
        alert(this.id);*/

    });






    /* ======================== Toggle the start button from green to red and start the counter ==================== */


    $('#start').click(function () {
        stopTime();
        $(this).effect("highlight", {}, 100);
        $(this).toggleClass('stop');
        if ($('#start').hasClass('stop')) {
            startTime();
        } else {
            stopTime();
            $('#counter').html('--');
        }
    });




    /* ======================== Initialize counter with double hyphens ==================== */
    $('#counter').html('--');




    /* ======================== Use seconds as a temporary counter to validate round count visibility ==================== */



    // add a zero in front of numbers<10
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function startTime() {
        var t, S;
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        // Turn seconds into ticker just to test round count

        s = checkTime(s);
        $('#counter').html(s);
        mytime = setTimeout(function() {
            startTime();
        }, 500);
    }

    function stopTime() {
        clearTimeout(mytime);
    }











/* ======================== Random generator for color panel ==================== */

    function newMemory() {
        var temp_mem = Math.floor((Math.random() * 4) + 1);
        switch(temp_mem) {
            case 1:
                gamePanel.push("Green");
                break;
            case 2:
                gamePanel.push("Red");
                break;
            case 3:
                gamePanel.push("Yellow");
                break;
            case 4:
                gamePanel.push("Blue");
                break;
        }
        // console.log(gamePanel);
    }



    /* ======================== Create Finite State Machine to handle game logic ==================== */

    var fsm = StateMachine.create({
        initial: 'menu',
        events: [
            { name: 'start',  from: 'none',  to: 'menu' },
            { name: 'play',  from: 'menu',  to: 'game' },
            { name: 'quit',  from: 'game',  to: 'menu' },
            { name: 'level',  from: 'lone',    to: 'ltwo'},
            { name: 'level',  from: 'ltwo',    to: 'lthree'},
            { name: 'level',  from: 'lthree',    to: 'lfour'}
        ],

        callbacks: {
            onstart: function(event, from, to) {alert("Game Started");},
            onleavestart: function(event, from, to) {alert("Game Ended");},



            onmenu: function(event, from, to) { alert("Hi, This is Simple Simon... transitioned from " + from + " to "  + to); },
            onleavemenu: function() { $('#menu').show(); },

            onentergame: function() {$('#game').show(); },
            ongame: function (event, from, to) {},
            onleavegame: function() {
                $('#container').slideUp('slow', function() {
                    fsm.transition();
                });
                return StateMachine.ASYNC; // tell StateMachine to defer next state until we call transition (in slideUp callback above)
            },


            onlone: function () {},
            onleavelone: function () {},


            onltwo: function () {},
            onleaveltwo: function () {},


            onlthree: function () {},
            onleavelthree: function () {},


            onlfour: function () {},
            onleavelfour: function () {},


        }

    });

    /*var async = function(to) {
        pending(to, 4);
        setTimeout(function () {
            pending(to, 3);
            setTimeout(function() {
                pending(to, 2);
                setTimeout(function () {
                    pending(to, 1);
                    setTimeout(function () {
                        // fsm.transition(); // trigger deferred state transition
                    }, 5000);
                }, 5000);
            }, 5000);
        }, 5000);
    };
*/

    // newMemory();
    // var pending = function(to, n) { console.log("PENDING STATE: " + to + " in ..." + n); };


    /*fsm.play();
    fsm.onmenu();
    async();
    return fsm;*/
    // return fsm;

    var count = 0;
    var max = 20;
    var interval = 1000;


    var int_id = setInterval(function () {
        if (count >= max) {
            clearInterval((int_id));
        } else {
            newMemory();
            // $( ".button" ).effect("highlight", {}, 80);
            // console.log(count);
            var panelColor = gamePanel[count];
            switch (gamePanel[count]) {

                case 'Blue':
                    $( "#blue_btn" ).effect("highlight", {}, 80);
                    userResponse();
                    break;
                case 'Green':
                    $( "#green_btn" ).effect("highlight", {}, 80);

                    break;
                case 'Red':
                    $( "#red_btn" ).effect("highlight", {}, 80);

                    break;
                case 'Yellow':
                    $( "#yellow_btn" ).effect("highlight", {}, 80);

                    break;
                }
            count++;


            }



    }, interval);


    function userResponse() {
        $('.button').click(function () {
            panelSelect = (this).id;
        });

        /* ====== After a color panel blinks, the user has 5 seconds to respond, or  ... game over ====*/

        while (!panelSelect) {
            setTimeout( function () {

            }, 5000);
        }
        alert(panelSelect);

    }


    /* will create an object with a method for each event:


     - fsm.play() - transition from 'menu'  to  'game'
     - fsm.quit()  - transition from 'game'  to  'menu'
     - * fsm.level()  - transition from '1,..4'  to  'game' or 'menu'


     along with the following members:

     - fsm.current       - contains the current state
     - fsm.is(s)         - return true if state `s` is the current state
     - fsm.can(e)        - return true if event `e` can be fired in the current state
     - fsm.cannot(e)     - return true if event `e` cannot be fired in the current state
     - fsm.transitions() - return list of events that are allowed from the current state
     - fsm.states()      - return list of all possible states. */



});