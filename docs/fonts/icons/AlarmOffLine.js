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
var AlarmOffLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "alarm-off-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M31.47,3.84a5.78,5.78,0,0,0-7.37-.63,16.08,16.08,0,0,1,8.2,7.65A5.73,5.73,0,0,0,31.47,3.84Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-2", "d": "M25.33,21.54a.9.9,0,0,0-.41-1.2l-3.2-1.56L24.89,22A.89.89,0,0,0,25.33,21.54Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-3", "d": "M18,8.6a.9.9,0,0,0-.9.9v4.6l1.8,1.81V9.5A.9.9,0,0,0,18,8.6Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-4", "d": "M11.42,3.43a5.8,5.8,0,0,0-5.81-.81L8.3,5.32A16,16,0,0,1,11.42,3.43Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-5", "d": "M18,4a13.91,13.91,0,0,0-8.3,2.75l1.42,1.43A12,12,0,0,1,27.82,24.9l1.42,1.43A14,14,0,0,0,18,4Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-6", "d": "M1.56,4.21,2.73,5.38a5.7,5.7,0,0,0,.67,6.1A15.78,15.78,0,0,1,5.46,8.12L6.88,9.55A13.94,13.94,0,0,0,8.11,27.88L5.56,30.43A1,1,0,1,0,7,31.84l2.66-2.66a13.89,13.89,0,0,0,16.8,0l4.14,4.15L32,31.9,3,2.8ZM25,27.72A11.89,11.89,0,0,1,18,30,12,12,0,0,1,6,18a11.89,11.89,0,0,1,2.29-7Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = AlarmOffLine;
