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
var AlarmClockLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "alarm-clock-line"), mithril_1.default("path", { "d": "M31.47,3.84a5.78,5.78,0,0,0-7.37-.63,16.08,16.08,0,0,1,8.2,7.65A5.73,5.73,0,0,0,31.47,3.84Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M11.42,3.43a5.77,5.77,0,0,0-7.64.41,5.72,5.72,0,0,0-.38,7.64A16.08,16.08,0,0,1,11.42,3.43Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M16.4,4.09A14,14,0,0,0,8.11,27.88L5.56,30.43A1,1,0,1,0,7,31.84l2.66-2.66a13.9,13.9,0,0,0,16.88-.08l2.74,2.74a1,1,0,0,0,1.41-1.41L28,27.78A14,14,0,0,0,16.4,4.09ZM19.58,29.9A12,12,0,1,1,29.92,19.56,12,12,0,0,1,19.58,29.9Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("path", { "d": "M24.92,20.34l-6.06-3V9.5a.9.9,0,0,0-1.8,0v9L24.12,22a.9.9,0,1,0,.79-1.62Z", "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = AlarmClockLine;
