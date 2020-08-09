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
var SubscriptLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "subscript-line"), mithril_1.default("path", { "d": "M14.55,18l6.8,8.6a1.17,1.17,0,0,1-.92,1.9h0a1.17,1.17,0,0,1-.92-.44L13,19.91,6.6,28a1.17,1.17,0,0,1-.92.44h0a1.17,1.17,0,0,1-.92-1.9L11.55,18l-6.8-8.6a1.17,1.17,0,0,1,.92-1.9h0A1.17,1.17,0,0,1,6.63,8l6.44,8.13L19.5,8a1.17,1.17,0,0,1,.92-.44h0a1.17,1.17,0,0,1,.92,1.9Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M23,31.8,27.49,28a9.9,9.9,0,0,0,1.88-2.05A3.44,3.44,0,0,0,30,24a2.35,2.35,0,0,0-.35-1.27,2.44,2.44,0,0,0-1-.84,2.9,2.9,0,0,0-1.26-.28,3.36,3.36,0,0,0-1.83.5,5.64,5.64,0,0,0-1.48,1.42l-1-.81a5.11,5.11,0,0,1,4.36-2.37,4.35,4.35,0,0,1,2,.45,3.43,3.43,0,0,1,2,3.18,4.45,4.45,0,0,1-.68,2.35,10.9,10.9,0,0,1-2.24,2.46l-3.24,2.81H31.5V33H23Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = SubscriptLine;
