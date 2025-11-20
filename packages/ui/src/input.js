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
exports.inputVariants = exports.Select = exports.Textarea = exports.Input = void 0;
var utils_1 = require("@repo/ui/lib/utils");
var class_variance_authority_1 = require("class-variance-authority");
var react_1 = require("react");
// Assuming you have a cn utility function
var inputVariants = (0, class_variance_authority_1.cva)('w-full px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-solid', {
    variants: {
        variant: {
            default: 'bg-canvas-bg border border-canvas-border text-canvas-text hover:border-canvas-border-hover focus:border-primary-border',
            error: 'bg-canvas-bg border border-alert-border text-alert-text'
        },
        size: {
            default: 'px-4 py-3',
            sm: 'px-3 py-2 text-sm',
            lg: 'px-5 py-4'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
exports.inputVariants = inputVariants;
var labelVariants = (0, class_variance_authority_1.cva)('block text-sm font-medium mb-2', {
    variants: {
        variant: {
            default: 'text-canvas-text',
            error: 'text-alert-text'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
var Input = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, variant = _a.variant, size = _a.size, label = _a.label, error = _a.error, required = _a.required, containerClassName = _a.containerClassName, props = __rest(_a, ["className", "variant", "size", "label", "error", "required", "containerClassName"]);
    var hasError = !!error;
    var inputVariant = hasError ? 'error' : variant;
    var labelVariant = hasError ? 'error' : 'default';
    return (<div className={(0, utils_1.cn)(containerClassName)}>
                {label && (<label htmlFor={props.id} className={(0, utils_1.cn)(labelVariants({ variant: labelVariant }))}>
                        {label}
                        {required && ' *'}
                    </label>)}
                <input className={(0, utils_1.cn)(inputVariants({ variant: inputVariant, size: size, className: className }))} ref={ref} {...props}/>
                {error && <p className='text-alert-text mt-1 text-sm'>{error}</p>}
            </div>);
});
exports.Input = Input;
var Textarea = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, variant = _a.variant, size = _a.size, label = _a.label, error = _a.error, required = _a.required, containerClassName = _a.containerClassName, props = __rest(_a, ["className", "variant", "size", "label", "error", "required", "containerClassName"]);
    var hasError = !!error;
    var inputVariant = hasError ? 'error' : variant;
    var labelVariant = hasError ? 'error' : 'default';
    return (<div className={(0, utils_1.cn)(containerClassName)}>
                {label && (<label htmlFor={props.id} className={(0, utils_1.cn)(labelVariants({ variant: labelVariant }))}>
                        {label}
                        {required && ' *'}
                    </label>)}
                <textarea className={(0, utils_1.cn)(inputVariants({ variant: inputVariant, size: size, className: className }), 'resize-vertical')} ref={ref} {...props}/>
                {error && <p className='text-alert-text mt-1 text-sm'>{error}</p>}
            </div>);
});
exports.Textarea = Textarea;
var Select = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, variant = _a.variant, size = _a.size, label = _a.label, error = _a.error, required = _a.required, containerClassName = _a.containerClassName, options = _a.options, placeholder = _a.placeholder, props = __rest(_a, ["className", "variant", "size", "label", "error", "required", "containerClassName", "options", "placeholder"]);
    var hasError = !!error;
    var inputVariant = hasError ? 'error' : variant;
    var labelVariant = hasError ? 'error' : 'default';
    return (<div className={(0, utils_1.cn)(containerClassName)}>
                {label && (<label htmlFor={props.id} className={(0, utils_1.cn)(labelVariants({ variant: labelVariant }))}>
                        {label}
                        {required && ' *'}
                    </label>)}
                <select className={(0, utils_1.cn)(inputVariants({ variant: inputVariant, size: size, className: className }))} ref={ref} {...props}>
                    {placeholder && <option value=''>{placeholder}</option>}
                    {options.map(function (option) { return (<option key={option.value} value={option.value}>
                            {option.label}
                        </option>); })}
                </select>
                {error && <p className='text-alert-text mt-1 text-sm'>{error}</p>}
            </div>);
});
exports.Select = Select;
Input.displayName = 'Input';
Textarea.displayName = 'Textarea';
Select.displayName = 'Select';
