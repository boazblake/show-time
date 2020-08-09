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
var LayersSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "layers-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M18,20.25a1,1,0,0,1-.43-.1l-15-7.09a1,1,0,0,1,0-1.81l15-7.09a1,1,0,0,1,.85,0l15,7.09a1,1,0,0,1,0,1.81l-15,7.09A1,1,0,0,1,18,20.25Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-2", "d": "M18,26.16a1,1,0,0,1-.43-.1L2.57,19a1,1,0,1,1,.85-1.81L18,24.06l14.57-6.89A1,1,0,1,1,33.43,19l-15,7.09A1,1,0,0,1,18,26.16Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-3", "d": "M18,32.07a1,1,0,0,1-.43-.1l-15-7.09a1,1,0,0,1,.85-1.81L18,30l14.57-6.89a1,1,0,1,1,.85,1.81L18.43,32A1,1,0,0,1,18,32.07Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = LayersSolid;
