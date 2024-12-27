sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"],
  function (e, t) {
    "use strict";
    return e.extend("app.DzyOtomat.controller.BaseController", {
      getRouter: function () {
        return this.getOwnerComponent().getRouter();
      },
      getModel: function (e) {
        return this.getView().getModel(e);
      },
      setModel: function (e, t) {
        return this.getView().setModel(e, t);
      },
      getResourceBundle: function () {
        return this.getOwnerComponent().getModel("i18n").getResourceBundle();
      },
    });
  }
);
