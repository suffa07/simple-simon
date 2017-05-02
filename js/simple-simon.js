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





    /* ======================== Toggle the start button from green to red ==================== */

    $('#start').click(function () {
        $('.img-circle').toggleClass('stop');
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