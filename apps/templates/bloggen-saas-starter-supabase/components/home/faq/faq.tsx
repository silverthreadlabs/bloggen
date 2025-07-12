'use client';

import { useState } from 'react';
import { ChevronDown, Zap, Code, Search, Bot, Palette } from 'lucide-react';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    icon: React.ReactNode;
    category: string;
}

const faqData: FAQItem[] = [
    {
        id: 1,
        question: 'What is bloggen-seo-starter?',
        answer: "Bloggen Saas Starter Supabase is a production-ready Next.js 15 template designed for developers. It comes pre-configured with essential SEO features like JSON-LD, dynamic Open Graph images, sitemaps, robots.txt, and RSS feeds. Additionally, it supports MDX content, allowing seamless integration with bloggen.dev's AI-generated content.",
        icon: <Zap className="w-5 h-5" />,
        category: "Platform"
    },
    {
        id: 2,
        question: 'How do I get started with bloggen-seo-starter?',
        answer: 'To initiate your project, run the command: `npx create-bloggen-app`. This will scaffold a fully functional Next.js 15 application with all SEO configurations in place. Once set up, you can deploy your site to platforms like Vercel and begin adding content to the `/content` directory.',
        icon: <Code className="w-5 h-5" />,
        category: "Setup"
    },
    {
        id: 3,
        question: 'What SEO features are included out of the box?',
        answer: 'Bloggen Saas Starter Supabase offers a suite of built-in SEO features, including:\n\n• JSON-LD structured data for enhanced search engine understanding.\n• Dynamic Open Graph images for improved social media sharing.\n• Pre-configured sitemaps and robots.txt files.\n• RSS feed generation for content syndication.\n• Optimized metadata handling for better search engine indexing.',
        icon: <Search className="w-5 h-5" />,
        category: "Features"
    },
    {
        id: 4,
        question: 'How does bloggen.dev integrate with this template?',
        answer: 'Bloggen.dev is an AI-powered content generation platform that produces MDX files for blogs and guides. These MDX files can be directly placed into the `/content` folder of the bloggen-seo-starter template. The template is designed to automatically render these files, eliminating the need for manual edits and streamlining the content publishing process.',
        icon: <Bot className="w-5 h-5" />,
        category: "Integration"
    },
    {
        id: 5,
        question: 'Can I customize the design or theme of my site?',
        answer: "Absolutely! The bloggen-seo-starter template is fully compatible with DesignRift, an open-source theme builder. DesignRift allows you to modify your site's appearance using Radix color palettes. Once you've customized your theme, you can integrate it into your bloggen-seo-starter project to achieve a personalized look and feel.",
        icon: <Palette className="w-5 h-5" />,
        category: "Customization"
    }
];

const formatAnswer = (answer: string) => {
    const codeRegex = /`([^`]+)`/g;
    let formattedAnswer = answer.replace(
        codeRegex,
        '<code class="bg-canvas-bg-active px-2 py-1 rounded-md text-sm font-mono text-primary-text-contrast">$1</code>'
    );

    formattedAnswer = formattedAnswer.replace(/\n\n/g, '<br><br>');
    formattedAnswer = formattedAnswer.replace(/\n•/g, '<br>• ');

    return formattedAnswer;
};

interface FAQItemComponentProps {
    item: FAQItem;
    isOpen: boolean;
    onToggle: (id: number) => void;
}

function FAQItemComponent({ item, isOpen, onToggle }: FAQItemComponentProps) {
    return (
        <div className="group">
            <div
                className={`
                    relative overflow-hidden rounded-2xl border transition-all duration-300 
                    ${isOpen 
                        ? 'border-primary-border bg-gradient-to-br from-canvas-bg via-canvas-bg to-canvas-bg-active shadow-lg' 
                        : 'border-canvas-line bg-canvas-bg hover:border-canvas-border-hover hover:shadow-md'
                    }
                `}
            >
                {/* Gradient overlay for active state */}
                {isOpen && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-bg/5 via-transparent to-primary-bg/10 pointer-events-none" />
                )}
                
                {/* Question Button */}
                <div
                    onClick={() => onToggle(item.id)}
                    className="relative flex w-full items-center justify-between p-6 text-left cursor-pointer group-hover:bg-canvas-bg-active/30 transition-all duration-300"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    role="button"
                >
                    <div className="flex items-center gap-4 flex-1">
                        {/* Icon with category badge */}
                        <div className="flex-shrink-0">
                            <div className={`
                                p-3 rounded-xl transition-all duration-300
                                ${isOpen 
                                    ? 'bg-primary-bg text-primary-text-contrast shadow-lg' 
                                    : 'bg-canvas-bg-active text-canvas-text group-hover:bg-primary-bg/20 group-hover:text-primary-text-contrast'
                                }
                            `}>
                                {item.icon}
                            </div>
                        </div>
                        
                        <div className="flex-1">
                            {/* Category badge */}
                            <div className="mb-2">
                                <span className={`
                                    inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300
                                    ${isOpen 
                                        ? 'bg-primary-bg/20 text-primary-text-contrast' 
                                        : 'bg-canvas-bg-active text-canvas-text group-hover:bg-primary-bg/10'
                                    }
                                `}>
                                    {item.category}
                                </span>
                            </div>
                            
                            {/* Question */}
                            <h3 className="text-canvas-text-contrast text-lg font-semibold leading-tight pr-4">
                                {item.question}
                            </h3>
                        </div>
                    </div>
                    
                    {/* Chevron */}
                    <div className="flex-shrink-0 ml-4">
                        <div className={`
                            p-2 rounded-lg transition-all duration-300
                            ${isOpen 
                                ? 'bg-primary-bg/20 text-primary-text-contrast' 
                                : 'bg-canvas-bg-active text-canvas-text group-hover:bg-primary-bg/10'
                            }
                        `}>
                            <ChevronDown
                                className={`w-5 h-5 transition-transform duration-300 ${
                                    isOpen ? 'rotate-180' : 'rotate-0'
                                }`}
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </div>

                {/* Answer Content */}
                <div
                    id={`faq-answer-${item.id}`}
                    className={`
                        relative overflow-hidden transition-all duration-300 ease-in-out
                        ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                    `}
                    role="region"
                    aria-labelledby={`${item.question}`}
                >
                    <div className="px-6 pb-6">
                        <div className="h-px bg-gradient-to-r from-canvas-line via-canvas-border-hover to-canvas-line mb-6" />
                        
                        <div className="space-y-4">
                            <div
                                className="text-canvas-text leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: formatAnswer(item.answer) }}
                            />
                            
                            {/* Special handling for the DesignRift link */}
                            {item.id === 5 && (
                                <div className="mt-4 p-4 bg-canvas-bg-active/50 rounded-xl border border-canvas-line">
                                    <p className="text-canvas-text text-sm">
                                        🎨 Visit{' '}
                                        <a
                                            href="https://designrift.vercel.app/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary-text-contrast font-medium hover:underline transition-colors duration-200"
                                        >
                                            Designrift
                                        </a>{' '}
                                        to get started with theme customization.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Faq() {
    const [openItems, setOpenItems] = useState<Set<number>>(new Set());

    const toggleItem = (id: number) => {
        setOpenItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            
            return newSet;
        });
    };

    return (
        <section className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-label="Frequently Asked Questions">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-bg/5 via-transparent to-canvas-bg-active/10 pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-bg/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-canvas-bg-active/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-bg/10 border border-primary-border/20 mb-6">
                        <span className="text-primary-text-contrast text-sm font-medium">FAQ</span>
                        <div className="w-2 h-2 bg-primary-bg rounded-full"></div>
                    </div>
                    
                    <h2 className="text-canvas-text-contrast text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Everything you need
                        <br />
                        <span className="bg-gradient-to-r from-primary-text-contrast to-canvas-text-contrast bg-clip-text text-transparent">
                            to know
                        </span>
                    </h2>
                    
                    <p className="text-canvas-text text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                        Get answers to the most common questions about bloggen-seo-starter and start building your next project with confidence.
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4" role="list">
                    {faqData.map((item) => (
                        <FAQItemComponent
                            key={item.id}
                            item={item}
                            isOpen={openItems.has(item.id)}
                            onToggle={toggleItem}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}