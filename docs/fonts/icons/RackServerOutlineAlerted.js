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
var RackServerOutlineAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "rack-server-outline-alerted"), mithril_1.default("rect", { "class": "clr-i-outline--alerted clr-i-outline-path-1--alerted", "x": 10, "y": 17, "width": 14, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline--alerted clr-i-outline-path-2--alerted", "x": 6, "y": 25, "width": 2, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline--alerted clr-i-outline-path-3--alerted", "x": 10, "y": 25, "width": 14, "height": 2 }), mithril_1.default("path", { "class": "clr-i-outline--alerted clr-i-outline-path-4--alerted", "d": "M18.64,11A3.65,3.65,0,0,1,19,9.89L19.56,9H10v2Z" }), mithril_1.default("path", { "class": "clr-i-outline--alerted clr-i-outline-path-5--alerted", "d": "M33.68,15.4H32V21H4V15H20.58A3.67,3.67,0,0,1,19,13.56a3.63,3.63,0,0,1-.26-.56H4V7H20.71l1.15-2H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V15.38ZM4,29V23H32v6Z" }), mithril_1.default("path", { "class": "clr-i-outline--alerted clr-i-outline-path-6--alerted clr-i-alert", "d": "M26.85,1.14,21.13,11A1.28,1.28,0,0,0,22.23,13H33.68A1.28,1.28,0,0,0,34.78,11L29.06,1.14A1.28,1.28,0,0,0,26.85,1.14Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = RackServerOutlineAlerted;
