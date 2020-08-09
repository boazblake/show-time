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
var ExpandCardSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "expand-card-solid"), mithril_1.default("path", { "d": "M33,6H3A1,1,0,0,0,2,7V29a1,1,0,0,0,1,1H33a1,1,0,0,0,1-1V7A1,1,0,0,0,33,6ZM23.79,21.41a1,1,0,0,1-1.41,0L18,17l-4.38,4.38a1,1,0,0,1-1.41,0,1,1,0,0,1,0-1.42L18,14.2,23.79,20A1,1,0,0,1,23.79,21.41Zm0-6.2a1,1,0,0,1-1.41,0L18,10.83l-4.38,4.38a1,1,0,0,1-1.41,0,1,1,0,0,1,0-1.42L18,8l5.79,5.79A1,1,0,0,1,23.79,15.21Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ExpandCardSolid;
