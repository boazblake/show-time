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
var CloudTrafficLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "cloud-traffic-line"), mithril_1.default("path", { "d": "M26.54,20.82a.88.88,0,0,0-.88-.88H20.75l1.1-1.1A.88.88,0,0,0,20.6,17.6l-3.21,3.22L20.6,24a.88.88,0,1,0,1.25-1.24L20.76,21.7h4.9A.88.88,0,0,0,26.54,20.82Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M29.27,21.7a.88.88,0,1,0,0-1.76h-.58a.88.88,0,1,0,0,1.76Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M32.21,20h-.06a.85.85,0,0,0-.85.88.91.91,0,0,0,.91.88.88.88,0,1,0,0-1.76Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("path", { "d": "M32.59,11a.88.88,0,0,0-1.25,1.24l1.1,1.1H27.53a.88.88,0,1,0,0,1.76h4.9l-1.09,1.09a.88.88,0,0,0,1.25,1.24l3.21-3.22Z", "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("path", { "d": "M24.5,15.07a.88.88,0,1,0,0-1.76h-.58a.88.88,0,1,0,0,1.76Z", "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("path", { "d": "M21.9,14.27a.85.85,0,0,0-.85-.88H21a.88.88,0,1,0,0,1.76A.91.91,0,0,0,21.9,14.27Z", "class": "clr-i-outline clr-i-outline-path-6" }), mithril_1.default("path", { "d": "M30.36,23.65c0,.13,0,.26,0,.39a3.77,3.77,0,0,1-3.62,3.89H7.28a5.32,5.32,0,0,1-5.13-5.48A5.32,5.32,0,0,1,7.28,17H8.91L9,16.12a8.92,8.92,0,0,1,8.62-8h.08a8.49,8.49,0,0,1,6.56,3.29h2.37a10.55,10.55,0,0,0-8.91-5.25h-.11A10.82,10.82,0,0,0,7.22,15a7.28,7.28,0,0,0-7,7.43,7.27,7.27,0,0,0,7.08,7.43H26.77A5.72,5.72,0,0,0,32.35,24a3.77,3.77,0,0,0,0-.39Z", "class": "clr-i-outline clr-i-outline-path-7" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = CloudTrafficLine;
