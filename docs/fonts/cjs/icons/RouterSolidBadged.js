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
var RouterSolidBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "router-solid-badged"), mithril_1.default("path", { "d": "M33.22,12.76A7.49,7.49,0,0,1,23.32,2.6a16,16,0,1,0,9.9,10.17ZM13.86,9.92a.8.8,0,0,1,1.13,0l2.21,2.19V5.93a.8.8,0,0,1,1.6,0v6.18L21,9.92a.8.8,0,1,1,1.13,1.14L18,15.15l-4.14-4.1A.8.8,0,0,1,13.86,9.92ZM10.32,21.74a.8.8,0,0,1-1.13,0L5,17.67l4.19-4.09a.8.8,0,1,1,1.12,1.14l-2.2,2.14h6.27a.8.8,0,0,1,0,1.6H8.11l2.2,2.15A.8.8,0,0,1,10.32,21.74Zm11.82,3.67a.8.8,0,0,1-1.13,0L18.8,23.23V29.4a.8.8,0,0,1-1.6,0V23.23L15,25.42a.8.8,0,1,1-1.13-1.14L18,20.18l4.14,4.1A.8.8,0,0,1,22.14,25.41Zm4.67-3.66a.8.8,0,1,1-1.12-1.14l2.2-2.15H21.63a.8.8,0,0,1,0-1.6h6.27l-2.2-2.14a.8.8,0,1,1,1.12-1.14L31,17.67Z", "class": "clr-i-solid--badged clr-i-solid-path-1--badged" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "class": "clr-i-solid--badged clr-i-solid-path-2--badged clr-i-badge" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = RouterSolidBadged;
