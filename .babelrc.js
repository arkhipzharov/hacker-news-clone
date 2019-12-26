module.exports = {
  env: {
    test: {
      plugins: ['require-context-hook'],
      presets: [
        [
          '@babel/preset-env',
          // for jest performance
          { targets: { node: 'current' } },
        ],
        // for jest to understand typescript because babel-jest is used
        '@babel/preset-typescript',
      ],
    },
  },
};
