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
var ECheckSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "e-check-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M34,8H12.91a8.61,8.61,0,0,1,1.2,4.39,8,8,0,0,1-7.78,8.27A7.51,7.51,0,0,1,1,18.41V27a1,1,0,0,0,1,1H34a1,1,0,0,0,1-1V9A1,1,0,0,0,34,8ZM31,23H20V21H31Zm0-5H16V16H31Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-2", "d": "M6.57,18.68A6,6,0,0,1,.4,12.44v0A6,6,0,0,1,6.27,6.14,5.68,5.68,0,0,1,12,12.06a1.29,1.29,0,0,1-1.3,1.32H3.15a3.35,3.35,0,0,0,3.46,3,4.32,4.32,0,0,0,2.84-1,1,1,0,0,1,.71-.25,1.08,1.08,0,0,1,1.09,1.11,1.2,1.2,0,0,1-.36.84A6.17,6.17,0,0,1,6.57,18.68ZM9.3,11.55c-.18-1.77-1.23-3.16-3-3.16s-2.87,1.3-3.12,3.16Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ECheckSolid;
