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
var TreeSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "tree-solid"), mithril_1.default("path", { "d": "M18,2C10.8,1.7,4.8,7.3,4.5,14.5C4.2,21.7,9.8,27.7,17,28v-5.2l-5.2-5.2c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0\n\tc0,0,0,0,0,0l3.8,3.8v-6.2l-2.7-2.7c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0c0,0,0,0,0,0l3.3,3.3v3l3.3-3.3c0.4-0.4,1-0.4,1.4,0\n\tc0,0,0,0,0,0c0.4,0.4,0.4,1,0,1.4L19,18.8V28c7.2-0.3,12.8-6.3,12.5-13.5S25.2,1.7,18,2z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M18,28c-0.3,0-0.6,0-1,0v5c0,0.6,0.4,1,1,1s1-0.4,1-1v-5C18.7,28,18.3,28,18,28z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = TreeSolid;
