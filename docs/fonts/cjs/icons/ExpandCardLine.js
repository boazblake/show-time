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
var ExpandCardLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "expand-card-line"), mithril_1.default("path", { "d": "M33,6H3A1,1,0,0,0,2,7V29a1,1,0,0,0,1,1H33a1,1,0,0,0,1-1V7A1,1,0,0,0,33,6ZM32,28H4V8H32Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M13.48,15.86,18,11.34l4.52,4.52a.77.77,0,0,0,.56.24.81.81,0,0,0,.57-1.37L18,9.08l-5.65,5.65a.8.8,0,1,0,1.13,1.13Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M13.48,21.86,18,17.34l4.52,4.52a.77.77,0,0,0,.56.24.81.81,0,0,0,.57-1.37L18,15.08l-5.65,5.65a.8.8,0,1,0,1.13,1.13Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ExpandCardLine;
