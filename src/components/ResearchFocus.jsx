import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Eye, Shield, Cpu, BookOpen } from 'lucide-react';

const pillars = [
    {
        icon: BrainCircuit,
        title: "Medical AI",
        subtitle: "Clinical diagnostics & neural representation",
        description: "Designing end-to-end deep learning models for classification of medical scans, ECGs, and hematology profiles with high clinical precision.",
        papers: 6,
        color: "#818CF8", // Indigo
        bgGlow: "radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 70%)"
    },
    {
        icon: Eye,
        title: "Explainable AI (XAI)",
        subtitle: "Interpretability & clinical validation",
        description: "Applying global SHAP, patient-level LIME, and attention visualization to map decision boundaries, ensuring compliance with TRIPOD+AI guidelines.",
        papers: 3,
        color: "#FB923C", // Orange
        bgGlow: "radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 70%)"
    },
    {
        icon: Shield,
        title: "Federated Learning",
        subtitle: "Privacy-preserving collaborative ML",
        description: "Engineering knowledge distillation frameworks for cross-site training on decentralized clinical records under strict zero-leakage constraints.",
        papers: 1,
        color: "#4ADE80", // Green
        bgGlow: "radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)"
    },
    {
        icon: Cpu,
        title: "Computer Vision & Fusion",
        subtitle: "Transformers & spectral signal fusion",
        description: "Fusing spatial-domain convolutional features with frequency-domain FFT representations in Vision Transformers for robust classification under noise.",
        papers: 4,
        color: "#C084FC", // Purple
        bgGlow: "radial-gradient(circle, rgba(192,132,252,0.08) 0%, transparent 70%)"
    }
];

const ResearchFocus = () => {
    return (
        <section id="research-focus" className="relative py-28 px-6 bg-[#08090D] overflow-hidden">
            {/* Background grids and decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-10 w-[300px] h-[300px] rounded-full filter blur-[100px]" style={{ background: 'rgba(129, 140, 248, 0.15)' }} />
                <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] rounded-full filter blur-[100px]" style={{ background: 'rgba(251, 146, 60, 0.1)' }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-10" style={{ background: 'rgba(129, 140, 248, 0.4)' }} />
                        <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#818CF8' }}>Core Focus</span>
                        <div className="h-px w-10" style={{ background: 'rgba(129, 140, 248, 0.4)' }} />
                    </div>
                    <h2 className="section-heading mb-4">Research Domains</h2>
                    <p className="text-lg font-light max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        Core areas of computer science research targeting clinically deployable, secure, and interpretable artificial intelligence.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {pillars.map((pillar, idx) => {
                        const Icon = pillar.icon;
                        return (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="group relative h-full"
                            >
                                {/* Background glow hover effect */}
                                <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10"
                                     style={{ background: pillar.bgGlow }} />

                                <div className="glass-card h-full flex flex-col justify-between p-8 relative overflow-hidden">
                                    <div>
                                        {/* Icon & Paper Badge */}
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300"
                                                 style={{ 
                                                     borderColor: 'rgba(255,255,255,0.08)',
                                                     background: 'rgba(255,255,255,0.02)',
                                                     boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)'
                                                 }}
                                                 onMouseEnter={(e) => {
                                                     e.currentTarget.style.borderColor = `${pillar.color}40`;
                                                     e.currentTarget.style.background = `${pillar.color}0a`;
                                                 }}
                                                 onMouseLeave={(e) => {
                                                     e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                                     e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                                                 }}
                                            >
                                                <Icon size={24} style={{ color: pillar.color }} className="group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
                                                 style={{ 
                                                     background: 'rgba(255,255,255,0.03)', 
                                                     border: '1px solid rgba(255,255,255,0.06)',
                                                     color: 'rgba(255,255,255,0.45)' 
                                                 }}
                                            >
                                                <BookOpen size={10} style={{ color: pillar.color }} />
                                                <span>{pillar.papers} {pillar.papers === 1 ? 'Paper' : 'Papers'}</span>
                                            </div>
                                        </div>

                                        {/* Title & Subtitle */}
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-snug">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-xs font-mono mb-4 uppercase tracking-wider" style={{ color: pillar.color }}>
                                            {pillar.subtitle}
                                        </p>

                                        {/* Description */}
                                        <p className="text-sm font-light leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                            {pillar.description}
                                        </p>
                                    </div>
                                    
                                    {/* Action/Indication */}
                                    <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.05), transparent)' }} />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ResearchFocus;
