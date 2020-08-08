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
var MediaChangerSolidBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "media-changer-solid-badged"), mithril_1.default("g", { "id": "ba482146-b25b-4d24-a439-9c6f1761fba3", "data-name": "Layer 3" }, mithril_1.default("path", { "d": "M30,13.5a7.49,7.49,0,0,1-4-1.16V14H20V10h3.66A7.49,7.49,0,0,1,22.5,6a7.37,7.37,0,0,1,.28-2H6A2,2,0,0,0,4,6V30a2,2,0,0,0,2,2H7.88v1.57a1,1,0,0,0,2,0V32h16v1.57a1,1,0,0,0,2,0V32H30a2,2,0,0,0,2-2V13.22A7.37,7.37,0,0,1,30,13.5ZM17,28H8.81V26H17Zm0-4H8.81V22H17Zm0-4H8.81V18H17Zm0-4H8.81V14H17Zm0-4H8.81V10H17ZM22,24H20V22h2Zm0-4H20V18h2Zm4,4H24V22h2Zm0-4H24V18h2Z" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "fill": "#e62700" })));
    } };
exports.default = MediaChangerSolidBadged;
