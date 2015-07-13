/**
 * @url www.couchfriends.com
 * Tutorial: How to create a real-time multiplayer game in less than 30 minutes
 **/
var game = {
        width: window.innerWidth,
        height: window.innerWidth
    },
    elCanvas,
    ctx;
window.onload = init;
window.onresize = resizeGame;

function init() {
    elCanvas = document.getElementById('game');
    ctx = elCanvas.getContext('2d');
    resizeGame();

    // Draw the player
    ctx.beginPath();
    ctx.rect(game.width/2, game.height-60, 50, 50);
    ctx.fillStyle = "red";
    ctx.fill();
}

/**
 * Resize the game to fullscreen
 */
function resizeGame() {
    game.width = window.innerWidth;
    game.height = window.innerHeight;
    elCanvas.width = game.width;
    elCanvas.height = game.height;
}