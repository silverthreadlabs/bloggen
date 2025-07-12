'use client';

import { useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';

interface Feature {
    id: number;
    title: string;
    description: string;
    details: string;
    category: string;
    benefit: string;
    stats: {
        value: string;
        label: string;
    }[];
}

const featuresData: Feature[] = [
    {
        id: 1,
        title: 'Plug‑in MDX',
        description: 'Instant Content Integration',
        details: 'Bloggen AI exports MDX posts that drop straight into the /content folder - no edits needed. Your content renders instantly, making content management seamless and efficient.',
        category: 'Content',
        benefit: 'Zero configuration required',
        stats: [
            { value: '2x', label: 'Faster Setup' },
            { value: '100%', label: 'Compatible' }
        ]
    },
    {
        id: 2,
        title: 'Designrift Theming',
        description: 'Powerful Theme Creation',
        details: 'Create stunning themes for your web application leveraging Radix color palettes for cohesive styling. Build beautiful, consistent user interfaces with our comprehensive theming system.',
        category: 'Design',
        benefit: 'Professional UI components',
        stats: [
            { value: '50+', label: 'Themes' },
            { value: '∞', label: 'Customizable' }
        ]
    },
    {
        id: 3,
        title: 'SEO All Set',
        description: 'Complete SEO Infrastructure',
        details: 'Launch with confidence knowing all SEO essentials are pre-configured. From sitemaps and robots.txt to JSON-LD and dynamic OG images, plus an RSS feed - everything is pre-wired.',
        category: 'Performance',
        benefit: 'Rank higher on search engines',
        stats: [
            { value: '98/100', label: 'SEO Score' },
            { value: '3x', label: 'More Traffic' }
        ]
    },
    {
        id: 4,
        title: 'One‑Command Launch',
        description: 'Effortless Deployment',
        details: 'Get started in seconds with a single command: npx create-bloggen-app. Push to Vercel and your typed Next.js 15 template goes live immediately.',
        category: 'Developer',
        benefit: 'Production-ready in seconds',
        stats: [
            { value: '30s', label: 'Deploy Time' },
            { value: '99.9%', label: 'Uptime' }
        ]
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 120,
            damping: 20
        }
    }
};

export default function Features() {
    const [activeTab, setActiveTab] = useState<string>('all');
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

    const categories = ['all', 'Content', 'Design', 'Performance', 'Developer'];
    const filteredFeatures = activeTab === 'all' 
        ? featuresData 
        : featuresData.filter(feature => feature.category === activeTab);

    return (
        <section className='relative py-20 w-full px-4 sm:px-6 lg:px-8 xl:py-32 overflow-hidden'>
            
            <div className='relative mx-auto max-w-7xl'>
                {/* Header Section */}
                <motion.div
                    className='text-center mb-16'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}>
            

                    <h2 className='text-canvas-text-contrast text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6'>
                        Built for{' '}
                            <span className='from-primary-solid via-primary-text to-primary-text-contrast bg-gradient-to-r bg-clip-text text-transparent'>
                                scale
                            </span>
                    </h2>

                    <p className='text-canvas-text text-xl sm:text-2xl max-w-4xl mx-auto leading-relaxed'>
                        Everything you need to build, deploy, and scale your next project. 
                        From zero to production in minutes, not hours.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16'
                    variants={containerVariants}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}>
                    <AnimatePresence mode='wait'>
                        {filteredFeatures.map((feature) => (
                            <motion.div
                                key={feature.id}
                                variants={itemVariants}
                                layout
                                onMouseEnter={() => setHoveredFeature(feature.id)}
                                onMouseLeave={() => setHoveredFeature(null)}
                                className={`group relative p-8 rounded-3xl border transition-all duration-500 ${
                                    hoveredFeature === feature.id
                                        ? 'border-primary-solid bg-primary-bg shadow-2xl shadow-primary-solid/20 transform'
                                        : 'border-canvas-line bg-canvas-bg hover:border-primary-border hover:bg-primary-bg-subtle'
                                }`}>
                                
                                {/* Category Badge */}
                                <div className='flex items-center justify-between mb-6'>
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                        hoveredFeature === feature.id
                                            ? 'bg-primary-solid text-white'
                                            : 'bg-canvas-bg-subtle text-canvas-text'
                                    }`}>
                                        {feature.category}
                                    </span>
                                    
                                    {/* Floating indicator */}
                                    {hoveredFeature === feature.id && (
                                        <motion.div
                                            className='w-3 h-3 bg-primary-solid rounded-full'
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        />
                                    )}
                                </div>

                                {/* Feature Content */}
                                <div className='mb-8'>
                                    <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                                        hoveredFeature === feature.id
                                            ? 'text-primary-text-contrast'
                                            : 'text-canvas-text-contrast'
                                    }`}>
                                        {feature.title}
                                    </h3>
                                    
                                    <p className={`text-lg font-medium mb-4 transition-colors duration-300 ${
                                        hoveredFeature === feature.id
                                            ? 'text-primary-text-contrast'
                                            : 'text-canvas-text-contrast'
                                    }`}>
                                        {feature.description}
                                    </p>
                                    
                                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                                        hoveredFeature === feature.id
                                            ? 'text-primary-text-contrast/80'
                                            : 'text-canvas-text'
                                    }`}>
                                        {feature.details}
                                    </p>
                                </div>

                                {/* Stats */}
                                <div className='flex items-center gap-6 mb-6'>
                                    {feature.stats.map((stat, index) => (
                                        <div key={index} className='text-center'>
                                            <div className={`text-2xl font-bold transition-colors duration-300 ${
                                                hoveredFeature === feature.id
                                                    ? 'text-primary-text-contrast'
                                                    : 'text-canvas-text-contrast'
                                            }`}>
                                                {stat.value}
                                            </div>
                                            <div className={`text-xs transition-colors duration-300 ${
                                                hoveredFeature === feature.id
                                                    ? 'text-primary-text-contrast/70'
                                                    : 'text-canvas-text'
                                            }`}>
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Benefit */}
                                <div className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                                    hoveredFeature === feature.id
                                        ? 'text-primary-text-contrast'
                                        : 'text-canvas-text'
                                }`}>
                                    <div className={`w-2 h-2 rounded-full ${
                                        hoveredFeature === feature.id
                                            ? 'bg-primary-text-contrast'
                                            : 'bg-primary-solid'
                                    }`} />
                                    {feature.benefit}
                                </div>

                                {/* Hover Effect Overlay */}
                                {hoveredFeature === feature.id && (
                                    <motion.div
                                        className='absolute inset-0 bg-gradient-to-br from-primary-solid/10 via-transparent to-primary-solid/5 rounded-3xl pointer-events-none'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}