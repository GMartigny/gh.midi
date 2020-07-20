const test = require("ava");
const utils = require("./src/utils");
const GHmidi = require(".");

test("main file", async (t) => {
    const result = await GHmidi("GMartigny");
    t.true(result.length > 0);
    await t.throwsAsync(() => GHmidi("github"));
});

test("fetch data", async (t) => {
    const data = await utils.fetchData("GMartigny");
    t.true(data.contributions.length > 0);
});

test("filter data", (t) => {
    const now = new Date(Date.now() - (24 * 3600 * 1000));
    const contributions = [
        {
            date: `${now.getFullYear() - 3}-${now.getMonth() + 1}-${now.getDate()}`,
        },
        {
            date: `${now.getFullYear() - 1}-${now.getMonth() + 1}-${now.getDate()}`,
        },
        {
            date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        },
        {
            date: `${now.getFullYear() + 1}-${now.getMonth() + 1}-${now.getDate()}`,
        },
    ];
    const filtered = utils.filterContributions(contributions, 368);
    t.is(filtered.length, 2);
});

test("make notes", (t) => {
    const data = [
        {
            intensity: 0,
        },
        {
            intensity: 1,
        },
        {
            intensity: 3,
        },
        {
            intensity: 1,
        },
        {
            intensity: 1,
        },
        {
            intensity: 1,
        },
        {
            intensity: 0,
        },
        {
            intensity: 0,
        },
        {
            intensity: 2,
        },
    ];
    const notes = utils.makeNotes(data, ["a", "b", "c", "d"]);
    t.deepEqual(notes, ["a", "c", "a", "b"]);
    t.throws(() => utils.makeNotes(data, ["a", "b", "c"]), {
        instanceOf: RangeError,
    });
});

test("make pattern", (t) => {
    const data = [
        {
            intensity: 0,
        },
        {
            intensity: 1,
        },
        {
            intensity: 3,
        },
        {
            intensity: 1,
        },
        {
            intensity: 1,
        },
        {
            intensity: 1,
        },
        {
            intensity: 0,
        },
        {
            intensity: 0,
        },
        {
            intensity: 2,
        },
    ];
    const pattern = utils.makePattern(data);
    t.is(pattern, "xxx__--x");
});
