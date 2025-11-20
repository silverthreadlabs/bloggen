'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeSwitcher = void 0;
var react_1 = require("react");
var next_themes_1 = require("next-themes");
var RadioGroup = require("@radix-ui/react-radio-group");
var fa_1 = require("react-icons/fa");
var ThemeSwitcher = function () {
    var _a = (0, next_themes_1.useTheme)(), theme = _a.theme, setTheme = _a.setTheme, systemTheme = _a.systemTheme, resolvedTheme = _a.resolvedTheme;
    var _b = (0, react_1.useState)(false), mounted = _b[0], setMounted = _b[1];
    // Only render after hydration
    (0, react_1.useEffect)(function () {
        setMounted(true);
    }, []);
    // Avoid hydration mismatch and handle system theme
    (0, react_1.useEffect)(function () {
        if (!mounted)
            return;
        // Set system as default theme if none is set
        if (!theme) {
            setTheme('system');
        }
        // Debug system theme detection
        var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        // Listen for system theme changes
        var handleSystemThemeChange = function (e) {
            if (theme === 'system') {
                // Force a re-render when system theme changes
                setTheme('system');
            }
        };
        mediaQuery.addEventListener('change', handleSystemThemeChange);
        return function () { return mediaQuery.removeEventListener('change', handleSystemThemeChange); };
    }, [theme, setTheme, mounted]);
    // Return skeleton during SSR and before hydration
    if (!mounted) {
        return (<div className='border-canvas-line w-fit space-x-0.5 rounded-full border p-1'>
                <div className='flex space-x-0.5'>
                    {[1, 2, 3].map(function (i) { return (<div key={i} className='flex h-[42px] w-[42px] items-center justify-center rounded-full p-2'>
                            <div className='h-[18px] w-[18px] animate-pulse rounded bg-gray-300'/>
                        </div>); })}
                </div>
            </div>);
    }
    if (!theme) {
        return null;
    }
    return (<RadioGroup.Root className='border-canvas-line w-fit space-x-0.5 rounded-full border p-1' value={theme} onValueChange={function (value) {
            setTheme(value);
        }} aria-label='Theme selection'>
            {[
            { value: 'light', icon: <fa_1.FaSun size={18}/>, title: 'Light theme' },
            { value: 'system', icon: <fa_1.FaDesktop size={18}/>, title: 'System theme' },
            { value: 'dark', icon: <fa_1.FaMoon size={18}/>, title: 'Dark theme' }
        ].map(function (_a) {
            var value = _a.value, icon = _a.icon, title = _a.title;
            return (<RadioGroup.Item key={value} className='text-canvas-solid group-hover:text-canvas-text-contrast data-[state=checked]:text-canvas-text-contrast hover:text-canvas-text-contrast data-[state=checked]:bg-canvas-bg-hover data-transition-colors rounded-full p-2 transition-colors duration-300 hover:cursor-pointer' value={value} title={title} aria-label={title}>
                    {icon}
                </RadioGroup.Item>);
        })}
        </RadioGroup.Root>);
};
var ThemeSwitcherMemoized = (0, react_1.memo)(ThemeSwitcher);
exports.ThemeSwitcher = ThemeSwitcherMemoized;
