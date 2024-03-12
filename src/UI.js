export class UI {
	constructor(game) {
		this.game = game;
		this.fontSize = 50;
		this.fontFamily = "Protest Guerrilla";
	}
	draw(context) {
		context.save();
		context.shadowOffsetX = 5;
		context.shadowOffsetY = 5;
		context.shadowColor = "blue";
		context.shadowBlur = 5;
		if (this.game.gameOver && !this.game.wainingToStart) {
			context.textAlign = "center";
			context.fillStyle = "Red";
			context.font = this.fontSize * 2 + "px " + this.fontFamily;
			context.fillText("Game Over!", this.game.width * 0.5, this.game.height * 0.5 - 20);
		}
		if (this.game.wainingToStart) {
			context.textAlign = "center";
			context.fillStyle = "Red";
			context.font = this.fontSize * 1.5 + "px " + this.fontFamily;
			context.fillText("Waiting to Start, Press Space to Start!", this.game.width * 0.5, this.game.height * 0.5 - 20);
		}
		if (this.game.invincible) {
			context.textAlign = "left";
			context.fillStyle = "Red";
			context.font = this.fontSize + "px " + this.fontFamily;
			context.fillText("Invincible ON", 10, 50);
		}
		context.restore();
	}
}
