'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { FaBrain, FaGlobe, FaShieldAlt, FaComments, FaMicrophone, FaRobot, FaCog, FaChartLine, FaUsers, FaCode, FaCloud, FaEye, FaMagic, FaInfinity, FaArrowRight, FaCheckCircle, FaPlay, FaStar } from 'react-icons/fa';

interface Feature {
    id: number;
    title: string;
    description: string;
    details: string;
    category: string;
    icon: React.ComponentType<any>;
    stats: {
        primary: string;
        secondary: string;
    };
    highlights: string[];
    preview: {
        title: string;
        demo: string[];
    };
}

const featuresData: Feature[] = [
    {
        id: 1,
        title: 'Contextual Intelligence',
        description: 'AI that remembers, understands, and evolves with every conversation',
        details: 'Our neural networks maintain conversation context across sessions, understanding not just what you say, but what you mean. Advanced memory systems ensure personalized interactions that improve over time.',
        category: 'Core AI',
        icon: FaBrain,
        stats: { primary: '98.9%', secondary: 'Context Accuracy' },
        highlights: ['Long-term memory', 'Emotional intelligence', 'Personal adaptation'],
        preview: {
            title: 'Memory in Action',
            demo: ['Remembers past preferences', 'Understands conversation flow', 'Adapts to your style']
        }
    },
    {
        id: 2,
        title: 'Omnichannel Communication',
        description: 'Seamless interaction across voice, text, images, and documents',
        details: 'Switch between communication modes effortlessly. Upload documents, speak naturally, type messages, or share images - our AI understands and responds appropriately to each input type.',
        category: 'Interface',
        icon: FaComments,
        stats: { primary: '<0.3s', secondary: 'Response Time' },
        highlights: ['Voice recognition', 'Document analysis', 'Image understanding'],
        preview: {
            title: 'Multi-Modal Demo',
            demo: ['Processing voice input...', 'Analyzing uploaded file...', 'Understanding visual content...']
        }
    },
    {
        id: 3,
        title: 'Zero-Trust Security',
        description: 'Enterprise-grade protection with complete conversation privacy',
        details: 'Every interaction is encrypted end-to-end with zero data retention. Advanced security protocols ensure your conversations remain completely private and secure from any unauthorized access.',
        category: 'Security',
        icon: FaShieldAlt,
        stats: { primary: '256-bit', secondary: 'Encryption' },
        highlights: ['End-to-end encryption', 'Zero data storage', 'Compliance ready'],
        preview: {
            title: 'Security Layers',
            demo: ['Encrypting conversation...', 'Validating permissions...', 'Securing data transfer...']
        }
    },
    {
        id: 4,
        title: 'Intelligent Automation',
        description: 'Smart workflows that learn and optimize your daily tasks',
        details: 'Beyond simple chat, our AI creates intelligent workflows, automates repetitive tasks, and integrates with your favorite tools to boost productivity and streamline operations.',
        category: 'Automation',
        icon: FaCog,
        stats: { primary: '10x', secondary: 'Productivity Boost' },
        highlights: ['Task automation', 'Workflow creation', 'Tool integration'],
        preview: {
            title: 'Automation Engine',
            demo: ['Creating workflow...', 'Connecting to tools...', 'Optimizing process...']
        }
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
        rotateX: -15
    },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
        }
    }
};

export default function Features() {
    const [activeDemo, setActiveDemo] = useState<number>(0);
    const [currentFeature, setCurrentFeature] = useState<number>(0);

    // Cycle through features for center display
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeature(prev => (prev + 1) % featuresData.length);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    // Cycle through demo states
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveDemo(prev => (prev + 1) % 3);
        }, 2000);
        
        return () => clearInterval(interval);
    }, []);

    const featured = featuresData[currentFeature];

    return (
        <section className='relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden'>
            
            {/* Animated Background Elements */}
            <div className='absolute inset-0'>
                <motion.div
                    className='absolute top-20 left-20 w-2 h-2 bg-primary-solid rounded-full opacity-60'
                    animate={{
                        scale: [1, 2, 1],
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className='absolute bottom-32 right-32 w-3 h-3 bg-primary-solid rounded-full opacity-40'
                    animate={{
                        y: [-20, 20, -20],
                        opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                />
                <motion.div
                    className='absolute top-1/2 left-1/4 w-1 h-1 bg-primary-solid rounded-full opacity-50'
                    animate={{
                        x: [-10, 10, -10],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                />
            </div>

            <div className='relative max-w-7xl mx-auto'>
                
                {/* Header */}
                <motion.div
                    className='text-center mb-20'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}>

                    <h2 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-canvas-text-contrast mb-6 leading-tight'>
                        AI that thinks
                        <span className='block bg-gradient-to-r from-primary-solid to-primary-text bg-clip-text text-transparent'>
                            beyond words
                        </span>
                    </h2>

                    <p className='text-xl text-canvas-text max-w-3xl mx-auto leading-relaxed'>
                        Experience AI capabilities that go far beyond simple responses. 
                        Our intelligent features adapt, learn, and evolve with every interaction.
                    </p>
                </motion.div>

                {/* Central Feature Showcase */}
                <div className='mb-24'>
                    <motion.div
                        className='relative max-w-4xl mx-auto'
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}>
                        
                        <div className='bg-canvas-base border border-canvas-line rounded-3xl p-12 shadow-2xl relative overflow-hidden'>
                            
                            {/* Animated Background Gradient */}
                            <motion.div
                                className='absolute inset-0 opacity-10'
                                style={{
                                    background: `conic-gradient(from 0deg, rgba(var(--primary-solid-rgb), 0.3), transparent, rgba(var(--primary-solid-rgb), 0.2), transparent)`
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                            
                            <div className='relative z-10'>
                                <AnimatePresence mode='wait'>
                                    <motion.div
                                        key={currentFeature}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.6 }}
                                        className='text-center'>
                                        
                                        {/* Feature Icon */}
                                        <motion.div
                                            className='inline-flex p-6 bg-primary-solid rounded-3xl text-white shadow-2xl mb-8'
                                            animate={{ 
                                                rotateY: [0, 10, -10, 0]
                                            }}
                                            transition={{ duration: 4, repeat: Infinity }}>
                                            <featured.icon className='w-12 h-12' />
                                        </motion.div>

                                        {/* Category Badge */}
                                        <div className='inline-block px-4 py-2 bg-primary-bg border border-primary-border rounded-full text-primary-text-contrast text-sm font-medium mb-6'>
                                            {featured.category}
                                        </div>

                                        {/* Title & Description */}
                                        <h3 className='text-3xl font-bold text-canvas-text-contrast mb-4'>
                                            {featured.title}
                                        </h3>
                                        
                                        <p className='text-xl text-canvas-text mb-8 max-w-2xl mx-auto'>
                                            {featured.description}
                                        </p>

                                        {/* Stats Display */}
                                        <div className='flex justify-center items-center gap-8 mb-8'>
                                            <div className='text-center'>
                                                <div className='text-4xl font-bold text-primary-solid mb-2'>
                                                    {featured.stats.primary}
                                                </div>
                                                <div className='text-sm text-canvas-text'>
                                                    {featured.stats.secondary}
                                                </div>
                                            </div>
                                            <div className='w-px h-12 bg-canvas-line' />
                                            <div className='text-center'>
                                                <div className='text-2xl font-bold text-canvas-text-contrast mb-2'>
                                                    {featured.preview.title}
                                                </div>
                                                <div className='text-sm text-primary-solid'>
                                                    {featured.preview.demo[activeDemo]}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Highlights */}
                                        <div className='flex flex-wrap justify-center gap-4'>
                                            {featured.highlights.map((highlight, index) => (
                                                <motion.div
                                                    key={highlight}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className='flex items-center gap-2 px-4 py-2 bg-primary-bg/50 rounded-full'>
                                                    <FaCheckCircle className='text-primary-solid w-4 h-4' />
                                                    <span className='text-canvas-text-contrast text-sm font-medium'>
                                                        {highlight}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Feature Navigation Dots */}
                            <div className='flex justify-center gap-3 mt-8'>
                                {featuresData.map((_, index) => (
                                    <motion.button
                                        key={index}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            currentFeature === index 
                                                ? 'bg-primary-solid scale-125' 
                                                : 'bg-canvas-line hover:bg-primary-solid/50'
                                        }`}
                                        onClick={() => setCurrentFeature(index)}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Feature Grid */}
                <motion.div
                    className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'
                    variants={containerVariants}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, margin: "-100px" }}>
                    
                    {featuresData.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            variants={cardVariants}
                            className='group cursor-pointer h-full'
                            style={{ perspective: "1000px" }}
                            onClick={() => setCurrentFeature(index)}>
                            
                            <motion.div
                                className={`relative p-8 rounded-2xl border transition-all duration-500 transform-gpu h-full flex flex-col ${
                                    currentFeature === index
                                        ? 'bg-primary-bg border-primary-solid shadow-2xl shadow-primary-solid/20'
                                        : 'bg-canvas-bg border-canvas-line hover:border-primary-border hover:shadow-xl'
                                }`}
                                whileHover={{ 
                                    rotateY: 5,
                                    rotateX: 5,
                                    transition: { duration: 0.3 }
                                }}>
                                
                                {/* Icon */}
                                <motion.div
                                    className={`p-4 rounded-2xl mb-6 transition-all duration-300 ${
                                        currentFeature === index
                                            ? 'bg-primary-solid text-white shadow-lg'
                                            : 'bg-primary-bg text-primary-solid group-hover:bg-primary-solid group-hover:text-white'
                                    }`}
                                    animate={currentFeature === index ? {
                                        rotateY: [0, 180, 360]
                                    } : {}}
                                    transition={{ duration: 2, repeat: Infinity }}>
                                    <feature.icon className='w-8 h-8' />
                                </motion.div>

                                {/* Content */}
                                <div className='flex-1 flex flex-col'>
                                    <div className='flex items-center justify-between mb-3'>
                                        <span className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                                            currentFeature === index
                                                ? 'bg-primary-solid text-white'
                                                : 'bg-canvas-bg-subtle text-canvas-text'
                                        }`}>
                                            {feature.category}
                                        </span>
                                    </div>
                                    
                                    <h3 className={`text-xl font-bold mb-3 transition-colors ${
                                        currentFeature === index
                                            ? 'text-primary-text-contrast'
                                            : 'text-canvas-text-contrast'
                                    }`}>
                                        {feature.title}
                                    </h3>
                                    
                                    <p className={`text-sm leading-relaxed mb-6 flex-1 transition-colors ${
                                        currentFeature === index
                                            ? 'text-primary-text-contrast/90'
                                            : 'text-canvas-text'
                                    }`}>
                                        {feature.description}
                                    </p>

                                    {/* Quick Stats */}
                                    <div className='flex items-center justify-between mt-auto'>
                                        <div className='text-center'>
                                            <div className={`text-lg font-bold transition-colors ${
                                                currentFeature === index
                                                    ? 'text-primary-text-contrast'
                                                    : 'text-primary-solid'
                                            }`}>
                                                {feature.stats.primary}
                                            </div>
                                            <div className={`text-xs transition-colors ${
                                                currentFeature === index
                                                    ? 'text-primary-text-contrast/70'
                                                    : 'text-canvas-text/70'
                                            }`}>
                                                {feature.stats.secondary}
                                            </div>
                                        </div>

                                        <div
                                            className={`p-2 rounded-lg transition-colors ${
                                                currentFeature === index
                                                    ? 'bg-primary-text-contrast/20 text-primary-text-contrast'
                                                    : 'bg-primary-bg text-primary-solid'
                                            }`}>
                                            <FaArrowRight className='w-4 h-4' />
                                        </div>
                                    </div>
                                </div>

                                {/* Active Indicator */}
                                {currentFeature === index && (
                                    <motion.div
                                        className='absolute inset-0 rounded-2xl border-2 border-primary-solid opacity-50'
                                        animate={{
                                            opacity: [0.5, 0.8, 0.5]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                )}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}