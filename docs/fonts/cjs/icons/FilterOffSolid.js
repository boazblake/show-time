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
var FilterOffSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "filter-off-solid"), mithril_1.default("path", { "d": "M23.9,18.6L10.3,5.1h22.2C33.3,5,34,5.6,34,6.4c0,0,0,0,0,0.1v1.1c0,0.5-0.2,1-0.6,1.4L23.9,18.6z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M33.5,31L4.1,1.6L2.6,3l2.1,2.1H3.5C2.7,5,2,5.6,2,6.4c0,0,0,0,0,0.1v1.1c0,0.5,0.2,1,0.6,1.4L14,20.5v10.1l8,3.4V22.4\n\tl10.1,10.1L33.5,31z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = FilterOffSolid;
