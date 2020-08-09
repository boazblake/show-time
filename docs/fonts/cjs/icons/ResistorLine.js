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
var ResistorLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "resistor-line"), mithril_1.default("path", { "d": "M29.43,26.34h0A1.47,1.47,0,0,1,28,25.22L24.86,13.15,21.74,25.22a1.49,1.49,0,0,1-1.45,1.12h0a1.49,1.49,0,0,1-1.46-1.12L15.71,13.15,12.6,25.22a1.51,1.51,0,0,1-2.91,0L6.57,13.15,5.22,18.37H2a1,1,0,0,1,0-2H3.67l1.45-5.59A1.48,1.48,0,0,1,6.57,9.66h0A1.47,1.47,0,0,1,8,10.78l3.12,12.07,3.12-12.07a1.49,1.49,0,0,1,1.45-1.12h0a1.49,1.49,0,0,1,1.46,1.12l3.12,12.07,3.12-12.07a1.5,1.5,0,0,1,2.9,0l3.12,12.07,1.35-5.22H34a1,1,0,0,1,0,2H32.33l-1.45,5.59A1.48,1.48,0,0,1,29.43,26.34Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ResistorLine;
