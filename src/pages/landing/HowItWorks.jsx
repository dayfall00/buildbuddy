import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { UserCircle, Search, Users, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserCircle,
    title: 'Create your profile',
    description: 'Add your skills, interests, and what you want to build.',
    color: 'text-[#c2410c]',
    border: 'border-[#ea580c]/30',
    bg: 'bg-[#ea580c]/10',
  },
  {
    number: '02',
    icon: Search,
    title: 'Explore or post ideas',
    description: 'Find something exciting — or bring your own idea.',
    color: 'text-violet-400',
    border: 'border-violet-500/30',
    bg: 'bg-violet-500/10',
  },
  {
    number: '03',
    icon: Users,
    title: 'Build your team',
    description: 'Connect with people who complement your skills.',
    color: 'text-[#c2410c]',
    border: 'border-[#e7e5e4]',
    bg: 'bg-[#ea580c]/10',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Start building',
    description: 'Collaborate, execute, and ship your project.',
    color: 'text-orange-400',
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/10',
  },
];

const HowItWorks = () => {
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
      id="how-it-works"
      ref={ref}
      className="py-24 bg-[#f5f3f1] relative overflow-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div {...animate(0)} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ea580c]/10 border border-sky-500/20 text-sky-600 text-xs font-semibold uppercase tracking-wider mb-5">
            How It Works
          </motion.div>
          <motion.h2
            {...animate(0.05)}
            className="text-4xl md:text-5xl font-bold text-[#1c1917] leading-tight"
          >
            From idea to execution —{' '}
            <span className="text-[#c2410c]">simple.</span>
          </motion.h2>
        </div>

        {/* Steps — horizontal timeline desktop, vertical mobile */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-300 via-violet-300 to-orange-300"
              initial={shouldReduce ? {} : { scaleX: 0 }}
              animate={inView && !shouldReduce ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              style={{ originX: 0 }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map(({ number, icon: Icon, title, description, color, border, bg }, i) => (
              <motion.div
                key={i}
                {...animate(0.1 + i * 0.1)}
                className="flex flex-col items-center text-center lg:text-left lg:items-center"
              >
                {/* Step number + icon circle */}
                <div className="relative mb-6">
                  <div className={`w-14 h-14 rounded-full border-2 ${border} ${bg} flex items-center justify-center relative z-10 bg-[#f5f3f1]`}>
                    <Icon size={22} className={color} />
                  </div>
                  <span className={`absolute -top-2 -right-2 text-xs font-bold ${color} font-mono`}>{number}</span>
                </div>

                <h3 className="text-lg font-bold text-[#1c1917] mb-2">{title}</h3>
                <p
                  className="text-[#57534e] text-sm leading-relaxed"
                  style={{ fontFamily: "'Work Sans', sans-serif" }}
                >
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
