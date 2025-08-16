// jest.config.js
export default {
    testEnvironment: 'jsdom',
    // This line is now fixed
    setupFilesAfterEnv: ['./tests/setup.js'],
};