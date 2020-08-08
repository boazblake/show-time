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
var AlarmOffSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "alarm-off-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M31.47,3.84a5.78,5.78,0,0,0-7.37-.63,16.08,16.08,0,0,1,8.2,7.65A5.73,5.73,0,0,0,31.47,3.84Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-2", "d": "M11.42,3.43a5.8,5.8,0,0,0-5.77-.82L8.33,5.3A16,16,0,0,1,11.42,3.43Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-3", "d": "M24.92,21.94l4.34,4.36A14,14,0,0,0,9.75,6.73L17,14V9.69a1,1,0,0,1,2,0V16l2.33,2.34L25,20.1a1,1,0,0,1,.47,1.33A1,1,0,0,1,24.92,21.94Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-4", "d": "M1.61,4.21,2.73,5.34a5.73,5.73,0,0,0,.67,6.15A15.88,15.88,0,0,1,5.48,8.1L6.91,9.52A13.94,13.94,0,0,0,8.11,27.88L5.56,30.43A1,1,0,1,0,7,31.84l2.66-2.66a13.89,13.89,0,0,0,16.83,0l4.16,4.17L32,31.9,3,2.8Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = AlarmOffSolid;
