/**
 * Created by DelMonroe on 5/1/17.
 */

$(document).ready(function () {
    "use strict";

    /* ======================== Global Variables ==================== */
    console.log("ready");
    var panelPatternCounter = 0;
    var gamemode = false;
    var level = 1;
    var gamePanel = [];
    var mytime;





    /* ======================== Create Finite State Machine to handle game logic ==================== */

    var fsm = StateMachine.create({
        initial: 'menu',
        events: [
            { name: 'play',  from: 'menu',  to: 'game' },
            { name: 'quit',  from: 'game',  to: 'menu' },
            { name: 'level',  from: 'l_one',    to: 'l_two'},
            { name: 'level',  from: 'l_two',    to: 'l_three'},
            { name: 'level',  from: 'l_three',    to: 'l_four'}
        ],

        callbacks: {

            onentermenu: function() { $('#menu').show(); },
            onentergame: function() { $('#game').show(); },

            onleavemenu: function() {
                $('#menu').fadeOut('fast', function() {
                    fsm.transition();
                });
                return StateMachine.ASYNC; // tell StateMachine to defer next state until we call transition (in fadeOut callback above)
            },

            onleavegame: function() {
                $('#game').slideUp('slow', function() {
                    fsm.transition();
                });
                return StateMachine.ASYNC; // tell StateMachine to defer next state until we call transition (in slideUp callback above)
            }

        }

    });




    /* will create an object with a method for each event:


     * fsm.play() - transition from 'menu'  to  'game'
     * fsm.quit()  - transition from 'game'  to  'menu'
     * * fsm.level()  - transition from '1,..4'  to  'game' or 'menu'


     along with the following members:

     * fsm.current       - contains the current state
     * fsm.is(s)         - return true if state `s` is the current state
     * fsm.can(e)        - return true if event `e` can be fired in the current state
     * fsm.cannot(e)     - return true if event `e` cannot be fired in the current state
     * fsm.transitions() - return list of events that are allowed from the current state
     * fsm.states()      - return list of all possible states.


     */



    /* ======================== Button to Open Game ==================== */

    $( "button" ).click(function() {
        $( "div" ).toggle( "fold", 1000 );
    });



    /* ======================== Random Generator (generate numbers 1 - 4 ==================== */

    var rand = Math.floor(Math.random() * (4 - 1) + 1);




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






    /* ======================== Toggle the start button from green to red and start the counter ==================== */


    $('#start').click(function () {
        stopTime();
        $(this).effect("highlight", {}, 100);
        $('.round-circle').toggleClass('stop');
        if ($('#start').hasClass('stop')) {
            startTime();
        } else {
            stopTime();
            $('#counter').html('--');
        }

    });





/* ======================== Logic for catching user sequence into an array ==================== */

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
    }


});