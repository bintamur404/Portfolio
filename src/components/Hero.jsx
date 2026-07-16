import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import data from '../data.json';
import CanvasScene from './CanvasScene';
import { ArrowDown } from 'lucide-react';
import { asset } from '../utils/assets';

const roles = data.personal.roles || [
    "AI Researcher",
    "Medical AI Engineer",
    "Deep Learning Specialist",
    "Clinical NLP Developer"
];

const Hero = () => {
    const [displayText, setDisplayText] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        const speed = isDeleting ? 40 : 80;
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setDisplayText(currentRole.slice(0, displayText.length + 1));
                if (displayText.length === currentRole.length) {
                    setTimeout(() => setIsDeleting(true), 2200);
                }
            } else {
                setDisplayText(currentRole.slice(0, displayText.length - 1));
                if (displayText.length === 0) {
                    setIsDeleting(false);
                    setRoleIndex((i) => (i + 1) % roles.length);
                }
            }
        }, speed);
        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, roleIndex]);

    return (
        <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-between py-8 bg-background overflow-hidden">
            {/* 3D Canvas */}
            <div className="absolute inset-0 z-0">
                <CanvasScene />
            </div>

            {/* Gradient vignette */}
            <div className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 30%, rgba(8,9,13,0.7) 100%)'
                }} />
            <div className="absolute bottom-0 left-0 right-0 h-40 z-[1] pointer-events-none"
                style={{ background: 'linear-gradient(to top, #08090D, transparent)' }} />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 w-full max-w-5xl mx-auto">


                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-6 leading-none"
                    style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #C4B5FD 45%, #ffffff 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}
                >
                    {data.personal.name}
                </motion.h1>

                {/* Typewriter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="h-10 mb-6 flex items-center justify-center"
                >
                    <span className="text-lg md:text-2xl font-light tracking-[0.25em] uppercase" style={{ color: '#A78BFA' }}>
                        {displayText}
                        <span className="inline-block w-0.5 h-5 ml-1 align-middle animate-pulse" style={{ background: '#A78BFA' }} />
                    </span>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 1 }}
                    className="text-base md:text-lg max-w-2xl font-light leading-relaxed mb-8 italic"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                    "{data.personal.tagline}"
                </motion.p>

                {/* Research Impact Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                    className="flex items-center justify-center gap-6 md:gap-12 mb-10 py-4 px-8 rounded-2xl"
                    style={{
                        background: 'rgba(15, 16, 24, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(8px)'
                    }}
                >
                    <div className="text-center">
                        <div className="text-xl md:text-2xl font-black text-white" style={{ fontFamily: 'Outfit' }}>4</div>
                        <div className="text-[9px] uppercase tracking-widest font-mono mt-0.5" style={{ color: '#818CF8' }}>IEEE Papers</div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-center">
                        <div className="text-xl md:text-2xl font-black text-white" style={{ fontFamily: 'Outfit' }}>🏆</div>
                        <div className="text-[9px] uppercase tracking-widest font-mono mt-0.5" style={{ color: '#FB923C' }}>Best Presenter</div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-center">
                        <div className="text-xl md:text-2xl font-black text-white" style={{ fontFamily: 'Outfit' }}>13.8K+</div>
                        <div className="text-[9px] uppercase tracking-widest font-mono mt-0.5" style={{ color: '#4ADE80' }}>Patients</div>
                    </div>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 w-full max-w-md mx-auto sm:max-w-none mt-2"
                >
                    <a href="#publications" className="btn-primary w-full sm:w-auto px-10 py-3.5 text-center">View Publications</a>
                    <a href={asset('/Abdullah%20Ibne%20Tayeb%20Tamur%20CV(2026).pdf')} download="Abdullah Ibne Tayeb Tamur CV(2026).pdf" className="btn-secondary w-full sm:w-auto px-10 py-3.5 text-center">Curriculum Vitae</a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="relative z-10 pb-6"
            >
                <a href="#about" className="flex flex-col items-center gap-2 group" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    <span className="text-[9px] tracking-[0.5em] uppercase">Scroll</span>
                    <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        <ArrowDown size={14} />
                    </motion.div>
                </a>
            </motion.div>
        </section>
    );
};

export default Hero;
