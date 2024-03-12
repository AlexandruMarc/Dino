export class Score {
	score = 0;
	HIGH_SCORE_KEY = "highScore";

	constructor(game) {
		this.game = game;
		this.fontSize = 50;
		this.fontFamily = "Protest Guerrilla";
	}

	update(speed) {
		this.score += speed * 0.01;
	}
	reset() {
		this.score = 0;
	}
	setHighScore() {
		const hightScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
		if (this.score > hightScore) {
			localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
		}
	}
	draw(context) {
		const hightScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));

		context.font = this.fontSize + "px " + this.fontFamily;
		context.fillStyle = "#525250";
		const scoreX = this.game.width - 200;
		const hightScoreX = scoreX - 350;

		const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
		const hightScorePadded = hightScore.toString().padStart(6, 0);

		context.fillText(scorePadded, scoreX, 50);
		context.fillText(`HI ${hightScorePadded}`, hightScoreX, 50);
	}
}
