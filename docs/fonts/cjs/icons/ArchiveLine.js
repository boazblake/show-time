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
var ArchiveLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "archive-line"), mithril_1.default("path", { "d": "M29,32H7V22H5V32a2,2,0,0,0,2,2H29a2,2,0,0,0,2-2V22H29Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M14,24a1,1,0,0,0,1,1h6a1,1,0,0,0,0-2H15A1,1,0,0,0,14,24Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M14,18H6V14h4a3,3,0,0,1-.68-1.87s0-.09,0-.13H5.5A1.5,1.5,0,0,0,4,13.5V20H16Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("path", { "d": "M30.5,12H26.66s0,.09,0,.13A3,3,0,0,1,26,14h4v4H22l-2,2H32V13.5A1.5,1.5,0,0,0,30.5,12Z", "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("path", { "d": "M18,19.18l6.38-6.35A1,1,0,1,0,23,11.41l-4,3.95V3a1,1,0,1,0-2,0v12.4l-4-3.95a1,1,0,0,0-1.41,1.42Z", "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ArchiveLine;
