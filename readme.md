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
const midiBytes = GHMidi("[USERNAME]");

```
