"use strict";

/*
	var revBuffer = reversebuffer({buffer: audioBuffer, context: AudioContext});
	var revBuffer = reversebuffer(audioBuffer);
*/
function reversebuffer(options){

	window.AudioContext = window.AudioContext || window.webkitAudioContext;

	var buffer;
	var context;
	var reverseBuffer;

	var _chIndex = 0;
	var _sIndex = 0;

	if (options instanceof AudioBuffer){
		buffer = options;
		context = new window.AudioContext();
	}else{
		context = options.context || new window.AudioContext();
		buffer = options.buffer;
	}

	if (buffer) {
	   reverseBuffer = context.createBuffer(buffer.numberOfChannels, buffer.length, buffer.sampleRate);

	   for (_chIndex = 0; _chIndex < buffer.numberOfChannels; _chIndex++){
	      var dest = reverseBuffer.getChannelData(_chIndex);
	      var src = buffer.getChannelData(_chIndex);
	      for (_sIndex = 0; _sIndex < buffer.length; _sIndex++){
	         dest[_sIndex] = src[buffer.length-_sIndex];
	      }
	   }
	}

  return reverseBuffer;
}

module.exports = reversebuffer;
