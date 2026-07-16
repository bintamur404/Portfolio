import React from 'react';
import { motion } from 'framer-motion';
import data from '../data.json';
import { GraduationCap } from 'lucide-react';

const EducationCard = ({ item, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="glass-card group"
    >
        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.15)' }}>
                <GraduationCap size={28} style={{ color: '#4ADE80' }} />
            </div>

            <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-white">{item.degree}</h3>
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shrink-0"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }}>
                        {item.period}
                    </span>
                </div>

                <p className="text-sm font-mono mb-4" style={{ color: '#A78BFA' }}>{item.institution}</p>

                {(item.grade || item.coursework || item.thesis) && (
                    <div className="space-y-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        {item.grade && (
                            <div className="flex items-center gap-3">
                                <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider"
                                    style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.15)', color: '#FB923C' }}>
                                    Awarded
                                </span>
                                <span className="text-sm font-mono" style={{ color: 'rgba(255,255,255,0.7)' }}>{item.grade}</span>
                            </div>
                        )}
                        {item.coursework && (
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 shrink-0 px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider"
                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.35)' }}>
                                    Coursework
                                </span>
                                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.coursework}</p>
                            </div>
                        )}
                        {item.thesis && (
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 shrink-0 px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider"
                                    style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.12)', color: '#4ADE80' }}>
                                    Thesis
                                </span>
                                <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.6)', borderLeft: '2px solid rgba(167,139,250,0.2)', paddingLeft: '12px' }}>
                                    "{item.thesis}"
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </motion.div>
);

const Education = () => (
    <section id="education" className="relative py-28 bg-background overflow-hidden">
        <div className="absolute left-0 top-1/2 w-[400px] h-[400px] rounded-full pointer-events-none opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-[2px] w-10" style={{ background: '#4ADE80' }} />
                    <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#4ADE80' }}>Academics</span>
                </div>
                <h2 className="section-heading mb-0">Education</h2>
            </div>

            <div className="max-w-4xl flex flex-col gap-6 md:pl-14">
                {data.education.map((item, idx) => (
                    <EducationCard key={item.id} item={item} index={idx} />
                ))}
            </div>
        </div>
    </section>
);

export default Education;
