import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Crosshair, GraduationCap, Flame } from 'lucide-react';

const benefits = [
  { icon: Crosshair, text: 'Focused on action, not just networking' },
  { icon: GraduationCap, text: 'Designed for students, not professionals' },
  { icon: Flame, text: 'Built around ideas, teams, and execution' },
];

const WhyBuildBuddy = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduce = useReducedMotion();

  const animate = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, x: -24 },
          animate: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
        };

  const animateRight = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, x: 24 },
          animate: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f5f3f1 0%, #eae8e5 60%, #dfdbd8 100%)',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — headline */}
          <div>
            <motion.div {...animate(0)} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#57534e] text-xs font-semibold uppercase tracking-wider mb-6">
              Why Build Buddy
            </motion.div>
            <motion.h2
              {...animate(0.05)}
              className="text-4xl md:text-5xl font-bold text-[#1c1917] leading-tight mb-6"
            >
              Built for builders.{' '}
              <span className="text-[#c2410c]">Not just profiles.</span>
            </motion.h2>
            <motion.p
              {...animate(0.1)}
              className="text-[#57534e] text-lg leading-relaxed mb-8"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Most platforms help you show what you've done. Build Buddy helps you actually do something.
            </motion.p>

            {/* Punchline */}
            <motion.div
              {...animate(0.15)}
              className="inline-block px-5 py-2.5 rounded-xl bg-[#c2410c]/15 border border-[#f59e0b]/30"
            >
              <p className="text-[#FDB168] font-bold text-lg">
                Stop scrolling. Start building.
              </p>
            </motion.div>
          </div>

          {/* Right — benefit rows */}
          <div className="space-y-4">
            {benefits.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i}
                {...animateRight(0.15 + i * 0.08)}
                className="flex items-center gap-5 p-5 rounded-2xl bg-[#ffffff] border border-[#e7e5e4] hover:bg-white/8 hover:border-white/20 transition-all duration-200 cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-[#c2410c]/15 border border-[#f59e0b]/25 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-[#f59e0b]" />
                </div>
                <span
                  className="text-[#1c1917] text-base font-medium"
                  style={{ fontFamily: "'Work Sans', sans-serif" }}
                >
                  {text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f5f3f1] to-transparent pointer-events-none" />
    </section>
  );
};

export default WhyBuildBuddy;
