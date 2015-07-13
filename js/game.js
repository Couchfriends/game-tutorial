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
        score: 0,
        width: window.innerWidth,
        height: window.innerWidth
    },
    player = {},
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

    ctx.fillStyle = "#000000";
    ctx.font = "bold 32px Arial";
    ctx.fillText(game.score, 10, 32);
}

function init() {
    elCanvas = document.getElementById('game');
    ctx = elCanvas.getContext('2d');
    resizeGame();
    var obstacle = new Obstacle();
    obstacle.add();
    player = new Player();
    player.add();
    window.addEventListener('keydown', function(e) {
        if (e.key == 'a' || e.key == 'ArrowLeft') {
            player.speed.x -= 1;
        }
        else if (e.key == 'd' || e.key == 'ArrowRight') {
            player.speed.x += 1;
        }
    });
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