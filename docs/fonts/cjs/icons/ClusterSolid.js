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
var ClusterSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "cluster-solid"), mithril_1.default("path", { "d": "M31.36,8H27.5V32H33V9.67A1.65,1.65,0,0,0,31.36,8Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M3,9.67V32H8.5V8H4.64A1.65,1.65,0,0,0,3,9.67Z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("path", { "d": "M24.32,4H11.68A1.68,1.68,0,0,0,10,5.68V32H26V5.68A1.68,1.68,0,0,0,24.32,4ZM18,27.79A1.79,1.79,0,1,1,19.81,26,1.8,1.8,0,0,1,18,27.79ZM23,10.6H13V9H23Z", "class": "clr-i-solid clr-i-solid-path-3" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ClusterSolid;
