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



    /* ======================== Initialize counter with double hyphens ==================== */
    $('#counter').html('--');




    /* ======================== Temporary Counter ==================== */



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






    /* ======================== Toggle the start button from green to red ==================== */


    $('#start').click(function () {
        stopTime();
        $(this).effect("highlight", {}, 100);
        $('.img-circle').toggleClass('stop');
        if ($('.img-circle').hasClass('stop')) {
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


    $( document ).click(function() {
        $( "#red" ).toggle( "highlight" );
    });

});