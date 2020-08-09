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
var NetworkGlobeOutlineAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "network-globe-outline-alerted"), mithril_1.default("path", { "d": "M26.58,32h-18a1,1,0,1,0,0,2h18a1,1,0,0,0,0-2Z", "class": "clr-i-outline--alerted clr-i-outline-path-1--alerted" }), mithril_1.default("path", { "d": "M31.73,15.4h-2c0,.2,0,.4,0,.61a12,12,0,0,1-.53,3.52,16,16,0,0,1-5-.41,2.33,2.33,0,0,0-.33-1.19,18.87,18.87,0,0,0,1.62-2.52H23.83a17.29,17.29,0,0,1-1,1.54,2.28,2.28,0,0,0-2.58.57c-.35-.2-.7-.4-1-.63a16,16,0,0,1-4.93-5.23,2.25,2.25,0,0,0,.47-1.77A17.08,17.08,0,0,1,19.56,9l.87-1.51a18.59,18.59,0,0,0-6.39,1,2.33,2.33,0,0,0-1.14-.61l-.25,0c-.12-.42-.23-.84-.32-1.27s-.14-.81-.19-1.22A11.88,11.88,0,0,1,22,4.79L23,3A14,14,0,0,0,3.75,16c0,.45,0,.89.07,1.33l0,0h0A14,14,0,0,0,31.76,16C31.76,15.8,31.74,15.6,31.73,15.4Zm-21-9.13c0,.21.06.43.1.64.09.44.21.87.33,1.3a2.28,2.28,0,0,0-1.1,2.25A18.32,18.32,0,0,0,5.9,14.22,12,12,0,0,1,10.76,6.27Zm0,15.71A2.34,2.34,0,0,0,9.2,23.74l-.64,0A11.94,11.94,0,0,1,5.8,16.92l.11-.19a16.9,16.9,0,0,1,4.81-4.89,2.31,2.31,0,0,0,2.28.63,17.53,17.53,0,0,0,5.35,5.65c.41.27.83.52,1.25.76A2.32,2.32,0,0,0,19.78,20a16.94,16.94,0,0,1-6.2,3.11A2.34,2.34,0,0,0,10.76,22Zm7,6a11.92,11.92,0,0,1-5.81-1.51l.28-.06a2.34,2.34,0,0,0,1.57-1.79,18.43,18.43,0,0,0,7-3.5,2.29,2.29,0,0,0,3-.62,17.41,17.41,0,0,0,4.32.56l.53,0A12,12,0,0,1,17.75,28Z", "class": "clr-i-outline--alerted clr-i-outline-path-2--alerted" }), mithril_1.default("path", { "d": "M26.85,1.14,21.13,11A1.28,1.28,0,0,0,22.23,13H33.68A1.28,1.28,0,0,0,34.78,11L29.06,1.14A1.28,1.28,0,0,0,26.85,1.14Z", "class": "clr-i-outline--alerted clr-i-outline-path-3--alerted clr-i-alert" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = NetworkGlobeOutlineAlerted;
