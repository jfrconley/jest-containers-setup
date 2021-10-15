module.exports = {
    preset: './jest-preset',
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "\\.(test|spec)\\.(ts|tsx|js)$",
    testEnvironment: 'node',
    globals: {
        "ts-jest": {
            diagnostics: false,
            isolatedModules: true,
        }
    }
}
