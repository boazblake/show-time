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
var SsdLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "ssd-line"), mithril_1.default("path", { "d": "M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6Zm0,22H4V8H32Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("circle", { "cx": 6.21, "cy": 10.25, "r": 1.25, "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("circle", { "cx": 29.81, "cy": 10.25, "r": 1.25, "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("circle", { "cx": 6.21, "cy": 25.42, "r": 1.25, "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("circle", { "cx": 29.81, "cy": 25.42, "r": 1.25, "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("path", { "d": "M10,18.62c1.32.31,1.91.54,1.91,1.22s-.53,1.09-1.55,1.09a4,4,0,0,1-2.71-1.11l-.86,1.06a5,5,0,0,0,3.52,1.34c2,0,3.1-1,3.1-2.52s-1.15-2.05-2.87-2.44c-1.31-.3-1.92-.54-1.92-1.21A1.25,1.25,0,0,1,10,15a3.68,3.68,0,0,1,2.37,1l.81-1.1A4.58,4.58,0,0,0,10,13.69c-1.74,0-3,1.05-3,2.49S8.26,18.22,10,18.62Z", "class": "clr-i-outline clr-i-outline-path-6" }), mithril_1.default("path", { "d": "M17.83,20.93a4,4,0,0,1-2.71-1.11l-.86,1.06a5,5,0,0,0,3.52,1.34c2,0,3.1-1,3.1-2.52S19.73,17.65,18,17.26c-1.31-.3-1.92-.54-1.92-1.21A1.25,1.25,0,0,1,17.48,15a3.68,3.68,0,0,1,2.37,1l.81-1.1a4.56,4.56,0,0,0-3.12-1.15c-1.73,0-3,1.05-3,2.49s1.19,2,2.89,2.44c1.32.31,1.91.54,1.91,1.22S18.85,20.93,17.83,20.93Z", "class": "clr-i-outline clr-i-outline-path-7" }), mithril_1.default("path", { "d": "M29.9,18c0-2.41-1.92-4.12-4.64-4.12h-2.9v8.24h2.9C28,22.08,29.9,20.37,29.9,18Zm-6-2.76h1.56a2.77,2.77,0,1,1,0,5.53H23.86Z", "class": "clr-i-outline clr-i-outline-path-8" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = SsdLine;
