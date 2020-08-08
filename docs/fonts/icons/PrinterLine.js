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
var PrinterLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "printer-line"), mithril_1.default("path", { "d": "M29,9H27V5H9V9H7a4,4,0,0,0-4,4V24H6.92V22.09H5V13a2,2,0,0,1,2-2H29a2,2,0,0,1,2,2v9H29.08V24H33V13A4,4,0,0,0,29,9ZM25,9H11V7H25Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M28,18H8a1,1,0,0,0,0,2H9V32H27V20h1a1,1,0,0,0,0-2ZM25,30H11V20H25Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 27, "y": 13.04, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = PrinterLine;
