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
var MusicNoteLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "music-note-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M31.68,6.16c-1.92-3.3-10.6-4-11.58-4.09L19,2V22.34a5.89,5.89,0,0,0-.82-.56,8.33,8.33,0,0,0-6.53-.41C7.57,22.7,4.92,26.5,5.78,29.84a5.33,5.33,0,0,0,2.66,3.32,7.48,7.48,0,0,0,3.61.88A9.54,9.54,0,0,0,15,33.57c3.67-1.18,6.17-4.33,6.06-7.36V9.34a29.14,29.14,0,0,1,6.55,1.43,1,1,0,1,0,.72-1.87A31.37,31.37,0,0,0,21,7.33V4.17c3.33.36,8,1.38,8.92,3,2,3.41-2.33,7.36-2.37,7.4a1,1,0,0,0,1.33,1.49C29.15,15.85,34.5,11,31.68,6.16ZM14.35,31.67a6.43,6.43,0,0,1-5-.26,3.31,3.31,0,0,1-1.69-2.07c-.6-2.33,1.45-5.05,4.58-6.06a7.52,7.52,0,0,1,2.3-.37,5.52,5.52,0,0,1,2.65.62,3.31,3.31,0,0,1,1.69,2.07C19.54,27.94,17.49,30.66,14.35,31.67Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = MusicNoteLine;
