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
    }
};

Sprite.prototype = {

    update: function(time) {
        if (this.visible == false) {
            return false;
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