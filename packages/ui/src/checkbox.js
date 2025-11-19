"use client";
"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = void 0;
var React = require("react");
var CheckboxPrimitive = require("@radix-ui/react-checkbox");
var utils_1 = require("@repo/ui/lib/utils");
var react_icons_1 = require("@radix-ui/react-icons");
var Checkbox = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<CheckboxPrimitive.Root ref={ref} className={(0, utils_1.cn)("peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className)} {...props}>
    <CheckboxPrimitive.Indicator className={(0, utils_1.cn)("flex items-center justify-center text-current")}>
      <react_icons_1.CheckIcon className="h-4 w-4"/>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>);
});
exports.Checkbox = Checkbox;
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
