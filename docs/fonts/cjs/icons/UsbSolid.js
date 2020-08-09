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
var UsbSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "usb-solid"), mithril_1.default("path", { "d": "M34.72,17.37l-5.51-3.31a.71.71,0,0,0-1.07.6V17H11.77l3.52-5.6a1.49,1.49,0,0,1,1.28-.72h1.64a2.41,2.41,0,0,0,2.25,1.61,2.48,2.48,0,0,0,0-4.95,2.38,2.38,0,0,0-2.13,1.34H16.57a3.49,3.49,0,0,0-3,1.66L9.41,17H8a3.46,3.46,0,1,0,.08,2h5.64l4.15,6.62a3.49,3.49,0,0,0,3,1.66h2.59v.92h4.4V23.8h-4.4v1.48H20.88a1.51,1.51,0,0,1-1.28-.72L16.11,19h12v2.28a.7.7,0,0,0,.36.61.72.72,0,0,0,.34.09.65.65,0,0,0,.36-.1l5.52-3.31a.7.7,0,0,0,0-1.2Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = UsbSolid;
