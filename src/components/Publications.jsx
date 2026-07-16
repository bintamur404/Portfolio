import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import data from '../data.json';
import { ExternalLink, BookOpen, ChevronRight, FlaskConical, CheckCircle } from 'lucide-react';
import { asset } from '../utils/assets';

const PaperCard = ({ paper, index }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleMouseLeave = () => { x.set(0); y.set(0); };

    const isPublished = paper.status === 'published';
    const hasLink = paper.link && paper.link !== '#';

    return (
        <div style={{ perspective: "1500px" }} className="h-full">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.07 }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="group h-full cursor-pointer"
                onClick={() => hasLink ? window.open(paper.link, '_blank') : null}
            >
                <div className="glass-card h-full flex flex-col justify-between !p-0 overflow-hidden"
                    style={isPublished ? { borderColor: 'rgba(74,222,128,0.15)' } : {}}>

                    {/* Cover image */}
                    {paper.image && (
                        <div className="relative w-full h-40 overflow-hidden rounded-t-3xl flex-shrink-0">
                            <img
                                src={asset(paper.image)}
                                alt={paper.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0"
                                style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(15,16,24,1) 100%)' }} />
                            <div className="absolute top-2.5 right-2.5">
                                {isPublished ? (
                                    <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full"
                                        style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(74,222,128,0.35)', color: '#4ADE80', backdropFilter: 'blur(8px)' }}>
                                        <CheckCircle size={9} /> Published
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full"
                                        style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(251,146,60,0.35)', color: '#FB923C', backdropFilter: 'blur(8px)' }}>
                                        <FlaskConical size={9} /> Under Review
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />

                    <div className="relative z-10 p-6 flex flex-col flex-1" style={{ transform: "translateZ(30px)" }}>
                        {/* Tag + status row */}
                        <div className="flex justify-between items-start mb-5">
                            <span className="tag-primary">{paper.tag}</span>
                            {!paper.image && (
                                <div className="flex items-center gap-2">
                                    {isPublished ? (
                                        <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                                            style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', color: '#4ADE80' }}>
                                            <CheckCircle size={9} /> Published
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                                            style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.2)', color: '#FB923C' }}>
                                            <FlaskConical size={9} /> Under Review
                                        </span>
                                    )}
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center"
                                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                        {hasLink
                                            ? <ExternalLink className="text-white/30 group-hover:text-primary transition-colors" size={15} />
                                            : <BookOpen className="text-white/30 group-hover:text-primary transition-colors" size={15} />}
                                    </div>
                                </div>
                            )}
                        </div>

                        <h3 className="text-base font-black mb-3 text-white/90 leading-snug group-hover:text-primary transition-colors duration-500">
                            {paper.title}
                        </h3>

                        {paper.description && (
                            <p className="text-xs leading-relaxed mb-3 line-clamp-3" style={{ color: 'rgba(255,255,255,0.38)' }}>
                                {paper.description}
                            </p>
                        )}

                        <p className="text-xs mb-auto" style={{ color: 'rgba(255,255,255,0.35)' }}>{paper.authors}</p>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-5 pt-4"
                            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            <span className="text-xs font-bold uppercase tracking-widest"
                                style={{ color: isPublished ? '#4ADE80' : '#FB923C' }}>
                                {paper.venue}
                            </span>
                            <span className="flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-400"
                                style={{ color: '#A78BFA' }}>
                                {hasLink ? "Read" : "View"} <ChevronRight size={12} />
                            </span>
                        </div>
                    </div>

                    {/* Back glow */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/0 via-primary/10 to-secondary/0 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-20 pointer-events-none" />
                </div>
            </motion.div>
        </div>
    );
};

const Publications = () => {
    const papers = data.publications;
    const publishedCount = papers.filter(p => p.status === 'published').length;
    const underReviewCount = papers.filter(p => p.status === 'under-review').length;
    
    const [filter, setFilter] = useState('all');

    const filteredPapers = papers.filter(p => {
        if (filter === 'all') return true;
        return p.status === filter;
    });

    return (
        <section id="publications" className="relative w-full py-28 px-6 bg-background overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(to right, transparent, rgba(167,139,250,0.2), transparent)' }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-[2px] w-10" style={{ background: '#A78BFA' }} />
                            <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#A78BFA' }}>Research</span>
                        </div>
                        <h2 className="section-heading mb-0">Publications</h2>
                        <div className="flex items-center gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ background: '#4ADE80' }} />
                                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{publishedCount} Peer-Reviewed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#FB923C' }} />
                                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{underReviewCount} Under Review</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-base font-light leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        Peer-reviewed research on Deep Learning, XAI, Federated Learning, and Medical AI.
                    </p>
                </motion.div>

                {/* Filter tabs */}
                <div className="flex flex-wrap items-center gap-3 mb-10">
                    {[
                        { id: 'all', label: 'All Publications', count: papers.length },
                        { id: 'published', label: 'Published', count: publishedCount },
                        { id: 'under-review', label: 'Under Review', count: underReviewCount }
                    ].map((btn) => {
                        const isActive = filter === btn.id;
                        return (
                            <button
                                key={btn.id}
                                onClick={() => setFilter(btn.id)}
                                className="relative px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer"
                                style={{
                                    background: isActive ? '#818CF8' : 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)'
                                }}
                            >
                                <span>{btn.label}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                                    isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40'
                                }`}>
                                    {btn.count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredPapers.map((paper, idx) => (
                            <motion.div
                                layout
                                key={paper.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                            >
                                <PaperCard paper={paper} index={idx} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Publications;
