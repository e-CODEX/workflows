module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'body-max-line-length': [0, 'always', 0], // Disable line length rule fro Dependabot
    },
  };
  