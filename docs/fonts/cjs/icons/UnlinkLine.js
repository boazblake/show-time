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
var UnlinkLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "unlink-line"), mithril_1.default("path", { "d": "M5,5,3.59,6.41l9,9L8.1,19.79a5.91,5.91,0,0,0,0,8.39,6,6,0,0,0,8.44,0L21,23.78l8.63,8.63L31,31ZM15.13,26.76a4,4,0,0,1-5.62,0,3.92,3.92,0,0,1,0-5.55L14,16.79l5.58,5.58Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M21.53,9.22a4,4,0,0,1,5.62,0,3.92,3.92,0,0,1,0,5.55l-4.79,4.76L23.78,21l4.79-4.76a5.92,5.92,0,0,0,0-8.39,6,6,0,0,0-8.44,0l-4.76,4.74L16.78,14Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = UnlinkLine;
