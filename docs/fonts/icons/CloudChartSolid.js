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
var CloudChartSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "cloud-chart-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M 34 7 L 34 29 C 34 30.105 33.105 31 32 31 L 4 31 C 2.895 31 2 30.105 2 29 L 2 7 C 2 5.895 2.895 5 4 5 L 32 5 C 33.105 5 34 5.895 34 7 Z M 10.364 13.364 C 6.849 16.878 5.899 21.627 8.243 23.97 C 10.586 26.314 15.334 25.364 18.849 21.849 C 22.364 18.335 23.314 13.586 20.971 11.243 C 18.628 8.9 13.879 9.849 10.364 13.364 Z M 25 19 C 23.343 19 22 20.343 22 22 C 22 23.657 23.343 25 25 25 C 26.657 25 28 23.657 28 22 C 28 20.343 26.657 19 25 19 Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = CloudChartSolid;
