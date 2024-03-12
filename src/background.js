class Layer {
	constructor(game, width, height, speedModifier, image) {
		this.game = game;
		this.width = width;
		this.height = height;
		this.speedModifier = speedModifier;
		this.image = image;
		this.x = 0;
		this.x2 = this.width;
		this.y = 0;
	}
	update() {
		this.speed = this.game.speed * this.speedModifier;
		if (this.x <= -this.width) this.x = this.width + this.x2 - this.speed;
		if (this.x2 <= -this.width) this.x2 = this.width + this.x - this.speed;
		this.x = this.x - this.speed;
		this.x2 = this.x2 - this.speed;
	}
	draw(context) {
		context.drawImage(this.image, this.x, this.y, this.width, this.height);
		context.drawImage(this.image, this.x2 - 1, this.y, this.width, this.height);
	}
}

export class Background {
	constructor(game) {
		this.game = game;
		this.width = 1667;
		this.height = 500;
		this.layer1Image = layer1;
		this.layer2Image = layer2;
		this.layer3Image = layer3;
		this.layer4Image = layer4;
		this.layer5Image = layer5;
		this.layer1 = new Layer(this.game, this.width, this.height, 0.02, this.layer1Image);
		this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2Image);
		this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3Image);
		this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4Image);
		this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5Image);
		this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];
	}
	update() {
		this.backgroundLayers.forEach(layer => {
			layer.update();
		});
	}
	draw(context) {
		this.backgroundLayers.forEach(layer => {
			layer.draw(context);
		});
	}
	reset() {
		this.backgroundLayers.forEach(layer => {
			layer.x = 0;
			layer.x2 = this.width;
		});
	}
}
