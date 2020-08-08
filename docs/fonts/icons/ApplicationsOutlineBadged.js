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
var ApplicationsOutlineBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "applications-outline-badged"), mithril_1.default("polygon", { "points": "8 8 4 8 4 10 10 10 10 4 8 4 8 8", "class": "clr-i-outline--badged clr-i-outline-path-1--badged" }), mithril_1.default("polygon", { "points": "19 8 15 8 15 10 21 10 21 4 19 4 19 8", "class": "clr-i-outline--badged clr-i-outline-path-2--badged" }), mithril_1.default("polygon", { "points": "8 19 4 19 4 21 10 21 10 15 8 15 8 19", "class": "clr-i-outline--badged clr-i-outline-path-3--badged" }), mithril_1.default("polygon", { "points": "19 19 15 19 15 21 21 21 21 15 19 15 19 19", "class": "clr-i-outline--badged clr-i-outline-path-4--badged" }), mithril_1.default("polygon", { "points": "30 19 26 19 26 21 32 21 32 15 30 15 30 19", "class": "clr-i-outline--badged clr-i-outline-path-5--badged" }), mithril_1.default("polygon", { "points": "8 30 4 30 4 32 10 32 10 26 8 26 8 30", "class": "clr-i-outline--badged clr-i-outline-path-6--badged" }), mithril_1.default("polygon", { "points": "19 30 15 30 15 32 21 32 21 26 19 26 19 30", "class": "clr-i-outline--badged clr-i-outline-path-7--badged" }), mithril_1.default("polygon", { "points": "30 30 26 30 26 32 32 32 32 26 30 26 30 30", "class": "clr-i-outline--badged clr-i-outline-path-8--badged" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "class": "clr-i-outline--badged clr-i-outline-path-9--badged clr-i-badge" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ApplicationsOutlineBadged;
