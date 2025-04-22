import { rm } from "fs/promises";
import { join } from "path";

// This function will be executed before any test across the test files
global.beforeEach(async () => {
    // find test.sqlite file and delete it
    try {
        await rm(join(__dirname, '..', 'test.sqlite'))
    } catch (error) {
        // if error occurs becuase the file does not exist, no problem
        // we don't need to do anything
    }
})

