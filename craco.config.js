const { ESLINT_MODES } = require('@craco/craco');
const CracoAlias = require('craco-alias');

module.exports = {
  eslint: {
    mode: ESLINT_MODES,
  },
  style: {
    postcss: {
      plugins: [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
          preserve: true,
          features: {
            'color-mod-function': { unresolved: 'ignore' },
            'custom-media-queries': { unresolved: 'warn' },
          },
        }),
      ],
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.path.json',
      },
    },
  ],
};
