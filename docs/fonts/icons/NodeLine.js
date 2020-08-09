import m from 'mithril';
const NodeLine = { view: ({ attrs }) => m("svg", Object.assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), m("title", {}, "node-line"), m("path", { "d": "M18,30.66,7,24.33V11.67L18,5.34l11,6.33V24.33ZM9,23.18l9,5.17,9-5.17V12.82L18,7.65,9,12.82Z", "class": "clr-i-outline clr-i-outline-path-1" }), m("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 })) };
export default NodeLine;
