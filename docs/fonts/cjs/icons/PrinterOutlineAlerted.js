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
var PrinterOutlineAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "printer-outline-alerted"), mithril_1.default("path", { "d": "M28,18H8a1,1,0,0,0,0,2H9V32H27V20h1a1,1,0,0,0,0-2ZM25,30H11V20H25Z", "class": "clr-i-outline--alerted clr-i-outline-path-1--alerted" }), mithril_1.default("polygon", { "points": "31 15.4 31 22.09 29.08 22.09 29.08 24 33 24 33 15.4 31 15.4", "class": "clr-i-outline--alerted clr-i-outline-path-2--alerted" }), mithril_1.default("path", { "d": "M5,13a2,2,0,0,1,2-2H18.64A3.65,3.65,0,0,1,19,9.89L19.54,9H11V7h9.71l1.13-2H9V9H7a4,4,0,0,0-4,4V24H6.92V22.09H5Z", "class": "clr-i-outline--alerted clr-i-outline-path-3--alerted" }), mithril_1.default("path", { "d": "M26.85,1.14,21.13,11A1.28,1.28,0,0,0,22.23,13H33.68A1.28,1.28,0,0,0,34.78,11L29.06,1.14A1.28,1.28,0,0,0,26.85,1.14Z", "class": "clr-i-outline--alerted clr-i-outline-path-4--alerted clr-i-alert" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = PrinterOutlineAlerted;
