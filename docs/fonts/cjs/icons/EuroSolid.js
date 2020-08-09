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
var EuroSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "euro-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm7.42,25.16A10.88,10.88,0,0,1,9.23,21H5.84a1,1,0,0,1,0-2h3c0-.35-.05-.71-.05-1.07s0-.63,0-.93h-3a1,1,0,0,1,0-2H9.19A10.86,10.86,0,0,1,25.38,8.69a1.25,1.25,0,0,1-1.32,2.12A8.36,8.36,0,0,0,11.82,15h9.36a1,1,0,0,1,0,2H11.33a7.72,7.72,0,0,0,0,2h9.82a1,1,0,0,1,0,2H11.87a8.36,8.36,0,0,0,12.22,4,1.25,1.25,0,1,1,1.33,2.12Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = EuroSolid;
