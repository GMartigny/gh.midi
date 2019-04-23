/* eslint-disable no-console */
const { writeFileSync } = require("fs");
const GHmidi = require("./index");

const run = async (username) => {
    if (!username) {
        console.warn("Username required");
        return;
    }

    try {
        const bytes = await GHmidi(username);
        const fileName = `${username}.mid`;
        writeFileSync(fileName, bytes, "binary");
        console.log(`Done writing ${fileName}.`);
    }
    catch (error) {
        console.error(error);
    }
};

run(process.argv[2]);
