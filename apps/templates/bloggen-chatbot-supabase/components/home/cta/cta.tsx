'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaRobot, FaArrowRight, FaComments, FaStar, FaRocket, FaPlay, FaChevronRight } from 'react-icons/fa';

export default function CTA() {
    const [activeDemo, setActiveDemo] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const demoMessages = [
        "Building your AI assistant...",
        "Connecting to neural networks...",
        "Ready to transform conversations..."
    ];

    // Cycle through demo messages
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveDemo(prev => (prev + 1) % demoMessages.length);
        }, 2500);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <section className='w-full px-4 py-20 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
                
                {/* Main CTA Container */}
                <motion.div
                    className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-canvas-base via-canvas-bg to-canvas-base border border-canvas-line shadow-2xl'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}>
                    
                    {/* Animated Background Elements */}
                    <div className='absolute inset-0 overflow-hidden'>
                        {/* Gradient Orbs */}
                        <motion.div
                            className='absolute -top-20 -right-20 w-80 h-80 bg-primary-solid/10 rounded-full blur-3xl'
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ duration: 6, repeat: Infinity }}
                        />
                        <motion.div
                            className='absolute -bottom-20 -left-20 w-80 h-80 bg-primary-solid/5 rounded-full blur-3xl'
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.2, 0.5, 0.2]
                            }}
                            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                        />
                        
                        {/* Floating Icons */}
                        <motion.div
                            className='absolute top-20 left-20 w-12 h-12 bg-primary-bg/30 rounded-full flex items-center justify-center backdrop-blur-sm'
                            animate={{
                                y: [-10, 10, -10],
                                rotate: [0, 180, 360]
                            }}
                            transition={{ duration: 8, repeat: Infinity }}>
                            <FaRobot className='text-primary-solid w-6 h-6' />
                        </motion.div>
                        
                        <motion.div
                            className='absolute top-32 right-32 w-8 h-8 bg-primary-bg/20 rounded-full flex items-center justify-center backdrop-blur-sm'
                            animate={{
                                y: [10, -10, 10],
                                x: [-5, 5, -5]
                            }}
                            transition={{ duration: 6, repeat: Infinity, delay: 2 }}>
                            <FaRobot className='text-primary-solid w-4 h-4' />
                        </motion.div>
                        
                        <motion.div
                            className='absolute bottom-32 right-20 w-10 h-10 bg-primary-bg/25 rounded-full flex items-center justify-center backdrop-blur-sm'
                            animate={{
                                rotate: [0, -180, -360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 10, repeat: Infinity, delay: 1 }}>
                            <FaComments className='text-primary-solid w-5 h-5' />
                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className='relative z-10 p-12 sm:p-16 lg:p-20'>
                        <div className='max-w-4xl mx-auto text-center'>
                            

                            {/* Main Headline */}
                            <motion.h2
                                className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-canvas-text-contrast mb-8 leading-tight'
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}>
                                Ready to build the
                                <span className='block bg-gradient-to-r from-primary-solid via-primary-text to-primary-text-contrast bg-clip-text text-transparent'>
                                    future of conversation?
                                </span>
                            </motion.h2>

                            {/* Description */}
                            <motion.p
                                className='text-xl sm:text-2xl text-canvas-text mb-12 leading-relaxed max-w-3xl mx-auto'
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}>
                                Join thousands of developers creating intelligent chatbots that understand, learn, and adapt. 
                                Transform your ideas into conversations that matter.
                            </motion.p>

                            {/* Live Demo Simulation */}
                            <motion.div
                                className='mb-12 max-w-md mx-auto'
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.5 }}>
                                
                                <div className='bg-canvas-bg/60 backdrop-blur-xl border border-canvas-line rounded-2xl p-6'>
                                    <div className='flex items-center gap-3 mb-4'>
                                        <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse' />
                                        <span className='text-canvas-text text-sm font-medium'>AI Assistant Active</span>
                                    </div>
                                    
                                    <AnimatePresence mode='wait'>
                                        <motion.div
                                            key={activeDemo}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.5 }}
                                            className='flex items-center gap-3'>
                                            
                                            <div className='flex gap-1'>
                                                {[0, 1, 2].map((i) => (
                                                    <motion.div
                                                        key={i}
                                                        className='w-2 h-2 bg-primary-solid rounded-full'
                                                        animate={{
                                                            scale: [1, 1.5, 1],
                                                            opacity: [0.5, 1, 0.5]
                                                        }}
                                                        transition={{
                                                            duration: 1,
                                                            repeat: Infinity,
                                                            delay: i * 0.2
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            
                                            <span className='text-canvas-text-contrast text-sm'>
                                                {demoMessages[activeDemo]}
                                            </span>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                className='flex flex-col sm:flex-row gap-6 justify-center items-center'
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.6 }}>
                                
                                {/* Primary CTA */}
                                <motion.div
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}>
                                    
                                    <Link href='#' target='_blank' rel='noopener noreferrer'>
                                        <Button
                                            color='primary'
                                            variant='solid'
                                            size='lg'
                                            className='group relative overflow-hidden px-10 py-6 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-primary-solid/25 transition-all duration-300'>
                                            
                                            {/* Animated Background */}
                                            <motion.div
                                                className='absolute inset-0 bg-gradient-to-r from-primary-solid via-primary-text to-primary-solid'
                                                animate={{
                                                    x: isHovered ? '0%' : '-100%'
                                                }}
                                                transition={{ duration: 0.6 }}
                                            />
                                            
                                            <div className='relative z-10 flex items-center gap-3'>
                                                <FaRocket className='w-5 h-5' />
                                                <span>Start Building Free</span>
                                                <motion.div
                                                    animate={{ x: isHovered ? 5 : 0 }}
                                                    transition={{ duration: 0.3 }}>
                                                    <FaArrowRight className='w-5 h-5' />
                                                </motion.div>
                                            </div>
                                            
                                            {/* Shimmer Effect */}
                                            <motion.div
                                                className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
                                                animate={{
                                                    x: ['-100%', '100%'],
                                                    transition: {
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        repeatDelay: 3
                                                    }
                                                }}
                                            />
                                        </Button>
                                    </Link>
                                </motion.div>

                                {/* Secondary CTA */}
                                <Link href='/chat' rel='noopener noreferrer'>
                                    <Button
                                        color='neutral'
                                        variant='surface'
                                        size='lg'
                                        className='group px-10 py-6 rounded-2xl text-lg font-semibold bg-canvas-bg/60 backdrop-blur-xl border border-canvas-line hover:border-primary-border hover:bg-primary-bg/20 transition-all duration-300'>
                                        
                                        <div className='flex items-center gap-3'>
                                            <FaPlay className='w-4 h-4' />
                                            <span>Watch Demo</span>
                                            <motion.div
                                                className='transition-transform group-hover:translate-x-1'>
                                                <FaChevronRight className='w-4 h-4' />
                                            </motion.div>
                                        </div>
                                    </Button>
                                </Link>
                            </motion.div>

                            {/* Trust Indicators */}
                            <motion.div
                                className='mt-12 flex flex-wrap justify-center items-center gap-8 text-canvas-text text-sm'
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.8 }}>
                                
                                <div className='flex items-center gap-2'>
                                    <div className='w-2 h-2 bg-green-500 rounded-full' />
                                    <span>No credit card required</span>
                                </div>
                                
                                <div className='flex items-center gap-2'>
                                    <div className='w-2 h-2 bg-primary-solid rounded-full' />
                                    <span>5-minute setup</span>
                                </div>
                                
                                <div className='flex items-center gap-2'>
                                    <div className='w-2 h-2 bg-primary-solid rounded-full' />
                                    <span>24/7 support</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}