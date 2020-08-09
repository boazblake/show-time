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
var BalanceLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "balance-line"), mithril_1.default("path", { "d": "M24,33H12a1,1,0,0,1,0-2H24a1,1,0,0,1,0,2Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("rect", { "x": 17, "y": 9, "width": 2, "height": 22.5, "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M28,7H8A1,1,0,0,1,8,5H28a1,1,0,0,1,0,2Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("path", { "d": "M26.93,24.79a7.23,7.23,0,0,1-5.81-2.89l-.6-.8,1.59-1.21.6.8a5.28,5.28,0,0,0,8.42,0l.6-.8,1.59,1.21-.6.8A7.23,7.23,0,0,1,26.93,24.79Z", "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("path", { "d": "M30.51,19.25a.8.8,0,0,1-.73-.48L26.93,12.2l-2.85,6.57a.8.8,0,0,1-1.47-.64L26.2,9.87a.83.83,0,0,1,1.47,0l3.58,8.26a.8.8,0,0,1-.73,1.12Z", "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("path", { "d": "M9.68,24.79A7.23,7.23,0,0,1,3.88,21.9l-.6-.8L4.86,19.9l.6.8a5.28,5.28,0,0,0,8.42,0l.6-.8,1.59,1.21-.6.8A7.23,7.23,0,0,1,9.68,24.79Z", "class": "clr-i-outline clr-i-outline-path-6" }), mithril_1.default("path", { "d": "M13.26,19.25a.8.8,0,0,1-.73-.48L9.68,12.2,6.84,18.77a.8.8,0,0,1-1.47-.64L8.95,9.87a.83.83,0,0,1,1.47,0L14,18.13a.8.8,0,0,1-.73,1.12Z", "class": "clr-i-outline clr-i-outline-path-7" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = BalanceLine;
