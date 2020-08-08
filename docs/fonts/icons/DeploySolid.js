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
var DeploySolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "deploy-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M33,2H22.1a1,1,0,0,0,0,2h8.53l-8.82,9a1,1,0,1,0,1.43,1.4L32,5.46V13.9a1,1,0,0,0,2,0V3A1,1,0,0,0,33,2Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-2", "d": "M12.46,10.73a1,1,0,0,0-1,0l-8.68,5L12,21l9.19-5.26Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-3", "d": "M2,27.73a1,1,0,0,0,.5.87L11,33.46v-11L2,17.28Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-4", "d": "M13,33.46l8.5-4.86a1,1,0,0,0,.5-.87V17.29l-9,5.15Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = DeploySolid;
