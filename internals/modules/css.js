const path = require('path');
const env = require('postcss-preset-env');
const imports = require('postcss-import');
const postcssCustomMedia = require('postcss-custom-media');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const postcssCustomProperties = require('postcss-custom-properties');

const loadPostCss = (
  { sourceMap, minimize } = { sourceMap: false, minimize: false },
) => {
  const plugins = [
    imports({
      getPath: path.join(process.cwd(), './app'), // Start with js/app.js
      skipDuplicates: true,
    }),
  ];

  if (minimize) {
    plugins.push(cssnano({ preset: ['default', { normalizeUrl: false }] }));
  }

  return {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: loader => [
        ...plugins,
        env({
          stage: 0,
        }),
        autoprefixer(),
        postcssCustomMedia(),
        postcssCustomProperties({
          importFrom: path.join(process.cwd(), 'app/theme/vars.css'),
        }),
      ],
      sourceMap,
    },
  };
};

module.exports = loadPostCss;
