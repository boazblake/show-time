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
var Accessibility2Solid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "accessibility-2-solid"), mithril_1.default("circle", { "cx": 17.96, "cy": 5, "r": 3, "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M30,10H6a1,1,0,0,0,0,2h8v8.36s0,0,0,0L10.11,33.17a1,1,0,0,0,.66,1.25,1.55,1.55,0,0,0,.29,0,1,1,0,0,0,1-.71l3.29-10.84h5.38L24,33.75a1,1,0,0,0,1,.71,1.55,1.55,0,0,0,.29,0,1,1,0,0,0,.66-1.25L22,20.4s0,0,0,0V12h8a1,1,0,0,0,0-2Z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = Accessibility2Solid;
