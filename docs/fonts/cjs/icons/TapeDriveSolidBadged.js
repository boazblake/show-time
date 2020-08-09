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
var TapeDriveSolidBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "tape-drive-solid-badged"), mithril_1.default("g", { "id": "e6c10aaa-04d3-40e7-911f-0a280855c83c", "data-name": "Layer 4" }, mithril_1.default("path", { "d": "M12.21,23a5,5,0,1,0-5-5A5,5,0,0,0,12.21,23Zm0-7a2,2,0,1,1-2,2A2,2,0,0,1,12.21,16Z" }), mithril_1.default("path", { "d": "M23.79,23a5,5,0,1,0-5-5A5,5,0,0,0,23.79,23Zm0-7a2,2,0,1,1-2,2A2,2,0,0,1,23.79,16Z" })), mithril_1.default("g", { "id": "b585f356-dc07-48d7-b5de-cfe268a8c2d5", "data-name": "Layer 3" }, mithril_1.default("path", { "d": "M30,13.5V24H6V12H25.51a7.49,7.49,0,0,1-3-6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V12.34A7.49,7.49,0,0,1,30,13.5Z" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "fill": "#e62700" })));
    } };
exports.default = TapeDriveSolidBadged;
