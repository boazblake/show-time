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
var VmLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "vm-line"), mithril_1.default("path", { "d": "M11,5H25V8h2V5a2,2,0,0,0-2-2H11A2,2,0,0,0,9,5v6.85h2Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M30,10H17v2h8v6h2V12h3V26H22V17a2,2,0,0,0-2-2H6a2,2,0,0,0-2,2V31a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V28h8a2,2,0,0,0,2-2V12A2,2,0,0,0,30,10ZM6,31V17H20v9H16V20H14v6a2,2,0,0,0,2,2h4v3Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = VmLine;
