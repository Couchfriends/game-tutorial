/**
 * @url www.couchfriends.com
 * Tutorial: How to create a real-time multiplayer game in less than 30 minutes
 **/

window.requestAnimFrame = window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
function( callback ){
    window.setTimeout(callback, 1000 / 60);
};

var game = {
        width: window.innerWidth,
        height: window.innerWidth
    },
    elCanvas,
    ctx,
    GameObjects = [];

window.onload = init;
window.onresize = resizeGame;

function render(time) {

    ctx.clearRect(0, 0, game.width, game.height);
    requestAnimFrame(render);
    for (var i = 0; i < GameObjects.length; i++) {
        GameObjects[i].update(time);
        GameObjects[i].draw();
    }
}

function init() {
    elCanvas = document.getElementById('game');
    ctx = elCanvas.getContext('2d');
    resizeGame();
    var obstacle = new Obstacle();
    obstacle.add();
    requestAnimFrame(render);
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