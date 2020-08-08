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
var PrinterOutlineBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "printer-outline-badged"), mithril_1.default("path", { "d": "M28,18H8a1,1,0,0,0,0,2H9V32H27V20h1a1,1,0,0,0,0-2ZM25,30H11V20H25Z", "class": "clr-i-outline--badged clr-i-outline-path-1--badged" }), mithril_1.default("rect", { "x": 27, "y": 13.04, "width": 2, "height": 2, "class": "clr-i-outline--badged clr-i-outline-path-2--badged" }), mithril_1.default("path", { "d": "M33,12.88a7.45,7.45,0,0,1-2,.55v8.66H29.08V24H33V13C33,13,33,12.93,33,12.88Z", "class": "clr-i-outline--badged clr-i-outline-path-3--badged" }), mithril_1.default("path", { "d": "M5,13a2,2,0,0,1,2-2H24.42a7.5,7.5,0,0,1-1.27-2H11V7H22.57a7.52,7.52,0,0,1-.07-1,7.54,7.54,0,0,1,.07-1H9V9H7a4,4,0,0,0-4,4V24H6.92V22.09H5Z", "class": "clr-i-outline--badged clr-i-outline-path-4--badged" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "class": "clr-i-outline--badged clr-i-outline-path-5--badged clr-i-badge" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = PrinterOutlineBadged;
