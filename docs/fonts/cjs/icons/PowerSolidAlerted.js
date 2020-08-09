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
var PowerSolidAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "power-solid-alerted"), mithril_1.default("path", { "class": "clr-i-solid--alerted clr-i-solid-path-1--alerted", "d": "M33.68,15.4h-6A9.7,9.7,0,0,1,28,17.89a10,10,0,1,1-15.83-8,1.4,1.4,0,0,1,1.94.31,1.37,1.37,0,0,1-.31,1.92,7.18,7.18,0,1,0,11.43,5.8,7.08,7.08,0,0,0-.45-2.49H22.23A3.69,3.69,0,0,1,19.35,14v4.4a1.29,1.29,0,0,1-2.58,0V8.65a1.29,1.29,0,0,1,2.58,0v.71l3.76-6.51A16,16,0,1,0,34,18a16,16,0,0,0-.23-2.61Z" }), mithril_1.default("path", { "class": "clr-i-solid--alerted clr-i-solid-path-2--alerted clr-i-alert", "d": "M26.85,1.14,21.13,11A1.28,1.28,0,0,0,22.23,13H33.68A1.28,1.28,0,0,0,34.78,11L29.06,1.14A1.28,1.28,0,0,0,26.85,1.14Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = PowerSolidAlerted;
