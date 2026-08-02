const { getConfig } = require("./configLoader");

function getSettings() {
  const config = getConfig().gatewayConfig;

  return {
    ...config,
    providers: config.providers.map((provider) => ({
      name: provider.name,
      base_url: provider.base_url,
    })),
  };
}

module.exports = {
  getSettings,
};