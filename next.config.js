const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([], {
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
