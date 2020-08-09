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
var MemoryOutlineAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "memory-outline-alerted"), mithril_1.default("rect", { "x": 8, "y": 12, "width": 4, "height": 8, "class": "clr-i-outline--alerted clr-i-outline-path-1--alerted" }), mithril_1.default("path", { "d": "M15,27H4V17H2V27a2,2,0,0,0,2,2H16.61V25.55h2.26V24H15Z", "class": "clr-i-outline--alerted clr-i-outline-path-2--alerted" }), mithril_1.default("path", { "d": "M32,17V27H19v2H32a2,2,0,0,0,2-2V17Z", "class": "clr-i-outline--alerted clr-i-outline-path-3--alerted" }), mithril_1.default("path", { "d": "M19,13.56A3.66,3.66,0,0,1,18.57,12H16v8h4V14.64A3.67,3.67,0,0,1,19,13.56Z", "class": "clr-i-outline--alerted clr-i-outline-path-4--alerted" }), mithril_1.default("rect", { "x": 24, "y": 15.4, "width": 4, "height": 4.6, "class": "clr-i-outline--alerted clr-i-outline-path-5--alerted" }), mithril_1.default("path", { "d": "M4,9H19.56l1.15-2H4A2,2,0,0,0,2,9v4H4Z", "class": "clr-i-outline--alerted clr-i-outline-path-6--alerted" }), mithril_1.default("path", { "d": "M26.85,1.14,21.13,11A1.28,1.28,0,0,0,22.23,13H33.68A1.28,1.28,0,0,0,34.78,11L29.06,1.14A1.28,1.28,0,0,0,26.85,1.14Z", "class": "clr-i-outline--alerted clr-i-outline-path-7--alerted clr-i-alert" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = MemoryOutlineAlerted;
