import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { AlertTriangle, Users, TrendingDown } from 'lucide-react';

const ProblemSection = () => {
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

  const stats = [
    { icon: TrendingDown, value: '90%', label: 'of student projects\nnever ship', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
    { icon: Users, value: '1 in 8', label: 'finds the right\nteammate alone', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { icon: AlertTriangle, value: '0 days', label: 'average consistency\nwithout accountability', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  ];

  return (
    <section
      ref={ref}
      className="py-24 bg-[#f5f3f1] relative overflow-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Label */}
        <motion.div {...animate(0)} className="flex justify-center mb-6">
          <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold uppercase tracking-wider">
            The Problem
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          {...animate(0.05)}
          className="text-4xl md:text-5xl font-bold text-center text-[#1c1917] mb-6 max-w-3xl mx-auto leading-tight"
        >
          Ideas aren't the problem.{' '}
          <span className="text-red-500">Execution is.</span>
        </motion.h2>

        {/* Body copy — 2 column on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
          <motion.p
            {...animate(0.1)}
            className="text-[#57534e] text-lg leading-relaxed"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            Every student has ideas. Apps, startups, tools, side projects. But most of them never get built.
          </motion.p>
          <motion.p
            {...animate(0.15)}
            className="text-[#57534e] text-lg leading-relaxed"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            Why? Because building alone is hard. Finding the right people is harder. And staying consistent? Almost impossible.
          </motion.p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {stats.map(({ icon: Icon, value, label, color, bg }, i) => (
            <motion.div
              key={i}
              {...animate(0.2 + i * 0.08)}
              className={`flex flex-col items-center text-center p-7 rounded-2xl border ${bg} backdrop-blur-sm cursor-default`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${bg}`}>
                <Icon size={20} className={color} />
              </div>
              <div className={`text-4xl font-bold mb-2 ${color}`}>{value}</div>
              <div
                className="text-[#57534e] text-sm leading-snug whitespace-pre-line"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
