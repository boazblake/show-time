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
var ContainerLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "container-line"), mithril_1.default("path", { "d": "M32,30H4a2,2,0,0,1-2-2V8A2,2,0,0,1,4,6H32a2,2,0,0,1,2,2V28A2,2,0,0,1,32,30ZM4,8V28H32V8Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M9,25.3a.8.8,0,0,1-.8-.8v-13a.8.8,0,0,1,1.6,0v13A.8.8,0,0,1,9,25.3Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M14.92,25.3a.8.8,0,0,1-.8-.8v-13a.8.8,0,0,1,1.6,0v13A.8.8,0,0,1,14.92,25.3Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("path", { "d": "M21,25.3a.8.8,0,0,1-.8-.8v-13a.8.8,0,0,1,1.6,0v13A.8.8,0,0,1,21,25.3Z", "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("path", { "d": "M27,25.3a.8.8,0,0,1-.8-.8v-13a.8.8,0,0,1,1.6,0v13A.8.8,0,0,1,27,25.3Z", "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ContainerLine;
