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
var CloudChartOutlineAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "cloud-chart-outline-alerted"), mithril_1.default("path", { "class": "clr-i-outline--alerted clr-i-outline-path-1--alerted", "d": "M 34 29 C 34 30.105 33.105 31 32 31 L 4 31 C 2.895 31 2 30.105 2 29 L 2 7 C 2 5.895 2.895 5 4 5 L 21.958 5 L 20.786 7 L 4 7 L 4 29 L 32 29 L 32 15.357 L 34 15.357 Z" }), mithril_1.default("path", { "d": "M 18.849 21.849 C 15.334 25.364 10.586 26.314 8.243 23.97 C 5.899 21.627 6.849 16.878 10.364 13.364 C 13.049 10.679 16.453 9.492 18.956 10.124 L 18.008 11.741 C 16.18 11.518 13.695 12.578 11.636 14.637 C 8.824 17.449 7.875 21.058 9.515 22.698 C 11.155 24.338 14.764 23.389 17.576 20.577 C 19.228 18.925 20.237 16.998 20.456 15.357 L 22.22 15.357 C 22.006 17.477 20.838 19.861 18.849 21.849 Z", "class": "clr-i-outline--alerted clr-i-outline-path-2--alerted" }), mithril_1.default("path", { "d": "M 28 22 C 28 23.657 26.657 25 25 25 C 23.343 25 22 23.657 22 22 C 22 20.343 23.343 19 25 19 C 26.657 19 28 20.343 28 22 Z M 25 20.6 C 24.226 20.6 23.6 21.226 23.6 22 C 23.6 22.773 24.226 23.4 25 23.4 C 25.773 23.4 26.4 22.773 26.4 22 C 26.4 21.226 25.773 20.6 25 20.6 Z", "class": "clr-i-outline--alerted clr-i-outline-path-3--alerted", "x": 7 }), mithril_1.default("path", { "class": "clr-i-outline--alerted clr-i-outline-path-4--alerted clr-i-alert", "d": "M 26.854 1.144 L 21.134 11.004 C 20.579 11.818 21.114 12.928 22.097 13.001 C 22.142 13.005 22.188 13.006 22.234 13.004 L 33.684 13.004 C 34.669 13.036 35.319 11.991 34.855 11.122 C 34.834 11.081 34.81 11.042 34.784 11.004 L 29.064 1.144 C 28.57 0.299 27.348 0.299 26.854 1.144 Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = CloudChartOutlineAlerted;
