'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBrain, FaGlobe, FaShieldAlt, FaRocket, FaUsers, FaComments, FaChartLine, FaClock, FaCheckCircle, FaStar, FaInfinity } from 'react-icons/fa';

export default function Performance() {
    const [activeMetric, setActiveMetric] = useState(0);
    const [liveStats, setLiveStats] = useState({
        conversations: 1247382,
        responseTime: 0.3,
        satisfaction: 98.7,
        uptime: 99.99
    });

    // Live counter animation
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveStats(prev => ({
                ...prev,
                conversations: prev.conversations + Math.floor(Math.random() * 3) + 1,
                responseTime: +(Math.random() * 0.2 + 0.2).toFixed(1),
            }));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // Metric rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveMetric((prev) => (prev + 1) % performanceMetrics.length);
        }, 4000);
        
        return () => clearInterval(interval);
    }, []);

    const performanceMetrics = [
        {
            icon: FaRocket,
            title: "Lightning Speed",
            value: "0.3s",
            description: "Average response time across all queries",
            color: "from-yellow-400 to-orange-500",
            bgGlow: "shadow-yellow-500/20"
        },
        {
            icon: FaBrain,
            title: "AI Accuracy",
            value: "98.7%",
            description: "Correct responses on first attempt",
            color: "from-purple-400 to-pink-500",
            bgGlow: "shadow-purple-500/20"
        },
        {
            icon: FaUsers,
            title: "User Satisfaction",
            value: "4.9/5",
            description: "Average rating from verified users",
            color: "from-green-400 to-emerald-500",
            bgGlow: "shadow-green-500/20"
        },
        {
            icon: FaRocket,
            title: "Uptime",
            value: "99.99%",
            description: "Reliable service you can count on",
            color: "from-blue-400 to-cyan-500",
            bgGlow: "shadow-blue-500/20"
        }
    ];

    const Icon = performanceMetrics[activeMetric].icon;

    const capabilities = [
        {
            icon: FaComments,
            title: "Natural Conversations",
            description: "Human-like dialogue with context awareness",
            stats: "500M+ interactions"
        },
        {
            icon: FaGlobe,
            title: "Multi-Language",
            description: "Fluent communication in 100+ languages",
            stats: "150+ languages"
        },
        {
            icon: FaShieldAlt,
            title: "Privacy Protected",
            description: "End-to-end encryption for all conversations",
            stats: "Zero data sharing"
        },
        {
            icon: FaBrain,
            title: "Continuous Learning",
            description: "Always improving through advanced ML",
            stats: "24/7 learning"
        }
    ];

    const benchmarks = [
        {
            platform: "Customer Satisfaction",
            score: 98.7,
            maxScore: 100,
            icon: FaStar,
            color: "bg-yellow-500"
        },
        {
            platform: "Response Accuracy",
            score: 96.4,
            maxScore: 100,
            icon: FaCheckCircle,
            color: "bg-green-500"
        },
        {
            platform: "Speed Performance",
            score: 99.2,
            maxScore: 100,
            icon: FaRocket,
            color: "bg-blue-500"
        },
        {
            platform: "Uptime Reliability",
            score: 99.99,
            maxScore: 100,
            icon: FaRocket,
            color: "bg-purple-500"
        }
    ];

    return (
        <section className='w-full px-4 sm:px-6 lg:px-8 py-16 xl:py-24 relative overflow-hidden'>
            {/* Background Effects */}
            <div className='absolute inset-0 opacity-30'>
                <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-primary-solid/10 rounded-full blur-3xl animate-pulse' />
                <div className='absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary-solid/10 rounded-full blur-3xl animate-pulse delay-1000' />
            </div>

            <div className='mx-auto max-w-7xl relative z-10'>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='text-center mb-20'>
                    
                    <motion.h2 
                        className='text-canvas-text-contrast mb-8 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}>
                        Breakthrough
                        <span className='from-primary-solid via-primary-text to-primary-text-contrast bg-gradient-to-r bg-clip-text text-transparent block mt-2'>
                            AI Performance
                        </span>
                    </motion.h2>
                    
                    <motion.p 
                        className='text-canvas-text mx-auto max-w-4xl text-xl leading-relaxed'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}>
                        Our AI chatbot delivers industry-leading performance across speed, accuracy, and user satisfaction. 
                        Experience the difference that advanced technology makes.
                    </motion.p>
                </motion.div>

                {/* Live Stats Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className='mb-20'>
                    <div className='bg-canvas-base/80 backdrop-blur-xl border border-canvas-line rounded-3xl p-8 shadow-2xl'>
                        <div className='flex items-center justify-center mb-6'>
                            <div className='flex items-center gap-3'>
                                <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse' />
                                <span className='text-canvas-text font-semibold'>Live Performance Data</span>
                            </div>
                        </div>
                        
                        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
                            <motion.div 
                                className='text-center'
                                key={liveStats.conversations}>
                                <div className='text-3xl lg:text-4xl font-bold text-canvas-text-contrast mb-2'>
                                    {liveStats.conversations.toLocaleString()}
                                </div>
                                <div className='text-canvas-text text-sm'>Active Conversations</div>
                            </motion.div>
                            
                            <motion.div 
                                className='text-center'
                                key={liveStats.responseTime}>
                                <div className='text-3xl lg:text-4xl font-bold text-canvas-text-contrast mb-2'>
                                    {liveStats.responseTime}s
                                </div>
                                <div className='text-canvas-text text-sm'>Avg Response Time</div>
                            </motion.div>
                            
                            <div className='text-center'>
                                <div className='text-3xl lg:text-4xl font-bold text-canvas-text-contrast mb-2'>
                                    {liveStats.satisfaction}%
                                </div>
                                <div className='text-canvas-text text-sm'>User Satisfaction</div>
                            </div>
                            
                            <div className='text-center'>
                                <div className='text-3xl lg:text-4xl font-bold text-canvas-text-contrast mb-2'>
                                    {liveStats.uptime}%
                                </div>
                                <div className='text-canvas-text text-sm'>System Uptime</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Performance Metrics Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className='grid lg:grid-cols-2 gap-8 mb-20'>
                    
                    {/* Main Metric Display */}
                    <div className='relative'>
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={activeMetric}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                                className={`bg-canvas-base/80 backdrop-blur-xl border border-canvas-line rounded-3xl p-12 shadow-2xl ${performanceMetrics[activeMetric].bgGlow}`}>
                                
                                <div className='text-center'>
                                    <motion.div
                                        className={`inline-flex p-6 rounded-3xl bg-gradient-to-r ${performanceMetrics[activeMetric].color} mb-8`}
                                        animate={{ rotate: [0, 5, -5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}>
                                        <Icon className='w-12 h-12 text-white' />
                                    </motion.div>
                                    
                                    <h3 className='text-2xl font-bold text-canvas-text-contrast mb-4'>
                                        {performanceMetrics[activeMetric].title}
                                    </h3>
                                    
                                    <div className='text-6xl font-extrabold text-transparent bg-gradient-to-r from-primary-solid to-primary-text bg-clip-text mb-4'>
                                        {performanceMetrics[activeMetric].value}
                                    </div>
                                    
                                    <p className='text-canvas-text text-lg leading-relaxed'>
                                        {performanceMetrics[activeMetric].description}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        
                        {/* Metric Indicators */}
                        <div className='flex justify-center mt-6 gap-3'>
                            {performanceMetrics.map((_, index) => (
                                <motion.button
                                    key={index}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        activeMetric === index ? 'bg-primary-solid scale-125' : 'bg-canvas-line'
                                    }`}
                                    whileHover={{ scale: 1.2 }}
                                    onClick={() => setActiveMetric(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Capabilities Grid */}
                    <div className='space-y-6'>
                        {capabilities.map((capability, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                                className='bg-canvas-base/60 backdrop-blur-sm border border-canvas-line rounded-2xl p-6 hover:border-primary-border hover:bg-primary-bg/10 transition-all duration-300 group cursor-pointer'
                                whileHover={{ scale: 1.02 }}>
                                
                                <div className='flex items-start gap-4'>
                                    <div className='p-3 bg-primary-bg rounded-xl group-hover:bg-primary-solid transition-colors duration-300 shrink-0'>
                                        <capability.icon className='w-6 h-6 text-primary-solid group-hover:text-white' />
                                    </div>
                                    
                                    <div className='flex-1'>
                                        <div className='flex items-center justify-between mb-2'>
                                            <h4 className='font-bold text-canvas-text-contrast text-lg'>
                                                {capability.title}
                                            </h4>
                                            <span className='text-primary-text text-sm font-semibold'>
                                                {capability.stats}
                                            </span>
                                        </div>
                                        <p className='text-canvas-text leading-relaxed'>
                                            {capability.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Benchmark Scores */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className='text-center'>
                    
                    <h3 className='text-3xl font-bold text-canvas-text-contrast mb-12'>
                        Industry-Leading Benchmarks
                    </h3>
                    
                    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {benchmarks.map((benchmark, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                                className='bg-canvas-base/60 backdrop-blur-sm border border-canvas-line rounded-2xl p-8 hover:border-primary-border transition-all duration-300 group'
                                whileHover={{ y: -5 }}>
                                
                                <div className={`inline-flex p-4 rounded-2xl ${benchmark.color} mb-6`}>
                                    <benchmark.icon className='w-8 h-8 text-white' />
                                </div>
                                
                                <div className='text-4xl font-bold text-canvas-text-contrast mb-2'>
                                    {benchmark.score}
                                    <span className='text-canvas-text text-lg'>/{benchmark.maxScore}</span>
                                </div>
                                
                                <h4 className='font-semibold text-canvas-text-contrast mb-4'>
                                    {benchmark.platform}
                                </h4>
                                
                                {/* Progress Bar */}
                                <div className='w-full bg-canvas-line rounded-full h-2 overflow-hidden'>
                                    <motion.div
                                        className={`h-full ${benchmark.color} rounded-full`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${benchmark.score}%` }}
                                        transition={{ duration: 1, delay: 1 + index * 0.1 }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}