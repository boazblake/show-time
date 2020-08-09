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
var CpuLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "cpu-line"), mithril_1.default("path", { "d": "M23.08,23.07h-11v1.5H23.83a.75.75,0,0,0,.75-.75V11.33h-1.5Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M32.2,18.15a.8.8,0,1,0,0-1.6H30v-5.4h2.2a.8.8,0,1,0,0-1.6H30V8.1A2.1,2.1,0,0,0,27.9,6H26.35V3.8a.8.8,0,1,0-1.6,0V6h-5.4V3.8a.8.8,0,1,0-1.6,0V6h-5.4V3.8a.8.8,0,1,0-1.6,0V6H8.1A2.1,2.1,0,0,0,6,8.1V9.55H3.8a.8.8,0,1,0,0,1.6H6v5.4H3.8a.8.8,0,1,0,0,1.6H6v5.4H3.8a.8.8,0,1,0,0,1.6H6V27.9A2.1,2.1,0,0,0,8.1,30h2.65v2.2a.8.8,0,1,0,1.6,0V30h5.4v2.2a.8.8,0,1,0,1.6,0V30h5.4v2.2a.8.8,0,1,0,1.6,0V30H27.9A2.1,2.1,0,0,0,30,27.9V25.15h2.2a.8.8,0,1,0,0-1.6H30v-5.4ZM28,27.9a.1.1,0,0,1-.1.1H8.1a.1.1,0,0,1-.1-.1V8.1A.1.1,0,0,1,8.1,8H27.9a.1.1,0,0,1,.1.1Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = CpuLine;
