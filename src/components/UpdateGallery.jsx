import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from '../data.json';
import { ExternalLink, Calendar, Plus, X, Lock, ArrowRight, Activity, ImageOff } from 'lucide-react';
import { asset } from '../utils/assets';

const categories = ["All", "Award", "Publication", "Internship", "Project", "Volunteer Work"];

const UpdateGallery = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState('');

    const [filter, setFilter] = useState("All");
    const [updates, setUpdates] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    // Form state (image and link are optional)
    const [newType, setNewType] = useState('Project');
    const [newTitle, setNewTitle] = useState('');
    const [newTimeframe, setNewTimeframe] = useState('');
    const [newSummary, setNewSummary] = useState('');
    const [newLink, setNewLink] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Load initial data (Merge data.json with localStorage)
    useEffect(() => {
        const localData = localStorage.getItem('customPortfolioUpdates');
        if (localData) {
            try {
                const parsedLocal = JSON.parse(localData);
                // Prepend local updates so they appear first
                setUpdates([...parsedLocal, ...data.updates]);
            } catch (err) {
                console.error("Failed to parse local updates", err);
                setUpdates(data.updates);
            }
        } else {
            setUpdates(data.updates);
        }
    }, []);

    // Handle Auth
    const handleLogin = (e) => {
        e.preventDefault();
        if (passwordInput === '@@TAMUR@@112') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Access Denied. Invalid authorization code.');
        }
    };

    // Handle Save (Persist to LocalStorage)
    const handleSaveUpdate = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError('');

        const newUpdate = {
            id: Date.now(),
            type: newType,
            title: newTitle,
            timeframe: newTimeframe,
            summary: newSummary,
            link: newLink.trim() !== '' ? newLink : null,
            image: newImageUrl.trim() !== '' ? newImageUrl : null
        };

        try {
            // Get existing custom updates or start fresh array
            const localData = localStorage.getItem('customPortfolioUpdates');
            let customUpdates = [];
            if (localData) {
                customUpdates = JSON.parse(localData);
            }

            customUpdates = [newUpdate, ...customUpdates];
            localStorage.setItem('customPortfolioUpdates', JSON.stringify(customUpdates));

            // Update UI State combining updated localStorage + data.json
            setUpdates([...customUpdates, ...data.updates]);
            setIsAdding(false);

            // Reset form
            setNewTitle('');
            setNewTimeframe('');
            setNewSummary('');
            setNewLink('');
            setNewImageUrl('');
            setFilter('All');
        } catch (err) {
            console.error(err);
            setError('Failed to save data. Browser storage might be disabled.');
        } finally {
            setIsSaving(false);
        }
    };

    const filteredUpdates = filter === "All" ? updates : updates.filter(u => u.type === filter);

    if (!isAuthenticated) {
        return (
            <section id="updates" className="relative w-full py-32 px-6 bg-background overflow-hidden flex items-center justify-center min-h-[600px]">
                <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tertiary/30 to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(112,0,255,0.05)_0%,transparent_50%)] pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative z-10 glass-card w-full max-w-md flex flex-col items-center text-center p-12 border-white/10 shadow-[0_30px_80px_-20px_rgba(112,0,255,0.2)] rounded-3xl"
                >
                    <div className="w-20 h-20 rounded-full bg-tertiary/10 flex items-center justify-center mb-8 border border-tertiary/30 shadow-[0_0_30px_rgba(112,0,255,0.2)]">
                        <Lock size={32} className="text-tertiary" />
                    </div>

                    <h2 className="text-3xl font-black mb-4 tracking-tighter text-white">Administration</h2>
                    <p className="text-white/50 mb-8 font-light">
                        Authorization code required to inject offline updates.
                    </p>

                    <form onSubmit={handleLogin} className="w-full space-y-4">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-tertiary/50 to-primary/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="Enter password"
                                className="relative w-full bg-surfaceHighlight/80 backdrop-blur-md border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-tertiary/50 transition-colors placeholder-white/30 text-center tracking-widest font-mono"
                            />
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-secondary text-sm font-bold tracking-widest uppercase"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            className="w-full relative px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold transition-all duration-500 hover:border-tertiary/50 hover:bg-tertiary/10 hover:shadow-[0_0_30px_rgba(112,0,255,0.3)] flex items-center justify-center gap-3 overflow-hidden group uppercase tracking-widest mt-4"
                        >
                            <span className="relative z-10 flex items-center">Authenticate</span>
                            <ArrowRight size={18} className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-500 text-tertiary" />
                        </button>
                    </form>
                </motion.div>
            </section>
        );
    }

    return (
        <section id="updates" className="relative w-full py-32 px-6 bg-background overflow-hidden min-h-screen">
            {/* Background glowing elements */}
            <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tertiary/50 to-transparent"></div>
            <div className="absolute -left-64 top-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
            <div className="absolute -right-64 bottom-1/4 w-[600px] h-[600px] bg-tertiary/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-surfaceHighlight border border-white/10 text-white/70 backdrop-blur-md shadow-inner mb-6">
                            <Activity size={16} className="text-tertiary" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">Latest Logs</span>
                        </div>
                        <h2 className="section-heading mb-6">Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">Updates</span></h2>
                        <p className="text-white/50 text-xl font-light leading-relaxed">
                            A curated timeline of current projects, academic publications, and active volunteer engagements.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="flex items-center gap-4"
                    >
                        <button
                            onClick={() => setIsAdding(!isAdding)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 font-bold tracking-widest uppercase text-sm ${isAdding ? 'border-secondary text-secondary bg-secondary/10 hover:bg-secondary/20 shadow-[0_0_20px_rgba(255,0,85,0.2)]' : 'border-tertiary/30 text-tertiary hover:bg-tertiary/10 hover:border-tertiary hover:shadow-[0_0_20px_rgba(112,0,255,0.2)]'}`}
                        >
                            {isAdding ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Entry</>}
                        </button>
                    </motion.div>
                </div>

                <AnimatePresence mode="wait">
                    {isAdding ? (
                        <motion.form
                            key="add-form"
                            initial={{ opacity: 0, height: 0, mb: 0 }}
                            animate={{ opacity: 1, height: "auto", mb: 64 }}
                            exit={{ opacity: 0, height: 0, mb: 0, overflow: "hidden" }}
                            onSubmit={handleSaveUpdate}
                            className="bg-surfaceHighlight/40 p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            <div className="md:col-span-2">
                                <h3 className="text-2xl font-bold text-white mb-6">Inject New Record</h3>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Record Type</label>
                                <select
                                    value={newType}
                                    onChange={e => setNewType(e.target.value)}
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-tertiary/50 outline-none appearance-none"
                                >
                                    {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Timeframe</label>
                                <input
                                    type="text"
                                    required
                                    value={newTimeframe}
                                    onChange={e => setNewTimeframe(e.target.value)}
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-tertiary/50 outline-none"
                                    placeholder="e.g. Feb 2026"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={newTitle}
                                    onChange={e => setNewTitle(e.target.value)}
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-tertiary/50 outline-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Summary</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={newSummary}
                                    onChange={e => setNewSummary(e.target.value)}
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-tertiary/50 outline-none resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Image URL <span className="text-white/30 font-normal lowercase tracking-normal">(Optional)</span></label>
                                <input
                                    type="url"
                                    value={newImageUrl}
                                    onChange={e => setNewImageUrl(e.target.value)}
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-tertiary/50 outline-none"
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Link <span className="text-white/30 font-normal lowercase tracking-normal">(Optional)</span></label>
                                <input
                                    type="url"
                                    value={newLink}
                                    onChange={e => setNewLink(e.target.value)}
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-tertiary/50 outline-none"
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                                {error && <p className="text-secondary text-sm self-center mr-auto">{error}</p>}
                                <button
                                    type="button"
                                    onClick={() => setIsAdding(false)}
                                    className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-tertiary text-white font-bold hover:shadow-[0_0_30px_rgba(112,0,255,0.4)] transition-all disabled:opacity-50"
                                >
                                    {isSaving ? 'Processing...' : 'Save Record'}
                                </button>
                            </div>
                        </motion.form>
                    ) : null}
                </AnimatePresence>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 ${filter === cat ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
                        >
                            {filter === cat && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{cat}</span>
                        </button>
                    ))}
                </div>

                {/* Grid Layout */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredUpdates.map((update, idx) => (
                            <motion.div
                                layout
                                key={update.id}
                                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.05 }}
                                className="group relative glass-card rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(112,0,255,0.15)] flex flex-col h-full bg-surfaceHighlight/20 backdrop-blur-sm"
                            >
                                {/* Media / Fallback Container */}
                                <div className={`relative h-56 w-full overflow-hidden flex items-center justify-center ${update.image ? 'bg-surfaceHighlight/30' : 'bg-gradient-to-br from-tertiary/20 to-primary/20'}`}>
                                    <div className="absolute inset-0 bg-background/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>

                                    {update.image ? (
                                        <img
                                            src={asset(update.image)}
                                            alt={update.title}
                                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('bg-gradient-to-br', 'from-tertiary/20', 'to-primary/20'); e.target.nextElementSibling.style.display = 'flex'; }}
                                        />
                                    ) : (
                                        <Activity size={48} className="text-white/20 transform transition-transform duration-700 group-hover:scale-110 relative z-0" />
                                    )}

                                    {/* Type Badge */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <div className="backdrop-blur-md bg-black/40 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-white tracking-widest uppercase flex items-center shadow-lg">
                                            {update.type === 'Publication' && <div className="w-2 h-2 rounded-full bg-primary mr-2" />}
                                            {update.type === 'Project' && <div className="w-2 h-2 rounded-full bg-tertiary mr-2" />}
                                            {update.type === 'Volunteer Work' && <div className="w-2 h-2 rounded-full bg-secondary mr-2" />}
                                            {update.type === 'Award' && <div className="w-2 h-2 rounded-full bg-amber-400 mr-2" />}
                                            {update.type === 'Internship' && <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2" />}
                                            {update.type}
                                        </div>
                                    </div>

                                    {/* Link Overlay (if exists) */}
                                    {update.link && (
                                        <a href={update.link} target="_blank" rel="noreferrer" className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 shadow-lg cursor-pointer pointer-events-auto">
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>

                                {/* Content Container */}
                                <div className="p-8 flex flex-col flex-grow relative z-20 bg-gradient-to-b from-transparent to-background/50">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2 text-tertiary font-mono text-sm tracking-widest uppercase">
                                            <Calendar size={14} />
                                            <span>// {update.timeframe}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors duration-300">
                                        {update.title}
                                    </h3>

                                    <p className="text-white/50 text-base leading-relaxed flex-grow">
                                        {update.summary}
                                    </p>

                                    {/* Subtle hover accent line at bottom */}
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-tertiary transition-all duration-500 group-hover:w-full"></div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredUpdates.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full py-32 flex flex-col items-center justify-center text-center glass-card rounded-3xl border border-white/5"
                    >
                        <Activity size={48} className="text-white/10 mb-6" />
                        <h3 className="text-2xl font-bold text-white/50 mb-2 tracking-tight">No Records Found</h3>
                        <p className="text-white/30 font-light">Try selecting a different filter category.</p>
                    </motion.div>
                )}

            </div>
        </section>
    );
};

export default UpdateGallery;
