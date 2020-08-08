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
var MediaChangerOutlineBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "media-changer-outline-badged"), mithril_1.default("g", { "id": "fec5729f-304f-41fd-9533-e6b90aa63014", "data-name": "Layer 3" }, mithril_1.default("rect", { "x": 20, "y": 18, "width": 2, "height": 2 }), mithril_1.default("rect", { "x": 24, "y": 18, "width": 2, "height": 2 }), mithril_1.default("rect", { "x": 20, "y": 22, "width": 2, "height": 2 }), mithril_1.default("rect", { "x": 24, "y": 22, "width": 2, "height": 2 }), mithril_1.default("rect", { "x": 8.81, "y": 10, "width": 8.14, "height": 2 }), mithril_1.default("rect", { "x": 8.81, "y": 14, "width": 8.14, "height": 2 }), mithril_1.default("rect", { "x": 8.81, "y": 18, "width": 8.14, "height": 2 }), mithril_1.default("rect", { "x": 8.81, "y": 22, "width": 8.14, "height": 2 }), mithril_1.default("rect", { "x": 8.81, "y": 26, "width": 8.14, "height": 2 }), mithril_1.default("path", { "d": "M20,14a.8.8,0,1,0,1.59,0V11.6H25A7.74,7.74,0,0,1,23.66,10H20Z" }), mithril_1.default("path", { "d": "M30,13.5h0V30H6V6H22.5V6a7.37,7.37,0,0,1,.28-2H6A2,2,0,0,0,4,6V30a2,2,0,0,0,2,2H7.88v1.57a1,1,0,0,0,2,0V32h16v1.57a1,1,0,0,0,2,0V32H30a2,2,0,0,0,2-2V13.22A7.37,7.37,0,0,1,30,13.5Z" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "fill": "#e62700" })));
    } };
exports.default = MediaChangerOutlineBadged;
