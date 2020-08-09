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
var MicrophoneMuteSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "microphone-mute-solid"), mithril_1.default("path", { "d": "M30,17h-2c0,1.8-0.5,3.5-1.4,5l1.5,1.5C29.3,21.5,29.9,19.3,30,17z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M25,17V9c0-3.9-3.2-7-7.1-6.9c-2.9,0-5.6,1.9-6.5,4.7l13,13C24.8,18.9,25,17.9,25,17z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("path", { "d": "M25.2,26.6l6.9,6.9l1.4-1.4L4,2.6L2.6,4l8.4,8.4V17c0,3.9,3.1,7,7,7c1.3,0,2.5-0.3,3.6-1l2.2,2.2C22.1,26.4,20.1,27,18,27\n\t\tc-5.4,0.2-9.8-4.1-10-9.4c0-0.2,0-0.4,0-0.6H6c0.1,6.2,4.8,11.4,11,12v3h-3c-0.6,0-1,0.4-1,1s0.4,1,1,1h8c0.6,0,1-0.4,1-1\n\t\ts-0.4-1-1-1h-3v-3C21.2,28.8,23.4,28,25.2,26.6z", "class": "clr-i-solid clr-i-solid-path-3" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = MicrophoneMuteSolid;
