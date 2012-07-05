
/**
 * An idealistic line speaker with no directivity
 * @param float x
 * @param float y
 * @param float SPL SPL at one meter distance
 * @construct
 */
function LineSpeaker(x, y, SPL) {
	this.x = x;
	this.y = y;
	this.SPL = SPL;
	this.soundPressure = SPLtoSoundPressure(this.SPL);
}

/**
 * Compute sound pressure at given point
 * @param float x
 * @param float y
 * @return float Sound pressure
 */
LineSpeaker.prototype.evaluate = function(x, y) {
	var dx = this.x - x;
	var dy = this.y - y;
	return this.soundPressure / Math.sqrt(dx*dx + dy*dy);
};
