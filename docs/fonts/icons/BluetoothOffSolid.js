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
var BluetoothOffSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "bluetooth-off-solid"), mithril_1.default("path", { "d": "M19.31,5.17,23.7,9.7l-3.59,3.71,2.24,2.29,4.09-4.22a2.56,2.56,0,0,0,0-3.56l-6-6.14a2.51,2.51,0,0,0-2.77-.59,2.54,2.54,0,0,0-1.6,2.36v10l3.21,3.21Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M4.5,5,3.09,6.42,15.17,18.51,8.7,25.19A1.6,1.6,0,0,0,9.85,27.9,1.57,1.57,0,0,0,11,27.41l5.11-5.27V32.45a2.54,2.54,0,0,0,1.6,2.36,2.44,2.44,0,0,0,.95.19,2.55,2.55,0,0,0,1.82-.77l5.12-5.29,3.49,3.48L30.5,31ZM19.81,30.83V22.65l4,4Z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = BluetoothOffSolid;
