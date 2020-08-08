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
var FileZipLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "file-zip-line"), mithril_1.default("path", { "d": "M30,30.2V12l-8.1-7.9H7.8C6.8,4.1,6,4.9,6,6c0,0,0,0,0,0v24.2c0,1,0.7,1.8,1.7,1.8c0,0,0.1,0,0.1,0h20.3\n\t\tc1,0,1.8-0.7,1.8-1.7C30,30.3,30,30.2,30,30.2z M22,6.6l5.6,5.4H22V6.6z M28,30H7.9L8,6h12v8h8V30z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M12,24c0,1.7,1.3,3,3,3s3-1.3,3-3v-4h-6V24z M13.4,24v-2.6h3.2V24c0.1,0.9-0.6,1.7-1.5,1.7c-0.9,0.1-1.7-0.6-1.7-1.5\n\t\tC13.4,24.2,13.4,24.1,13.4,24z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M18.2,9c0-0.6-0.4-1-1-1H15v2h2.2C17.8,10,18.2,9.6,18.2,9z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("path", { "d": "M12.7,10c-0.6,0-1,0.4-1,1s0.4,1,1,1H15v-2H12.7z", "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("path", { "d": "M17.2,14c0.6,0,1-0.4,1-1s-0.4-1-1-1H15v2H17.2z", "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("path", { "d": "M11.7,15c0,0.6,0.4,1,1,1H15v-2h-2.3C12.2,14,11.7,14.4,11.7,15z", "class": "clr-i-outline clr-i-outline-path-6" }), mithril_1.default("path", { "d": "M17.2,18c0.6,0,1-0.4,1-1s-0.4-1-1-1H15v2H17.2z", "class": "clr-i-outline clr-i-outline-path-7" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = FileZipLine;
