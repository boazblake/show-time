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
var HeatMapSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "heat-map-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M 34 7 L 34 29 C 34 30.105 33.105 31 32 31 L 4 31 C 2.896 31 2 30.105 2 29 L 2 7 C 2 5.896 2.896 5 4 5 L 32 5 C 33.105 5 34 5.896 34 7 Z M 8 26 L 28 26 L 28 10 L 8 10 Z M 10 19 L 14 19 L 14 24 L 10 24 Z M 22 24 L 22 19 L 26 19 L 26 24 Z M 20 19 L 20 24 L 16 24 L 16 19 Z M 26 17 L 22 17 L 22 12 L 26 12 Z M 20 12 L 20 17 L 16 17 L 16 12 Z M 14 12 L 14 17 L 10 17 L 10 12 Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = HeatMapSolid;
