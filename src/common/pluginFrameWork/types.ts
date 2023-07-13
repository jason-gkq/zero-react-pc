export interface pluginConfig {
  config: pluginRouteConfig;
  loaderType?: string;
}
export interface pluginRouteConfig extends ModulePlugin {
  path: string;
}
export interface ModulePlugin {
  scope: string;
  url: string;
  module: string;
}
