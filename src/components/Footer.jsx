import React, { useState } from 'react';
import { motion } from 'framer-motion';
import data from '../data.json';
import { Github, Linkedin, Mail, Send, BookMarked, Sparkles } from 'lucide-react';

const Footer = () => {
    const [submitted, setSubmitted] = useState(false);

    const socials = [
        { label: 'GitHub', icon: Github, href: data.social.github, color: 'rgba(255,255,255,0.9)' },
        { label: 'LinkedIn', icon: Linkedin, href: data.social.linkedin, color: '#0077b5' },
        { label: 'Scholar', icon: BookMarked, href: data.social.scholar, color: '#4285F4' },
        { label: 'Email', icon: Mail, href: data.social.email, color: '#A78BFA' },
    ];

    return (
        <footer id="contact" className="relative w-full py-28 overflow-hidden bg-background"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>

            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15"
                style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)' }} />
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-10"
                style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.2) 0%, transparent 70%)' }} />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">

                {/* Left: Contact form */}
                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <div className="h-[2px] w-10" style={{ background: '#A78BFA' }} />
                        <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#A78BFA' }}>Contact</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
                        Let's{' '}
                        <span style={{
                            background: 'linear-gradient(90deg, #A78BFA, #C4B5FD)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>Collaborate</span>
                    </h2>
                    <p className="text-base font-light leading-relaxed mb-8 max-w-md" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        Interested in AI research collaborations, clinical system projects, or academic discussions?
                    </p>

                    {!submitted ? (
                        <form className="space-y-4 max-w-md" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                            {['text', 'email'].map((type, i) => (
                                <input
                                    key={type}
                                    type={type}
                                    placeholder={i === 0 ? 'Your name' : 'your@email.com'}
                                    required
                                    className="w-full rounded-2xl px-5 py-4 text-sm outline-none transition-all duration-300"
                                    style={{
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.07)',
                                        color: 'rgba(255,255,255,0.85)'
                                    }}
                                    onFocus={e => e.target.style.borderColor = 'rgba(167,139,250,0.4)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.07)'}
                                />
                            ))}
                            <textarea
                                placeholder="Your message..."
                                rows="5"
                                required
                                className="w-full rounded-2xl px-5 py-4 text-sm outline-none transition-all duration-300 resize-none"
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    color: 'rgba(255,255,255,0.85)'
                                }}
                                onFocus={e => e.target.style.borderColor = 'rgba(167,139,250,0.4)'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.07)'}
                            />
                            <button type="submit" className="btn-primary w-full justify-center">
                                <Send size={15} /> Send Message
                            </button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-md rounded-3xl p-8 text-center"
                            style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.15)' }}>
                            <Sparkles size={28} style={{ color: '#4ADE80' }} className="mx-auto mb-3" />
                            <h3 className="font-bold text-white mb-1">Message Sent!</h3>
                            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>I'll get back to you soon.</p>
                        </motion.div>
                    )}
                </div>

                {/* Right: Social & info */}
                <div className="flex flex-col justify-between items-start lg:items-end">
                    {/* Social buttons */}
                    <div className="flex gap-4 flex-wrap mb-16 lg:mb-0 mt-10 lg:mt-2">
                        {socials.map((s, idx) => {
                            const Icon = s.icon;
                            return (
                                <motion.a
                                    key={idx}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={s.label}
                                    whileHover={{ y: -6, scale: 1.08 }}
                                    whileTap={{ scale: 0.92 }}
                                    className="relative group w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
                                    style={{
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.07)',
                                        color: 'rgba(255,255,255,0.4)'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.color = s.color;
                                        e.currentTarget.style.borderColor = `${s.color}40`;
                                        e.currentTarget.style.background = `${s.color}10`;
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                    }}
                                >
                                    <Icon size={22} />
                                    <span className="absolute -bottom-5 text-[10px] font-mono opacity-0 group-hover:opacity-60 transition-opacity"
                                        style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</span>
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* ORCID */}
                    <div className="mb-8 lg:mb-0 text-left lg:text-right">
                        <a href={data.social.orcid} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all duration-300"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.3)'; e.currentTarget.style.color = '#A78BFA'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}>
                            <span className="w-4 h-4 rounded-full bg-[#A6CE39] flex items-center justify-center text-black text-[8px] font-black">iD</span>
                            ORCID: 0009-0008-4646-9417
                        </a>
                    </div>

                    {/* Footer text */}
                    <div className="text-left lg:text-right space-y-2 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>
                        <p className="flex items-center justify-start lg:justify-end gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Available for Collaborations
                        </p>
                        <p>&copy; {new Date().getFullYear()} {data.personal.name}</p>
                        <p>{data.personal.location}</p>
                    </div>
                </div>
            </div>

            {/* Easter egg floating orb */}
            <motion.div
                drag dragConstraints={{ left: -600, right: 600, top: -600, bottom: 600 }}
                dragElastic={0.1}
                whileHover={{ scale: 1.15, cursor: "grab" }}
                whileTap={{ cursor: "grabbing", scale: 0.9 }}
                animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
                transition={{
                    y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" }
                }}
                className="absolute bottom-28 right-12 lg:right-36 w-20 h-20 rounded-2xl flex items-center justify-center z-20 cursor-grab"
                style={{
                    background: 'rgba(167,139,250,0.08)',
                    border: '1px solid rgba(167,139,250,0.15)',
                    backdropFilter: 'blur(12px)'
                }}
                title="Drag me!"
            >
                <Sparkles size={28} style={{ color: 'rgba(167,139,250,0.6)' }} />
            </motion.div>
        </footer>
    );
};

export default Footer;
