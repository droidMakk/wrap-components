const {aliases, scssAliases, onwarn} = require("../webpack.parts");
const merge = require('webpack-merge');
const {CheckerPlugin} = require('awesome-typescript-loader');


module.exports = ({config, mode}) => {
    // console.dir(config, { depth: null });
    let mergedConfig = merge.smart(config, {
        module:
            {
                rules: [
                    {
                        test: /\.(svelte|html)$/,
                        loader: 'svelte-loader',
                        options: {
                            onwarn: onwarn,
                            preprocess: require('svelte-preprocess')({
                                scss: {
                                    importer: [
                                        scssAliases(aliases),
                                    ],
                                }
                            })
                        }
                    },
                ]
            },
    });
    mergedConfig.resolve.alias = {...mergedConfig.resolve.alias, ...aliases};
    mergedConfig.plugins.push(new CheckerPlugin());
    //console.dir(mergedConfig, {depth: null});
    return mergedConfig;
};
