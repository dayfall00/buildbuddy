import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolutionSection = () => {
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

  const points = [
    'Find teammates based on skills and interests',
    'Join projects or start your own',
    'Work like a real team, not a group chat',
  ];

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #588157 0%, #3e5a3d 50%, #253625 100%)',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div>
            <motion.div {...animate(0)} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-[#1c1917] text-xs font-semibold uppercase tracking-wider mb-6">
              The Solution
            </motion.div>

            <motion.h2
              {...animate(0.05)}
              className="text-4xl md:text-5xl font-bold text-[#1c1917] leading-tight mb-6"
            >
              You don't need more ideas.{' '}
              <span className="text-[#FDB168]">You need the right people.</span>
            </motion.h2>

            <motion.p
              {...animate(0.1)}
              className="text-[#1c1917]/75 text-lg leading-relaxed mb-8"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Build Buddy helps you connect with students who want to build — not just talk.
            </motion.p>

            {/* Bullet points */}
            <div className="space-y-4 mb-10">
              {points.map((point, i) => (
                <motion.div
                  key={i}
                  {...animate(0.15 + i * 0.07)}
                  className="flex items-start gap-3"
                >
                  <CheckCircle size={20} className="text-[#FDB168] mt-0.5 flex-shrink-0" />
                  <span
                    className="text-[#1c1917]/85 text-base"
                    style={{ fontFamily: "'Work Sans', sans-serif" }}
                  >
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div {...animate(0.35)}>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ffffff] text-[#1c1917] font-semibold text-base hover:bg-white/90 transition-all duration-200 cursor-pointer shadow-xl hover:-translate-y-0.5"
              >
                Find Your Team <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>

          {/* Right — tagline card */}
          <motion.div
            {...animate(0.2)}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 text-center shadow-2xl">
              <div className="text-6xl font-bold text-[#1c1917]/10 mb-4 leading-none">"</div>
              <blockquote
                className="text-2xl md:text-3xl font-bold text-[#1c1917] leading-snug mb-6"
              >
                Turn{' '}
                <span className="italic text-[#FDB168]">"we should build this"</span>
                {' '}into{' '}
                <span className="italic text-emerald-300">"we built this."</span>
              </blockquote>
              <div className="w-12 h-1 bg-white/30 rounded mx-auto" />
            </div>

            {/* Glow behind card */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-30 rounded-3xl bg-white/20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
