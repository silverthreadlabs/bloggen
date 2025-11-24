// "use client";
// import { EyeIcon, EyeOffIcon } from "lucide-react";
// import * as React from "react";
// import { Button } from "@repo/ui/button";
// import { Input, type InputProps } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// const PasswordInput = ({
// 	ref,
// 	className,
// 	...props
// }: InputProps & {
// 	ref: React.RefObject<HTMLInputElement>;
// }) => {
// 	const [showPassword, setShowPassword] = React.useState(false);
// 	const disabled =
// 		props.value === "" || props.value === undefined || props.disabled;
// 	return (
// 		<div className="relative">
// 			<Input
// 				{...props}
// 				type={showPassword ? "text" : "password"}
// 				name="password_fake"
// 				className={cn("hide-password-toggle pr-10", className)}
// 				ref={ref}
// 			/>
// 			<Button
// 				type="button"
// 				variant="ghost"
// 				size="sm"
// 				className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
// 				onClick={() => setShowPassword((prev) => !prev)}
// 				disabled={disabled}
// 			>
// 				{showPassword && !disabled ? (
// 					<EyeIcon className="h-4 w-4" aria-hidden="true" />
// 				) : (
// 					<EyeOffIcon className="h-4 w-4" aria-hidden="true" />
// 				)}
// 				<span className="sr-only">
// 					{showPassword ? "Hide password" : "Show password"}
// 				</span>
// 			</Button>
// 			{/* hides browsers password toggles */}
// 			<style>{`
//                 .hide-password-toggle::-ms-reveal,
//                 .hide-password-toggle::-ms-clear {
//                     visibility: hidden;
//                     pointer-events: none;
//                     display: none;
//                 }
//             `}</style>
// 		</div>
// 	);
// };
// PasswordInput.displayName = "PasswordInput";
// export { PasswordInput };
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
exports.PasswordInput = void 0;
var lucide_react_1 = require("lucide-react");
var React = require("react");
var input_1 = require("@repo/ui/input");
var utils_1 = require("@repo/ui/lib/utils");
var PasswordInput = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    var _b = React.useState(false), showPassword = _b[0], setShowPassword = _b[1];
    var disabled = props.value === "" || props.value === undefined || props.disabled;
    return (<div className="relative">
			<input_1.Input {...props} type={showPassword ? "text" : "password"} name="password_fake" className={(0, utils_1.cn)("hide-password-toggle pr-10", className)} ref={ref}/>
			<div className="absolute right-0 top-0 h-full flex items-center justify-center w-10 hover:cursor-pointer" onClick={function () { return setShowPassword(function (prev) { return !prev; }); }} role="button" tabIndex={disabled ? -1 : 0}>
				{showPassword ? (<lucide_react_1.EyeIcon className="h-4 w-4" aria-hidden="true"/>) : (<lucide_react_1.EyeOffIcon className="h-4 w-4" aria-hidden="true"/>)}
				<span className="sr-only">
					{showPassword ? "Hide password" : "Show password"}
				</span>
			</div>

			{/* hides browsers password toggles */}
			<style>{"\n                .hide-password-toggle::-ms-reveal,\n                .hide-password-toggle::-ms-clear {\n                    visibility: hidden;\n                    pointer-events: none;\n                    display: none;\n                }\n            "}</style>
		</div>);
});
exports.PasswordInput = PasswordInput;
PasswordInput.displayName = "PasswordInput";
