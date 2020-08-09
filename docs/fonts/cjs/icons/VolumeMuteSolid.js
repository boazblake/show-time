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
var VolumeMuteSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "volume-mute-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M24.87,6.69A12.42,12.42,0,0,1,28.75,26.3l1.42,1.42A14.43,14.43,0,0,0,25.74,4.88a1,1,0,0,0-.87,1.8Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-2", "d": "M27.3,27.67h0l-3.84-3.84-.57-.57h0L4.63,5,3.21,6.41,8.8,12H3a1,1,0,0,0-1,1V23a1,1,0,0,0,1,1H8.83l9.51,8.3A1,1,0,0,0,20,31.55V23.2l5.59,5.59c-.17.1-.34.2-.51.29a1,1,0,0,0,.9,1.79c.37-.19.72-.4,1.08-.62l2.14,2.14L30.61,31l-3.25-3.25Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-3", "d": "M22.69,12.62A6.27,6.27,0,0,1,25.8,18a6.17,6.17,0,0,1-1.42,3.92l1.42,1.42a8.16,8.16,0,0,0,2-5.34,8.28,8.28,0,0,0-4.1-7.11,1,1,0,1,0-1,1.73Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-4", "d": "M20,4.62a1,1,0,0,0-1.66-.75l-6.42,5.6L20,17.54Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = VolumeMuteSolid;
