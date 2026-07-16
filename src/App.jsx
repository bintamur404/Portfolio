import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Publications from './components/Publications';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import UpdateGallery from './components/UpdateGallery';
import Footer from './components/Footer';

function App() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = () => {
            const hasAdminParam = window.location.search.includes('admin=true') || window.location.hash === '#admin';
            setIsAdmin(hasAdminParam);
        };
        
        checkAdmin();
        window.addEventListener('hashchange', checkAdmin);
        return () => window.removeEventListener('hashchange', checkAdmin);
    }, []);

    return (
        <div className="relative w-full min-h-screen font-sans overflow-x-hidden" style={{ backgroundColor: '#08090D', color: 'rgba(255,255,255,0.9)' }}>
            <Navbar />
            <Hero />
            <About />
            <Publications />
            <Projects />
            <Experience />
            <Education />
            {isAdmin && <UpdateGallery />}
            <Footer />
        </div>
    );
}

export default App;
