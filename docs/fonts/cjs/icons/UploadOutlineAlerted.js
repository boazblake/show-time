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
var UploadOutlineAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "upload-outline-alerted"), mithril_1.default("path", { "class": "clr-i-outline--alerted clr-i-outline-path-1--alerted", "d": "M31,31H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h26c0.6,0,1-0.4,1-1S31.6,31,31,31z" }), mithril_1.default("path", { "class": "clr-i-outline--alerted clr-i-outline-path-1--alerted", "d": "M8.8,15L17,6.8v20.6c0,0.6,0.4,1,1,1s1-0.4,1-1V6.8L20.1,8l1-1.8L18,3L7.4,13.6C7,14,6.9,14.6,7.2,15s1,0.5,1.4,0.1C8.7,15.1,8.8,15.1,8.8,15z" }), mithril_1.default("path", { "class": "clr-i-outline--alerted clr-i-outline-path-1--alerted clr-i-alert", "d": "M26.9,1.1L21.1,11c-0.4,0.6-0.2,1.4,0.3,1.8c0.2,0.2,0.5,0.2,0.8,0.2h11.5c0.7,0,1.3-0.5,1.3-1.2c0-0.3-0.1-0.5-0.2-0.8l-5.7-9.9c-0.4-0.6-1.1-0.8-1.8-0.5C27.1,0.8,27,1,26.9,1.1z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = UploadOutlineAlerted;
