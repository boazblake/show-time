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
var ApplicationsOutlineAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "applications-outline-alerted"), mithril_1.default("polygon", { "points": "8 8 4 8 4 10 10 10 10 4 8 4 8 8", "class": "clr-i-outline--alerted clr-i-outline-path-1--alerted" }), mithril_1.default("polygon", { "points": "8 19 4 19 4 21 10 21 10 15 8 15 8 19", "class": "clr-i-outline--alerted clr-i-outline-path-2--alerted" }), mithril_1.default("polygon", { "points": "19 19 15 19 15 21 21 21 21 15 19 15 19 19", "class": "clr-i-outline--alerted clr-i-outline-path-3--alerted" }), mithril_1.default("polygon", { "points": "30 15 30 19 26 19 26 21 32 21 32 15 30 15", "class": "clr-i-outline--alerted clr-i-outline-path-4--alerted" }), mithril_1.default("polygon", { "points": "8 30 4 30 4 32 10 32 10 26 8 26 8 30", "class": "clr-i-outline--alerted clr-i-outline-path-5--alerted" }), mithril_1.default("polygon", { "points": "19 30 15 30 15 32 21 32 21 26 19 26 19 30", "class": "clr-i-outline--alerted clr-i-outline-path-6--alerted" }), mithril_1.default("polygon", { "points": "30 30 26 30 26 32 32 32 32 26 30 26 30 30", "class": "clr-i-outline--alerted clr-i-outline-path-7--alerted" }), mithril_1.default("path", { "d": "M19,8H15v2h4L19,9.89,21,6.5V4H19Z", "class": "clr-i-outline--alerted clr-i-outline-path-8--alerted" }), mithril_1.default("path", { "d": "M26.85,1.14,21.13,11A1.28,1.28,0,0,0,22.23,13H33.68A1.28,1.28,0,0,0,34.78,11L29.06,1.14A1.28,1.28,0,0,0,26.85,1.14Z", "class": "clr-i-outline--alerted clr-i-outline-path-9--alerted clr-i-alert" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ApplicationsOutlineAlerted;
