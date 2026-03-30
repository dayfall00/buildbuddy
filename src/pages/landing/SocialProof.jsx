import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'Finally found people who actually wanted to build.',
    author: 'Priya S.',
    role: 'CS sophomore, IIT Delhi',
    avatar: 'PS',
    color: 'from-[#ea580c] to-[#c2410c]',
  },
  {
    quote: 'This feels like working in a startup.',
    author: 'Arjun M.',
    role: 'Design student, NID Ahmedabad',
    avatar: 'AM',
    color: 'from-violet-500 to-purple-600',
  },
  {
    quote: "Not just ideas anymore — we shipped something.",
    author: 'Rahul K.',
    role: 'ECE student, IIT Bombay',
    avatar: 'RK',
    color: 'from-emerald-500 to-teal-600',
  },
];

const SocialProof = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduce = useReducedMotion();

  const animate = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section
      id="stories"
      ref={ref}
      className="py-24 bg-[#f5f3f1] relative overflow-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div {...animate(0)} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-semibold uppercase tracking-wider mb-5">
            Social Proof
          </motion.div>
          <motion.h2
            {...animate(0.05)}
            className="text-4xl md:text-5xl font-bold text-[#1c1917] leading-tight"
          >
            Real students.{' '}
            <span className="text-[#c2410c]">Real projects.</span>
          </motion.h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, author, role, avatar, color }, i) => (
            <motion.div
              key={i}
              {...animate(0.1 + i * 0.08)}
              className="group relative bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array(5).fill(null).map((_, s) => (
                  <Star key={s} size={14} className="text-amber-400" fill="#FBBF24" />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="text-[#1c1917] text-lg font-semibold leading-snug mb-6"
              >
                "{quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold`}>
                  {avatar}
                </div>
                <div>
                  <div className="text-[#1c1917] font-semibold text-sm">{author}</div>
                  <div
                    className="text-[#57534e] text-xs"
                    style={{ fontFamily: "'Work Sans', sans-serif" }}
                  >
                    {role}
                  </div>
                </div>
              </div>

              {/* Hover accent border */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
