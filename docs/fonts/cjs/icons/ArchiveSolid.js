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
var ArchiveSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "archive-solid"), mithril_1.default("path", { "d": "M19.41,20.6,18,22l-1.41-1.4L16,20H5V32a2,2,0,0,0,2,2H29a2,2,0,0,0,2-2V20H20ZM22,24a1,1,0,0,1-1,1H15a1,1,0,0,1,0-2h6A1,1,0,0,1,22,24Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M30.5,12H26.66s0,.09,0,.13a3,3,0,0,1-.88,2.12L22,18H32V13.5A1.5,1.5,0,0,0,30.5,12Z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("path", { "d": "M10.2,14.25a3,3,0,0,1-.88-2.12s0-.09,0-.13H5.5A1.5,1.5,0,0,0,4,13.5V18H14Z", "class": "clr-i-solid clr-i-solid-path-3" }), mithril_1.default("path", { "d": "M18,19.18l6.38-6.35A1,1,0,1,0,23,11.41l-4,3.95V3a1,1,0,1,0-2,0v12.4l-4-3.95a1,1,0,0,0-1.41,1.42Z", "class": "clr-i-solid clr-i-solid-path-4" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ArchiveSolid;
