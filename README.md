# ReverseBuffer

Returns a reverse buffer of AudioBuffer from an original forward playing AudioBuffer.

A reverse buffer mimics a "backward" playback of an audio source when it is being played forward normally.

This tiny library uses Web Audio API.

## Usage:

```
var ReverseBuffer = require("reversebuffer");

var audioContext = new AudioContext();

// Make an AudioBuffer
var bufferSource = audioContext.createBuffer();

// In turn returns a reversed AudioBuffer
var revBuffer = new ReverseBuffer({
	buffer: bufferSource, 
	context: audioContext
});

```

### Use with [WebAudioLoader](https://github.com/Sonoport/webaudioloader)

[WebAudioLoader](https://github.com/Sonoport/webaudioloader) deals with loading an audiofile over an url or FileObject and returns an AudioBuffer.

```
var WebAudioLoader = require("webaudioloader");
var ReverseBuffer = require("reversebuffer");

var audioContext = new AudioContext();

var originalBuffer = null;

var wal = new WebAudioLoader({
	context: audioContext,
	cache: true,
	onprogress: function (evt){
		console.log("loading soundfiles", evt);
	}
});

// Load a dummy audiofile

wal.load("http://yourdomain.com/youraudiofilename.mp3", {
	onload: function(err, buffer){
		if(!err){
			originalBuffer = buffer;
		}
	}
});

var reverseBuffer = new ReverseBuffer({
	buffer: originalBuffer, 
	context: audioContext
});

```

## Install

1. Using browserify
	
	```var ReverseBuffer = require("reversebuffer");```

2. Standalone (global object)

## API

### Constructor

```var revBuffer = new ReverseBuffer(options);```

* option object have this arguments
	- `buffer`: AudioBuffer - buffer source to be reversed
	- `context`: AudioContext - an AudioContext to use for decoding the audio

### Properties

* `reverseBuffer` : AudioBuffer - Reversed audio buffer

## License

MIT

