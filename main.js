import { Player } from "./src/player.js";
import { InputHandler } from "./src/input.js";
import { Background } from "./src/background.js";
import { FlyingEnemy, Cactus2, Cactus4, Plant } from "./src/enemies.js";
import { UI } from "./src/UI.js";
import { Score } from "./src/Score.js";

window.addEventListener("load", function () {
	const canvas = document.getElementById("canvas1");
	const ctx = canvas.getContext("2d");
	canvas.width = 1600;
	canvas.height = 500;
	const GAME_SPEED_START = 3;
	const GAME_SPEED_INCREMENT = 0.0001;

	class Game {
		constructor(width, height) {
			this.width = width;
			this.height = height;
			//This sets how hight is the ground from canvas ground and the speed of layers
			this.speed = 0;
			this.speedStart = GAME_SPEED_START;
			this.groundMargin = 80;
			this.speedCounter = 0;
			//Check if the Down Key is pressed
			this.pressed = "";
			//To instantiate the game
			this.background = new Background(this);
			this.player = new Player(this);
			this.input = new InputHandler(this);
			this.UI = new UI(this);
			this.score = new Score(this);
			//Enemies
			this.enemies = [];
			this.enemyTimer = 0;
			this.enemyInterval = Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500;
			this.chooseEnemy = [FlyingEnemy, Cactus2, Cactus4, Plant];
			//Debug and display
			this.debug = false;
			this.invincible = false;
			this.gameOver = false;
			//Calling current state
			this.player.currentState = this.player.states[0];

			//Resetting
			this.hasAdedEventListenerForRestart = false;
			this.wainingToStart = true;
		}
		update(deltaTime) {
			//Call for speed variable
			if (this.speed === 0) this.speed += this.speedStart;

			this.score.update(this.speed);
			this.background.update();
			this.player.update(this.input.keys, deltaTime);

			//Handle Enemy(always 3 enemies at a time on screen)
			if (this.speed > 0 && this.enemies.length < 3 && this.enemyTimer > this.enemyInterval) {
				this.addEnemy();
				this.enemyTimer = 0;
			} else {
				this.enemyTimer += deltaTime + this.speed;
			}
			this.enemies.forEach(enemy => {
				enemy.update(deltaTime);
			});
			//Deleting
			this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
		}
		draw(context) {
			this.background.draw(context);
			this.player.draw(context);
			this.score.draw(context);
			this.enemies.forEach(enemy => {
				enemy.draw(context);
			});
			this.UI.draw(context);
		}
		addEnemy() {
			const randomIndex = Math.floor(Math.random() * this.chooseEnemy.length);
			const selectedEnemy = this.chooseEnemy[randomIndex];

			this.enemies.push(new selectedEnemy(this));
		}
	}

	const game = new Game(canvas.width, canvas.height);

	//Every hundred points is incressing the speed of the game
	let lastHundred = 0;
	function updateGameSpeed(deltaTime) {
		const currentHundred = Math.floor(game.score.score / 100);

		if (currentHundred > lastHundred) {
			game.speed += 0.5;
			lastHundred = currentHundred;
		} else {
			game.speed += deltaTime * GAME_SPEED_INCREMENT;
		}
	}

	function reset() {
		game.background.reset();
		game.enemies = [];
		game.speed = 0;
		game.player.reset();
		game.hasAdedEventListenerForRestart = false;
		game.wainingToStart = false;
		game.gameOver = false;
		game.speedMargin = 0;
		game.score.reset();
	}
	function setupGameReset() {
		if (!game.hasAdedEventListenerForRestart) {
			game.hasAdedEventListenerForRestart = true;

			setTimeout(() => {
				game.wainingToStart = true;
				displayMassege();
			}, 2000);
		}
	}
	function displayMassege() {
		window.addEventListener(
			"keydown",
			e => {
				if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === " ") {
					reset();
				} else {
					displayMassege();
				}
			},
			{ once: true }
		);
	}

	let lastTime = 0;
	function animate(timeStamp) {
		const deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (!game.gameOver && !game.wainingToStart) {
			game.update(deltaTime);
			updateGameSpeed(deltaTime);
		} else {
			setupGameReset();
			game.score.setHighScore();
		}
		game.draw(ctx);

		requestAnimationFrame(animate);
	}
	animate(0);
});
