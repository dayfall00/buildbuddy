import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={shouldReduce ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#f5f3f1]/90 backdrop-blur-xl border-b border-[#e7e5e4] shadow-xl'
          : 'bg-transparent'
      }`}
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ea580c] to-[#c2410c] flex items-center justify-center shadow-lg group-hover:shadow-[#ea580c]/40 transition-shadow duration-200">
            <Zap size={16} className="text-[#1c1917]" fill="white" />
          </div>
          <span className="text-[#1c1917] font-700 text-lg tracking-tight font-semibold">
            Build<span className="text-[#c2410c]">Buddy</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Features', href: '#features' },
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Stories', href: '#stories' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[#57534e] hover:text-[#1c1917] text-sm font-medium transition-colors duration-200 cursor-pointer"
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden md:block text-[#57534e] hover:text-[#1c1917] text-sm font-medium transition-colors duration-200 cursor-pointer"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-lg bg-[#c2410c] hover:bg-[#ea580c] text-white text-sm font-semibold transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[#ea580c]/30 hover:-translate-y-0.5"
          >
            Start Building
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default LandingNavbar;
