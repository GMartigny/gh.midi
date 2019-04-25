const got = require("got");

const API_URL = "https://github-contributions-api.now.sh/v1";

/**
 * Gather contributions data from Github
 * @param {String} username - Github username
 * @return {Promise<Object>}
 */
const fetchData = async username => (await got(`${API_URL}/${username}`, {
    json: true,
})).body;

/**
 * Keep contributions point inside a time span
 * @param {Array} data - Array of contributions
 * @param {Number} days - Number of days from now to keep
 * @return {Array}
 */
const filterContributions = (data, days) => {
    const to = Date.now();
    const from = to - (days * 24 * 3600 * 1000);
    return data.filter((contribution) => {
        const time = new Date(contribution.date).getTime();
        return time > from && time < to;
    });
};

/**
 * Create the notes order based on the contributions "intensity"
 * @param {Array} data -
 * @param {Array<String>} chords - Cords to use in ascending order (Should have at least 4 items)
 * @return {*}
 */
const makeNotes = (data, chords) => {
    if (chords.length < 4) {
        throw new RangeError(`Required at least 4 chords but only found ${chords.length} (${chords}).`);
    }

    return data.filter((point, i) => point.intensity > 0 &&
            ((i > 0 && data[i - 1].intensity !== point.intensity) || i === 0))
        .map(point => chords[point.intensity - 1]);
};

/**
 * Create pattern of notes from contributions
 * @param {Array} data - Array of contributions with "intensity" value
 * @return {String}
 */
const makePattern = data => data.map((point, i) => ((point.intensity <= 0 && "-") ||
        (i > 0 && data[i - 1].intensity === point.intensity && "_") ||
    "x")).join("").replace(/^-|-$/, "");

module.exports = {
    fetchData,
    filterContributions,
    makeNotes,
    makePattern,
};
