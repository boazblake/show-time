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
var NvmeLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "nvme-line"), mithril_1.default("path", { "d": "M27,22V14a2,2,0,0,0-2-2H11a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2H25A2,2,0,0,0,27,22ZM11,14H25v8H11Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("rect", { "x": 19, "y": 6, "width": 4, "height": 2, "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 25.01, "y": 6, "width": 1.97, "height": 2, "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("path", { "d": "M5.8,8H16.87V6h-11L7.78,4.08a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L2,7,6.37,11.4a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41Z", "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("path", { "d": "M29.61,24.68a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L30.1,28H19v2H30.2l-2,2a1,1,0,0,0,0,1.41,1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29L34,29.05Z", "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("rect", { "x": 13, "y": 28, "width": 4, "height": 2, "class": "clr-i-outline clr-i-outline-path-6" }), mithril_1.default("rect", { "x": 9, "y": 28, "width": 1.97, "height": 2, "class": "clr-i-outline clr-i-outline-path-7" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = NvmeLine;
