sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","app/DzyOtomat/model/models","sap/ui/model/json/JSONModel"],function(e,t,o,a){"use strict";return e.extend("app.DzyOtomat.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.setModel(new a,"oGlobalModel");this.getModel("oGlobalModel").setData({sessionImageUpload:false});this.getRouter().initialize();this.setModel(o.createDeviceModel(),"device");debugger;var t=function(e){e.preventDefault();return e.returnValue};addEventListener("beforeunload",t,{capture:true})}})});