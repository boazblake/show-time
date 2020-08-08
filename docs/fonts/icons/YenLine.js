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
var YenLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "yen-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M29.34,4.55a1,1,0,1,0-1.67-1.1L18,18.23,8.33,3.45a1,1,0,0,0-1.67,1.1L17,20.35V22.2H12a.8.8,0,0,0,0,1.6h5v2.4H12a.8.8,0,0,0,0,1.6h5V32a1,1,0,0,0,2,0V27.8h5a.8.8,0,0,0,0-1.6H19V23.8h5a.8.8,0,0,0,0-1.6H19V20.35Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = YenLine;
