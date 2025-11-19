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
exports.default = CopyButton;
var react_1 = require("react");
var button_1 = require("@repo/ui/button");
var lucide_react_1 = require("lucide-react");
var tooltip_1 = require("@repo/ui/tooltip");
function CopyButton(_a) {
    var _this = this;
    var textToCopy = _a.textToCopy;
    var _b = (0, react_1.useState)(false), isCopied = _b[0], setIsCopied = _b[1];
    (0, react_1.useEffect)(function () {
        if (isCopied) {
            var timer_1 = setTimeout(function () { return setIsCopied(false); }, 2000);
            return function () { return clearTimeout(timer_1); };
        }
    }, [isCopied]);
    var handleCopy = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.clipboard.writeText(textToCopy)];
                case 1:
                    _a.sent();
                    setIsCopied(true);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error("Failed to copy text: ", err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (<tooltip_1.TooltipProvider>
			<tooltip_1.Tooltip>
				<tooltip_1.TooltipTrigger asChild>
					<button_1.Button variant="outline" size="sm" onClick={handleCopy} className="h-8 w-8">
						{isCopied ? (<lucide_react_1.Check className="h-4 w-4 "/>) : (<lucide_react_1.Copy className="h-4 w-4"/>)}
						<span className="sr-only">Copy to clipboard</span>
					</button_1.Button>
				</tooltip_1.TooltipTrigger>
				<tooltip_1.TooltipContent>
					<p>{isCopied ? "Copied!" : "Copy to clipboard"}</p>
				</tooltip_1.TooltipContent>
			</tooltip_1.Tooltip>
		</tooltip_1.TooltipProvider>);
}
