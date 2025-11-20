"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function FeatureCard(_a) {
    var icon = _a.icon, title = _a.title, descriptionStart = _a.descriptionStart, code = _a.code, descriptionEnd = _a.descriptionEnd, link = _a.link;
    return (<div className='group relative'>
            <div className='bg-canvas-bg border-canvas-active hover:border-canvas-line cursor-default rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 ease-in-out'>
                <div className='flex items-start gap-4'>
                    <div className='rounded-lg bg-gradient-to-br from-canvas-bg to-canvas-line p-3 transition-transform duration-300 ease-out group-hover:scale-[1.05]'>
                        <div className='text-canvas-solid group-hover:text-primary-solid transition-colors duration-300 ease-out'>
                            {icon}
                        </div>
                    </div>
                    <div>
                        <h3 className='text-canvas-text-contrast group-hover:text-primary-solid mb-2 text-lg leading-relaxed font-semibold tracking-normal transition-colors duration-300 ease-out md:text-xl'>
                            {title}
                        </h3>
                        <p className='text-canvas-text text-sm leading-relaxed font-normal tracking-normal transition-colors duration-300 ease-out md:text-lg'>
                            {descriptionStart}
                            {code && (<code className='bg-canvas-bg-active border-canvas-line text-canvas-text-contrast rounded-md border px-2 py-1 font-mono text-sm'>
                                    {code}
                                </code>)}
                            {link && (<a target="_blank" rel="noopener noreferrer" href={link} className="hover:underline group-hover:text-primary-solid">
                                   {title}
                                </a>)}
                            {descriptionEnd}
                        </p>
                    </div>
                </div>
            </div>
        </div>);
}
exports.default = FeatureCard;
