function SPLtoSoundPressure(SPL) {
	return Math.pow(10, SPL/10);
}

function soundPressureToSPL(soundPressure) {
	return 10 * Math.log(soundPressure) / Math.LN10;
}
