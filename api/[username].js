const allow = require("allow-cors");
const GHMidi = require("..");

module.exports = async (request, response) => {
    const { username } = request.query;

    allow(response);

    if (!username) {
        response.statusCode = 500;
        response.end("Username required");
        return;
    }

    try {
        const bytes = await GHMidi(username);

        response.statusCode = 200;
        response.setHeader("Content-Type", "audio/midi");
        response.setHeader("Content-Disposition", `attachment;filename=${username}.midi`);
        response.write(Buffer.from(bytes, "binary"));
    }
    catch ({ message }) {
        response.statusCode = 500;
        response.write(message);
    }

    response.end();
};
