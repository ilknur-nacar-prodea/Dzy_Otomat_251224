sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/m/library", "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator", "../model/formatter", "sap/ui/core/UIComponent", "sap/ui/core/BusyIndicator", "sap/m/MessageToast"
], function (e, t, i, s, a, r, n, l, o) {
	"use strict";
	var u = false;
	var g;
	var m = {
		Matnr: "",
		Maktx: "",
		SayimMktr: "",
		SayimBrm: ""
	};
	var h;
	var p, d;
	var y;
	var M;
	return e.extend("app.DzyOtomat.controller.Counting", {
		formatter: r,
		onInit: function () {
			var e = new t;
			this.getView().setModel(e, "sayimmalzemeListModel");
			this.getView().getModel("sayimmalzemeListModel").setProperty("/malzemeList", []);
			y = "";
			M = "";
			var i = n.getRouterFor(this);
			i.getRoute("Counting").attachMatched(this._onObjectMatchedDetail, this)
		},
		_onObjectMatchedDetail: function (e) {
			this.getView().getModel("sayimmalzemeListModel").setProperty("/malzemeList", []);
			var t = e.getParameter("arguments");
			p = t.trip;
			d = t.plate;
			this.selectCountingType()
		},
		selectCountingType: function (e) {
			debugger;
			var t = this.getView();
			if (!this._helpSayimTSec) {
				this._helpSayimTSec = sap.ui.xmlfragment("app.DzyOtomat.view.fragments.sayim.SayimTuru", this);
				t.addDependent(this._helpSayimTSec);
				this._helpSayimTSec.open()
			} else {
				t.addDependent(this._helpSayimTSec);
				this._helpSayimTSec.open()
			}
		},
		onCloseCountingType: function (e) {
			M = "";
			y = "";
			debugger;
			this._helpSayimTSec.close();
			this.onNavBack()
		},
		onAracSayimKaydet: function (e) {
			M = "X";
			this.selectVehiclePlate()
		},
		onOtomatSayimKaydet: function (e) {
			y = "X";
			this.selectAutomat()
		},
		selectVehiclePlate: function (e) {
			var t = this.getView();
			if (!this._helpVehiclePlate) {
				this._helpVehiclePlate = sap.ui.xmlfragment("app.DzyOtomat.view.fragments.sayim.AracPlakaList", this);
				t.addDependent(this._helpVehiclePlate);
				this._helpVehiclePlate.open()
			} else {
				t.addDependent(this._helpVehiclePlate);
				this._helpVehiclePlate.open()
			}
		},
		onCloseVehiclePlate: function (e) {
			this._helpVehiclePlate.destroy();
			this._helpVehiclePlate = undefined
		},
		onConfirmVehiclePlate: function (e) {
			var t = e.getParameter("selectedContexts");
			var i = t[0].getProperty("Zzvehicle");
			this.byId("CountingTypeId").setText(i);
			this.byId("CountingType").setText("V");
			var s = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("CreateCounting") + "-" + this.getOwnerComponent().getModel(
				"i18n").getResourceBundle().getText("VehicleCountingType") + "-" + i;
			this.byId("CountingPage").setTitle(s);
			this._helpSayimTSec.close();
			var that = this;
			var dataModel = this.getOwnerComponent().getModel("ARAC");
			var filters = [];
			var CountingType = "A";
			var WarehouseNum = i;
			filters.push(new sap.ui.model.Filter("CountingType", sap.ui.model.FilterOperator.EQ, CountingType));
			filters.push(new sap.ui.model.Filter("WarehouseNum", sap.ui.model.FilterOperator.EQ, WarehouseNum));
			var countingList = [];
			dataModel.read("/SayimListSet", {
				filters: filters,
				success: function (data, response) {
					var List = [];
					data.results.forEach(function (k) {
						List.push({
							CountingType: k.CountingType,
							WarehouseNum: k.WarehouseNum,
							Matnr: k.Matnr,
							CountingAmount: k.CountingAmount,
							CountingUnit: k.CountingUnit
						});
					});
					that.getView().getModel("sayimmalzemeListModel").setProperty("/malzemeList", List);

					sap.ui.core.BusyIndicator.hide()
				},
				error: function (e) {
					sap.ui.core.BusyIndicator.hide()
				}
			})

			this.byId("CountingPage").setVisible(true)
		},
		onSearchVehiclePlate: function (e) {
			var t = e.getParameter("value");
			var i = [new s({
				filters: [new s("Zzvehicle", a.Contains, t)]
			})];
			var r = sap.ui.getCore().byId("VehiclePlateTableId4");
			var n = r.getBinding("items");
			n.filter(i)
		},
		selectAutomat: function (e) {
			var t = this.getView();
			if (!this._helpAutomatList) {
				this._helpAutomatList = sap.ui.xmlfragment("app.DzyOtomat.view.fragments.sayim.OtomatList", this);
				t.addDependent(this._helpAutomatList);
				this._helpAutomatList.open()
			} else {
				t.addDependent(this._helpAutomatList);
				this._helpAutomatList.open()
			}
		},
		onCloseAutomatList: function (e) {
			this._helpAutomatList.destroy();
			this._helpAutomatList = undefined
		},
		onConfirmAutomatList: function (e) {
			var t = e.getParameter("selectedContexts");
			var i = t[0].getProperty("ZztripVendmac");
			this.byId("CountingTypeId").setText(i);
			this.byId("CountingType").setText("A");
			var s = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("CreateCounting") + "-" + this.getOwnerComponent().getModel(
				"i18n").getResourceBundle().getText("AutomatCountingType") + "-" + i;
			this.byId("CountingPage").setTitle(s);
			this._helpSayimTSec.close();
			var that = this;
			var dataModel = this.getOwnerComponent().getModel("ARAC");
			var filters = [];
			var CountingType = "A";
			var WarehouseNum = i;
			filters.push(new sap.ui.model.Filter("CountingType", sap.ui.model.FilterOperator.EQ, CountingType));
			filters.push(new sap.ui.model.Filter("WarehouseNum", sap.ui.model.FilterOperator.EQ, WarehouseNum));
			var countingList = [];
			dataModel.read("/SayimListSet", {
				filters: filters,
				success: function (data, response) {
					var List = [];
					data.results.forEach(function (k) {
						List.push({
							CountingType: k.CountingType,
							WarehouseNum: k.WarehouseNum,
							Matnr: k.Matnr,
							CountingAmount: k.CountingAmount,
							CountingUnit: k.CountingUnit
						});
					});
					that.getView().getModel("sayimmalzemeListModel").setProperty("/malzemeList", List);

					sap.ui.core.BusyIndicator.hide()
				},
				error: function (e) {
					sap.ui.core.BusyIndicator.hide()
				}
			})

			this.byId("CountingPage").setVisible(true)
		},
		onSearchAutomatList: function (e) {
			var t = e.getParameter("value");
			var i = [new s({
				filters: [new s("ZztripVendmac", a.Contains, t)]
			})];
			var r = sap.ui.getCore().byId("AutomatListTableId4");
			var n = r.getBinding("items");
			n.filter(i)
		},
		onNavBack: function () {
			this.getView().getModel("sayimmalzemeListModel").setProperty("/malzemeList", []);
			this.byId("CountingTypeId").setText("");
			this.byId("CountingType").setText("");
			this.byId("CountingPage").setTitle("");
			var e = this.getOwnerComponent().getRouter();
			e.navTo("Trips", {
				trip: p,
				ino: d
			})
		},
		urunEklePress: function (e) {
			var t = this.getView();
			if (!this._helpUrunEkle) {
				this._helpUrunEkle = sap.ui.xmlfragment("app.DzyOtomat.view.fragments.sayim.UrunEkle", this);
				t.addDependent(this._helpUrunEkle);
				this._helpUrunEkle.open()
			} else {
				t.addDependent(this._helpUrunEkle);
				this._helpUrunEkle.open()
			}
		},
		onKapatUrunEkle: function () {
			this.refreshUrunEkleFrg();
			this._helpUrunEkle.close()
		},
		tumunuSilPress: function (e) {
			this.getView().getModel("sayimmalzemeListModel").setData({
				malzemeList: []
			})
		},
		onUEkleMlzNo: function (e) {
			var t = this.getView();
			if (!this._helpMlzList) {
				this._helpMlzList = sap.ui.xmlfragment("app.DzyOtomat.view.fragments.sayim.MlzList", this);
				t.addDependent(this._helpMlzList);
				this._helpMlzList.open()
			} else {
				t.addDependent(this._helpMlzList);
				this._helpMlzList.open()
			}
		},
		CloseMlzList: function () {
			this._helpMlzList.destroy();
			this._helpMlzList = undefined;
			this._helpMlzList.close()
		},
		ConfirmMlzEkle: function (e) {
			var t = e.getParameter("selectedContexts");
			var i = t[0].getProperty("Matnr");
			sap.ui.getCore().byId("UEkleMlzNo4").setValue(i);
			var s = t[0].getProperty("Maktx");
			sap.ui.getCore().byId("UEkleMlzAck4").setText(s);
			var a = t[0].getProperty("DepoStkMktrBrm");
			a = a.split(" ")[1];
			sap.ui.getCore().byId("UEkleSayimBrm4").setText(a);
			this._helpMlzList.destroy();
			this._helpMlzList = undefined
		},
		searchMlz: function (e) {
			var t = e.getParameter("value");
			var i = [new s({
				filters: [new s("Matnr", a.Contains, t)]
			})];
			var r = sap.ui.getCore().byId("MlzListTableId4");
			var n = r.getBinding("items");
			n.filter(i)
		},
		onKaydetUrunEkle: function (e) {
			var t = this;
			if (sap.ui.getCore().byId("UEkleSayimMik4").getValue() === "" || sap.ui.getCore().byId("UEkleMlzNo4").getValue() === "") {
				sap.m.MessageBox.error("T�m zorunlu alanlar� doldurunuz")
			} else {
				m = {
					Matnr: sap.ui.getCore().byId("UEkleMlzNo4").getValue(),
					Maktx: sap.ui.getCore().byId("UEkleMlzAck4").getText(),
					SayimMktr: sap.ui.getCore().byId("UEkleSayimMik4").getValue(),
					SayimBrm: sap.ui.getCore().byId("UEkleSayimBrm4").getText()
				};
				var i = this.getView().getModel("sayimmalzemeListModel").getProperty("/malzemeList");
				var s = i.filter(function (e, t) {
					return e.Matnr === sap.ui.getCore().byId("UEkleMlzNo4").getValue()
				});
				if (s.length >= 1) {
					o.show(t.getOwnerComponent().getModel("i18n").getResourceBundle().getText("MaterialJustAdded"))
				} else {
					i.push(m);
					this.getView().getModel("sayimmalzemeListModel").setProperty("/malzemeList", i);
					this.refreshUrunEkleFrg();
					this._helpUrunEkle.close()
				}
			}
		},
		removeFrmTable: function (e) {
			var t = this.getView().getModel("sayimmalzemeListModel").getProperty("/malzemeList");
			var i = e.oSource.oPropagatedProperties.oBindingContexts.sayimmalzemeListModel.sPath.slice(13);
			t.splice(i, 1);
			this.getView().getModel("sayimmalzemeListModel").setProperty("/malzemeList", t);
			u = true;
			this.onPressItem()
		},
		onPressItem: function (e) {
			debugger;
			if (!u) {
				var t = this.getView().getModel("sayimmalzemeListModel").getProperty("/malzemeList");
				var i = e.getSource().oBindingContexts.sayimmalzemeListModel.sPath.slice(13);
				var s = t[i];
				var a = this;
				var r = a.getView();
				var n = "";
				if (!this._helpUrunDuzenle) {
					this._helpUrunDuzenle = sap.ui.xmlfragment("app.DzyOtomat.view.fragments.sayim.UrunDuzenle", this);
					r.addDependent(this._helpUrunDuzenle);
					this._helpUrunDuzenle.open();
					sap.ui.getCore().byId("UEkleMlzNoDzn4").setText(s.Matnr);
					sap.ui.getCore().byId("UEkleMlzAckDzn4").setText(s.Maktx);
					if (s.SayimMktr.split(".")[1] === "000") {
						s.SayimMktr = s.SayimMktr.split(".")[0]
					} else {
						n = s.SayimMktr.split(".")[1];
						if (n === undefined) {
							s.SayimMktr = s.SayimMktr.split(".")[0]
						} else {
							s.SayimMktr = s.SayimMktr.split(".")[0] + "," + n
						}
					}
					sap.ui.getCore().byId("UEkleSayimMikDzn4").setValue(s.SayimMktr);
					sap.ui.getCore().byId("UEkleSayimBrmDzn4").setText(s.SayimBrm)
				} else {
					r.addDependent(this._helpUrunDuzenle);
					this._helpUrunDuzenle.open();
					sap.ui.getCore().byId("UEkleMlzNoDzn4").setText(s.Matnr);
					sap.ui.getCore().byId("UEkleMlzAckDzn4").setText(s.Maktx);
					if (s.SayimMktr.split(".")[1] === "000") {
						s.SayimMktr = s.SayimMktr.split(".")[0]
					} else {
						n = s.SayimMktr.split(".")[1];
						if (n === undefined) {
							s.SayimMktr = s.SayimMktr.split(".")[0]
						} else {
							s.SayimMktr = s.SayimMktr.split(".")[0] + "," + n
						}
					}
					sap.ui.getCore().byId("UEkleSayimMikDzn4").setValue(s.SayimMktr);
					sap.ui.getCore().byId("UEkleSayimBrmDzn4").setText(s.SayimBrm)
				}
			}
			u = false
		},
		onKaydetUrunDzn: function (e) {
			var t;
			if (sap.ui.getCore().byId("UEkleSayimMikDzn4").getValue() === "" || sap.ui.getCore().byId("UEkleMlzNoDzn4").getText() === "") {
				sap.m.MessageBox.error("T�m zorunlu alanlar� doldurunuz")
			} else {
				var i = sap.ui.getCore().byId("UEkleMlzNoDzn4").getText();
				var s = this.getView().getModel("sayimmalzemeListModel").getProperty("/malzemeList");
				var a = s.filter(function (e, s) {
					if (e.Matnr === i) {
						t = s
					}
					return e.Matnr === i
				});
				a[0].SayimMktr = sap.ui.getCore().byId("UEkleSayimMikDzn4").getValue();
				s.splice(t, 1, a[0]);
				this.getView().getModel("sayimmalzemeListModel").setProperty("/malzemeList", s);
				this.refreshUrunDuzenleFrg();
				this._helpUrunDuzenle.close()
			}
		},
		onKapatUrunDzn: function () {
			this.refreshUrunDuzenleFrg();
			this._helpUrunDuzenle.close()
		},
		refreshUrunDuzenleFrg: function (e) {
			sap.ui.getCore().byId("UEkleMlzNoDzn4").setText("");
			sap.ui.getCore().byId("UEkleMlzAckDzn4").setText("");
			sap.ui.getCore().byId("UEkleSayimMikDzn4").setValue("");
			sap.ui.getCore().byId("UEkleSayimBrmDzn4").setText("")
		},
		refreshUrunEkleFrg: function (e) {
			sap.ui.getCore().byId("UEkleMlzNo4").setValue("");
			sap.ui.getCore().byId("UEkleMlzAck4").setText("");
			sap.ui.getCore().byId("UEkleSayimMik4").setValue("");
			sap.ui.getCore().byId("UEkleSayimBrm4").setText("")
		},
		kaydetPress: function (e) {
			debugger;
			var t = this;
			var i = this.getView().getModel("sayimmalzemeListModel").getProperty("/malzemeList");
			var s = [];
			var a = this.byId("CountingType").getText();
			var r = this.byId("CountingTypeId").getText();
			i.forEach(function (e) {
				s.push({
					CountingType: a,
					WarehouseNum: r,
					Matnr: e.Matnr,
					CountingAmount: e.SayimMktr,
					CountingUnit: e.SayimBrm
				})
			});
			var n = JSON.stringify(s);
			var o = this.getView().getModel("ARAC");
			l.show();
			o.callFunction("/SayimKaydetFI", {
				method: "GET",
				urlParameters: {
					ivcountingvalues: n
				},
				success: function (e, i) {
					debugger;
					l.hide();
					var s = e.results.filter(function (e, t) {
						return e.Type === "S"
					});
					if (s.length >= 1) {
						t.getView().getModel("sayimmalzemeListModel").setProperty("/malzemeList", [])
					}
					t.showMessages(e).then(t.showMessages(e))
				},
				error: function (e) {
					debugger;
					sap.m.MessageBox.error(e.responseText);
					l.hide()
				}
			})
		},
		showMessages: function (e) {
			debugger;
			var t = this;
			var i = [];
			var s = e.results;
			for (var a = 0; a < s.length; a++) {
				var r = s[a];
				var n = {
					MessageType: r.Type,
					Message: r.Message
				};
				i.push(n)
			}
			g = new sap.ui.model.json.JSONModel;
			this.getView().setModel(g, "oMsgModel");
			this.getView().getModel("oMsgModel").setData(i);
			if (!this.oMessage) {
				this.oMessage = sap.ui.xmlfragment("app.DzyOtomat.view.fragments.sayim.Messages", this);
				this.getView().addDependent(this.oMessage)
			}
			this.oMessage.open();
			this.getOwnerComponent().getModel("oMsgModel").refresh(true)
		},
		onMessageClose: function () {
			this.oMessage.close()
		},
		onScanMaterial: function (e) {
			debugger;
			this.refreshUrunEkleFrg();
			var t = e.getParameter("text");
			l.show();
			var i = this,
				s = this.getOwnerComponent().getModel();
			s.read("/MaterialBarcodeSet('" + t + "')", {
				success: function (e) {
					h = e.Matnr;
					i.getMaterialDetail(h);
					l.hide()
				},
				error: function (e) {
					o.show(i.getOwnerComponent().getModel("i18n").getResourceBundle().getText("MaterialNotFound"));
					l.hide()
				}
			})
		},
		onClearFilter: function () {
			h = ""
		},
		getMaterialDetail: function (e) {
			debugger;
			var t = this,
				i = this.getOwnerComponent().getModel("ARAC");
			var s = [];
			s.push(new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, e));
			i.read("/DUrnTlpMaterialListSet", {
				filters: s,
				success: function (e) {
					if (e.results.length === 0) {
						o.show(t.getOwnerComponent().getModel("i18n").getResourceBundle().getText("MaterialNotFound"))
					} else {
						var i = e.results[0].Matnr;
						sap.ui.getCore().byId("UEkleMlzNo4").setValue(i);
						var s = e.results[0].Maktx;
						sap.ui.getCore().byId("UEkleMlzAck4").setText(s);
						var a = e.results[0].DepoStkMktrBrm;
						a = a.split(" ")[1];
						sap.ui.getCore().byId("UEkleSayimBrm4").setText(a)
					}
				},
				error: function (e) {
					o.show(t.getOwnerComponent().getModel("i18n").getResourceBundle().getText("MaterialNotFound"));
					l.hide()
				}
			})
		}
	})
});