const { parse } = require("url");
const GHmidi = require("./index");

module.exports = (request, response) => {
    const { username } = parse(request.url, true).query;

    if (!username) {
        response.end("Username required");
        return;
    }

    GHmidi(username).then((bytes) => {
        response.setHeader("Content-Type", "audio/midi");
        response.setHeader("Content-Disposition", `attachment;filename=${username}.mid`);
        response.write(Buffer.from(bytes, "binary"));
    }).catch((error) => {
        response.write(error.stack);
    }).then(() => {
        response.end();
    });
};
