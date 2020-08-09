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
var RubleLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "ruble-line"), mithril_1.default("path", { "d": "M20.57,20A8.23,8.23,0,0,0,29,12a8.23,8.23,0,0,0-8.43-8H12a1,1,0,0,0-1,1V18H9a1,1,0,0,0,0,2h2v2H9a1,1,0,0,0,0,2h2v7a1,1,0,0,0,2,0V24h9a1,1,0,0,0,0-2H13V20ZM13,6h7.57A6.24,6.24,0,0,1,27,12a6.23,6.23,0,0,1-6.43,6H13Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = RubleLine;
