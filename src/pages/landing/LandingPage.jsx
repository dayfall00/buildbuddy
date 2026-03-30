import React from 'react';
import LandingNavbar from './LandingNavbar';
import HeroSection from './HeroSection';
import ProblemSection from './ProblemSection';
import SolutionSection from './SolutionSection';
import FeaturesSection from './FeaturesSection';
import WhyBuildBuddy from './WhyBuildBuddy';
import HowItWorks from './HowItWorks';
import SocialProof from './SocialProof';
import VisionSection from './VisionSection';
import FinalCTA from './FinalCTA';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div style={{ scrollBehavior: 'smooth' }}>
      <LandingNavbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <WhyBuildBuddy />
        <HowItWorks />
        <SocialProof />
        <VisionSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
