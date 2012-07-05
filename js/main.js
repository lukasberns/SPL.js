function main() {
	var renderer = new ScalarFieldRenderer;
	renderer.fieldFunction = function(x, y) {
		return Math.pow(Math.sin((x*x + y*y)/100), 2);
	};
	renderer.canvas = document.createElement('canvas');
	renderer.canvas.width = 640;
	renderer.canvas.height = 480;
	renderer.render();
	
	document.body.appendChild(renderer.canvas);
}
