const got = require("got");

const API_URL = "https://github-contributions-api.now.sh/v1";

const fetchData = async username => (await got(`${API_URL}/${username}`, {
    json: true,
})).body;

const filterContributions = (data, days) => {
    const to = Date.now();
    const from = to - (days * 24 * 3600 * 1000);
    return data.filter((contribution) => {
        const time = new Date(contribution.date).getTime();
        return time > from && time < to;
    });
};

const makeNotes = (data, chords) => {
    if (chords.length < 4) {
        throw new RangeError(`Required at least 4 chords but only found ${chords.length} (${chords}).`);
    }

    return data.filter(point => point.intensity > 0).map(point => chords[point.intensity - 1]);
};

const makePattern = data => data.map(point => (point.intensity > 0 ? "x" : "-")).join("");

module.exports = {
    fetchData,
    filterContributions,
    makeNotes,
    makePattern,
};
