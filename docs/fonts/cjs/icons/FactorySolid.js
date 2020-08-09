"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(require("mithril"));
var FactorySolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "factory_solid"), mithril_1.default("g", { "id": "ea9fbc53-970b-4279-903f-43e3ef035107", "data-name": "Layer 3" }, mithril_1.default("path", { "d": "M32.45,8.44,22,15.3V9.51a1,1,0,0,0-1.63-.78L14.07,14H10V4.06L4,2.71V14H2V31a1,1,0,0,0,1,1H33a1,1,0,0,0,1-1V9.27A1,1,0,0,0,32.45,8.44ZM14,29H6V27h8Zm0-4H6V23h8Zm0-4H6V19h8Zm8,8H20V26h2Zm0-6H20V20h2Zm4,6H24V26h2Zm0-6H24V20h2Zm4,6H28V26h2Zm0-6H28V20h2Z" })));
    } };
exports.default = FactorySolid;
