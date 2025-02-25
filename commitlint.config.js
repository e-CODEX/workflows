module.exports = {
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'Bugfix',
                'CI',
                'Cleanup',
                'Dependencies',
                'Documentation',
                'Refactor',
                'Security',
                'Tests',
                'Feature',
                'Chore',
            ]
        ],
        'type-case': [2, 'always', 'pascal-case'], // Enforce uppercase first letter
        'subject-case': [2, 'always', 'sentence-case'], // Ensure subject starts with uppercase
        'header-max-length': [2, 'always', 72],
        'body-max-line-length': [0, 'always', 0], // Disable line length rule fro Dependabot
    }
};
