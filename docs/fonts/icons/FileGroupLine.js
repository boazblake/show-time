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
var FileGroupLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "file-group-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M31,34H13a1,1,0,0,1-1-1V11a1,1,0,0,1,1-1H31a1,1,0,0,1,1,1V33A1,1,0,0,1,31,34ZM14,32H30V12H14Z" }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-2", "x": 16, "y": 16, "width": 12, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-3", "x": 16, "y": 20, "width": 12, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-4", "x": 16, "y": 24, "width": 12, "height": 2 }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-5", "d": "M6,24V4H24V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3V25a1,1,0,0,0,1,1H6Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-6", "d": "M10,28V8H28V7a1,1,0,0,0-1-1H9A1,1,0,0,0,8,7V29a1,1,0,0,0,1,1h1Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = FileGroupLine;
