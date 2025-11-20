'use client';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mermaid = Mermaid;
var react_1 = require("react");
var next_themes_1 = require("next-themes");
function Mermaid(_a) {
    var chart = _a.chart;
    var id = (0, react_1.useId)();
    var _b = (0, react_1.useState)(''), svg = _b[0], setSvg = _b[1];
    var containerRef = (0, react_1.useRef)(null);
    var currentChartRef = (0, react_1.useRef)(null);
    var resolvedTheme = (0, next_themes_1.useTheme)().resolvedTheme;
    (0, react_1.useEffect)(function () {
        if (currentChartRef.current === chart || !containerRef.current)
            return;
        var container = containerRef.current;
        currentChartRef.current = chart;
        function renderChart() {
            return __awaiter(this, void 0, void 0, function () {
                var mermaid, _a, svg_1, bindFunctions, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('mermaid'); })];
                        case 1:
                            mermaid = (_b.sent()).default;
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            // configure mermaid
                            mermaid.initialize({
                                startOnLoad: false,
                                securityLevel: 'loose',
                                fontFamily: 'inherit',
                                themeCSS: 'margin: 1.5rem auto 0;',
                                theme: resolvedTheme === 'dark' ? 'dark' : 'default',
                            });
                            return [4 /*yield*/, mermaid.render(id, chart.replaceAll('\\n', '\n'))];
                        case 3:
                            _a = _b.sent(), svg_1 = _a.svg, bindFunctions = _a.bindFunctions;
                            bindFunctions === null || bindFunctions === void 0 ? void 0 : bindFunctions(container);
                            setSvg(svg_1);
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _b.sent();
                            console.error('Error while rendering mermaid', error_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        void renderChart();
    }, [chart, id, resolvedTheme]);
    return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: svg }}/>;
}
