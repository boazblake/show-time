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
var CompassSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "compass-solid"), mithril_1.default("path", { "d": "M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2ZM6.47,19H4.05c0-.33-.05-.66-.05-1s0-.67.05-1H6.47ZM17,4.05c.33,0,.66-.05,1-.05s.67,0,1,.05V6.47H17Zm2,27.9c-.33,0-.66.05-1,.05s-.67,0-1-.05V29.53h2Zm8-5.58a.59.59,0,0,1-.69.16L15.75,20.38,9.6,9.82c-.25-.47.39-1.1.86-.84l10.37,6.33h0l6.33,10.37A.59.59,0,0,1,27,26.37ZM29.53,19V17h2.42c0,.33.05.66.05,1s0,.67-.05,1Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("polygon", { "points": "16.77 19.35 24.35 23.77 19.8 16.33 16.77 19.35", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = CompassSolid;
