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
var VmwAppOutlineBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "vmw-app-outline-badged"), mithril_1.default("polygon", { "points": "28 22 30 22 30 30 22 30 22 28 20 28 20 32 32 32 32 20 28 20 28 22", "class": "clr-i-outline--badged clr-i-outline-path-1--badged" }), mithril_1.default("polygon", { "points": "14 30 6 30 6 22 8 22 8 20 4 20 4 32 16 32 16 28 14 28 14 30", "class": "clr-i-outline--badged clr-i-outline-path-2--badged" }), mithril_1.default("polygon", { "points": "8 14 6 14 6 6 14 6 14 8 16 8 16 4 4 4 4 16 8 16 8 14", "class": "clr-i-outline--badged clr-i-outline-path-3--badged" }), mithril_1.default("rect", { "x": 11, "y": 11, "width": 6, "height": 6, "class": "clr-i-outline--badged clr-i-outline-path-4--badged" }), mithril_1.default("rect", { "x": 11, "y": 19, "width": 6, "height": 6, "class": "clr-i-outline--badged clr-i-outline-path-5--badged" }), mithril_1.default("rect", { "x": 19, "y": 19, "width": 6, "height": 6, "class": "clr-i-outline--badged clr-i-outline-path-6--badged" }), mithril_1.default("path", { "d": "M22,6h.5a7.49,7.49,0,0,1,.28-2H20V8h2Z", "class": "clr-i-outline--badged clr-i-outline-path-7--badged" }), mithril_1.default("path", { "d": "M30,13.5V14H28v2h4V13.22A7.49,7.49,0,0,1,30,13.5Z", "class": "clr-i-outline--badged clr-i-outline-path-8--badged" }), mithril_1.default("path", { "d": "M25,11.58a7.53,7.53,0,0,1-.58-.58H19v6h6Z", "class": "clr-i-outline--badged clr-i-outline-path-9--badged" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "class": "clr-i-outline--badged clr-i-outline-path-10--badged clr-i-badge" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = VmwAppOutlineBadged;
