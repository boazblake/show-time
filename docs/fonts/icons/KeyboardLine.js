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
var KeyboardLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "keyboard-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M32,8H4a2,2,0,0,0-2,2V26a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V10A2,2,0,0,0,32,8Zm0,18H4V10H32Z" }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-2", "x": 7, "y": 13, "width": 2, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-3", "x": 11, "y": 13, "width": 2, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-4", "x": 15, "y": 13, "width": 2, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-5", "x": 19, "y": 13, "width": 2, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-6", "x": 23, "y": 13, "width": 2, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-7", "x": 27, "y": 13, "width": 2, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-8", "x": 7, "y": 17, "width": 2, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-9", "x": 11, "y": 17, "width": 2, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-10", "x": 15, "y": 17, "width": 2, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-11", "x": 19, "y": 17, "width": 2, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-12", "x": 23, "y": 17, "width": 2, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-13", "x": 27, "y": 17, "width": 2, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-14", "x": 27, "y": 22, "width": 1.94, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-15", "x": 7, "y": 22, "width": 2, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-16", "x": 11.13, "y": 22, "width": 13.75, "height": 2 }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = KeyboardLine;
