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
var CurveChartSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "curve-chart-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M 34 7 L 34 29 C 34 30.105 33.105 31 32 31 L 4 31 C 2.896 31 2 30.105 2 29 L 2 7 C 2 5.896 2.896 5 4 5 L 32 5 C 33.105 5 34 5.896 34 7 Z M 13 12 C 14.817 12 15.674 13.499 17.039 18.275 C 17.813 20.984 18.201 22.118 18.882 23.309 C 19.87 25.038 21.205 26 23 26 L 29 26 C 29.552 26 30 25.552 30 25 C 30 24.448 29.552 24 29 24 L 23 24 C 21.183 24 20.326 22.501 18.962 17.725 C 18.188 15.016 17.799 13.882 17.118 12.691 C 16.13 10.962 14.795 10 13 10 L 7 10 C 6.448 10 6 10.448 6 11 C 6 11.552 6.448 12 7 12 Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = CurveChartSolid;
