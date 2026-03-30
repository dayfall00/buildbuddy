import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduce = useReducedMotion();

  const animate = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 30%, #588157 70%, #3e5a3d 100%)',
        }}
      />
      {/* Mesh overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      {/* White glow center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.h2
          {...animate(0)}
          className="text-4xl md:text-6xl font-bold text-[#1c1917] leading-tight mb-6"
        >
          Start your first{' '}
          <br className="hidden md:block" />
          real project today.
        </motion.h2>

        <motion.p
          {...animate(0.08)}
          className="text-[#1c1917]/75 text-lg mb-10 leading-relaxed"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          No perfect plan needed. No perfect team. <br />Just start.
        </motion.p>

        <motion.div
          {...animate(0.15)}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/signup"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#EA580C] font-bold text-base hover:bg-white/90 transition-all duration-200 cursor-pointer shadow-2xl hover:-translate-y-0.5"
          >
            Start Building
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
          <Link
            to="/explore"
            className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/40 bg-white/10 backdrop-blur-sm text-[#1c1917] font-bold text-base hover:bg-white/20 hover:border-white/60 transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
          >
            Explore Projects
          </Link>
        </motion.div>

        {/* Micro-line */}
        <motion.p
          {...animate(0.22)}
          className="text-[#57534e] text-sm mt-8"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          Start messy. Build anyway.
        </motion.p>
      </div>
    </section>
  );
};

export default FinalCTA;
