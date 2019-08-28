module.exports = {
	env: {
		browser: true,
		es6: true,
		"jest/globals": true
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"prettier",
		"prettier/react"
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: "module"
	},
	plugins: ["react", "jest", "prettier"]
}
