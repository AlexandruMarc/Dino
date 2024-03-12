import { Running, Down, Jumping, Stay } from "./playerState.js";

export class Player {
	constructor(game) {
		this.game = game;
		//Width and height of the caracter in the sprite sheet
		this.width = 87;
		this.height = 94;
		//His coordinates
		this.x = 50;
		this.y = this.game.height - this.height - this.game.groundMargin;
		//Helps the vertical movement
		this.velocityY = 0;
		this.weight = 1.1;
		//Helps drawing and animate the caracter
		this.image = player1;
		this.frameX = 0;
		this.maxFrame = 1;
		//Helps animating the caracters
		this.fps = 10;
		this.frameInterval = 1000 / this.fps;
		this.frameTimer = 0;
		//Hendle animation caracter and input
		this.states = [new Running(this.game), new Down(this.game), new Jumping(this.game), new Stay(this.game)];
	}
	update(input, deltaTime) {
		//Call for collisions and input
		this.checkCollision();
		this.currentState.handleInput(input);

		//Boundories
		if (this.y >= this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;

		//Vertical movement
		this.y += this.velocityY * 0.5;
		if (!this.onGround()) this.velocityY += this.weight * 0.4;
		else this.velocityY = 0;

		//Sprite animation
		if (this.frameTimer > this.frameInterval) {
			if (this.frameX < this.maxFrame) ++this.frameX;
			else this.frameX = 0;
			this.frameTimer = 0;
		} else {
			this.frameTimer += deltaTime;
		}
	}
	draw(context) {
		context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
		if (this.game.debug) {
			context.strokeStyle = "red";
			context.strokeRect(this.x + 15, this.y + 11, this.width - 26.8, this.height - 22);
		}
	}
	onGround() {
		return this.y >= this.game.height - this.height - this.game.groundMargin;
	}
	setState(state) {
		this.currentState = this.states[state];
		this.currentState.enter();
	}
	checkCollision() {
		this.game.enemies.forEach(enemy => {
			//Collision
			if (
				enemy.x + 10 < this.x + 15 + (this.width - 26.8) &&
				enemy.x + 10 + (enemy.height - 40) > this.x + 15 &&
				enemy.y + 11 < this.y + 11 + (this.height - 22) &&
				enemy.y + 11 + (enemy.height - 40) > this.y + 11 &&
				this.game.invincible === false
			) {
				this.game.gameOver = true;
			}
		});
	}
	reset() {
		this.x = 50;
		this.y = this.game.height - this.height - this.game.groundMargin;
	}
}
//Explination for the colision detection if statement
// The right side up of the player and left up of the enemy
//--> the left side up of the player with the right side up of the enemy
//The right side down of the player and left down of the enemy
//--> the left side down of the player with the right side down of the enemy
//And if the invincible is not active
