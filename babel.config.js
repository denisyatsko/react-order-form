module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'styled-components',
    '@babel/plugin-syntax-dynamic-import',
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
  ],
  env: {
    production: {
      only: ['app'],
      plugins: [
        'lodash',
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
      ],
    },
  },
};

// module.exports = api => {
//     const env = api.env();

//     api.cache.using(() => env === 'development');

//     const plugins = [
//         // Included until Node v.10 release (async generators)
//         '@babel/plugin-proposal-async-generator-functions',
//         '@babel/plugin-proposal-class-properties',
//         'dynamic-import-node',
//     ];

//     return {
//         presets: [
//             [
//                 '@babel/preset-env',
//                 {
//                     useBuiltIns: 'usage',
//                     shippedProposals: true,
//                     spec: true,
//                     loose: false,
//                     debug: false,
//                     targets: {
//                         node: 'current',
//                     },
//                 },
//             ],
//         ],
//         plugins,
//     };
// };
