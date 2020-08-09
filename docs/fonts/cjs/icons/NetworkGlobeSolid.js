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
var NetworkGlobeSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "network-globe-solid"), mithril_1.default("path", { "d": "M26.58,32h-18a1,1,0,1,0,0,2h18a1,1,0,0,0,0-2Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M14.72,9.87a2.25,2.25,0,0,1-.47,1.77,16,16,0,0,0,4.93,5.23c.34.23.69.43,1,.63a2.28,2.28,0,0,1,2.58-.57,16.9,16.9,0,0,0,3.11-7A17,17,0,0,0,14.72,9.87Z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("path", { "d": "M17.75,2a14,14,0,0,0-14,14c0,.45,0,.89.07,1.33l0,0h0A14,14,0,1,0,17.75,2ZM28.1,21.09a17.41,17.41,0,0,1-4.32-.56,2.29,2.29,0,0,1-3,.62,18.43,18.43,0,0,1-7,3.5,2.34,2.34,0,0,1-1.57,1.79l-.29.06a11.93,11.93,0,0,1-3.39-2.8l.66,0a2.33,2.33,0,0,1,4.37-.58A16.94,16.94,0,0,0,19.78,20a2.32,2.32,0,0,1-.18-1.17c-.42-.24-.84-.49-1.25-.76A17.53,17.53,0,0,1,13,12.47a2.31,2.31,0,0,1-2.28-.63,27.31,27.31,0,0,0-5,4.74c0-.2,0-.39,0-.57a12,12,0,0,1,.14-1.73,18.75,18.75,0,0,1,4.2-3.8,2.28,2.28,0,0,1,1.1-2.25c-.12-.43-.24-.86-.33-1.3,0-.14,0-.29-.11-.64a12,12,0,0,1,1.37-.87c.1.59.14.9.21,1.21s.2.85.32,1.27l.25,0A2.33,2.33,0,0,1,14,8.53a18.51,18.51,0,0,1,12.11-.07c0-.32,0-.65,0-1h0a12,12,0,0,1,2.62,3.85h0q-.73-.43-1.48-.78a18.4,18.4,0,0,1-3.39,7.37,2.33,2.33,0,0,1,.33,1.19,22,22,0,0,0,5,.45,11.88,11.88,0,0,1-.61,1.53Z", "class": "clr-i-solid clr-i-solid-path-3" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = NetworkGlobeSolid;
