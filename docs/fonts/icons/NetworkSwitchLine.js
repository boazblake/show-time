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
var NetworkSwitchLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "network-switch-line"), mithril_1.default("path", { "d": "M33.91,18.47,30.78,8.41A2,2,0,0,0,28.87,7H7.13A2,2,0,0,0,5.22,8.41L2.09,18.48a2,2,0,0,0-.09.59V27a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V19.06A2,2,0,0,0,33.91,18.47ZM32,27H4V19.06L7.13,9H28.87L32,19.06Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("rect", { "x": 7.12, "y": 22, "width": 1.8, "height": 3, "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 12.12, "y": 22, "width": 1.8, "height": 3, "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("rect", { "x": 17.11, "y": 22, "width": 1.8, "height": 3, "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("rect", { "x": 22.1, "y": 22, "width": 1.8, "height": 3, "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("rect", { "x": 27.1, "y": 22, "width": 1.8, "height": 3, "class": "clr-i-outline clr-i-outline-path-6" }), mithril_1.default("rect", { "x": 6.23, "y": 18, "width": 23.69, "height": 1.4, "class": "clr-i-outline clr-i-outline-path-7" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = NetworkSwitchLine;
