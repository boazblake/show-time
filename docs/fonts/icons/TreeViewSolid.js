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
var TreeViewSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "tree-view-solid"), mithril_1.default("rect", { "x": 10, "y": 26, "width": 6, "height": 6, "rx": 1, "ry": 1, "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M15,16H11a1,1,0,0,0-1,1v1.2H5.8V12H7a1,1,0,0,0,1-1V7A1,1,0,0,0,7,6H3A1,1,0,0,0,2,7v4a1,1,0,0,0,1,1H4.2V29.8H11a.8.8,0,1,0,0-1.6H5.8V19.8H10V21a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V17A1,1,0,0,0,15,16Z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("path", { "d": "M33,8H10v2H33a1,1,0,0,0,0-2Z", "class": "clr-i-solid clr-i-solid-path-3" }), mithril_1.default("path", { "d": "M33,18H18v2H33a1,1,0,0,0,0-2Z", "class": "clr-i-solid clr-i-solid-path-4" }), mithril_1.default("path", { "d": "M33,28H18v2H33a1,1,0,0,0,0-2Z", "class": "clr-i-solid clr-i-solid-path-5" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = TreeViewSolid;
