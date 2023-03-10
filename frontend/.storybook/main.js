module.exports = {
  stories: [
    '../**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
  ],
  framework: '@storybook/vue3',
  core: {
    'builder': '@storybook/builder-vite',
  },
  async viteFinal (config) {
    // Merge custom configuration into the default config
    return {
      ...config,
      build: {
        sourcemap: false,
      },
    };
  },
  features: {
    'storyStoreV7': true,
  },
};
