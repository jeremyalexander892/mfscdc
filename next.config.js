const withPlugins = require('next-compose-plugins');
const withVideos = require('next-videos');

module.exports = withPlugins([
    withVideos
], {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        return config;
    },
    future: {
        webpack5: true
    },
})
