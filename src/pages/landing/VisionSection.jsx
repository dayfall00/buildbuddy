import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const VisionSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduce = useReducedMotion();

  const animate = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section
      ref={ref}
      className="py-28 bg-[#f5f3f1] relative overflow-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sky-700/12 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#c2410c]/5 blur-2xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#ea580c]/5 blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div {...animate(0)} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff] border border-[#e7e5e4] text-[#57534e] text-xs font-semibold uppercase tracking-wider mb-8">
          The Vision
        </motion.div>

        <motion.h2
          {...animate(0.05)}
          className="text-4xl md:text-6xl font-bold text-[#1c1917] leading-tight mb-10"
        >
          This is where{' '}
          <span className="bg-gradient-to-r from-[#ea580c] via-[#c2410c] to-[#9a3412] bg-clip-text text-transparent">
            builders begin.
          </span>
        </motion.h2>

        <div className="space-y-5 max-w-2xl mx-auto">
          <motion.p
            {...animate(0.1)}
            className="text-[#1c1917]/55 text-xl leading-relaxed"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            The best way to learn isn't by watching. It's by building.
          </motion.p>
          <motion.p
            {...animate(0.15)}
            className="text-[#57534e]/80 text-lg leading-relaxed"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            Not alone. Not randomly. But with the right people, on the right ideas.
          </motion.p>
          <motion.p
            {...animate(0.2)}
            className="text-[#57534e] text-xl font-semibold"
          >
            Build Buddy is where that happens.
          </motion.p>
        </div>

        {/* Decorative divider */}
        <motion.div
          {...animate(0.25)}
          className="flex items-center justify-center gap-4 mt-12"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/20" />
          <div className="w-2 h-2 rounded-full bg-[#ea580c]/30" />
          <div className="w-2 h-2 rounded-full bg-[#ea580c]/20" />
          <div className="w-2 h-2 rounded-full bg-[#ea580c]/10" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
