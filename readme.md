# gh.midi

Download a midi file of your github contributions.

## Install

Using NPM:
    $ npm install gh.midi

Using the webservice API:
    https://ghmidi.now.sh/api/[USERNAME]

Using the website interface
    https://ghmidi.now.sh/

## Usage

Once installed using NPM, you can use it as CLI:
    $ gh.midi [USERNAME]

Or require it on your node scripts:
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
