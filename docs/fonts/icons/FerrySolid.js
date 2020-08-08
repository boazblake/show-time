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
var FerrySolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "ferry-solid"), mithril_1.default("path", { "d": "M28.2,25c-1.2,0-2.4,0.4-3.3,1.2c-1.2,1.1-3,1.1-4.1,0c-1.9-1.6-4.6-1.6-6.5,0c-1.2,1.1-2.9,1.1-4.1,0\n\t\tc-0.9-0.8-2-1.2-3.2-1.2c-1.2,0-2.3,0.4-3.2,1.2C3.4,26.7,2.7,27,2,27v2c1.1-0.1,2.2-0.5,3.1-1.2C5.6,27.3,6.3,27,7,27\n\t\tc0.7,0,1.5,0.3,2,0.8c1.9,1.6,4.7,1.6,6.6,0c0.6-0.5,1.3-0.8,2.1-0.8c0.8,0,1.5,0.3,2.1,0.8c1.9,1.6,4.7,1.6,6.5,0\n\t\tc0.6-0.5,1.3-0.8,2.1-0.8c0.8,0,1.6,0.3,2.1,0.8c0.9,0.8,2.2,1.3,3.4,1.2v-2c-0.8,0-1.6-0.3-2.2-0.8C30.7,25.4,29.5,25,28.2,25z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M5.8,23.2v-3.3h26.1L28.4,23h0.2c0.8,0,1.6,0.2,2.2,0.5l2.5-2.2l0.1-0.2c0.7-0.9,0.5-2.1-0.4-2.8c-0.3-0.3-0.8-0.4-1.2-0.4\n\t\th-4.1l-5.4-7h-5.5c-1.7,0-3,1.3-3,3h-2V8H6v6.2c-1.2,0.4-2.1,1.5-2.1,2.8l0,7.2l0.1,0C4.5,23.7,5.1,23.4,5.8,23.2z M17.9,14h4.2\n\t\tl1.4,2h-5.7V14z M7.9,10h2v4h-2V10z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = FerrySolid;
