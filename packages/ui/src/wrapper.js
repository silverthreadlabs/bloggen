"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrapper = Wrapper;
var utils_1 = require("@repo/ui/lib/utils");
function Wrapper(props) {
    return (<div {...props} className={(0, utils_1.cn)('rounded-sm bg-radial-[at_bottom] from-blue-500/20 p-4 border border-fd-primary/10 prose-no-margin dark:bg-black/20', props.className)}>
      {props.children}
    </div>);
}
