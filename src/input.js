export class InputHandler {
	constructor(game) {
		this.game = game;
		this.keys = [];
		window.addEventListener("keydown", e => {
			if ((e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === " ") && this.keys.indexOf(e.key) === -1) {
				this.keys.push(e.key);
			} else if (e.key === "d") {
				this.game.debug = !this.game.debug;
			} else if (e.key === "Enter") {
				this.game.invincible = !this.game.invincible;
			}
			this.game.pressed = "PRESSED";
		});
		window.addEventListener("keyup", e => {
			if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === " ") {
				this.keys.splice(this.keys.indexOf(e.key), 1);
			}
			this.game.pressed = "NOT PRESSED";
		});
	}
}
