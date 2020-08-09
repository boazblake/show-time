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
var RadarSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "radar-solid"), mithril_1.default("path", { "d": "M32,18c0,7.7-6.2,14-14,14S4,25.8,4,18c0-7.4,5.7-13.5,13.1-14v3.7c-5.7,0.5-9.8,5.5-9.3,11.2s5.5,9.8,11.2,9.3\n\t\tc5.3-0.5,9.3-4.9,9.3-10.2h-2c0,4.6-3.7,8.3-8.3,8.3S9.7,22.6,9.7,18c0-4.2,3.2-7.8,7.3-8.2v4.4c-2.1,0.6-3.4,2.7-2.9,4.9\n\t\tc0.6,2.1,2.7,3.4,4.9,2.9c2.1-0.6,3.4-2.7,2.9-4.9c-0.4-1.4-1.5-2.5-2.9-2.9V2c-0.4,0-0.7,0-1.1,0c-8.8,0-16,7.2-16,16\n\t\tc0,8.8,7.2,16,16,16s16-7.2,16-16c0,0,0,0,0,0H32z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = RadarSolid;
