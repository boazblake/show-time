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
var TapeDriveLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "tape-drive-outline"), mithril_1.default("g", { "id": "edc65e35-6853-41fe-a251-2204942da15b", "data-name": "Layer 4" }, mithril_1.default("path", { "d": "M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6ZM4,28V8H32V28Z" }), mithril_1.default("path", { "d": "M13.33,13.35a4.52,4.52,0,1,0,4.53,4.52A4.53,4.53,0,0,0,13.33,13.35Zm0,7.44a2.92,2.92,0,1,1,2.93-2.92A2.92,2.92,0,0,1,13.33,20.79Z" }), mithril_1.default("path", { "d": "M23.62,13.35a4.52,4.52,0,1,0,4.52,4.52A4.53,4.53,0,0,0,23.62,13.35Zm0,7.44a2.92,2.92,0,1,1,2.92-2.92A2.92,2.92,0,0,1,23.62,20.79Z" }), mithril_1.default("path", { "d": "M6,11V23.55H8V12H29.34V10H7A1,1,0,0,0,6,11Z" })));
    } };
exports.default = TapeDriveLine;
