# gh.midi

[![NPM version](https://flat.badgen.net/npm/v/gh.midi)](https://www.npmjs.com/package/gh.midi)

Download a midi file of your github contributions.


## Installation

Using NPM:
    $ npm install gh.midi

Using the webservice API:
    https://ghmidi.now.sh/api/[USERNAME]

Using the website interface
    https://ghmidi.now.sh/


### CLI

A [CLI version](https://github.com/GMartigny/gh.midi-cli) is also available for this package.


## Usage

Once installed using NPM, you can require it on your node scripts:
```js
const GHMidi = require("gh.midi");
const midiBytes = GHMidi("[USERNAME]", options);
```


### Options

#### Days
Number of days from today to include. [default `365`]

#### Chords
Set of 4 chords to use in ascending order. [default: `["C", "F", "G", "Am"]`]


## License
[MIT](license)
