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
var ListOutlineBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "list-outline-badged"), mithril_1.default("rect", { "x": 15, "y": 12, "width": 9, "height": 2, "class": "clr-i-outline--badged clr-i-outline-path-1--badged" }), mithril_1.default("rect", { "x": 15, "y": 16, "width": 9, "height": 2, "class": "clr-i-outline--badged clr-i-outline-path-2--badged" }), mithril_1.default("rect", { "x": 15, "y": 20, "width": 9, "height": 2, "class": "clr-i-outline--badged clr-i-outline-path-3--badged" }), mithril_1.default("rect", { "x": 15, "y": 24, "width": 9, "height": 2, "class": "clr-i-outline--badged clr-i-outline-path-4--badged" }), mithril_1.default("rect", { "x": 11, "y": 8, "width": 2, "height": 2, "class": "clr-i-outline--badged clr-i-outline-path-5--badged" }), mithril_1.default("rect", { "x": 11, "y": 12, "width": 2, "height": 2, "class": "clr-i-outline--badged clr-i-outline-path-6--badged" }), mithril_1.default("rect", { "x": 11, "y": 16, "width": 2, "height": 2, "class": "clr-i-outline--badged clr-i-outline-path-7--badged" }), mithril_1.default("rect", { "x": 11, "y": 20, "width": 2, "height": 2, "class": "clr-i-outline--badged clr-i-outline-path-8--badged" }), mithril_1.default("rect", { "x": 11, "y": 24, "width": 2, "height": 2, "class": "clr-i-outline--badged clr-i-outline-path-9--badged" }), mithril_1.default("path", { "d": "M15,8v2h8.66a7.45,7.45,0,0,1-.89-2Z", "class": "clr-i-outline--badged clr-i-outline-path-10--badged" }), mithril_1.default("path", { "d": "M28,13.22V32H8V4H22.78a7.45,7.45,0,0,1,.88-2H8A2,2,0,0,0,6,4V32a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V13.5A7.49,7.49,0,0,1,28,13.22Z", "class": "clr-i-outline--badged clr-i-outline-path-11--badged" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "class": "clr-i-outline--badged clr-i-outline-path-12--badged clr-i-badge" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ListOutlineBadged;
