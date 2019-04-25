/* globals Soundfont MidiPlayer */

class Player {
    /**
     * Player constructor
     * @param {String} [instrumentName="electric_grand_piano"] - Instrument name to use
     */
    constructor (instrumentName = "electric_grand_piano") {
        this.audioContext = new AudioContext();
        const instrumentURL = `//cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/${instrumentName}-mp3.js`;
        this.instrument = Soundfont.instrument(this.audioContext, instrumentURL);

        this.MidiPlayer = new MidiPlayer.Player(event => this.onEvent(event));
        this.MidiPlayer.setTempo(180);

        this.controls = this.buildControls();
    }

    onEvent (event) {
        if (event.name === "Note on" && event.velocity > 0) {
            this.instrument.then(instrument => instrument.play(event.noteName, this.audioContext.currentTime, {
                gain: event.velocity / 100,
            }));
        }
    }

    start (blob) {
        this.MidiPlayer.stop();
        this.audioContext.resume();

        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.addEventListener("load", () => {
            this.instrument.then(() => {
                this.MidiPlayer.loadArrayBuffer(reader.result);
            });
        });
    }

    buildControls () {
        const wrapper = document.createElement("div");
        wrapper.className = "player";

        const playButton = document.createElement("button");
        playButton.className = "play";
        playButton.addEventListener("click", () => this.play());
        wrapper.appendChild(playButton);

        const pauseButton = document.createElement("button");
        pauseButton.className = "pause";
        pauseButton.addEventListener("click", () => this.pause());
        wrapper.appendChild(pauseButton);

        return wrapper;
    }

    play () {
        try {
            this.MidiPlayer.play();
        }
        catch (error) {
        }
    }

    pause () {
        try {
            this.MidiPlayer.pause();
        }
        catch (error) {
        }
    }
}
