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
var UninstallLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "uninstall-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M11.29,26.72a1,1,0,0,0,1.41,0L18,21.49l5.3,5.23A1,1,0,0,0,24.7,25.3l-5.28-5.21,5.28-5.21a1,1,0,0,0-1.41-1.42L18,18.68l-5.3-5.23a1,1,0,0,0-1.41,1.42l5.28,5.21L11.3,25.3A1,1,0,0,0,11.29,26.72Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-2", "d": "M30.92,8H26.55a1,1,0,0,0,0,2H31V30H5V10H9.38a1,1,0,0,0,0-2H5.08A2,2,0,0,0,3,10V30a2,2,0,0,0,2.08,2H30.92A2,2,0,0,0,33,30V10A2,2,0,0,0,30.92,8Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = UninstallLine;
