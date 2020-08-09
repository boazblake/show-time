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
var ControlLunSolidAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "control-lun-solid-alerted"), mithril_1.default("g", { "id": "e87317f8-0107-41da-9abb-ce7421a1669b", "data-name": "Layer 3" }, mithril_1.default("path", { "d": "M16.11,27a1,1,0,1,0,1,1A1,1,0,0,0,16.11,27Z" }), mithril_1.default("path", { "d": "M32.09,21H32V17.32c-1.9,2.93-10.46,3.3-14,3.3A42.43,42.43,0,0,1,8,19.56V17.88A40.59,40.59,0,0,0,18,19c4.85,0,12.8-.79,13.91-3.62H22.23a3.68,3.68,0,0,1-2.73-1.23H18A42.12,42.12,0,0,1,8,13.11V11a40.59,40.59,0,0,0,10,1.14h.59a3.61,3.61,0,0,1,.46-2.29l3.46-6c-1.6-.15-3.17-.21-4.51-.21-5.14,0-13.79.88-14,4.15H4v19.7c0,2.16,3.64,3.3,7.63,3.84l2.84,3,.59.62h17a3,3,0,0,0,3-3V23.93A3,3,0,0,0,32.09,21ZM8,26.08V24.4a25.79,25.79,0,0,0,3.46.7l-1.24,1.44C9.46,26.42,8.71,26.27,8,26.08ZM33.09,32a1,1,0,0,1-1,1H15.92L11.4,28.23,15.92,23H32.09a1,1,0,0,1,1,1Z" }), mithril_1.default("path", { "d": "M26.85,1.14l-5.72,9.91A1.27,1.27,0,0,0,22.23,13H33.68a1.27,1.27,0,0,0,1.1-1.91L29.06,1.14A1.28,1.28,0,0,0,26.85,1.14Z", "fill": "#fac400" })));
    } };
exports.default = ControlLunSolidAlerted;
