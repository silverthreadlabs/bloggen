'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeToggle = void 0;
var react_1 = require("react");
var next_themes_1 = require("next-themes");
var framer_motion_1 = require("framer-motion");
var fa_1 = require("react-icons/fa");
var ThemeToggle = function () {
    var _a = (0, next_themes_1.useTheme)(), theme = _a.theme, setTheme = _a.setTheme, resolvedTheme = _a.resolvedTheme;
    var _b = (0, react_1.useState)(false), mounted = _b[0], setMounted = _b[1];
    // Only render after hydration
    (0, react_1.useEffect)(function () {
        setMounted(true);
    }, []);
    // Handle system theme detection - but don't override system choice
    (0, react_1.useEffect)(function () {
        if (!mounted)
            return;
        // Only set a theme if none is set, but don't override 'system'
        if (!theme) {
            setTheme('system');
        }
    }, [theme, setTheme, mounted]);
    // Return skeleton during SSR and before hydration
    if (!mounted) {
        return (<div className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-300">
                <div className="h-6 w-6 rounded-full bg-white shadow-lg ml-1"/>
            </div>);
    }
    var isDark = theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark');
    var toggleTheme = function () {
        // Cycle through: light -> dark -> system -> light
        if (theme === 'light') {
            setTheme('dark');
        }
        else if (theme === 'dark') {
            setTheme('system');
        }
        else {
            setTheme('light');
        }
    };
    return (<button onClick={toggleTheme} className="cursor-pointer relative inline-flex h-8 w-14 items-center rounded-full  overflow-hidden" aria-label={"Switch theme (current: ".concat(theme, ")")} title={"Switch theme (current: ".concat(theme, ")")}>
            {/* Animated background */}
            <framer_motion_1.motion.div className={"absolute inset-0 rounded-full ".concat(theme === 'dark' ? 'bg-primary-solid' :
            theme === 'system' ? 'bg-gradient-to-r from-canvas-line to-primary-solid' :
                'bg-canvas-line')} transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
        }}/>
            
            {/* Single background icon */}
            <framer_motion_1.motion.div className={"absolute ".concat(theme === 'light' ? 'right-2' : theme === 'dark' ? 'left-2' : 'left-1/2 transform -translate-x-1/2')} animate={{
            opacity: 1,
            scale: 1
        }} transition={{
            type: "spring",
            stiffness: 300,
            damping: 25
        }}>
                {theme === 'light' ? (<fa_1.FaMoon size={14} className="text-canvas-text"/>) : theme === 'dark' ? (<fa_1.FaSun size={14} className="text-white"/>) : (<div className="w-3 h-3 rounded-full border-2 border-white bg-transparent"/>)}
            </framer_motion_1.motion.div>
            
            {/* Toggle circle with spring animation */}
            <framer_motion_1.motion.div className=" relative flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg z-10" animate={{
            x: theme === 'light' ? 4 : theme === 'dark' ? 28 : 16
        }} transition={{
            type: "spring",
            stiffness: 700,
            damping: 30
        }}/>
        </button>);
};
var ThemeToggleMemoized = (0, react_1.memo)(ThemeToggle);
exports.ThemeToggle = ThemeToggleMemoized;
