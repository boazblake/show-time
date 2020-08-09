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
var TableLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "table-line"), mithril_1.default("path", { "d": "M8,34a1,1,0,0,1-1-1V2.92a1,1,0,0,1,2,0V33A1,1,0,0,1,8,34Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M17,33.92a1,1,0,0,1-1-1V9.1a1,1,0,1,1,2,0V32.92A1,1,0,0,1,17,33.92Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M26,34a1,1,0,0,1-1-1V9a1,1,0,0,1,2,0V33A1,1,0,0,1,26,34Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("path", { "d": "M33.11,18h-25a1,1,0,1,1,0-2h25a1,1,0,1,1,0,2Z", "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("path", { "d": "M33.1,26.94H8.1A1,1,0,1,1,8.1,25h25a1,1,0,1,1,0,1.92Z", "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("path", { "d": "M33,8.92H3A1,1,0,1,1,3,7H33a1,1,0,1,1,0,1.94Z", "class": "clr-i-outline clr-i-outline-path-6" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = TableLine;
