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
var BicycleSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "bicycle-solid"), mithril_1.default("path", { "d": "M15,21.9c-0.2-2-1.2-3.8-2.9-4.9l-2.5,4.9H15z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M7.2,23.4c-0.2-0.3-0.2-0.7,0-1l3.2-6.3c-0.6-0.2-1.2-0.2-1.8-0.2C5,15.9,2,18.8,2,22.4c0,3.6,2.9,6.5,6.5,6.5\n\tc3,0,5.6-2.1,6.3-5H8C7.7,23.9,7.3,23.7,7.2,23.4z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("path", { "d": "M19,21.9h-4c0,0.2,0,0.3,0,0.5c0,0.5-0.1,1-0.2,1.5H19V21.9z", "class": "clr-i-solid clr-i-solid-path-3" }), mithril_1.default("path", { "d": "M27.5,15.9c-0.3,0-0.6,0-0.9,0.1l2.4,6.6c0.2,0.5-0.1,1.1-0.6,1.3c-0.1,0-0.2,0.1-0.3,0.1c-0.4,0-0.8-0.3-0.9-0.7l-2.4-6.7\n\tc-3.2,1.6-4.5,5.5-3,8.7c1.6,3.2,5.5,4.5,8.7,3c3.2-1.6,4.5-5.5,3-8.7C32.2,17.3,30,15.9,27.5,15.9z", "class": "clr-i-solid clr-i-solid-path-4" }), mithril_1.default("path", { "d": "M24.7,16.7c0.6-0.3,1.3-0.5,1.9-0.6l-2.7-7.4C23.8,8.2,23.4,8,23,7.9h-3c-0.6,0-1,0.5-1,1.1c0,0.5,0.4,0.9,1,0.9\n\tc0,0,0,0,0,0h2.3l0.7,2h-9.6l-1.7-1.7C11.5,10.1,11.3,10,11,10H8c-0.6,0-1,0.4-1,1s0.4,1,1,1h2.6l1.2,1.2l-1.5,3\n\tc0.6,0.2,1.3,0.5,1.8,0.8l1.6-3.2h10L24.7,16.7z", "class": "clr-i-solid clr-i-solid-path-5" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = BicycleSolid;
