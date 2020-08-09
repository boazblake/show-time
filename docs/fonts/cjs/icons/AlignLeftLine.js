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
var AlignLeftLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "align-left-line"), mithril_1.default("path", { "d": "M5,1A1,1,0,0,0,4,2V34a1,1,0,0,0,2,0V2A1,1,0,0,0,5,1Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M31,20H8V30H31a1,1,0,0,0,1-1V21A1,1,0,0,0,31,20Zm-1,8H10V22H30Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M24,15V7a1,1,0,0,0-1-1H8V16H23A1,1,0,0,0,24,15Zm-2-1H10V8H22Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = AlignLeftLine;
