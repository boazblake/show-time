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
var CodeOutlineAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "code-outline-alerted"), mithril_1.default("path", { "d": "M13.71,12.59a1,1,0,0,0-1.39-.26L5.79,16.78a1,1,0,0,0,0,1.65l6.53,4.45a1,1,0,1,0,1.13-1.65L8.13,17.61,13.45,14A1,1,0,0,0,13.71,12.59Z", "class": "clr-i-outline--alerted clr-i-outline-path-1--alerted" }), mithril_1.default("path", { "d": "M18.56,11.62,15.41,24.29a.9.9,0,0,0,.66,1.09l.22,0a.9.9,0,0,0,.87-.68L19.73,14.4a3.59,3.59,0,0,1-1.16-2.79Z", "class": "clr-i-outline--alerted clr-i-outline-path-2--alerted" }), mithril_1.default("path", { "d": "M30.21,16.78l-2-1.38H24.64l3.24,2.21-5.32,3.63a1,1,0,0,0,1.13,1.65l6.53-4.45a1,1,0,0,0,0-1.65Z", "class": "clr-i-outline--alerted clr-i-outline-path-3--alerted" }), mithril_1.default("path", { "d": "M26.85,1.14,21.13,11A1.28,1.28,0,0,0,22.23,13H33.68A1.28,1.28,0,0,0,34.78,11L29.06,1.14A1.28,1.28,0,0,0,26.85,1.14Z", "class": "clr-i-outline--alerted clr-i-outline-path-4--alerted clr-i-alert" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = CodeOutlineAlerted;
