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
var PaintRollerLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "paint-roller-line"), mithril_1.default("path", { "d": "M31,10V4a2,2,0,0,0-2-2H6A2,2,0,0,0,4,4v6a2,2,0,0,0,2,2H29A2,2,0,0,0,31,10ZM6,4H29v6H6Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M33,6H32v6.29L18.7,16.54a1,1,0,0,0-.7,1V19H16V33a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V19H20v-.73L33.3,14a1,1,0,0,0,.7-1V7A1,1,0,0,0,33,6ZM20,33H18V21h2Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = PaintRollerLine;
