import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Tag, Calendar, Activity } from 'lucide-react';
import { asset } from '../utils/assets';

const ProjectModal = ({ project, onClose }) => {
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const gallery = project.gallery || [project.image].filter(Boolean);
    const prevImage = () => setActiveImage(i => (i - 1 + gallery.length) % gallery.length);
    const nextImage = () => setActiveImage(i => (i + 1) % gallery.length);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                onClick={onClose}
            >
                {/* Backdrop */}
                <div className="absolute inset-0" style={{ background: 'rgba(8,9,14,0.85)', backdropFilter: 'blur(16px)' }} />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col rounded-2xl"
                    style={{
                        background: '#1A1D26',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(129,140,248,0.1)'
                    }}
                    onClick={e => e.stopPropagation()}
                >
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: 'rgba(255,255,255,0.5)'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                    >
                        <X size={16} />
                    </button>

                    {/* Gallery */}
                    {gallery.length > 0 && (
                        <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-t-2xl flex-shrink-0"
                            style={{ background: '#0D1015' }}>
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImage}
                                    src={asset(gallery[activeImage])}
                                    alt={`${project.title} ${activeImage + 1}`}
                                    className="w-full h-full object-cover"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.25 }}
                                />
                            </AnimatePresence>

                            {/* Gradient */}
                            <div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none"
                                style={{ background: 'linear-gradient(to top, #1A1D26, transparent)' }} />

                            {gallery.length > 1 && (
                                <>
                                    <button onClick={prevImage}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center z-10 transition-all"
                                        style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button onClick={nextImage}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center z-10 transition-all"
                                        style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
                                        <ChevronRight size={18} />
                                    </button>
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                        {gallery.map((_, i) => (
                                            <button key={i} onClick={() => setActiveImage(i)}
                                                className="h-1 rounded-full transition-all duration-300"
                                                style={{ width: i === activeImage ? '24px' : '6px', background: i === activeImage ? '#818CF8' : 'rgba(255,255,255,0.25)' }} />
                                        ))}
                                    </div>
                                </>
                            )}

                            {project.status && (
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
                                        style={{ background: 'rgba(110,231,183,0.12)', border: '1px solid rgba(110,231,183,0.25)', color: '#6EE7B7' }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7] animate-pulse" />
                                        {project.status}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-7 flex flex-col gap-5">
                        {/* Header */}
                        <div>
                            {project.year && (
                                <span className="flex items-center gap-1.5 text-xs font-mono mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                                    <Calendar size={11} /> {project.year}
                                </span>
                            )}
                            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">{project.title}</h2>
                            <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{project.description}</p>
                        </div>

                        <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

                        {/* Details */}
                        {project.details && (
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: 'rgba(129,140,248,0.7)' }}>Technical Details</h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{project.details}</p>
                            </div>
                        )}

                        {/* Tech stack */}
                        {project.tech && project.tech.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-[0.25em] mb-3 flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                                    <Tag size={11} /> Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map(t => (
                                        <span key={t} className="tag-primary">{t}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                                    <ExternalLink size={15} /> Live Demo
                                </a>
                            )}
                            {project.githubLink && (
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                                    <Github size={15} /> GitHub
                                </a>
                            )}
                            {!project.link && !project.githubLink && (
                                <span className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
                                    style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.07)',
                                        color: 'rgba(255,255,255,0.3)'
                                    }}>
                                    <Activity size={14} /> Internal / NDA Protected
                                </span>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectModal;
