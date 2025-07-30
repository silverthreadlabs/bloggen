'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaCheck, FaCopy, FaGithub, FaPlay, FaStar, FaUsers, FaRocket, FaRobot, FaComments, FaBrain, FaMicrophone, FaKeyboard, FaGlobe, FaShieldAlt, FaInfinity, FaMagic } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
    const [activeFeature, setActiveFeature] = useState(0);
    const [typingText, setTypingText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const questions = [
        "How can I boost my productivity?",
        "What's the weather like today?",
        "Help me write a professional email",
        "Explain quantum computing simply",
        "Plan my weekend activities"
    ];

    const features = [
        {
            icon: FaBrain,
            title: "Advanced AI Reasoning",
            description: "Deep understanding with contextual awareness",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: FaRocket,
            title: "Lightning Fast",
            description: "Instant responses in under 0.5 seconds",
            color: "from-yellow-500 to-orange-500"
        },
        {
            icon: FaGlobe,
            title: "Multi-Language",
            description: "Communicate in 100+ languages fluently",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: FaShieldAlt,
            title: "Privacy First",
            description: "Your conversations stay completely private",
            color: "from-green-500 to-emerald-500"
        }
    ];

    const stats = [
        { value: '2.5M+', label: 'Active Users', icon: FaUsers },
        { value: '99.9%', label: 'Uptime', icon: FaRocket },
        { value: '150+', label: 'Languages', icon: FaGlobe },
        { value: '24/7', label: 'Support', icon: FaInfinity }
    ];

    // Typing animation effect
    useEffect(() => {
        const currentQuestion = questions[currentQuestionIndex];
        let currentIndex = 0;
        
        const typeInterval = setInterval(() => {
            if (currentIndex <= currentQuestion.length) {
                setTypingText(currentQuestion.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
                    setTypingText('');
                }, 2000);
            }
        }, 100);

        return () => clearInterval(typeInterval);
    }, [currentQuestionIndex]);

    // Feature rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const chatBubbles = [
        { id: 1, delay: 0, size: 'w-16 h-16', position: 'top-20 left-20', duration: 4 },
        { id: 2, delay: 1, size: 'w-12 h-12', position: 'top-40 right-32', duration: 5 },
        { id: 3, delay: 2, size: 'w-20 h-20', position: 'bottom-32 left-16', duration: 6 },
        { id: 4, delay: 1.5, size: 'w-14 h-14', position: 'bottom-20 right-20', duration: 4.5 },
    ];

    return (
        <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
            
            {/* Animated Background */}
            <div className='absolute inset-0'>
                {/* Grid Pattern */}
                <div className='absolute inset-0 opacity-5'>
                    <div className='absolute inset-0' style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }} />
                </div>
                
                {/* Floating Chat Bubbles */}
                {chatBubbles.map((bubble) => (
                    <motion.div
                        key={bubble.id}
                        className={`absolute ${bubble.position} ${bubble.size} bg-primary-bg/20 rounded-full border border-primary-border/30 backdrop-blur-sm`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                            opacity: [0, 0.8, 0],
                            scale: [0, 1, 0],
                            y: [-20, 20, -20]
                        }}
                        transition={{
                            duration: bubble.duration,
                            delay: bubble.delay,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}>
                        <div className='w-full h-full flex items-center justify-center'>
                            <FaComments className='text-primary-solid/60 text-xl' />
                        </div>
                    </motion.div>
                ))}

                {/* Gradient Orbs */}
                <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary-solid/5 rounded-full blur-3xl animate-pulse' />
                <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-solid/5 rounded-full blur-3xl animate-pulse delay-1000' />
            </div>

            <div className='relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20'>
                <div className='max-w-7xl mx-auto'>
                    
                    {/* Split Layout */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
                        
                        {/* Left Side - Content */}
                        <motion.div
                            className='text-left mb-16 lg:mb-0'
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}>
                            
                            {/* Badge */}
                            <motion.div
                                className='inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-full bg-primary-bg/80 backdrop-blur-sm border border-primary-border shadow-xl'
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                                    <FaMagic className='text-primary-solid w-5 h-5' />
                                </motion.div>
                                <span className='text-primary-text-contrast font-semibold'>
                                    Next-Gen AI Assistant
                                </span>
                                <div className='w-2 h-2 bg-primary-solid rounded-full animate-ping' />
                            </motion.div>

                            {/* Main Headline */}
                            <motion.h1
                                className='text-4xl sm:text-7xl lg:text-8xl font-extrabold text-canvas-text-contrast mb-8 leading-none'
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}>
                                Chat with
                                <br />
                                <span className='relative'>
                                    <span className='bg-gradient-to-r from-primary-solid via-primary-text to-primary-solid bg-clip-text text-transparent animate-gradient-x'>
                                        Intelligence
                                    </span>
                                    <motion.div
                                        className='absolute -bottom-4 left-0 h-2 bg-gradient-to-r from-primary-solid to-transparent rounded-full'
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 1, delay: 1 }}
                                    />
                                </span>
                            </motion.h1>

                            {/* Dynamic Subtitle */}
                            <motion.div
                                className='mb-12'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}>
                                <p className='text-2xl text-canvas-text mb-4 leading-relaxed'>
                                    Experience AI that understands context, remembers conversations, and delivers solutions that actually work.
                                </p>
                                <div className='flex items-center gap-2 text-lg text-primary-text'>
                                    <FaKeyboard className='w-5 h-5' />
                                    <span>Ask me: "</span>
                                    <span className='font-mono text-canvas-text-contrast min-h-[1.5rem]'>
                                        {typingText}
                                        <motion.span
                                            animate={{ opacity: [1, 0] }}
                                            transition={{ duration: 0.8, repeat: Infinity }}
                                            className='ml-1'>
                                            |
                                        </motion.span>
                                    </span>
                                    <span>"</span>
                                </div>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                className='flex flex-col sm:flex-row gap-6 mb-12'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}>
                                  <Link
                                href='/chat'
                                rel='noopener noreferrer'
                            >
                                <Button
                                    className='group relative overflow-hidden font-bold shadow-2xl hover:shadow-primary-solid/25 flex items-center gap-4 px-6 py-6 rounded-2xl text-lg transition-all duration-300 whitespace-nowrap'
                                    color='primary'
                                    variant='solid'
                                    size='lg'>
                                    <motion.div
                                        className='absolute inset-0 bg-gradient-to-r from-primary-solid via-primary-solid to-primary-text'
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
                                    />
                                    <FaRocket className='w-5 h-5 relative z-10' />
                                    <span className='relative z-10'>Start Chatbot</span>
                                    <FaArrowRight className='w-5 h-5 transition-transform group-hover:translate-x-2 relative z-10' />
                                </Button>
                            </Link>


                                 <Link
                                href='https://github.com/silverthreadlabs/bloggen-chatbot-supabase'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <Button
                                    className='group cursor-pointer font-semibold border flex flex-nowrap items-center gap-3 px-4 py-4 rounded-2xl bg-canvas-bg text-canvas-text-contrast border-canvas-line hover:border-primary-border hover:bg-primary-bg-subtle transition-all duration-300 whitespace-nowrap text-base'
                                    color='neutral'
                                    variant='surface'
                                    size='lg'
                                    leadingIcon={<FaGithub className='w-4 h-4' />}
                                >
                                    View on GitHub
                                    <div className='text-canvas-text text-sm bg-canvas-bg-subtle px-2 py-1 rounded-full ml-2'>
                                        2.5k ⭐
                                    </div>
                                </Button>
                            </Link>
                            </motion.div>

                            {/* Quick Stats */}
                            <motion.div
                                className='grid grid-cols-2 sm:grid-cols-4 gap-6'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}>
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        className='text-center group cursor-pointer'       
                                        transition={{ type: "spring", stiffness: 300 }}>
                                        <div className='mb-2 flex justify-center'>
                                            <div className='p-3 bg-primary-bg/50 backdrop-blur-sm rounded-xl group-hover:bg-primary-solid transition-colors duration-300'>
                                                <stat.icon className='w-5 h-5 text-primary-solid group-hover:text-white' />
                                            </div>
                                        </div>
                                        <div className='text-2xl font-bold text-canvas-text-contrast'>
                                            {stat.value}
                                        </div>
                                        <div className='text-sm text-canvas-text'>
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right Side - Interactive Chat Interface */}
                        <motion.div
                            className='relative'
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}>
                            
                            {/* Main Chat Window */}
                            <div className='relative bg-canvas-base/80 backdrop-blur-xl border border-canvas-line/50 rounded-3xl p-8 shadow-2xl'>
                                
                                {/* Chat Header */}
                                <div className='flex items-center justify-between mb-8'>
                                    <div className='flex items-center gap-4'>
                                        <motion.div
                                            className='relative p-3 bg-primary-solid rounded-2xl'
                                            animate={{ rotate: [0, 5, -5, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}>
                                            <FaRobot className='w-6 h-6 text-white' />
                                            <div className='absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse' />
                                        </motion.div>
                                        <div>
                                            <h3 className='font-bold text-canvas-text-contrast text-lg'>AI Assistant</h3>
                                            <p className='text-sm text-canvas-text'>Always ready to help</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div className='w-3 h-3 bg-red-500 rounded-full' />
                                        <div className='w-3 h-3 bg-yellow-500 rounded-full' />
                                        <div className='w-3 h-3 bg-green-500 rounded-full' />
                                    </div>
                                </div>

                                {/* Chat Messages */}
                                <div className='space-y-6 mb-8 h-80 overflow-hidden'>
                                    <motion.div
                                        className='flex justify-end'
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 }}>
                                        <div className='bg-primary-solid text-white px-6 py-4 rounded-2xl rounded-tr-sm max-w-xs shadow-lg'>
                                            <p>Help me create a marketing strategy for my startup</p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className='flex justify-start'
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.2 }}>
                                        <div className='bg-canvas-bg border border-canvas-line px-6 py-4 rounded-2xl rounded-tl-sm max-w-sm shadow-lg'>
                                            <div className='flex items-center gap-2 mb-2'>
                                                <FaBrain className='w-4 h-4 text-primary-solid' />
                                                <span className='text-xs text-canvas-text'>Analyzing...</span>
                                            </div>
                                            <p className='text-canvas-text-contrast'>I'd love to help! Let me break down a comprehensive marketing strategy into key components: target audience analysis, competitive research, content strategy, and growth metrics. What's your startup's industry?</p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className='flex justify-end'
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.6 }}>
                                        <div className='bg-primary-solid text-white px-6 py-4 rounded-2xl rounded-tr-sm max-w-xs shadow-lg'>
                                            <p>It's a productivity app for remote teams</p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className='flex justify-start'
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 2 }}>
                                        <div className='bg-canvas-bg border border-canvas-line px-6 py-4 rounded-2xl rounded-tl-sm max-w-sm shadow-lg'>
                                            <p className='text-canvas-text-contrast'>Perfect! Remote team productivity is huge right now. Here's your strategic roadmap...</p>
                                            <div className='mt-3 flex gap-2'>
                                                <div className='w-2 h-2 bg-primary-solid rounded-full animate-bounce' />
                                                <div className='w-2 h-2 bg-primary-solid rounded-full animate-bounce delay-100' />
                                                <div className='w-2 h-2 bg-primary-solid rounded-full animate-bounce delay-200' />
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Input Area */}
                                <div className='flex items-center gap-4 p-4 bg-canvas-bg/80 backdrop-blur-sm rounded-2xl border border-canvas-line'>
                                    <div className='flex-1 flex items-center gap-3'>
                                        <FaKeyboard className='w-5 h-5 text-canvas-text' />
                                        <span className='text-canvas-text'>Type your message...</span>
                                    </div>
                                    <div className='flex gap-3'>
                                        <motion.button
                                            className='p-3 bg-primary-bg rounded-xl hover:bg-primary-solid/20 transition-colors'
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}>
                                            <FaMicrophone className='w-5 h-5 text-primary-solid' />
                                        </motion.button>
                                        <motion.button
                                            className='p-3 bg-primary-solid rounded-xl hover:bg-primary-solid/80 transition-colors'
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}>
                                            <FaArrowRight className='w-5 h-5 text-white' />
                                        </motion.button>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Feature Cards */}
                            <AnimatePresence mode='wait'>
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        className={`absolute ${index === 0 ? '-top-8 -left-8' : index === 1 ? '-top-8 -right-8' : index === 2 ? '-bottom-8 -left-8' : '-bottom-8 -right-8'} ${activeFeature === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} transition-all duration-500`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: activeFeature === index ? 1 : 0, scale: activeFeature === index ? 1 : 0.95 }}
                                        exit={{ opacity: 0, scale: 0.8 }}>
                                        <div className='bg-canvas-base/90 backdrop-blur-xl border border-canvas-line/50 rounded-2xl p-6 shadow-xl max-w-xs'>
                                            <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-xl w-fit mb-4`}>
                                                <feature.icon className='w-6 h-6 text-white' />
                                            </div>
                                            <h4 className='font-bold text-canvas-text-contrast mb-2'>{feature.title}</h4>
                                            <p className='text-sm text-canvas-text'>{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}