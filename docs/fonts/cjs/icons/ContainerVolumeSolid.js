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
var ContainerVolumeSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "container-volume-solid"), mithril_1.default("path", { "d": "M32,18H18a2,2,0,0,0-2,2V32a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V20A2,2,0,0,0,32,18ZM18,32V20H32V32Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M21,21.7a.7.7,0,0,0-.7.7v7.49a.7.7,0,0,0,1.4,0V22.4A.7.7,0,0,0,21,21.7Z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("path", { "d": "M25,21.82a.7.7,0,0,0-.7.7V30a.7.7,0,1,0,1.4,0V22.52A.7.7,0,0,0,25,21.82Z", "class": "clr-i-solid clr-i-solid-path-3" }), mithril_1.default("path", { "d": "M29,21.7a.7.7,0,0,0-.7.7v7.49a.7.7,0,1,0,1.4,0V22.4A.7.7,0,0,0,29,21.7Z", "class": "clr-i-solid clr-i-solid-path-4" }), mithril_1.default("path", { "d": "M18,16H28V8.12c0-1.68-5.38-3-12-3S4,6.44,4,8.12V28c0,1.5,4.33,2.75,10,3V25.22a29.17,29.17,0,0,1-8-1.29V22.44l.24.1A26.63,26.63,0,0,0,14,23.82V20a4,4,0,0,1,.29-1.47A29.19,29.19,0,0,1,6,17.23V15.75l.24.09a29,29,0,0,0,9,1.32h0A4,4,0,0,1,18,16ZM6,10.54V9.05l.24.09A30.12,30.12,0,0,0,16,10.47,28.33,28.33,0,0,0,26,9.05v1.5a32.53,32.53,0,0,1-10,1.32A32.44,32.44,0,0,1,6,10.54Z", "class": "clr-i-solid clr-i-solid-path-5" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ContainerVolumeSolid;
