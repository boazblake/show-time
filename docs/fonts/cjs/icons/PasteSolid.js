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
var PasteSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "paste-solid"), mithril_1.default("path", { "d": "M30,12H26v2h4v2h2V14A2,2,0,0,0,30,12Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("rect", { "x": 30, "y": 18, "width": 2, "height": 6, "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("path", { "d": "M30,30H28v2h2a2,2,0,0,0,2-2V26H30Z", "class": "clr-i-solid clr-i-solid-path-3" }), mithril_1.default("rect", { "x": 4, "y": 4, "width": 20, "height": 20, "rx": 2, "ry": 2, "class": "clr-i-solid clr-i-solid-path-4" }), mithril_1.default("rect", { "x": 20, "y": 30, "width": 6, "height": 2, "class": "clr-i-solid clr-i-solid-path-5" }), mithril_1.default("path", { "d": "M14,26H12v4a2,2,0,0,0,2,2h4V30H14Z", "class": "clr-i-solid clr-i-solid-path-6" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = PasteSolid;
