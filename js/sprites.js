/**
 * @url www.couchfriends.com
 * Tutorial: How to create a real-time multiplayer game in less than 30 minutes
 **/

/**
 * Basic class for all game sprites
 * @constructor
 */
var Sprite = function() {

    this.name = '';
    this.visible = true;
    this.color = '#000000';
    this.size = {
        width: 10,
        height: 10
    };
    this.position = {
        x: 0,
        y: 0
    };
    this.collisionList = [];
};

Sprite.prototype = {

    update: function(time) {
        if (this.visible == false) {
            return false;
        }
        if (this.collisionList.length > 0) {
            for (var i = 0; i < GameObjects.length; i++) {
                if (this.collisionList.indexOf(GameObjects[i].name) > -1 &&
                    this.checkCollision(GameObjects[i])) {
                    this.collide(GameObjects[i]);
                }
            }
        }
        return true;
    },

    draw: function() {

        if (this.visible == true) {
            ctx.beginPath();
            ctx.rect(this.position.x, this.position.y, this.size.width, this.size.width);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    },

    add: function() {
        GameObjects.push(this);
    },

    remove: function() {

        var indexOf = GameObjects.indexOf(this);
        GameObjects.splice(indexOf, 1);

    },

    collide: function (target) {

    },

    checkCollision: function(target) {
        if (this.position.x < target.position.x + target.size.width &&
            this.position.x + this.size.width > target.position.x &&
            this.position.y < target.position.y + target.size.height &&
            this.size.height + this.position.y > target.position.y) {
            return true;
        }
        return false;
    }

};

/**
 * Obstacle that can collide with players
 * @constructor
 */
Obstacle = function () {

    Sprite.call(this);
    this.name = 'obstacle';
    this.color = '#ff0000';
    this.size = {
        width: 50,
        height: 50
    }

};

Obstacle.prototype = Object.create(Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;

Obstacle.prototype.update = function(time) {

    if (!Sprite.prototype.update.call(this, time)) {
        return false;
    }

    this.position.y += 1;

    if (this.position.y > (game.height+this.size.height)) {
        this.position.x = Math.random() * game.width;
        this.position.y = -(this.size.height);
    }

};

Player = function () {

    Sprite.call(this);
    this.name = 'player';
    this.color = '#0000ff';
    this.size = {
        width: 50,
        height: 50
    };
    this.speed = {
        x: 0,
        y: 0
    };
    this.position.x = game.width / 2;
    this.position.y = game.height - 60;
    this.collisionList = ['obstacle'];

};

Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(time) {

    if (!Sprite.prototype.update.call(this, time)) {
        return false;
    }

    if (this.speed.x < -10) {
        this.speed.x = -10;
    }
    else if (this.speed.x > 10) {
        this.speed.x = 10;
    }

    this.position.x += this.speed.x;
    if (this.position.x < 0) {
        this.position.x = 0;
    }
    else if (this.position.x > (game.width-this.size.width)) {
        this.position.x = (game.width-this.size.width);
    }

    this.speed.x *= .95;

    game.score++;

};

Player.prototype.collide = function(target) {

    Sprite.prototype.collide.call(this, target);
    game.score = 0;

};