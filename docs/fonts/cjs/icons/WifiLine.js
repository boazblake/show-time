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
var WifiLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "wifi-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M33.55,8.2a28.1,28.1,0,0,0-31.11.08A1,1,0,1,0,3.56,9.94a26.11,26.11,0,0,1,28.89-.07,1,1,0,0,0,1.1-1.67Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-2", "d": "M18.05,10.72A20.74,20.74,0,0,0,6.23,14.4,1,1,0,0,0,7.36,16,18.85,18.85,0,0,1,28.64,16a1,1,0,0,0,1.12-1.65A20.75,20.75,0,0,0,18.05,10.72Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-3", "d": "M18.05,17.9a13.51,13.51,0,0,0-8,2.64,1,1,0,0,0,1.18,1.61,11.56,11.56,0,0,1,13.62-.08A1,1,0,1,0,26,20.46,13.52,13.52,0,0,0,18.05,17.9Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-4", "d": "M18,24.42a4,4,0,1,0,4,4A4,4,0,0,0,18,24.42Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,18,30.42Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = WifiLine;
