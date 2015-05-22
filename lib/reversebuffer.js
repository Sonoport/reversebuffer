"use strict";

/*
	constructor
	var revBuffer = new ReverseBuffer({buffer: audioBuffer, context: AudioContext});
*/
function ReverseBuffer(options){

	if(!(this instanceof ReverseBuffer)){
		throw new TypeError("ReverseBuffer constructor cannot be called as a function.");
	}

	window.AudioContext = window.AudioContext || window.webkitAudioContext;

	window.ReverseBuffer = this;

	options = options || {};
	for (var opt in options){
		if (this.hasOwnProperty(opt) && options[opt] !== undefined){
			this[opt] = options[opt];
		}
	}
	this.context = options.context || window.AudioContext;
	this._buffer = options.buffer;
	this.reverseBuffer = null;
	var _chIndex = 0;
	var _sIndex = 0;

	if (this._buffer) {
	   this.reverseBuffer = this.context.createBuffer(this._buffer.numberOfChannels, this._buffer.length, this._buffer.sampleRate);

	   for (_chIndex = 0; _chIndex < this._buffer.numberOfChannels; _chIndex++){
	      var dest = this.reverseBuffer.getChannelData(_chIndex);
	      var src = this._buffer.getChannelData(_chIndex);
	      for (_sIndex = 0; _sIndex < this._buffer.length; _sIndex++){
	         dest[_sIndex] = src[this._buffer.length-_sIndex];
	      }
	   }
	}

   return this.reverseBuffer;

}

module.exports = ReverseBuffer;