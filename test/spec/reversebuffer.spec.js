"use strict";

var test = require('tape');
var ReverseBuffer = require('../../lib/reversebuffer.js');
var WebAudioLoader = require('webaudioloader');

var audioContext = new AudioContext();

// testing suites
test('ReverseBuffer Constructor', function(t){
	t.plan(1);

	var rb= null;

	t.doesNotThrow(function(){
		rb = new ReverseBuffer();
	}, {}, "Initializes without error");

});

test('ReverseBuffer Constructor Arguments', function(t){

	var buffer1 = null;
	// Load an dummy audiofile
	var wal = new WebAudioLoader({
		context: audioContext,
		cache: true,
		onprogress: function (evt){
			console.log("loading soundfiles", evt);
		}
	});

	wal.load("https://dl.dropboxusercontent.com/u/2117088/sounds/Sin440Hz1s-Original.wav", {
		onload: function(err, buffer){
			if(!err){
				console.log("Get buffer");
				buffer1 = buffer;
			}
		}
	});	

	t.plan(1);

	var rb = null;

	t.doesNotThrow(function(){
		rb = new ReverseBuffer({
			buffer: buffer1,
			context: audioContext
		});
	}, {}, "Initializes without error");

});
