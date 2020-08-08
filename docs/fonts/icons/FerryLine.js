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
var FerryLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "ferry-line"), mithril_1.default("path", { "d": "M29,25.1c-1.2,0-2.3,0.4-3.3,1.1c0,0,0,0,0,0c-1.1,1.1-3,1.1-4.1,0c-0.9-0.8-2.1-1.2-3.3-1.2c-1.2,0-2.3,0.4-3.2,1.2\n\t\tc-1.2,1.1-3,1.1-4.2,0C10,25.4,8.8,25,7.6,25c-1.2,0-2.4,0.4-3.4,1.1C3.6,26.7,2.8,27,2,27v2c1.3,0.1,2.5-0.4,3.4-1.2\n\t\tC6.1,27.3,6.9,27,7.7,27c0.8,0,1.5,0.3,2.1,0.8c1.9,1.6,4.7,1.6,6.5,0c0.6-0.5,1.3-0.8,2.1-0.8c0.8,0,1.5,0.3,2.1,0.8\n\t\tc1.9,1.6,4.6,1.6,6.5,0c0.5-0.5,1.3-0.8,2-0.8c0.7,0,1.5,0.3,2,0.8c0.9,0.7,2,1.1,3.1,1.2v-1.9c-0.7,0-1.4-0.3-1.9-0.9\n\t\tC31.3,25.4,30.1,25,29,25.1z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M5.9,23.2V20H32l-3.5,3h0.2c0.8,0,1.6,0.2,2.2,0.5l2.5-2.2l0.2-0.2c0.5-0.6,0.5-1.4,0.2-2.1c-0.4-0.7-1-1-1.8-1h-4.4\n\t\tL22.5,11H17c-1.7,0-3,1.3-3,3h-2V8.1H6v6.1c-1.2,0.4-2,1.5-2,2.8v1.1V20v4.3l0.1-0.1C4.6,23.7,5.2,23.4,5.9,23.2z M8,10h2v4H8V10z\n\t\t M6,17c0-0.6,0.4-1,1-1h9v-2c0-0.6,0.4-1,1-1h5l0.6,1H18v2h5.8l1.2,2.1H6V17z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = FerryLine;
