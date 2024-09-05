// jest.config.js
module.exports = {
    testEnvironment: 'jsdom', // For React frontend testing
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  };
  