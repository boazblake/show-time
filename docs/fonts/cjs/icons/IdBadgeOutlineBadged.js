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
var IdBadgeOutlineBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "id-badge-outline-badged"), mithril_1.default("path", { "d": "M18,22a4.23,4.23,0,1,0-4.23-4.23A4.23,4.23,0,0,0,18,22Zm0-6.86a2.63,2.63,0,1,1-2.63,2.63A2.63,2.63,0,0,1,18,15.14Z", "class": "clr-i-outline--badged clr-i-outline-path-1--badged" }), mithril_1.default("path", { "d": "M22,4a2,2,0,0,0-2-2H16a2,2,0,0,0-2,2v7h8ZM20,9H16V4h4Z", "class": "clr-i-outline--badged clr-i-outline-path-2--badged" }), mithril_1.default("path", { "d": "M10.26,27a1.13,1.13,0,0,0-.26.73V30h1.6V27.87A8.33,8.33,0,0,1,18,25.29a8.33,8.33,0,0,1,6.4,2.59V30H26V27.7a1.12,1.12,0,0,0-.26-.73A9.9,9.9,0,0,0,18,23.69,9.9,9.9,0,0,0,10.26,27Z", "class": "clr-i-outline--badged clr-i-outline-path-3--badged" }), mithril_1.default("path", { "d": "M28,13.22V32H8V8h4V6H8A2,2,0,0,0,6,8V32a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V13.5A7.49,7.49,0,0,1,28,13.22Z", "class": "clr-i-outline--badged clr-i-outline-path-4--badged" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "class": "clr-i-outline--badged clr-i-outline-path-5--badged clr-i-badge" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = IdBadgeOutlineBadged;
