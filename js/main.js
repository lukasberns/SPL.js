function main() {
	var point1 = new PointSpeaker(100, 100, 50);
	var line1 = new LineSpeaker(500, 100, 50);
	
	var renderer = new ScalarFieldRenderer;
	renderer.fieldFunction = function(x, y) {
		return soundPressureToSPL(
			point1.evaluate(x,y)
				+ line1.evaluate(x,y)
		);
	};
	renderer.canvas = document.createElement('canvas');
	renderer.canvas.width = 640;
	renderer.canvas.height = 480;
	renderer.render(50);
	
	document.body.appendChild(renderer.canvas);
}
