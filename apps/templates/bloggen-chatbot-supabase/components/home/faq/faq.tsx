'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaShieldAlt, FaBrain, FaGlobe, FaCog, FaSearch, FaPlus, FaMinus, FaArrowRight, FaCheckCircle, FaRocket } from 'react-icons/fa';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    icon: React.ComponentType<any>;
    category: string;
    color: string;
    popular: boolean;
}

const faqData: FAQItem[] = [
    {
        id: 1,
        question: 'How accurate is your AI chatbot?',
        answer: 'Our AI chatbot maintains 98.9% accuracy across all conversations. It uses advanced natural language processing to understand context, intent, and nuance, delivering responses that are both accurate and helpful. The AI continuously learns from interactions to improve its accuracy over time.',
        icon: FaBrain,
        category: 'Intelligence',
        color: 'from-primary-solid to-primary-text',
        popular: true
    },
    {
        id: 2,
        question: 'What languages does the chatbot support?',
        answer: 'Our chatbot supports over 150 languages with native-level fluency. It can seamlessly switch between languages within a single conversation and maintains context across different languages. Popular languages include English, Spanish, French, German, Chinese, Japanese, and many more.',
        icon: FaGlobe,
        category: 'Features',
        color: 'from-primary-solid to-primary-text',
        popular: true
    },
    {
        id: 3,
        question: 'How fast are the response times?',
        answer: 'Our AI delivers responses in under 0.5 seconds on average. With our global edge computing infrastructure, users worldwide experience consistently fast response times. The system is optimized for real-time conversations with minimal latency.',
        icon: FaRocket,
        category: 'Performance',
        color: 'from-primary-solid to-primary-text',
        popular: false
    },
    {
        id: 4,
        question: 'Is my conversation data secure and private?',
        answer: 'Absolutely. We use end-to-end encryption for all conversations with zero data retention policy. Your conversations are never stored, logged, or used for training. We\'re SOC 2 compliant and follow the highest security standards to protect your privacy.',
        icon: FaShieldAlt,
        category: 'Security',
        color: 'from-primary-solid to-primary-text',
        popular: true
    },
    {
        id: 5,
        question: 'How do I integrate the chatbot into my website?',
        answer: 'Integration is simple with our developer-friendly APIs and SDKs. You can have the chatbot running on your website in under 5 minutes using our embed code, or customize it fully with our REST API. We provide detailed documentation and code examples for all major platforms.',
        icon: FaCog,
        category: 'Integration',
        color: 'from-primary-solid to-primary-text',
        popular: false
    },
    {
        id: 6,
        question: 'Can the chatbot learn from my specific business needs?',
        answer: 'Yes! Our AI can be trained on your specific business context, terminology, and processes. It adapts to your industry, learns your company\'s voice, and becomes more effective over time. Custom training ensures responses are tailored to your unique requirements.',
        icon: FaRobot,
        category: 'Customization',
        color: 'from-primary-solid to-primary-text',
        popular: false
    }
];

const categories = ['All', 'Intelligence', 'Features', 'Performance', 'Security', 'Integration', 'Customization'];

export default function FAQ() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [openItems, setOpenItems] = useState<Set<number>>(new Set());
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const toggleItem = (id: number) => {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }

            return newSet;
        });
    };

    // Filter FAQs based on category and search
    const filteredFAQs = faqData.filter(item => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             item.answer.toLowerCase().includes(searchQuery.toLowerCase());
        
                             return matchesCategory && matchesSearch;
    });

    const popularFAQs = faqData.filter(item => item.popular);

    return (
        <section className='w-full  relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden'>
            
            {/* Background Effects */}
            <div className='absolute inset-0 opacity-30'>
                <div className='absolute top-1/4 left-1/6 w-64 h-64 bg-primary-solid/10 rounded-full blur-3xl animate-pulse' />
                <div className='absolute bottom-1/4 right-1/6 w-64 h-64 bg-primary-solid/5 rounded-full blur-3xl animate-pulse delay-1000' />
            </div>

            <div className='relative max-w-7xl mx-auto'>
                
                {/* Header */}
                <motion.div
                    className='text-center mb-16'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}>
                    

                    <h2 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-canvas-text-contrast mb-6 leading-tight'>
                        Got questions?
                        <span className='block bg-gradient-to-r from-primary-solid to-primary-text bg-clip-text text-transparent'>
                            We have answers
                        </span>
                    </h2>

                    <p className='text-xl text-canvas-text max-w-3xl mx-auto leading-relaxed mb-8'>
                        Everything you need to know about our AI chatbot, from features and security to integration and customization.
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className='w-full mx-auto space-y-4'>
                    <AnimatePresence>
                        {filteredFAQs.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className='group'
                                onMouseEnter={() => setHoveredCard(item.id)}
                                onMouseLeave={() => setHoveredCard(null)}>
                                
                                <div className={`relative overflow-hidden w-full rounded-2xl border transition-all duration-300 ${
                                    openItems.has(item.id)
                                        ? 'border-primary-border bg-primary-bg/20 shadow-lg'
                                        : 'border-canvas-line bg-canvas-bg hover:border-primary-border/50 hover:bg-primary-bg/10'
                                }`}>
                                    
                                    {/* Question Header */}
                                    <motion.div
                                        className='flex items-center justify-between p-6 cursor-pointer'
                                        onClick={() => toggleItem(item.id)}>
                                        
                                        <div className='flex items-center gap-4 flex-1'>
                                            <motion.div
                                                className={`p-3 rounded-xl transition-all duration-300 ${
                                                    openItems.has(item.id)
                                                        ? 'bg-primary-solid text-white shadow-lg'
                                                        : 'bg-primary-bg text-primary-solid group-hover:bg-primary-solid group-hover:text-white'
                                                }`}
                                                animate={hoveredCard === item.id ? { rotate: 360 } : { rotate: 0 }}
                                                transition={{ duration: 0.6 }}>
                                                <item.icon className='w-6 h-6' />
                                            </motion.div>
                                            
                                            <div className='flex-1'>
                                                <div className='flex items-center gap-3 mb-2'>
                                                    <span className='text-xs px-3 py-1 bg-canvas-bg-subtle text-canvas-text rounded-full font-medium'>
                                                        {item.category}
                                                    </span>
                                                    {item.popular && (
                                                        <span className='text-xs px-2 py-1 bg-primary-solid text-white rounded-full font-medium'>
                                                            Popular
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className='text-lg font-semibold text-canvas-text-contrast leading-tight'>
                                                    {item.question}
                                                </h3>
                                            </div>
                                        </div>
                                        
                                        <motion.div
                                            className={`p-2 rounded-lg transition-all duration-300 ${
                                                openItems.has(item.id)
                                                    ? 'bg-primary-solid/20 text-primary-text-contrast'
                                                    : 'bg-canvas-bg-subtle text-canvas-text group-hover:bg-primary-bg/20'
                                            }`}
                                            animate={{ rotate: openItems.has(item.id) ? 45 : 0 }}
                                            transition={{ duration: 0.3 }}>
                                            {openItems.has(item.id) ? (
                                                <FaMinus className='w-5 h-5' />
                                            ) : (
                                                <FaPlus className='w-5 h-5' />
                                            )}
                                        </motion.div>
                                    </motion.div>

                                    {/* Answer Content */}
                                    <AnimatePresence>
                                        {openItems.has(item.id) && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                                className='overflow-hidden'>
                                                
                                                <div className='px-6 pb-6'>
                                                    <div className='h-px bg-gradient-to-r from-transparent via-canvas-line to-transparent mb-6' />
                                                    
                                                    <div className='flex items-start gap-4'>
                                                        <FaCheckCircle className='text-primary-solid w-5 h-5 mt-1 flex-shrink-0' />
                                                        <p className='text-canvas-text leading-relaxed'>
                                                            {item.answer}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}