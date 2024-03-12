const states = {
	RUNNING: 0,
	DOWN: 1,
	JUMPING: 2,
	STAY: 3,
};

class State {
	constructor(state, game) {
		this.state = state;
		this.game = game;
	}
}

export class Running extends State {
	constructor(game) {
		super("RUNNING", game);
	}
	enter() {
		this.game.player.width = 87;
		this.game.player.height = 94;
		this.game.player.image = document.getElementById("player1");
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 1;
	}
	handleInput(input) {
		if (input.includes("ArrowUp") || input.includes(" ")) {
			this.game.player.setState(states.JUMPING);
		} else if (input.includes("ArrowDown")) {
			this.game.player.setState(states.DOWN);
		} else if (this.game.speed === 0) {
			this.game.player.setState(states.STAY);
		}
	}
}

export class Down extends State {
	constructor(game) {
		super("DOWN", game);
	}
	enter() {
		if (this.game.player.onGround()) {
			this.game.player.width = 119.2;
			this.game.player.height = 65;
			this.game.player.image = document.getElementById("down");
			this.game.player.frameX = 0;
			this.game.player.maxFrame = 1;
		} else {
			this.game.player.velocityY = 16;
		}
	}
	handleInput(input) {
		if (this.game.pressed === "NOT PRESSED") {
			this.game.player.setState(states.RUNNING);
		} else if (input.includes("ArrowUp") || input.includes(" ")) {
			this.game.player.setState(states.JUMPING);
		}
	}
}

export class Jumping extends State {
	constructor(game) {
		super("JUMPING", game);
	}
	enter() {
		if (this.game.player.onGround()) this.game.player.velocityY -= 18;
		this.game.player.image = document.getElementById("stay");
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 0;
	}
	handleInput(input) {
		if (this.game.player.onGround()) {
			this.game.player.setState(states.RUNNING);
		} else if (input.includes("ArrowDown") && this.game.player.velocityY >= -8) {
			this.game.player.setState(states.DOWN);
		}
	}
}

export class Stay extends State {
	constructor(game) {
		super("STAY", game);
	}
	enter() {
		this.game.player.image = document.getElementById("stay");
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 0;
	}
	handleInput(input) {
		if (input.includes("ArrowUp") || input.includes(" ")) {
			this.game.player.setState(states.JUMPING);
		} else if (input.includes("ArrowDown")) {
			this.game.player.setState(states.DOWN);
		} else if (this.game.speed > 0) {
			this.game.player.setState(states.RUNNING);
		}
	}
}
