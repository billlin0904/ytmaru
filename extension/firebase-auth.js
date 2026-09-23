/* Compatibility filename: authentication now uses Textamisu API tokens only. */
(() => {
  "use strict";
  globalThis.TextamisuAuth = Object.freeze({
    async status() {
      const config = await globalThis.TextamisuApi.getConfig();
      return { configured: Boolean(config.token), baseUrl: config.baseUrl };
    },
    save: input => globalThis.TextamisuApi.saveConfig(input),
    clear: () => globalThis.TextamisuApi.clearToken(),
  });
})();
