const path = require('path');

module.exports = {
    globalSetup: require.resolve('./dist/setup'),
    globalTeardown: require.resolve('@trendyol/jest-testcontainers/dist/teardown'),
    // testEnvironment: require.resolve('./dist/environment')
}
