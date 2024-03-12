class Enemy {
	constructor() {
		this.markedForDeletion = false;
		this.frameX = 0;
		this.fps = 10;
		this.frameInterval = 1000 / this.fps;
		this.frameTimer = 0;
	}
	update(deltaTime) {
		// Movement
		this.x -= this.speedX + this.game.speed;
		if (this.frameTimer > this.frameInterval) {
			this.frameTimer = 0;
			if (this.frameX < this.maxFrame) this.frameX++;
			else this.frameX = 0;
		} else {
			this.frameTimer += deltaTime;
		}
		//Check if off screen
		if (this.x + this.width < 0) this.markedForDeletion = true;
	}
	draw(context) {
		context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width / this.devider, this.height / this.devider);
		if (this.game.debug) {
			context.strokeStyle = "red";
			context.strokeRect(this.x + 10, this.y + 11, this.width - 30, this.height - 40);
		}
	}
}

export class FlyingEnemy extends Enemy {
	constructor(game) {
		super();
		this.game = game;
		this.devider = 1.15;
		//His width and height
		this.width = 94.5;
		this.height = 85;
		//His coordinates
		this.x = this.game.width;
		this.y = Math.random() * -130 + 360;
		//His speed
		this.speedX = Math.random() < 0.5 ? 0 : 1;
		this.maxFrame = 1;
		this.image = enemyDino;
	}
	update(deltaTime) {
		super.update(deltaTime);
	}
}

export class Cactus2 extends Enemy {
	constructor(game) {
		super();
		this.game = game;
		this.devider = 1.2;
		this.width = 100;
		this.height = 102;
		this.x = this.game.width;
		this.y = this.game.height - this.height - this.game.groundMargin + 17;
		this.speedX = 0;
		this.maxFrame = 0;
		this.image = cactus2;
	}
}

export class Cactus4 extends Enemy {
	constructor(game) {
		super();
		this.game = game;
		this.devider = 1.2;
		this.width = 150;
		this.height = 99;
		this.x = this.game.width;
		this.y = this.game.height - this.height - this.game.groundMargin + 15;
		this.speedX = 0;
		this.maxFrame = 0;
		this.image = cactus4;
	}
}

export class Plant extends Enemy {
	constructor(game) {
		super();
		this.game = game;
		this.devider = 1.2;
		this.width = 60;
		this.height = 87;
		this.x = this.game.width;
		this.y = this.game.height - this.height - this.game.groundMargin + 15;
		this.speedX = 0;
		this.maxFrame = 1;
		this.image = enemyPlant;
	}
	update(deltaTime) {
		super.update(deltaTime);
	}
}
