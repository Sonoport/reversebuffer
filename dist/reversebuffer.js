(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1]);
