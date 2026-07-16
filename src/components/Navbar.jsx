import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import { asset } from '../utils/assets';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const navLinks = [
        { label: 'About', href: '#about' },
        { label: 'Publications', href: '#publications' },
        { label: 'Clinical Systems', href: '#projects' },
        { label: 'Experience', href: '#experience' },
        { label: 'Contact', href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Determine active section based on scroll position
            const sections = navLinks.map(link => {
                const el = document.getElementById(link.href.replace('#', ''));
                if (el) {
                    const rect = el.getBoundingClientRect();
                    return {
                        id: link.href,
                        // If top of section is within upper 40% of viewport
                        visible: rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4
                    };
                }
                return { id: link.href, visible: false };
            });

            const active = sections.find(s => s.visible);
            if (active) {
                setActiveSection(active.id);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            setMobileMenuOpen(false);
            const offset = 80; // height of navbar
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <header 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                scrolled 
                    ? 'py-4 bg-[#08090D]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20' 
                    : 'py-6 bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a 
                    href="#top" 
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setActiveSection('');
                    }}
                    className="flex items-center gap-2 group cursor-pointer"
                >
                    <span className="font-sans font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-indigo-300">
                        Abdullah<span className="text-indigo-400 font-medium">.AI</span>
                    </span>
                </a>

                {/* Desktop Nav Links */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href;
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="relative text-xs uppercase tracking-wider font-semibold py-1.5 transition-colors duration-300"
                                style={{ color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.55)' }}
                                onMouseEnter={(e) => { if (!isActive) e.target.style.color = '#FFFFFF'; }}
                                onMouseLeave={(e) => { if (!isActive) e.target.style.color = 'rgba(255,255,255,0.55)'; }}
                            >
                                {link.label}
                                {isActive && (
                                    <motion.div 
                                        layoutId="activeNavLine"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                                        style={{ background: 'linear-gradient(90deg, #818CF8, #FB923C)' }}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </a>
                        );
                    })}
                </nav>

                {/* CV Action Button */}
                <div className="hidden lg:flex items-center">
                    <a
                        href={asset('/Abdullah%20Ibne%20Tayeb%20Tamur%20CV(2026).pdf')}
                        download="Abdullah Ibne Tayeb Tamur CV(2026).pdf"
                        className="btn-primary !py-2.5 !px-5 text-xs flex items-center gap-2 group transition-all duration-300"
                        style={{ 
                            background: 'rgba(255,255,255,0.05)', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: 'none',
                            color: 'rgba(255,255,255,0.9)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#818CF8';
                            e.target.style.borderColor = '#818CF8';
                            e.target.style.color = '#FFFFFF';
                            e.target.style.boxShadow = '0 4px 15px rgba(129, 140, 248, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255,255,255,0.05)';
                            e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                            e.target.style.color = 'rgba(255,255,255,0.9)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        <FileText size={14} className="group-hover:rotate-6 transition-transform duration-300" />
                        <span>Curriculum Vitae</span>
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 rounded-xl border border-white/5 bg-white/5 text-white/80 hover:text-white transition-colors duration-300"
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute top-full left-0 w-full bg-[#08090D]/95 backdrop-blur-2xl border-b border-white/5 py-8 px-6 lg:hidden flex flex-col gap-6"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href;
                                return (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className="text-sm font-semibold tracking-wider uppercase py-2 border-b border-white/5"
                                        style={{ color: isActive ? '#818CF8' : 'rgba(255,255,255,0.7)' }}
                                    >
                                        {link.label}
                                    </a>
                                );
                            })}
                        </div>
                        <a
                            href={asset('/Abdullah%20Ibne%20Tayeb%20Tamur%20CV(2026).pdf')}
                            download="Abdullah Ibne Tayeb Tamur CV(2026).pdf"
                            onClick={() => setMobileMenuOpen(false)}
                            className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-xs"
                        >
                            <FileText size={14} />
                            <span>Download CV</span>
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
