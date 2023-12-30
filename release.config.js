module.exports = {
    branches: ["main"],
    plugins: [
        [
            "@semantic-release/commit-analyzer",
            {
                preset: "conventionalcommits",
            },
        ],

        [
            "@semantic-release/release-notes-generator",
            {
                preset: "conventionalcommits",
            },
        ],
        [
            "@semantic-release/changelog",
            {
                changelogFile: "CHANGELOG.md",
            },
        ],
        [
            "@semantic-release/npm",
            {
                tarballDir: "pack",
            },
        ],
        [
            "@semantic-release/github",
            {
                assets: "pack/*.tgz",
            },
        ],
        "@semantic-release/git",
    ],
};
