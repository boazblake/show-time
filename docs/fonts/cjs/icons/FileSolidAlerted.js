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
var FileSolidAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "file-solid-alerted"), mithril_1.default("path", { "class": "clr-i-solid--alerted clr-i-solid-path-1--alerted", "d": "M22.2,15.4c-2,0-3.7-1.6-3.7-3.6c0-0.7,0.2-1.3,0.5-1.9l3.2-5.5L21.9,4H7.8C6.8,4,6,4.9,6,5.9v24.2c0,1,0.8,1.9,1.8,1.9h20.3c1,0,1.8-0.9,1.8-1.9V15.4H22.2z" }), mithril_1.default("path", { "class": "clr-i-solid--alerted clr-i-solid-path-2--alerted clr-i-alert", "d": "M26.9,1.1L21.1,11c-0.4,0.6-0.2,1.4,0.3,1.8c0.2,0.2,0.5,0.2,0.8,0.2h11.5c0.7,0,1.3-0.5,1.3-1.2c0-0.3-0.1-0.5-0.2-0.8l-5.7-9.9c-0.4-0.6-1.1-0.8-1.8-0.5C27.1,0.8,27,1,26.9,1.1z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = FileSolidAlerted;
