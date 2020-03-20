const scribbleTune = require("scribbletune");
const { fetchData, filterContributions, makeNotes, makePattern } = require("./src/utils");

/**
 * @typedef {Object} Options
 * @prop {Number} [days=365] - Number of days of contributions
 * @prop {Array<String>} [chords=["C", "F", "G", "Am"]] - Chords to use in ascending order (Should have at least 4 items)
 */
/**
 * Get contributions data from Github and return a promise for a MIDI file as bytes.
 * @param {String} username - Github username
 * @param {Options} [options] - Configuration
 * @return {Promise<Blob>}
 */
module.exports = async (username, { days = 365, chords = ["C", "F", "G", "Am"] } = {}) => {
    const data = await fetchData(username);
    const contributions = filterContributions(data.contributions.reverse(), days);

    if (!contributions.length) {
        throw new RangeError(`No contributions found for ${username} on the last ${days} days.`);
    }

    const notes = makeNotes(contributions, chords);
    const pattern = makePattern(contributions);
    const clip = scribbleTune.clip({
        notes,
        pattern,
    });

    return scribbleTune.midi(clip, null);
};
