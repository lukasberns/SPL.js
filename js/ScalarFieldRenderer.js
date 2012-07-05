
/**
 * Render a scalar field on a canvas
 * @construct
 */
function ScalarFieldRenderer() {
	
}

/**
 * @var HTMLCanvasElement
 */
ScalarFieldRenderer.prototype.canvas = null;

/**
 * @var Function Field function: (float) function(x,y) {}
 */
ScalarFieldRenderer.prototype.fieldFunction = null;

/**
 * @var Object Gradient. Key = float between 0 and 1 where 0 = min, 1 = max. Value is a color string.
 */
ScalarFieldRenderer.prototype.colorPalette = {
	0.45: "blue",
	0.55: "cyan",
	0.65: "green",
	0.95: "yellow",
	1.00: "red"
};
ScalarFieldRenderer.prototype.colorPalette = { 0: 'yellow', 1: 'red' };
ScalarFieldRenderer.prototype.colorPalette = {
	0.00: 'blue',
	0.25: 'cyan',
	0.50: 'lime',
	0.75: 'yellow',
	1.00: 'red'
};

/**
 * Render field in canvas
 * @param float forcedMaxLevel Optional. Force max level to this value
 * @return void
 */
ScalarFieldRenderer.prototype.render = function(forcedMaxLevel) {
	var width = +this.canvas.width;
	var height = +this.canvas.height;
	var ctx = this.getContext();
	var colorPalette = this.createColorPaletteArray();
	
	var absoluteFieldLevels = [];
	var maxFieldLevel = 0;
	
	var x, y, fieldLevel;
	
	for (y = 0; y < height; y++) {
		absoluteFieldLevels[y] = [];
		
		for (x = 0; x < width; x++) {
			fieldLevel = this.fieldFunction(x, y);
			absoluteFieldLevels[y][x] = fieldLevel;
			if (fieldLevel != Infinity && fieldLevel > maxFieldLevel) {
				maxFieldLevel = fieldLevel;
			}
		}
	}
	
	if (forcedMaxLevel) {
		maxFieldLevel = forcedMaxLevel;
	}
	if (!maxFieldLevel) {
		maxFieldLevel = 1;
	}
	
	var scaleFactor = 255/maxFieldLevel;
	
	var imageData = ctx.createImageData(width, height);
	var pixelArray = imageData.data;
	var offset = 0;
	
	for (y = 0; y < height; y++) {
		for (x = 0; x < width; x++) {
			fieldLevel = absoluteFieldLevels[y][x];
			var paletteOffset = 4 * Math.round(fieldLevel * scaleFactor);
			if (paletteOffset < 0) {
				paletteOffset = 0;
			}
			if (paletteOffset > 1020) {
				paletteOffset = 1020;
			}
			
			pixelArray[offset++] = colorPalette[paletteOffset + 0];
			pixelArray[offset++] = colorPalette[paletteOffset + 1];
			pixelArray[offset++] = colorPalette[paletteOffset + 2];
			pixelArray[offset++] = 255; // fullly opaque for now
		}
	}
	
	ctx.putImageData(imageData, 0, 0);
};

/**
 * Get canvas rendering context
 * @return Canvas2DRenderingContext
 */
ScalarFieldRenderer.prototype.getContext = function() {
	return this.canvas.getContext('2d');
};

/**
 * Get color palette
 * @return Array Array with 256*4 elements, representing one step in pairs of four (r,g,b,a)
 */
ScalarFieldRenderer.prototype.createColorPaletteArray = function() {
	var canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 1;
	
	var ctx = canvas.getContext('2d');
	var gradient = ctx.createLinearGradient(0,0,256,1);
	
	for (var x in this.colorPalette) {
		gradient.addColorStop(x, this.colorPalette[x]);
	}
	
	ctx.fillStyle = gradient;
	ctx.fillRect(0,0,256,1);
	
	return ctx.getImageData(0,0,256,1).data;
};
