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
var AssignUserSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "assign-user-solid"), mithril_1.default("circle", { "cx": 17.99, "cy": 10.36, "r": 6.81, "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M12,26.65a2.8,2.8,0,0,1,4.85-1.8L20.71,29l6.84-7.63A16.81,16.81,0,0,0,18,18.55,16.13,16.13,0,0,0,5.5,24a1,1,0,0,0-.2.61V30a2,2,0,0,0,1.94,2h8.57l-3.07-3.3A2.81,2.81,0,0,1,12,26.65Z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("path", { "d": "M28.76,32a2,2,0,0,0,1.94-2V26.24L25.57,32Z", "class": "clr-i-solid clr-i-solid-path-3" }), mithril_1.default("path", { "d": "M33.77,18.62a1,1,0,0,0-1.42.08l-11.62,13-5.2-5.59A1,1,0,0,0,14.12,26a1,1,0,0,0,0,1.42l6.68,7.2L33.84,20A1,1,0,0,0,33.77,18.62Z", "class": "clr-i-solid clr-i-solid-path-4" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = AssignUserSolid;
