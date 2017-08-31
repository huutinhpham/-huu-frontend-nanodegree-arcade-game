// Enemies our player must avoid
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.col =0;
    this.row = row;
    this.x = 0;
    this.y = row * 83;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;
    if (this.x >= 505) {
      this.x = 0;
      this.y = Math.ceil(3*Math.random())*83;
    }
    this.row = Math.floor(this.y/83);
    this.col = Math.floor(this.x/101);
    this.collision(player);
};

Enemy.prototype.collision = function(player) {
  if (player.row == this.row && player.col == this.col) {
    endGame(0);
  };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(row, col) {
  this.col = col;
  this.row = row;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.respawn = function() {
  this.col = Math.round(Math.random()*5);
  this.row = 5;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.col * 101, this.row * 83 - 12);
};

Player.prototype.handleInput = function(keyInput) {
  switch (keyInput) {
    case 'left':
      if (this.col > 0) this.col -= 1;
      break;
    case 'right':
      if (this.col < 4) this.col += 1;
      break;
    case 'up':
      if (this.row > 0) this.row -= 1;
      break;
    case 'down':
      if (this.row < 5) this.row += 1;
      break;
  };
};

//game helper methods

var createEnemy = function (DIFFICULTY) {
  var random = Math.random();
  return new Enemy(Math.ceil(3*random), (random*DIFFICULTY + 1)*75);
}

var createPlayer = function() {
  var random = Math.random();
  return new Player(5, Math.round(random*5));
}

var endGame = function(victory) {
  if (victory) score += 1;
  else life -= 1;
  window.setTimeout(player.respawn(), 3000);
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var DIFFICULTY = 4;
var allEnemies = [];
var player = createPlayer();
var score = 0;
var life = 5;

for (i = 0; i < 2*DIFFICULTY; i++) {
  allEnemies.push(createEnemy(DIFFICULTY));
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
