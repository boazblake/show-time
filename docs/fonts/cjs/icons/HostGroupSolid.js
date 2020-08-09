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
var HostGroupSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "host-group-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M15.08,31 L1.08,31 C0.513427197,31.0015564 0.0419663765,30.5650186 0,30 L0,9 C0,8.40353247 0.48353247,7.92 1.08,7.92 L15.08,7.92 C15.6764675,7.92 16.16,8.40353247 16.16,9 L16.16,30 C16.1180336,30.5650186 15.6465728,31.0015564 15.08,31 Z M4.08,11.96 L4.08,13.96 L12.08,13.96 L12.08,11.96 L4.08,11.96 Z M7.08,24.88 L7.08,27.04 L9.08,27.04 L9.08,24.88 L7.08,24.88 Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-2", "d": "M20.1,24.81 L18.1,24.81 L18.1,6 L6.1,6 L6.1,4 L19.1,4 C19.6522847,4 20.1,4.44771525 20.1,5 L20.1,24.81 Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-3", "d": "M24.08,20 L22.08,20 L22.08,2 L11.08,2 L11.08,0 L23.08,0 C23.6322847,0 24.08,0.44771525 24.08,1 L24.08,20 Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = HostGroupSolid;
