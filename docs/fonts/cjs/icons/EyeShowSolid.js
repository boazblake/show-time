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
var EyeShowSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "eye-show-solid"), mithril_1.default("path", { "d": "M33.62,17.53c-3.37-6.23-9.28-10-15.82-10S5.34,11.3,2,17.53L1.72,18l.26.48c3.37,6.23,9.28,10,15.82,10s12.46-3.72,15.82-10l.26-.48ZM17.8,26.43C12.17,26.43,7,23.29,4,18c3-5.29,8.17-8.43,13.8-8.43S28.54,12.72,31.59,18C28.54,23.29,23.42,26.43,17.8,26.43Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("circle", { "cx": 18.09, "cy": 18.03, "r": 6.86, "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = EyeShowSolid;
