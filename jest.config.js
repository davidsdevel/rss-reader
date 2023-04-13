const nextJest = require('next/jest');

const nextJestConfig = nextJest({
	dir: './'
});

const customJestConfig = {
	moduleDirectories: ['node_modules', '<rootDir>/'],
	testEnvironment: '<rootDir>/lib/customJestEnv.js'
}

module.exports = nextJestConfig(customJestConfig);
