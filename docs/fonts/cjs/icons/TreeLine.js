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
var TreeLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "tree-line"), mithril_1.default("path", { "d": "M30.6,11.7C29.2,5.8,24,1.7,18,1.7c-7.2,0-13,5.8-13,13c0,6.8,5.3,12.4,12,12.9v5c0,0.6,0.4,1,1,1s1-0.4,1-1v-5v-2V22\n\tc0,0,0,0,0-0.1v-3.6l4.7-4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L19,15.6v-3l-3.3-3.3c-0.4-0.4-1-0.4-1.4,0\n\tc-0.4,0.4-0.4,1,0,1.4l2.7,2.7v6.2l-3.8-3.8c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4l5.2,5.2v3.2c-5.6-0.5-10-5.2-10-10.9\n\tc0-6.1,4.9-11,11-11s11,4.9,11,11c0,4.9-3.3,9.2-8,10.6v2.1C28,25.7,32.3,18.7,30.6,11.7z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = TreeLine;
