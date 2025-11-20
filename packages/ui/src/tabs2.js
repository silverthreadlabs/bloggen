"use client";
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FadeInDiv = exports.Tabs = void 0;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var utils_1 = require("@repo/ui/lib/utils");
var Tabs = function (_a) {
    var propTabs = _a.tabs, containerClassName = _a.containerClassName, activeTabClassName = _a.activeTabClassName, tabClassName = _a.tabClassName, contentClassName = _a.contentClassName;
    var _b = (0, react_1.useState)(propTabs[0]), active = _b[0], setActive = _b[1];
    var _c = (0, react_1.useState)(propTabs), tabs = _c[0], setTabs = _c[1];
    var moveSelectedTabToTop = function (idx) {
        var newTabs = __spreadArray([], propTabs, true);
        var selectedTab = newTabs.splice(idx, 1);
        newTabs.unshift(selectedTab[0]);
        setTabs(newTabs);
        setActive(newTabs[0]);
    };
    var _d = (0, react_1.useState)(false), hovering = _d[0], setHovering = _d[1];
    return (<>
			<div className={(0, utils_1.cn)("flex flex-row items-center justify-start mt-0 [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar border-x w-full border-t max-w-max bg-opacity-0", containerClassName)}>
				{propTabs.map(function (tab, idx) { return (<button key={tab.title} onClick={function () {
                moveSelectedTabToTop(idx);
            }} onMouseEnter={function () { return setHovering(true); }} onMouseLeave={function () { return setHovering(false); }} className={(0, utils_1.cn)("relative px-4 py-2 rounded-full opacity-80 hover:opacity-100", tabClassName)} style={{
                transformStyle: "preserve-3d",
            }}>
						{active.value === tab.value && (<framer_motion_1.motion.div transition={{
                    duration: 0.2,
                    delay: 0.1,
                    type: "keyframes",
                }} animate={{
                    x: tabs.indexOf(tab) === 0 ? [0, 0, 0] : [0, 0, 0],
                }} className={(0, utils_1.cn)("absolute inset-0 bg-gray-200 dark:bg-zinc-900/90 opacity-100", activeTabClassName)}/>)}

						<span className={(0, utils_1.cn)("relative block text-black dark:text-white", active.value === tab.value
                ? "text-opacity-100 font-medium"
                : "opacity-40 ")}>
							{tab.title}
						</span>
					</button>); })}
			</div>
			<exports.FadeInDiv tabs={tabs} active={active} key={active.value} hovering={hovering} className={(0, utils_1.cn)("", contentClassName)}/>
		</>);
};
exports.Tabs = Tabs;
var FadeInDiv = function (_a) {
    var className = _a.className, tabs = _a.tabs;
    var isActive = function (tab) {
        return tab.value === tabs[0].value;
    };
    return (<div className="relative w-full h-full">
			{tabs.map(function (tab, idx) { return (<framer_motion_1.motion.div key={tab.value} style={{
                scale: 1 - idx * 0.1,
                zIndex: -idx,
                opacity: idx < 3 ? 1 - idx * 0.1 : 0,
            }} animate={{
                transition: {
                    duration: 0.2,
                    delay: 0.1,
                    type: "keyframes",
                },
            }} className={(0, utils_1.cn)("h-full", isActive(tab) ? "" : "hidden", className)}>
					{tab.content}
				</framer_motion_1.motion.div>); })}
		</div>);
};
exports.FadeInDiv = FadeInDiv;
