import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Lightbulb, UsersRound, Wrench, Trophy } from 'lucide-react';

const features = [
  {
    id: 'ideas',
    icon: Lightbulb,
    title: 'Discover Ideas',
    description: 'Explore real project ideas shared by students across colleges. No lorem ipsum — real projects seeking real people.',
    span: 'lg:col-span-2 lg:row-span-2',
    accent: 'from-[#ea580c]/20 to-[#c2410c]/10',
    iconBg: 'bg-sky-500/15 border-[#ea580c]/30',
    iconColor: 'text-[#c2410c]',
    large: true,
  },
  {
    id: 'team',
    icon: UsersRound,
    title: 'Find Teammates',
    description: 'Connect with developers, designers, and creators who match your vision.',
    span: 'lg:col-span-1',
    accent: 'from-violet-500/20 to-purple-600/10',
    iconBg: 'bg-violet-500/15 border-violet-500/30',
    iconColor: 'text-violet-400',
    large: false,
  },
  {
    id: 'build',
    icon: Wrench,
    title: 'Build Together',
    description: 'Collaborate, track progress, and actually ship — like a startup team.',
    span: 'lg:col-span-1',
    accent: 'from-emerald-500/20 to-green-600/10',
    iconBg: 'bg-[#ea580c]/15 border-[#e7e5e4]',
    iconColor: 'text-[#c2410c]',
    large: false,
  },
  {
    id: 'showcase',
    icon: Trophy,
    title: 'Showcase Work',
    description: 'Create a portfolio of real, working projects — not just certificates.',
    span: 'lg:col-span-2',
    accent: 'from-orange-500/20 to-amber-600/10',
    iconBg: 'bg-orange-500/15 border-orange-500/30',
    iconColor: 'text-orange-400',
    large: false,
  },
];

const FeaturesSection = () => {
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
      id="features"
      ref={ref}
      className="py-24 bg-[#f5f3f1] relative overflow-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Top fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#f5f3f1] to-transparent pointer-events-none" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-sky-900/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div {...animate(0)} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ea580c]/10 border border-sky-500/20 text-[#c2410c] text-xs font-semibold uppercase tracking-wider mb-5">
            Features
          </motion.div>
          <motion.h2
            {...animate(0.05)}
            className="text-4xl md:text-5xl font-bold text-[#1c1917] mb-4 leading-tight"
          >
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-[#ea580c] to-[#c2410c] bg-clip-text text-transparent">
              start building
            </span>
          </motion.h2>
          <motion.p
            {...animate(0.1)}
            className="text-[#57534e] text-lg max-w-xl mx-auto"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            One platform. Everything from idea to shipped product.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ gridAutoRows: 'minmax(180px, auto)' }}>
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                {...animate(0.12 + i * 0.06)}
                className={`${feature.span} group relative overflow-hidden rounded-2xl border border-[#e7e5e4] bg-gradient-to-br ${feature.accent} backdrop-blur-sm p-7 cursor-pointer hover:border-white/20 transition-all duration-300`}
                whileHover={shouldReduce ? {} : { y: -3 }}
                transition={{ duration: 0.2 }}
              >
                {/* Hover glow overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#ffffff] rounded-2xl pointer-events-none" />

                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-5 ${feature.iconBg}`}>
                  <Icon size={20} className={feature.iconColor} />
                </div>

                <h3 className={`font-bold text-[#1c1917] mb-3 ${feature.large ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                  {feature.title}
                </h3>
                <p
                  className={`text-[#1c1917]/55 leading-relaxed ${feature.large ? 'text-base max-w-sm' : 'text-sm'}`}
                  style={{ fontFamily: "'Work Sans', sans-serif" }}
                >
                  {feature.description}
                </p>

                {/* Large card extra decorative element */}
                {feature.large && (
                  <div className="absolute bottom-6 right-6 opacity-10">
                    <Icon size={80} className={feature.iconColor} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
