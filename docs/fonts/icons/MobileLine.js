import m from 'mithril';
const MobileLine = { view: ({ attrs }) => m("svg", Object.assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), m("title", {}, "mobile-line"), m("path", { "d": "M25,4H11A2,2,0,0,0,9,6V30a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V6A2,2,0,0,0,25,4ZM11,6H25V24H11Zm0,24V26H25v4Z", "class": "clr-i-outline clr-i-outline-path-1" }), m("rect", { "x": 17, "y": 27, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-2" }), m("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 })) };
export default MobileLine;
