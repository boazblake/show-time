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
var TwoWayArrowsLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "two-way-arrows-line"), mithril_1.default("path", { "d": "M23.43,16.83A1,1,0,0,0,22,18.24L25.72,22H7.83a1,1,0,0,0,0,2H25.72L22,27.7a1,1,0,1,0,1.42,1.41L29.53,23Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M13.24,18.45a1,1,0,0,0,.71-1.71L10.24,13H28.12a1,1,0,0,0,0-2H10.24l3.71-3.73a1,1,0,0,0-1.42-1.41L6.42,12l6.11,6.14A1,1,0,0,0,13.24,18.45Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = TwoWayArrowsLine;
