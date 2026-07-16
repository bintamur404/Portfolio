import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import data from '../data.json';
import { Briefcase, Award, Zap, Building2 } from 'lucide-react';

const ExperienceCard = ({ exp, index }) => {
    const isEven = index % 2 === 0;
    return (
        <div className={`relative mb-16 w-full flex flex-col md:flex-row ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
            {/* Timeline dot - desktop */}
            <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 z-20">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="w-4 h-4 rounded-full"
                    style={{
                        background: exp.highlight ? '#A78BFA' : '#171A26',
                        border: exp.highlight ? '2px solid rgba(167,139,250,0.6)' : '2px solid rgba(255,255,255,0.1)',
                        boxShadow: exp.highlight ? '0 0 0 4px rgba(167,139,250,0.12)' : 'none'
                    }}
                />
            </div>

            {/* Mobile dot */}
            <div className="md:hidden absolute left-0 top-8 -translate-x-1/2 z-20">
                <div className="w-3 h-3 rounded-full"
                    style={{ background: exp.highlight ? '#A78BFA' : '#171A26', border: '1px solid rgba(255,255,255,0.15)' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`pl-6 md:pl-0 w-full md:w-[44%] ${isEven ? 'md:pr-12' : 'md:pl-12'}`}
            >
                <div className="glass-card"
                    style={exp.highlight ? { borderColor: 'rgba(167,139,250,0.2)' } : {}}>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{exp.role}</h3>
                            <p className="text-sm font-mono" style={{ color: 'rgba(255,255,255,0.35)' }}>{exp.organization}</p>
                        </div>
                        <span className="shrink-0 self-start px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                            style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.2)', color: '#FB923C' }}>
                            {exp.period}
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{exp.description}</p>
                </div>
            </motion.div>
        </div>
    );
};

const Experience = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="experience" className="relative w-full py-28 px-6 overflow-hidden bg-background">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 70%)' }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-10" style={{ background: 'rgba(74,222,128,0.6)' }} />
                        <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#4ADE80' }}>Timeline</span>
                        <div className="h-px w-10" style={{ background: 'rgba(74,222,128,0.6)' }} />
                    </div>
                    <h2 className="section-heading mb-4">Experience &amp; Leadership</h2>
                    <p className="text-lg font-light max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        Milestones in research, clinical AI engineering, and team leadership.
                    </p>
                </motion.div>

                <div className="relative" ref={containerRef}>
                    {/* Track */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px"
                        style={{ background: 'rgba(255,255,255,0.05)' }} />
                    {/* Animated fill */}
                    <motion.div
                        style={{ height: lineHeight }}
                        className="absolute left-0 md:left-1/2 top-0 w-px origin-top"
                    >
                        <div className="w-full h-full" style={{ background: 'linear-gradient(to bottom, #A78BFA, #FB923C)' }} />
                    </motion.div>

                    <div className="flex flex-col relative z-10">
                        {data.experience.map((exp, idx) => (
                            <ExperienceCard key={exp.id} exp={exp} index={idx} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
