const path = require('path');
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "" : "/",
    outputDir: process.env.NODE_ENV === "production" ? "dist" : "devDist",
    lintOnSave: true,
    chainWebpack: config => {
        config.module.rules.delete('svg');
        config.module.rule('svg-sprite-loader').test(/\.svg$/)
            .include.add(path.resolve('./src/icons')).end()
            .use('svg-sprite-loader').loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            });
    },
    productionSourceMap: false,
    css: {
        extract: true,
        sourceMap: false,
        loaderOptions: {
            sass: {
                prependData: '@import "./src/styles/main.scss";',
            },
        },
        requireModuleExtension: false,
    },
    parallel: require("os").cpus().length > 1,
    pwa: {},
    devServer: {
        open: false,
        host: "0.0.0.0",
        port: "80",
        https: false,
        hot: true,
        hotOnly: false,
        proxy: {
            "/api": {
                target: "http://localhost:8089/srm",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
        overlay: {
            warnings: true,
            errors: true,
        },
        //before:app=>{},
    },
    pluginOptions: {},
};
