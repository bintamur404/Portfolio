import React from 'react';
import { motion } from 'framer-motion';
import data from '../data.json';
import { BrainCircuit, Activity, Cpu, FlaskConical, Eye, Shield, BookOpen } from 'lucide-react';
import { asset } from '../utils/assets';

const pillars = [
    {
        icon: BrainCircuit,
        title: "Medical AI",
        subtitle: "Clinical diagnostics & neural representation",
        description: "Designing end-to-end deep learning models for classification of medical scans, ECGs, and hematology profiles with high clinical precision.",
        papers: 6,
        color: "#818CF8",
        bgGlow: "radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 70%)"
    },
    {
        icon: Eye,
        title: "Explainable AI (XAI)",
        subtitle: "Interpretability & clinical validation",
        description: "Applying global SHAP, patient-level LIME, and attention visualization to map decision boundaries, ensuring compliance with TRIPOD+AI guidelines.",
        papers: 3,
        color: "#FB923C",
        bgGlow: "radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 70%)"
    },
    {
        icon: Shield,
        title: "Federated Learning",
        subtitle: "Privacy-preserving collaborative ML",
        description: "Engineering knowledge distillation frameworks for cross-site training on decentralized clinical records under strict zero-leakage constraints.",
        papers: 1,
        color: "#4ADE80",
        bgGlow: "radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)"
    },
    {
        icon: Cpu,
        title: "Computer Vision & Fusion",
        subtitle: "Transformers & spectral signal fusion",
        description: "Fusing spatial-domain convolutional features with frequency-domain FFT representations in Vision Transformers for robust classification under noise.",
        papers: 4,
        color: "#C084FC",
        bgGlow: "radial-gradient(circle, rgba(192,132,252,0.08) 0%, transparent 70%)"
    }
];

const About = () => {
    return (
        <section id="about" className="relative w-full py-28 px-6 bg-background overflow-hidden">
            {/* Ambient glow blobs */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-15"
                style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.1) 0%, transparent 70%)' }} />

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* 1. Introduction Block (Grid Layout) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center mb-24">
                    
                    {/* LEFT: Profile image with orbiting elements (5 cols) */}
                    <div className="lg:col-span-5 flex justify-center items-center h-[460px] relative">
                        {/* Outer glow */}
                        <div className="absolute w-80 h-80 rounded-full pointer-events-none"
                            style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)' }} />

                        {/* Floating rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[360px] h-[360px] rounded-full border border-dashed pointer-events-none"
                            style={{ borderColor: 'rgba(167,139,250,0.1)' }}
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[300px] h-[300px] rounded-full border pointer-events-none"
                            style={{ borderColor: 'rgba(251,146,60,0.08)' }}
                        />

                        {/* Profile photo — premium angled-square frame */}
                        <motion.div
                            animate={{ y: [-8, 8, -8] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10"
                            style={{
                                width: '240px',
                                height: '240px',
                            }}
                        >
                            {/* Outer glow ring */}
                            <div style={{
                                position: 'absolute',
                                inset: '-8px',
                                borderRadius: '2.2rem',
                                background: 'linear-gradient(135deg, rgba(167,139,250,0.35) 0%, rgba(251,146,60,0.2) 50%, rgba(129,140,248,0.35) 100%)',
                                filter: 'blur(12px)',
                                zIndex: -1,
                                animation: 'pulse 3s ease-in-out infinite alternate'
                            }} />
                            {/* Frame border */}
                            <div style={{
                                position: 'absolute',
                                inset: '-2px',
                                borderRadius: '1.75rem',
                                background: 'linear-gradient(135deg, rgba(167,139,250,0.6) 0%, rgba(251,146,60,0.4) 50%, rgba(129,140,248,0.6) 100%)',
                                zIndex: 0
                            }} />
                            {/* Photo container */}
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                borderRadius: '1.6rem',
                                overflow: 'hidden',
                                zIndex: 1,
                                background: '#0d0e14'
                            }}>
                                <img
                                    src={asset(data.personal.profileImage)}
                                    alt="Abdullah Ibne Tayeb Tamur"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center top',
                                        display: 'block'
                                    }}
                                />
                                {/* Subtle overlay shimmer */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(160deg, rgba(167,139,250,0.08) 0%, transparent 50%, rgba(251,146,60,0.05) 100%)',
                                    pointerEvents: 'none'
                                }} />
                            </div>
                            {/* Corner accent dots */}
                            {[{ top: '-6px', left: '-6px' }, { top: '-6px', right: '-6px' }, { bottom: '-6px', left: '-6px' }, { bottom: '-6px', right: '-6px' }].map((pos, i) => (
                                <div key={i} style={{
                                    position: 'absolute',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: i % 2 === 0 ? '#A78BFA' : '#FB923C',
                                    boxShadow: `0 0 8px ${i % 2 === 0 ? 'rgba(167,139,250,0.8)' : 'rgba(251,146,60,0.8)'}`,
                                    zIndex: 2,
                                    ...pos
                                }} />
                            ))}
                        </motion.div>

                        {/* Orbiting icon badges */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute w-64 h-64 pointer-events-none"
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                                style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)' }}>
                                <Activity size={16} style={{ color: '#A78BFA' }} />
                            </div>
                        </motion.div>
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute w-52 h-52 pointer-events-none"
                        >
                            <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                                style={{ background: 'rgba(251,146,60,0.12)', border: '1px solid rgba(251,146,60,0.25)' }}>
                                <Cpu size={16} style={{ color: '#FB923C' }} />
                            </div>
                        </motion.div>

                        {/* Floating skill pills */}
                        {['PyTorch', 'XAI', 'Federated ML', 'NLP'].map((skill, i) => (
                            <motion.div
                                key={skill}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + i * 0.15 }}
                                animate={{ y: [0, -4, 0] }}
                                style={{
                                    animationDelay: `${i * 0.8}s`,
                                    position: 'absolute',
                                    top: `${[15, 75, 28, 68][i]}%`,
                                    left: i < 2 ? `-${[2, 0][i]}%` : undefined,
                                    right: i >= 2 ? `-${[2, 0][i - 2]}%` : undefined,
                                }}
                            >
                                <span className="tag-primary whitespace-nowrap text-[10px]">{skill}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* RIGHT: Biography & Key Accomplishments (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-[2px] w-10" style={{ background: '#A78BFA' }} />
                                <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#A78BFA' }}>About Me</span>
                            </div>
                            <h2 className="section-heading mb-0 leading-tight">
                                Clinical Intelligence
                            </h2>
                        </div>

                        {/* Academic Accomplishments Highlight */}
                        <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl" 
                             style={{ 
                                 background: 'rgba(15, 16, 24, 0.4)', 
                                 border: '1px solid rgba(255, 255, 255, 0.05)',
                                 backdropFilter: 'blur(10px)'
                             }}>
                            <div className="text-center">
                                <span className="block text-xl md:text-2xl font-black text-indigo-400">4</span>
                                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400">IEEE Papers</span>
                            </div>
                            <div className="text-center border-x border-white/5">
                                <span className="block text-xl md:text-2xl font-black text-orange-400">1st</span>
                                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Author Roles</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-xl md:text-2xl font-black text-emerald-400">13K+</span>
                                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Patients Val.</span>
                            </div>
                        </div>

                        <div className="relative pl-5" style={{ borderLeft: '2px solid rgba(167,139,250,0.25)' }}>
                            <p className="text-base md:text-lg leading-relaxed font-light text-slate-300">
                                {data.about.narrative}
                            </p>
                        </div>

                        <ul className="space-y-3 mt-2">
                            {data.achievements.slice(0, 4).map((a, i) => (
                                <li key={i} className="flex gap-3 text-sm font-light text-slate-400">
                                    <span style={{ color: '#A78BFA', flexShrink: 0 }}>→</span>
                                    <span>{a}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 2. Merged Research Focus (Pillars Grid) */}
                <div className="mt-28 mb-24">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-[2px] w-10" style={{ background: '#818CF8' }} />
                        <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#818CF8' }}>Research Focus</span>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-8">Specialized Domains</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pillars.map((pillar, idx) => {
                            const Icon = pillar.icon;
                            return (
                                <motion.div
                                    key={pillar.title}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                                    className="group relative h-full"
                                >
                                    <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                                         style={{ background: pillar.bgGlow }} />

                                    <div className="glass-card h-full flex flex-col justify-between p-6 relative overflow-hidden !rounded-2xl">
                                        <div>
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300"
                                                     style={{ 
                                                         borderColor: 'rgba(255,255,255,0.08)',
                                                         background: 'rgba(255,255,255,0.02)'
                                                     }}
                                                >
                                                    <Icon size={20} style={{ color: pillar.color }} className="group-hover:scale-110 transition-transform duration-300" />
                                                </div>
                                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/5 border border-white/5 text-slate-400">
                                                    <BookOpen size={9} style={{ color: pillar.color }} />
                                                    <span>{pillar.papers} {pillar.papers === 1 ? 'Paper' : 'Papers'}</span>
                                                </div>
                                            </div>

                                            <h4 className="text-lg font-bold text-white mb-1">
                                                {pillar.title}
                                            </h4>
                                            <p className="text-[10px] font-mono mb-3 uppercase tracking-wider" style={{ color: pillar.color }}>
                                                {pillar.subtitle}
                                            </p>
                                            <p className="text-xs font-light leading-relaxed text-slate-400 mb-4">
                                                {pillar.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* 3. Technical Skills & Tools Cards */}
                <div className="mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-[2px] w-10" style={{ background: '#4ADE80' }} />
                        <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#4ADE80' }}>Frameworks &amp; Stack</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Card 1: Research Methods */}
                        <div className="glass-card !p-6 !rounded-2xl">
                            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2" style={{ color: '#A78BFA' }}>
                                <FlaskConical size={14} /> Research Methods
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.research.map(s => (
                                    <span key={s} className="tag-primary !text-[9px] !px-3.5 !py-1">{s}</span>
                                ))}
                            </div>
                        </div>

                        {/* Card 2: Programming & frameworks */}
                        <div className="glass-card !p-6 !rounded-2xl">
                            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2" style={{ color: '#FB923C' }}>
                                <Cpu size={14} /> Technical Tools &amp; Libraries
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {[...data.skills.frameworks, ...data.skills.programming].slice(0, 10).map(s => (
                                    <span key={s} className="px-3 py-1 rounded-lg text-[9px] font-mono font-medium"
                                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.55)' }}>
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;
