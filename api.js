const { parse } = require("url");
const GHMidi = require("./index");

module.exports = (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { username, days, chordsStr } = parse(request.url, true).query;
    const chords = chordsStr && chordsStr.split(",");

    if (!username) {
        response.statusCode = 500;
        response.end("Username required");
        return;
    }

    GHMidi(username, {
        days,
        chords,
    }).then((bytes) => {
        response.statusCode = 200;
        response.setHeader("Content-Type", "audio/midi");
        response.setHeader("Content-Disposition", `attachment;filename=${username}.mid`);
        response.write(Buffer.from(bytes, "binary"));
    }).catch((error) => {
        response.statusCode = 500;
        response.write(error.message);
    }).then(() => {
        response.end();
    });
};
