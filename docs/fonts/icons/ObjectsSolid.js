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
var ObjectsSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "objects-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M10.65,24.44a9.51,9.51,0,0,1,7.06-9.17L13,3a1,1,0,0,0-1.87,0L2.07,26.56A1,1,0,0,0,3,27.92h8.32A9.44,9.44,0,0,1,10.65,24.44Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-2", "d": "M32,10H20a1,1,0,0,0-1,1v4a9.43,9.43,0,0,1,10.63,9H32a1,1,0,0,0,1-1V11A1,1,0,0,0,32,10Z" }), mithril_1.default("circle", { "class": "clr-i-solid clr-i-solid-path-3", "cx": 20.15, "cy": 24.44, "r": 7.5 }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ObjectsSolid;
