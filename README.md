# reversebuffer

Returns a reverse buffer of [AudioBuffer](http://webaudio.github.io/web-audio-api/#the-audiobuffer-interface) from an original AudioBuffer.

A reverse buffer mimics a "backward" playback of an audio source when it is being played forward normally.

This tiny library uses Web Audio API.

## Usage:

```
var reversebuffer = require("reversebuffer");

var audioContext = new AudioContext();

// Make an AudioBuffer or get decode it from a file.
var bufferSource = audioContext.createBuffer();

// In turn returns a reversed AudioBuffer
var revBuffer = reversebuffer({
	buffer: bufferSource,
	context: audioContext
});

```

### Use with [WebAudioLoader](https://github.com/Sonoport/webaudioloader)

[WebAudioLoader](https://github.com/Sonoport/webaudioloader) deals with loading an audiofile over an url or FileObject and returns an AudioBuffer.

```
var WebAudioLoader = require("webaudioloader");
var reversebuffer = require("reversebuffer");

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

var reverseBuffer = reversebuffer({
	buffer: originalBuffer,
	context: audioContext
});

```

## Install

1. npm

	``` npm install --save-dev reversebuffer```

2. Using browserify

	```var reversebuffer = require("reversebuffer");```

3. Standalone (global object, AMD) [builds are here](https://github.com/Sonoport/reversebuffer/tree/master/dist)

## API

```var revBuffer = reversebuffer(options);```

* option object have this arguments
	- `buffer`: AudioBuffer - buffer source to be reversed
	- `context`: AudioContext - an AudioContext to use for decoding the audio
* returns an AudioBuffer which is reversed.

```var revBuffer = reversebuffer(audioBuffer);```

* `buffer`: AudioBuffer - buffer source to be reversed
* returns an AudioBuffer which is reversed.

## License

MIT

