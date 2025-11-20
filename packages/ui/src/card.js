"use strict";
// import { type ReactNode } from "react";
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
exports.CardContent = exports.CardDescription = exports.CardTitle = exports.CardFooter = exports.CardHeader = exports.Card = void 0;
// export function Card({
//   title,
//   children,
//   href,
// }: {
//   title: string;
//   children: ReactNode;
//   href: string;
// }) {
//   return (
//     <a
//       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
//       href={`${href}?utm_source=create-turbo&utm_medium=with-tailwind&utm_campaign=create-turbo"`}
//       rel="noopener noreferrer"
//       target="_blank"
//     >
//       <h2 className="mb-3 text-2xl font-semibold">
//         {title}{" "}
//         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//           -&gt;
//         </span>
//       </h2>
//       <p className="m-0 max-w-[30ch] text-sm opacity-50">{children}</p>
//     </a>
//   );
// }
var React = require("react");
var utils_1 = require("@repo/ui/lib/utils");
var Card = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div ref={ref} className={(0, utils_1.cn)("rounded-sm bg-canvas-bg text-canvas-text-contrast shadow", className)} {...props}/>);
});
exports.Card = Card;
Card.displayName = "Card";
var CardHeader = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div ref={ref} className={(0, utils_1.cn)("flex flex-col space-y-1.5 p-6", className)} {...props}/>);
});
exports.CardHeader = CardHeader;
CardHeader.displayName = "CardHeader";
var CardTitle = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div ref={ref} className={(0, utils_1.cn)("font-semibold leading-none tracking-tight", className)} {...props}/>);
});
exports.CardTitle = CardTitle;
CardTitle.displayName = "CardTitle";
var CardDescription = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div ref={ref} className={(0, utils_1.cn)("text-sm text-muted-foreground", className)} {...props}/>);
});
exports.CardDescription = CardDescription;
CardDescription.displayName = "CardDescription";
var CardContent = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div ref={ref} className={(0, utils_1.cn)("p-6 pt-0", className)} {...props}/>);
});
exports.CardContent = CardContent;
CardContent.displayName = "CardContent";
var CardFooter = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div ref={ref} className={(0, utils_1.cn)("flex items-center p-6 pt-0", className)} {...props}/>);
});
exports.CardFooter = CardFooter;
CardFooter.displayName = "CardFooter";
