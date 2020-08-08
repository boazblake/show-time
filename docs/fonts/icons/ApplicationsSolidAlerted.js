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
var ApplicationsSolidAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "applications-solid-alerted"), mithril_1.default("rect", { "x": 4, "y": 4, "width": 6, "height": 6, "class": "clr-i-solid--alerted clr-i-solid-path-1--alerted" }), mithril_1.default("rect", { "x": 4, "y": 15, "width": 6, "height": 6, "class": "clr-i-solid--alerted clr-i-solid-path-2--alerted" }), mithril_1.default("rect", { "x": 4, "y": 26, "width": 6, "height": 6, "class": "clr-i-solid--alerted clr-i-solid-path-3--alerted" }), mithril_1.default("rect", { "x": 15, "y": 15, "width": 6, "height": 6, "class": "clr-i-solid--alerted clr-i-solid-path-4--alerted" }), mithril_1.default("rect", { "x": 15, "y": 26, "width": 6, "height": 6, "class": "clr-i-solid--alerted clr-i-solid-path-5--alerted" }), mithril_1.default("rect", { "x": 26, "y": 15, "width": 6, "height": 6, "class": "clr-i-solid--alerted clr-i-solid-path-6--alerted" }), mithril_1.default("rect", { "x": 26, "y": 26, "width": 6, "height": 6, "class": "clr-i-solid--alerted clr-i-solid-path-7--alerted" }), mithril_1.default("path", { "d": "M15,10h4L19,9.89,21,6.5V4H15Z", "class": "clr-i-solid--alerted clr-i-solid-path-8--alerted" }), mithril_1.default("path", { "d": "M26.85,1.14,21.13,11A1.28,1.28,0,0,0,22.23,13H33.68A1.28,1.28,0,0,0,34.78,11L29.06,1.14A1.28,1.28,0,0,0,26.85,1.14Z", "class": "clr-i-solid--alerted clr-i-solid-path-9--alerted clr-i-alert" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ApplicationsSolidAlerted;
