module.exports = {
  stories: [
    "../**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  framework: "@storybook/vue3",
  core: {
    "builder": "@storybook/builder-vite"
  },
  features: {
    "storyStoreV7": true
  }
}
