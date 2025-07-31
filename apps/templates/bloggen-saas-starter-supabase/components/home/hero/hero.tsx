'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheck, FaCopy, FaGithub, FaPlay, FaStar, FaUsers, FaRocket, FaCode } from 'react-icons/fa';
import { Button } from '@repo/ui/button';
import Link from 'next/link';

export default function Hero() {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText('npx create-bloggen-app');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const stats = [
        { value: '10K+', label: 'Developers', icon: FaUsers },
        { value: '99.9%', label: 'Uptime', icon: FaRocket },
        { value: '2.5k', label: 'GitHub Stars', icon: FaStar },
        { value: '< 30s', label: 'Deploy Time', icon: FaRocket }
    ];

    const features = [
        'SEO-optimized templates',
        'Supabase integration',
        'MDX blog support',
        'Dynamic OG images',
        'TypeScript ready',
        'One-click deploy'
    ];

    return (
        <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
            
            {/* Grid Pattern */}
            <div className='absolute inset-0 opacity-5'>
                <div className='absolute inset-0' style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                    backgroundSize: '20px 20px'
                }} />
            </div>

            <div className='relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20'>
                <div className='max-w-7xl mx-auto'>
                    {/* Header Content */}
                    <motion.div
                        className='text-center mb-16'
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}>
                        
                        {/* Badge */}
                        <motion.div
                            className='inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-primary-bg border border-primary-border shadow-lg'
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}>
                            <FaRocket className='text-primary-solid w-4 h-4' />
                            <span className='text-sm font-medium text-primary-text-contrast'>
                                Powered by Bloggen AI + Supabase
                            </span>
                            <div className='w-2 h-2 bg-primary-solid rounded-full animate-pulse' />
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            className='text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-canvas-text-contrast mb-8 leading-tight'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}>
                            Ship Your SaaS
                            <br />
                                <span className='from-primary-solid via-primary-text to-primary-text-contrast bg-gradient-to-r bg-clip-text text-transparent'>
                                    In Minutes
                                </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            className='text-xl sm:text-2xl text-canvas-text max-w-4xl mx-auto mb-12 leading-relaxed'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}>
                            The complete Next.js SaaS starter with authentication, payments, SEO, and AI-powered content generation. 
                            From idea to production in one command.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-8'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}>
                            
                            <Button
                                className='group cursor-pointer relative font-semibold shadow-lg hover:shadow-xl flex items-center gap-3 px-8 py-4 rounded-2xl'
                                color='primary'
                                variant='solid'
                                size='lg'
                                leadingIcon={<FaPlay className='w-4 h-4' />}
                                trailingIcon={<FaArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1' />}
                            >
                                Start Building Now
                                <div className='absolute inset-0 bg-gradient-to-r from-primary-solid to-primary-solid/80 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity -z-10' />
                            </Button>

                            <Link
                                href='https://github.com/silverthreadlabs/bloggen-saas-starter-supabase'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <Button
                                    className='group cursor-pointer font-semibold border flex items-center gap-3 px-8 py-4 rounded-2xl bg-canvas-bg text-canvas-text-contrast border-canvas-line hover:border-primary-border hover:bg-primary-bg-subtle transition-all duration-300'
                                    color='neutral'
                                    variant='surface'
                                    size='lg'
                                    leadingIcon={<FaGithub className='w-4 h-4' />}
                                >
                                    View on GitHub
                                    <div className='text-canvas-text text-sm bg-canvas-bg-subtle px-2 py-1 rounded-full'>
                                        2.5k ⭐
                                    </div>
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Command Line */}
                        <motion.div
                            className='max-w-2xl mx-auto mb-16'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}>
                            
                            <div className='bg-canvas-base border border-canvas-line rounded-2xl p-6 shadow-xl'>
                                <div className='flex items-center gap-2 mb-4'>
                                    <div className='w-3 h-3 bg-red-500 rounded-full' />
                                    <div className='w-3 h-3 bg-yellow-500 rounded-full' />
                                    <div className='w-3 h-3 bg-green-500 rounded-full' />
                                    <span className='text-canvas-text text-sm ml-4'>Terminal</span>
                                </div>
                                
                                <div className='flex items-center justify-between p-4 bg-canvas-bg rounded-xl border border-canvas-line'>
                                    <div className='flex items-center gap-3'>
                                        <span className='text-primary-solid'>$</span>
                                        <span className='text-canvas-text-contrast font-mono text-lg'>
                                            npx create-bloggen-app
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className='p-2 text-canvas-text hover:text-primary-solid transition-colors rounded-lg hover:bg-primary-bg-subtle'>
                                        {copied ? (
                                            <FaCheck className='w-4 h-4 text-green-500' />
                                        ) : (
                                            <FaCopy className='w-4 h-4' />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        className='grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20'
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}>
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className='text-center group'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}>
                                <div className='mb-4 flex justify-center'>
                                    <div className='p-3 bg-primary-bg rounded-2xl group-hover:bg-primary-solid transition-colors duration-300'>
                                        <stat.icon className='w-6 h-6 text-primary-solid group-hover:text-white' />
                                    </div>
                                </div>
                                <div className='text-3xl font-bold text-canvas-text-contrast mb-2'>
                                    {stat.value}
                                </div>
                                <div className='text-canvas-text text-sm'>
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Features Preview */}
                    <motion.div
                        className='text-center'
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}>
                        
                        <h3 className='text-2xl font-bold text-canvas-text-contrast mb-8'>
                            Everything you need, built-in
                        </h3>
                        
                        <div className='flex flex-wrap justify-center gap-4 mb-12'>
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className='flex items-center gap-2 px-4 py-2 bg-canvas-bg border border-canvas-line rounded-full text-sm text-canvas-text hover:border-primary-border hover:bg-primary-bg-subtle transition-all duration-300'
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}>
                                    <FaCheck className='w-3 h-3 text-primary-solid' />
                                    {feature}
                                </motion.div>
                            ))}
                        </div>

                        {/* Visual Preview */}
                        <motion.div
                            className='max-w-5xl mx-auto relative'
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}>
                            
                            <div className='bg-canvas-base border border-canvas-line rounded-3xl p-8 shadow-2xl'>
                                <div className='flex items-center gap-4 mb-6'>
                                    <div className='flex gap-2'>
                                        <div className='w-3 h-3 bg-red-500 rounded-full' />
                                        <div className='w-3 h-3 bg-yellow-500 rounded-full' />
                                        <div className='w-3 h-3 bg-green-500 rounded-full' />
                                    </div>
                                    <div className='flex-1 bg-canvas-bg rounded-full px-4 py-2 text-sm text-canvas-text'>
                                        https://your-saas.vercel.app
                                    </div>
                                </div>
                                
                                <div className='space-y-4'>
                                    <div className='flex items-center gap-4'>
                                        <div className='w-16 h-16 bg-primary-bg rounded-2xl flex items-center justify-center'>
                                            <FaCode className='w-8 h-8 text-primary-solid' />
                                        </div>
                                        <div className='flex-1'>
                                            <div className='h-4 bg-canvas-bg rounded w-3/4 mb-2' />
                                            <div className='h-3 bg-canvas-bg-subtle rounded w-1/2' />
                                        </div>
                                    </div>
                                    
                                    <div className='grid grid-cols-3 gap-4'>
                                        <div className='h-20 bg-canvas-bg rounded-xl' />
                                        <div className='h-20 bg-canvas-bg rounded-xl' />
                                        <div className='h-20 bg-canvas-bg rounded-xl' />
                                    </div>
                                    
                                    <div className='h-32 bg-canvas-bg rounded-xl' />
                                </div>
                            </div>
                            
                            {/* Floating elements */}
                            <div className='absolute -top-4 -right-4 w-8 h-8 bg-primary-solid rounded-full animate-bounce' />
                            <div className='absolute -bottom-4 -left-4 w-6 h-6 bg-primary-solid/60 rounded-full animate-bounce delay-1000' />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}