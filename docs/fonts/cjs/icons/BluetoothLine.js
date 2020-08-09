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
var BluetoothLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "bluetooth-line"), mithril_1.default("path", { "d": "M26.64,25.27,19,17.53,19,3,25.21,9.4l-5.65,5.79L21,16.62l5.68-5.82a2,2,0,0,0,0-2.78L20.48,1.7A2.08,2.08,0,0,0,18.85,1,2,2,0,0,0,17,3V15.38L10.05,8.27A1,1,0,0,0,8.62,9.66L16.79,18,9.06,26a1,1,0,0,0,0,1.41,1,1,0,0,0,.7.29,1,1,0,0,0,.72-.31L17,20.68V33a2.07,2.07,0,0,0,.71,1.62A2,2,0,0,0,19,35a1.94,1.94,0,0,0,1.42-.6l6.23-6.38A2,2,0,0,0,26.64,25.27ZM19,33.05V20.29l6.21,6.36Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = BluetoothLine;
