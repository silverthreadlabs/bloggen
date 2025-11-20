"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TabsComponent;
var Tabs = require("@radix-ui/react-tabs");
function TabsComponent(_a) {
    var _b;
    var tabs = _a.tabs, defaultValue = _a.defaultValue, _c = _a.className, className = _c === void 0 ? '' : _c;
    return (<Tabs.Root defaultValue={defaultValue || ((_b = tabs[0]) === null || _b === void 0 ? void 0 : _b.value)} className={"w-full ".concat(className)}>
            <Tabs.List className='bg-canvas-line mx-auto mb-12 flex w-full max-w-md rounded-md p-1 shadow-inner'>
                {tabs.map(function (tab) { return (<Tabs.Trigger key={tab.value} value={tab.value} className='data-[state=active]:bg-canvas-base data-[state=active]:text-contrast data-[state=inactive]:text-canvas-text data-[state=inactive]:hover:text-canvas-text-contrast flex-1 cursor-pointer rounded-sm px-6 py-1.5 text-sm font-medium transition-all duration-200 data-[state=active]:shadow-sm'>
                        {tab.label}
                    </Tabs.Trigger>); })}
            </Tabs.List>

            {tabs.map(function (tab) { return (<Tabs.Content key={tab.value} value={tab.value} className='focus:outline-none'>
                    {tab.content}
                </Tabs.Content>); })}
        </Tabs.Root>);
}
