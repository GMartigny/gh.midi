# gh.midi
[![NPM version](https://flat.badgen.net/npm/v/gh.midi)](https://www.npmjs.com/package/gh.midi)
[![NPM weekly download](https://flat.badgen.net/npm/dw/gh.midi)](https://www.npmjs.com/package/gh.midi)
[![package publish size](https://flat.badgen.net/packagephobia/publish/gh.midi)](https://packagephobia.now.sh/result?p=gh.midi)
[![Support me on Patreon](https://flat.badgen.net/badge/become/a%20patron/F96753?icon=patreon)](https://www.patreon.com/gmartigny)

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
