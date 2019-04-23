const scribbleTune = require("scribbletune");
const { fetchData, filterContributions, makeNotes, makePattern } = require("./src/utils");

module.exports = async (username, days = 365, chords = ["C", "F", "G", "Am"]) => {
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

    return new Promise(resolve => scribbleTune.midi(clip, null, (err, bytes) => resolve(bytes)));
};
