// ==UserScript==
// @name JesterEE's Steam Monster Minigame JoinGame Script
// @namespace  https://github.com/jesteree/SteamMonsterMinigameJoinScript
// @description  Adds a dialog box to the Steam Monster Minigame to join a game of your choice.
// @version    1.3dev
// @match      http://steamcommunity.com/minigame/
// @match      http://steamcommunity.com/minigame
// @copyright  2015, JesterEE
// @author  JesterEE
// @grant unsafeWindow
// @grant GM_xmlhttpRequest
// @updateURL https://raw.githubusercontent.com/jesteree/SteamMonsterMinigameJoinScript/dev/join.js
// @downloadURL https://raw.githubusercontent.com/jesteree/SteamMonsterMinigameJoinScript/dev/join.js
// ==/UserScript==

// Options

var delay = 5000; // in milliseconds 

////////////////////////////////////////////////////////////////////////////////
// CSS
////////////////////////////////////////////////////////////////////////////////

// http://greasemonkey.win-start.de/patterns/add-css.html
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'.gameidcss {' +
'  background-color: #884691;' +
'  font-family: "Press Start 2P", arial, sans-serif;' +
'  color: #ee7aff;' +
'  border: 2px solid #a554b1;' +
'  font-size: 14px;' +
'  text-align: center;' +
'  display: inline-block;' +
'  box-shadow: 2px 2px 0px #000;' +
'  padding: 4px;' +
'  position: relative;' +
'  top: 50%;' +
'  transform: translateY(-125%);' +
'}');

addGlobalStyle(
'.gameid2css {' +
'  font-family: "Press Start 2P", arial, sans-serif;' +
'  color: #ee7aff;' +
'  font-size: 14px;' +
'  text-align: center;' +
'  display: inline-block;' +
'}');

////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////

// Do bad things: http://www.codedisqus.com/CyVkUkVqPX/how-to-call-a-greasemonkey-function-when-a-javascript-link-is-clicked.html
// Hijack the JoinGame() function

var JoinGame_orig = unsafeWindow.JoinGame;
unsafeWindow.JoinGame = function() {
    JoinThisGame();
};

/*
var JoinGameHelper_orig = unsafeWindow.JoinGameHelper;
unsafeWindow.JoinGameHelper = function() {
    JoinThisGameHelper();
};
*/

function JoinThisGame() {
    var cur_gameid = document.documentElement.outerHTML.match(RegExp(/'gameid' : '(\d+)'/))[1];
    var cur_g_sessionID = document.documentElement.outerHTML.match(RegExp(/g_sessionID = "(\w+)"/))[1];
    var data = {gameid: cur_gameid, sessionid: cur_g_sessionID};
    var serialdata = JSON.stringify(data);
    var gameid = document.getElementsByName('gameid_input')[0].value;
    gameid = gameid.replace(/\D/g,'');
    console.log('data: ' + data + ' JSON: ' + serialdata);
    GM_xmlhttpRequest({
        method: "POST",
        url: "http://steamcommunity.com/minigame/ajaxleavegame/",
        data: serialdata,
        headers: {
            "Content-Type": "application/json"
        },
        onload: function(json) {
            console.log(json);
            console.log('Going to the helper');
            JoinThisGameHelper( gameid );
        }
    });
}

function JoinThisGameHelper( gameid ) {
    // Removes some errors of the original JoinGame and tries to join again on those occurrences.
    // Removes all non-numeric characters from the Game ID to prevent typing mistakes/inaccuracies.
    // If nothing is entered in the Game ID dialog, the default behavior is preserved.
    var data = {gameid: gameid};
    var serialdata = JSON.stringify(data);
    console.log('data: ' + data + ' JSON: ' + serialdata);
    document.getElementsByName('gameid_input')[0].value = gameid;
    console.log('Joining GameID: ' + gameid);
    GM_xmlhttpRequest({
        method: "POST",
        url: "http://steamcommunity.com/minigame/ajaxjoingame/",
        data: serialdata,
        headers: {
            "Content-Type": "application/json"
        },
        onload: function(json) {
            console.log(json);
            var responseJSON = json.responseText.evalJSON();
            if ( responseJSON.success == '1' ) {
                top.location.href = 'http://steamcommunity.com/minigame/towerattack/';
            }
            else {
                setTimeout(function(){
                    JoinThisGameHelper( gameid );
                }, delay);
                console.log('join.js: Probably a garbage packet.  Trying again in ' + delay + 'ms');
            }
        },
        onerror: function( jqXHR ) {
            console.log(jqXHR);
            var responseJSON = jqXHR.responseText.evalJSON();
            if ( responseJSON.success == '24' && responseJSON.errorMsg ) {
                ShowAlertDialog( 'Error', responseJSON.errorMsg ); // Usually for the 10 lvl restriction
            }
            else if ( responseJSON.success == '25' ) {
                ShowAlertDialog( 'Error', 'There was a problem trying to join the game: it already has the maximum number of players.' );
            }
            else {
                setTimeout(function(){
                    JoinThisGameHelper( gameid );
                }, delay);
                console.log('join.js: Probably a bad request.  Trying again in ' + delay + 'ms');
		    }
		}
    });
}

////////////////////////////////////////////////////////////////////////////////
// Future - Working status
////////////////////////////////////////////////////////////////////////////////

// @require https://fgnass.github.io/spin.js/spin.js

// Spinner Settings
/*
var opts = {
  lines: 7 // The number of lines to draw
, length: 30 // The length of each line
, width: 19 // The line thickness
, radius: 29 // The radius of the inner circle
, scale: 0.25 // Scales overall size of the spinner
, corners: 1 // Corner roundness (0..1)
, color: '#000' // #rgb or #rrggbb or array of colors
, opacity: 0.3 // Opacity of the lines
, rotate: 0 // The rotation offset
, direction: 1 // 1: clockwise, -1: counterclockwise
, speed: 1 // Rounds per second
, trail: 60 // Afterglow percentage
, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
, zIndex: 2e9 // The z-index (defaults to 2000000000)
, className: 'spinner' // The CSS class to assign to the spinner
, top: '50%' // Top position relative to parent
, left: '51%' // Left position relative to parent
, shadow: false // Whether to render a shadow
, hwaccel: false // Whether to use hardware acceleration
, position: 'absolute' // Element positioning
};
var spinner = new Spinner().spin();
target.appendChild(spinner.el);
*/


////////////////////////////////////////////////////////////////////////////////
// Update the landing page HTML
////////////////////////////////////////////////////////////////////////////////

var game_div;
try {
    game_div = document.getElementsByClassName('current_game')[0].children[0];
    game_div.outerHTML = '<span class="gameidcss">Game ID: <input name="gameid_input" class="gameid2css" type="text" value=""></span>' +
        '</br><a href="javascript:JoinGame();" class="main_btn"><span>Play Sucka!</span>' +
        '<a><p class="start_new">or, <a href="javascript:StartNewGame();">start a new game</a></p>';
}
catch(err) {
        game_div = document.getElementsByClassName('new_game')[0].children[0];
        game_div.outerHTML = '<span class="gameidcss">Game ID: <input name="gameid_input" class="gameid2css" type="text" value=""></span>' +
            '</br><a href="javascript:JoinGame();" class="main_btn"><span>Play Sucka!</span><a>';
}

// Add a listener for an enter key
document.getElementsByName("gameid_input")[0].addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }

    // Enter is pressed
    if (e.keyCode == 13) { JoinThisGame(); }
}, false);
