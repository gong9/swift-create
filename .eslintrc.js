module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/eslint'), 'antfu'],
  rules: {
    "no-tabs": "off",
    "no-console": "off",
    "no-mixed-spaces-and-tabs": "off"
  }
};