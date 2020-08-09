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
var BluetoothSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "bluetooth-solid"), mithril_1.default("path", { "d": "M26.52,24.52l-5.65-5.83-1.46-1.5v-12L23.79,9.7l-3.6,3.71,2.24,2.29,4.09-4.22a2.54,2.54,0,0,0,0-3.56L20.57,1.78A2.54,2.54,0,0,0,16.2,3.55V13.86l-5.53-5.7a1.6,1.6,0,1,0-2.3,2.23L15.75,18l-7,7.19a1.6,1.6,0,0,0,0,2.26,1.63,1.63,0,0,0,1.12.45,1.58,1.58,0,0,0,1.15-.49l5.11-5.27V32.45a2.53,2.53,0,0,0,1.59,2.36,2.44,2.44,0,0,0,.95.19,2.56,2.56,0,0,0,1.83-.77l5.95-6.15A2.54,2.54,0,0,0,26.52,24.52ZM19.4,30.83V21.77l4.39,4.53Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = BluetoothSolid;
