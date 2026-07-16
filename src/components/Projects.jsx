import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from '../data.json';
import { Cpu, Code, Database, Github, ExternalLink, Activity, Eye } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { asset } from '../utils/assets';

const icons = [Cpu, Code, Database, Activity];

const getProjectMetrics = (id) => {
    switch(id) {
        case 1:
            return "13,823 Patients · TRIPOD+AI Validated";
        case 2:
            return "97.75% Accuracy · FFT + ViT Fusion";
        case 3:
            return "Groq & LangChain RAG · FAISS Vector Store";
        case 4:
            return "1.5 km Telemetry · Custom PID Firmware";
        default:
            return null;
    }
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <>
            <section id="projects" className="relative py-28 bg-background overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
                    style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 70%)' }} />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-[2px] w-10" style={{ background: '#FB923C' }} />
                            <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#FB923C' }}>Engineering &amp; Systems</span>
                        </div>
                        <h2 className="section-heading mb-2">Clinical Systems &amp; Tools</h2>
                        <p className="text-lg font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>
                            Click any system to explore full technical details, validation data, and source code.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {data.projects.map((project, idx) => {
                            const Icon = icons[idx % icons.length];
                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: (idx % 2) * 0.1 }}
                                    whileHover={{ y: -4 }}
                                    className="group cursor-pointer"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <div className="glass-card !p-0 overflow-hidden h-full flex flex-col">
                                        {/* Image */}
                                        <div className="relative w-full h-52 overflow-hidden flex-shrink-0"
                                            style={{ background: 'linear-gradient(135deg, #0F1018, #171A26)' }}>
                                            {project.image ? (
                                                <img
                                                    src={asset(project.image)}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Icon size={64} strokeWidth={0.8} style={{ color: 'rgba(167,139,250,0.15)' }} />
                                                </div>
                                            )}
                                            {/* View overlay */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center"
                                                style={{ background: 'rgba(0,0,0,0.35)' }}>
                                                <span className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
                                                    style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.35)', color: '#C4B5FD', backdropFilter: 'blur(8px)' }}>
                                                    <Eye size={13} /> View Details
                                                </span>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 h-20"
                                                style={{ background: 'linear-gradient(to top, #0F1018, transparent)' }} />
                                            {/* Status */}
                                            {project.status && (
                                                <div className="absolute top-3 left-3 z-10">
                                                    <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                                                        style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', color: '#4ADE80' }}>
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                                                        {project.status}
                                                    </span>
                                                </div>
                                            )}
                                            {/* Quick links */}
                                            <div className="absolute top-3 right-3 z-10 flex gap-2">
                                                {project.link && (
                                                    <a href={project.link} target="_blank" rel="noreferrer"
                                                        onClick={e => e.stopPropagation()}
                                                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                                                        style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
                                                        <ExternalLink size={13} />
                                                    </a>
                                                )}
                                                {project.githubLink && (
                                                    <a href={project.githubLink} target="_blank" rel="noreferrer"
                                                        onClick={e => e.stopPropagation()}
                                                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                                                        style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
                                                        <Github size={13} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                                    style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.15)' }}>
                                                    <Icon size={17} style={{ color: '#A78BFA' }} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-primary transition-colors duration-300">
                                                        {project.title}
                                                    </h3>
                                                    {project.year && <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>{project.year}</span>}
                                                </div>
                                            </div>

                                            <p className="text-sm leading-relaxed mb-4 flex-grow" style={{ color: 'rgba(255,255,255,0.45)' }}>
                                                {project.shortDescription || project.description}
                                            </p>

                                            {/* Metrics Line */}
                                            {getProjectMetrics(project.id) && (
                                                <div className="flex items-center gap-1.5 mb-4 text-xs font-semibold px-3 py-1.5 rounded-lg w-fit"
                                                     style={{ 
                                                         background: 'rgba(251,146,60,0.06)', 
                                                         border: '1px solid rgba(251,146,60,0.15)',
                                                         color: '#FB923C'
                                                     }}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FB923C] animate-pulse" />
                                                    <span>{getProjectMetrics(project.id)}</span>
                                                </div>
                                            )}

                                            <div className="flex flex-wrap gap-1.5">
                                                {project.tech && project.tech.slice(0, 5).map(t => (
                                                    <span key={t} className="px-2 py-0.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider"
                                                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }}>
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </>
    );
};

export default Projects;
