import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Users, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const FloatingCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 40, rotate: -3 }}
    animate={{ opacity: 1, y: 0, rotate: -3 }}
    transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="relative"
  >
    {/* Main card */}
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="bg-[#ffffff]/90 backdrop-blur-xl border border-[#e7e5e4] rounded-2xl p-5 shadow-2xl"
      style={{ rotate: -3 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ea580c] to-[#c2410c] flex items-center justify-center text-white text-xs font-bold">AK</div>
        <div>
          <div className="text-[#1c1917] text-sm font-semibold" style={{ fontFamily: "'Outfit', sans-serif" }}>Campus Carpool App</div>
          <div className="text-[#57534e]/80 text-xs">Looking for teammates</div>
        </div>
        <span className="ml-auto px-2 py-0.5 rounded-full bg-[#ea580c]/20 text-[#c2410c] text-xs font-medium border border-[#e7e5e4]">Open</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {['React', 'Firebase', 'Node.js'].map(t => (
          <span key={t} className="px-2.5 py-1 rounded-md bg-[#ffffff] border border-[#e7e5e4] text-[#57534e] text-xs">{t}</span>
        ))}
      </div>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex -space-x-2">
          {['AK', 'MS', 'RJ'].map((u, i) => (
            <div key={i} className="w-6 h-6 rounded-full border border-[#ffffff] bg-gradient-to-br from-[#ea580c] to-[#c2410c] flex items-center justify-center text-white text-[8px] font-bold">{u[0]}</div>
          ))}
        </div>
        <span className="text-[#57534e]/80 text-xs">3 members joined</span>
      </div>
      <button className="w-full py-2 rounded-xl bg-[#c2410c] hover:bg-[#ea580c] text-white text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2">
        <Zap size={14} className="text-[#1c1917]" /> Request to Join
      </button>
    </motion.div>

    {/* Floating badge 1 */}
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      className="absolute -top-5 -right-6 bg-[#ea580c] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5"
    >
      <CheckCircle size={12} /> Team formed!
    </motion.div>

    {/* Floating badge 2 */}
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      className="absolute -bottom-4 -left-6 bg-[#ffffff] border border-[#e7e5e4] text-[#1c1917] text-xs font-medium px-3 py-2 rounded-xl shadow-xl flex items-center gap-2"
    >
      <Users size={12} className="text-[#c2410c]" />
      <span>+240 builders this week</span>
    </motion.div>
  </motion.div>
);

const HeroSection = () => {
  const shouldReduce = useReducedMotion();
  const motionProps = (delay) => shouldReduce ? {} : fadeUp(delay);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-[#f5f3f1]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#ea580c]/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#c2410c]/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ea580c]/5 blur-[100px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div>
            {/* Badge */}
            <motion.div {...motionProps(0)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ea580c]/30 bg-[#ea580c]/10 text-[#c2410c] text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] animate-pulse" />
              For college students who build
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...motionProps(0.1)}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1c1917] leading-[1.05] tracking-tight mb-6"
            >
              Build{' '}
              <span className="bg-gradient-to-r from-[#ea580c] via-[#c2410c] to-[#9a3412] bg-clip-text text-transparent">
                together.
              </span>
              <br />
              Ship{' '}
              <span className="relative">
                <span className="text-[#1c1917]">real projects.</span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ea580c] to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
                  style={{ originX: 0 }}
                />
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              {...motionProps(0.2)}
              className="text-lg text-[#57534e] leading-relaxed mb-8 max-w-lg"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Build Buddy is a platform for college students to collaborate and build projects together — turning ideas into real products through teamwork.
            </motion.p>

            {/* CTAs */}
            <motion.div {...motionProps(0.3)} className="flex flex-wrap items-center gap-4 mb-6">
              <Link
                to="/signup"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-[#c2410c] hover:bg-[#ea580c] text-white font-semibold text-base transition-all duration-200 cursor-pointer shadow-lg shadow-[#ea580c]/20 hover:shadow-[#ea580c]/40 hover:-translate-y-0.5"
              >
                Start Building
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
              <Link
                to="/explore"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#e7e5e4] bg-[#ffffff] hover:bg-[#f1eeea] text-[#1c1917] font-semibold text-base transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
              >
                Explore Projects
              </Link>
            </motion.div>

            {/* Micro-line */}
            <motion.p {...motionProps(0.4)} className="text-[#57534e]/60 text-sm" style={{ fontFamily: "'Work Sans', sans-serif" }}>
              No team? Find yours here.
            </motion.p>

            {/* Social proof small bar */}
            <motion.div {...motionProps(0.5)} className="flex items-center gap-4 mt-10 pt-8 border-t border-[#e7e5e4]">
              <div className="flex -space-x-2.5">
                {['#ea580c', '#c2410c', '#fed7aa', '#ffffff', '#e7e5e4'].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#f5f3f1]" style={{ background: c }} />
                ))}
              </div>
              <div>
                <span className="text-[#1c1917] font-semibold text-sm">1,200+ students</span>
                <span className="text-[#57534e]/80 text-sm"> already building</span>
              </div>
            </motion.div>
          </div>

          {/* Right — Floating UI Card */}
          <div className="flex justify-center lg:justify-end">
            {shouldReduce ? <FloatingCard /> : <FloatingCard />}
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f5f3f1] to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
