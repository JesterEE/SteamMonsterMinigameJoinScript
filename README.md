# Update - 6/17/2015
I pushed a commented out script (V1.2) since the script is not currently working correctly.  When the script is active you will get the default landing page!  As explained in the [issue tracker](https://github.com/JesterEE/SteamMonsterMinigameJoinScript/issues/1) development of this script on my end is discontinued.  The latest update (V1.3dev)is in the [dev branch](https://github.com/JesterEE/SteamMonsterMinigameJoinScript/tree/dev) and I encourage those interested to fork that branch and continuing to get it working.

I recommend using this command from the Console to get into the game of your choosing:

<code>
(function(key){setInterval(function(){JoinGame(key);$J('.newmodal').remove();}, 2000)})(ROOM_KEY_HERE)
</code>

Kudos to ZucchiniZeMinz_Live in the [ulletical](http://www.twitch.tv/ulletical) Twitch channel.

# SteamMonsterMinigameJoinScript
Adds a dialog box to the Steam Monster Minigame to join a game of your choice.

#Steam Summer 2015 Monster Minigame Join Script#

[![forthebadge](http://forthebadge.com/images/badges/fuck-it-ship-it.svg)](http://forthebadge.com) [![Build Status](https://travis-ci.org/JesterEE/SteamMonsterMinigameJoinScript.svg?branch=master)](https://travis-ci.org/JesterEE/SteamMonsterMinigameJoinScript)

## Purpose ##

A Greasemonkey/Tapermonkey script to modify the games landing launch page to add the ability of launching a specific Game ID.

## Important ##

This script is simple, but does a bit of code injection because I don't know a better way to do it (I don't really know Javascript or GM/TM work-arounds).  You have my word I am not doing anything malicious here but this script does grant _unsafeWindow_ privaleges.  Please look over the code for yourself.  __You have been warned!__

## Installation ##
This write-up has been borrowed from [wchill](https://github.com/wchill) because I didn't feel like reinventing the wheel.  Thanks for taking the time to do it wchill [wchill](https://github.com/wchill)!

**It is recommended to use either [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) (Chrome) or [Greasemonkey](https://addons.mozilla.org/en-us/firefox/addon/greasemonkey/) (Firefox).** This allows the script to auto-update to the most recent version. The rate of this update can be changed in each extension's preferences.

### [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) ###

1. Navigate to `https://raw.githubusercontent.com/JesterEE/SteamMonsterMinigameJoinScript/master/join.js`.
2. When the editor has loaded, click `Install` (*NOT* `Process with Chrome`).

### [Greasemonkey](https://addons.mozilla.org/en-us/firefox/addon/greasemonkey/) ###

1. Navigate to `https://raw.githubusercontent.com/JesterEE/SteamMonsterMinigameJoinScript/master/join.js`.
2. Right click on the page, and click `Save Page As`.
3. While Firefox is still open, open a File Manager of any sort, and navigate to the directory you saved the script.
4. Drag & drop the script file onto the Firefox window.
5. Press `Install`.

### Manual ###

##### Chrome #####
1. Open https://raw.githubusercontent.com/JesterEE/SteamMonsterMinigameJoinScript/master/join.js
2. Select All, Copy.
3. Navigate to `http://steamcommunity.com/minigame/` and join or start a game.
4. Press `Ctrl + Shift + J`.
5. Paste into the javascript input, and hit `Enter`.

##### Firefox #####
1. Open https://raw.githubusercontent.com/JesterEE/SteamMonsterMinigameJoinScript/master/join.js
2. Select All, Copy.
3. Navigate to `http://steamcommunity.com/minigame/` and join or start a game.
4. Press `Ctrl + Shift + K`.
5. Paste into the javascript input, and hit `Enter`.

##### Internet Explorer / Microsoft Edge #####
1. Open https://raw.githubusercontent.com/JesterEE/SteamMonsterMinigameJoinScript/master/join.js
2. Select All, Copy.
3. Navigate to `http://steamcommunity.com/minigame/` and join or start a game.
4. Press `F12` and navigate to the `Console` tab.
5. Paste into the javascript input, and hit `Enter`.

## I want to contribute! ##

This project is open-source [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html) on GitHub. There are different ways you can help:

- Find a Pull Request that's marked `needs testing`. Run that version of the script and watch the console for errors. If there's no errors, pay attention to what the changes are doing, and make sure it's doing what it's supposed to do.
- Find an Issue that's marked `help wanted`. Make the changes needed by that issue, and create a Pull Request with your enhancement or bugfix.
- Pick an item off the TODO list, below, and implement it. When it's done (and tested and working), create a Pull Request.
- Got an idea for an improvement that's not already listed? Code it up, test it out, then make a Pull Request when it's ready.
- Do NOT change the script version in your PR as it could be incremented before your PR is merged.
