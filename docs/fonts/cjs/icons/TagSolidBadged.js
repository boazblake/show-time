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
var TagSolidBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "tag-solid-badged"), mithril_1.default("path", { "d": "M31.93,19.2,17.33,4.6A2,2,0,0,0,15.92,4L6,4A2,2,0,0,0,4,6l0,9.92a2,2,0,0,0,.59,1.41l14.6,14.6a2,2,0,0,0,2.83,0l9.9-9.9A2,2,0,0,0,31.93,19.2ZM9.65,11.31a1.66,1.66,0,1,1,1.66-1.66A1.66,1.66,0,0,1,9.65,11.31Z", "class": "clr-i-solid--badged clr-i-solid-path-1--badged" }), mithril_1.default("circle", { "cx": 30, "cy": 6.33, "r": 5, "class": "clr-i-solid--badged clr-i-solid-path-2--badged clr-i-badge" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = TagSolidBadged;
