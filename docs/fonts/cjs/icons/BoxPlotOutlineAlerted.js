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
var BoxPlotOutlineAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "box-plot-outline-alerted"), mithril_1.default("path", { "class": "clr-i-outline--alerted clr-i-outline-path-1--alerted", "d": "M 34 29 C 34 30.105 33.105 31 32 31 L 4 31 C 2.895 31 2 30.105 2 29 L 2 7 C 2 5.895 2.895 5 4 5 L 21.958 5 L 20.786 7 L 4 7 L 4 29 L 32 29 L 32 15.357 L 34 15.357 Z" }), mithril_1.default("path", { "d": "M 7 12 L 17 12 L 17 26 L 7 26 L 7 12 Z M 8.6 24.4 L 15.4 24.4 L 15.4 18.8 L 8.6 18.8 L 8.6 24.4 Z M 15.4 13.6 L 8.6 13.6 L 8.6 17.2 L 15.4 17.2 L 15.4 13.6 Z", "class": "clr-i-outline--alerted clr-i-outline-path-2--alerted" }), mithril_1.default("path", { "d": "M 29 24 L 19 24 L 19 15.345 C 19.021 15.348 20.6 15.36 20.6 15.36 L 20.6 17.2 L 27.4 17.2 L 27.4 15.36 L 29 15.357 L 29 24 Z M 27.4 18.8 L 20.6 18.8 L 20.6 22.4 L 27.4 22.4 L 27.4 18.8 Z", "class": "clr-i-outline--alerted clr-i-outline-path-3--alerted" }), mithril_1.default("path", { "class": "clr-i-outline--alerted clr-i-outline-path-4--alerted clr-i-alert", "d": "M 26.854 1.144 L 21.134 11.004 C 20.579 11.818 21.114 12.928 22.097 13.001 C 22.142 13.005 22.188 13.006 22.234 13.004 L 33.684 13.004 C 34.669 13.036 35.319 11.991 34.855 11.122 C 34.834 11.081 34.81 11.042 34.784 11.004 L 29.064 1.144 C 28.57 0.299 27.348 0.299 26.854 1.144 Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = BoxPlotOutlineAlerted;
