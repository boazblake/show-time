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
var CollapseCardSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "collapse-card-solid"), mithril_1.default("rect", { "x": 2, "y": 22, "width": 32, "height": 8, "rx": 1, "ry": 1, "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M18,20.7l-5.79-5.79a1,1,0,0,1,0-1.41,1,1,0,0,1,1.41,0L18,17.87l4.38-4.37a1,1,0,0,1,1.41,0,1,1,0,0,1,0,1.41Z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("path", { "d": "M18,14.5,12.21,8.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0L18,11.67l4.38-4.38a1,1,0,0,1,1.41,0,1,1,0,0,1,0,1.42Z", "class": "clr-i-solid clr-i-solid-path-3" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = CollapseCardSolid;
